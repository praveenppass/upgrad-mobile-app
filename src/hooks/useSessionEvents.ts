import { useRoute } from "@react-navigation/native";
import { sessionDetailsStackNavigator } from "@routes/stacks/sessionDetailsNavigation";
import { useSelector } from "react-redux";

import { SessionModalController } from "@components/Modals/SessionModalController";

import { useAnalytics } from "@hooks/useAnalytics";

import { type RootState } from "@redux/store/root.reducer";

import { ICalendarVIewType } from "@interface/calendar.interface";
import {
	IComponentName,
	IEntityAction,
	IEventName,
	IPageCategory,
	ISection,
} from "@interface/events.interface";

import { C } from "@assets/constants";

const pageCategoryByRoute: Record<string, IPageCategory> = {
	HomePage: IPageCategory.HOME_PAGE,
	CalendarPage: IPageCategory.CALENDAR_PAGE,
};

const { strings } = C;

export const useSessionEvents = () => {
	const route = useRoute();
	const { trackEvent } = useAnalytics();

	const { calendarTimeZone, selectedTab, eventSelected, selectedView } =
		useSelector((state: RootState) => state.calendar);

	const courseVariant = useSelector(
		(state: RootState) => state.studyPlan?.courseVariant,
	);
	const courseCategory = useSelector(
		(state: RootState) => state.studyPlan?.courseCategory,
	);
	const selectedCourseDetails = useSelector(
		(state: RootState) => state.studyPlan?.selectedCourseDetails,
	);
	const { buddySession } = eventSelected?.item;
	// @ts-ignore ignoring ts issue on selectedCourseDetails
	const userCourse = selectedCourseDetails?.userCourse;
	// @ts-ignore ignoring ts issue on selectedCourseDetails
	const userProgram = selectedCourseDetails?.userProgram;

	const sessionName =
		userCourse?.course?.name ??
		userProgram?.program?.name ??
		`${buddySession?.buddy?.firstName} - ${buddySession?.buddy?.lastName}`;

	const isHomePage = route.name === "HomePage";
	const isCalendarPage = route.name === "CalendarPage";
	const pageCategory =
		pageCategoryByRoute[route?.name] || IPageCategory.COURSE_DETAILS;

	const course_type = courseVariant ?? "NA";
	const course_category = courseCategory ?? "NA";
	const course_name =
		userCourse?.course?.name ?? userProgram?.program?.name ?? "NA";

	const commonParams = {
		page_category: pageCategory,
	};
	const headerDropDownParams = {
		section: ISection.HEADER,
		component_name: IComponentName.LOC_DROP_DOWN,
	};

	const onSessionPageLoad = () => {
		trackEvent({
			eventData: commonParams,
			eventName: IEventName.PAGE_LOADED,
		});
	};

	const onTimeZoneDropDownSelect = () => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				label: calendarTimeZone,
			},
		});
	};

	const onSearchTimeZone = (label: string) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				label,
				entity_action: IEntityAction.SEARCH_BAR,
			},
		});
	};

	const onCloseTimeZoneModal = (label: string) => {
		trackEvent({
			eventName: IEventName.MODAL_CLOSE,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				entity_name: label,
			},
		});
	};

	const onSelectTimeZone = (label: string) => {
		trackEvent({
			eventName: IEventName.FILTER_ACTION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				label,
				current_tab: selectedTab,
				entity_name: label,
			},
		});
		onCloseTimeZoneModal(label);
	};

	const onSwitchCal = () => {
		trackEvent({
			eventName: IEventName.TAB_SWITCHED,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				current_tab: selectedTab,
				component_name:
					selectedView === ICalendarVIewType.calendar
						? ICalendarVIewType.list
						: ICalendarVIewType.calendar,
			},
		});
	};

	const onCalendarMonthChange = (month: string, isLeft?: boolean) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				entity_name: month,
				current_tab: selectedTab,
				section: ISection.CALENDAR,
				component_name: IComponentName.MONTH_CHANGE,
				entity_action: isLeft
					? IEntityAction.CAROUSEL_LEFT
					: IEntityAction.CAROUSEL_RIGHT,
			},
		});
	};

	const onFilterClick = () => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				current_tab: selectedTab,
				component_name: IComponentName.STATUS_DROPDOWN,
				section: isHomePage
					? ISection.HEADER
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onFilterClickFromCourseDetails = () => {
		trackEvent({
			eventName: IEventName.FILTER_ACTION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				current_tab: selectedTab,
				component_name: IComponentName.STATUS_DROPDOWN,
				section: isHomePage
					? ISection.HEADER
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onClickFilter = (filterValue: string) => {
		trackEvent({
			eventName: IEventName.FILTER_ACTION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				current_tab: selectedTab,
				entity_name: filterValue,
				component_name: IComponentName.STATUS_DROPDOWN,
				section: isHomePage
					? ISection.HEADER
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onFilterApply = (isReset?: boolean) => {
		trackEvent({
			eventName: IEventName.FILTER_ACTION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				current_tab: selectedTab,
				component_name: IComponentName.STATUS_DROPDOWN,
				label: isReset ? IEntityAction.RESET : IEntityAction.APPLY,
				section: isHomePage
					? ISection.HEADER
					: IComponentName.COURSE_SESSION,
				entity_name: isReset
					? IEntityAction.RESET
					: IEntityAction.APPLY,
				entity_action: isReset
					? IEntityAction.CLEAR_FILTER
					: IEntityAction.APPLY_FILTER,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onTabSwitch = () => {
		trackEvent({
			eventName: IEventName.FILTER_ACTION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				label: selectedTab,
				current_tab: selectedTab,
				component_name: IComponentName.TAB_SESSION,
				section: selectedView ?? ISection.HEADER_SECTION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onJoinClick = (position: number) => {
		trackEvent({
			eventName: eventSelected?.isModal
				? IComponentName.JOIN_SESSION
				: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				position,
				current_tab: selectedTab,
				entity_name: sessionName,
				label: strings.JOIN_MEETING,
				component_name: IComponentName.JOIN_SESSION,
				section: isCalendarPage
					? ICalendarVIewType.list
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onDbtBtnClick = (position: number) => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				position,
				label: strings.DOUBT,
				current_tab: selectedTab,
				entity_name: sessionName,
				component_name: IComponentName.ASK_DOUBT,
				section: isCalendarPage
					? ICalendarVIewType.list
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onPlayRecordClick = (position: number) => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				position,
				current_tab: selectedTab,
				entity_name: sessionName,
				label: strings.PLAY_RECORD,
				component_name: IComponentName.PLAY_RECORD,
				section: isCalendarPage
					? ICalendarVIewType.list
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onFabClick = () => {
		sessionDetailsStackNavigator.navigate("SelectDateScreen");
		SessionModalController.showModal({
			isCourseDetail: true,
			initialRouteName: "SelectDateScreen",
		});
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				current_tab: selectedTab,
				component_name: IComponentName.PLUS_FOOTER,
				section: selectedView ?? IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
		onScheduleSessionModalVisible();
	};

	const onViewDetailClick = (position: number) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				position,
				current_tab: selectedTab,
				entity_name: sessionName,
				section: selectedView ?? "NA",
				label: IComponentName.VIEW_DETAILS,
				component_name: IComponentName.VIEW_DETAILS,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onClickEventFrmCalendar = () => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				position: "NA",
				label: sessionName,
				current_tab: selectedTab,
				entity_name: sessionName,
				section: ICalendarVIewType.calendar,
				component_name: IComponentName.VIEW_DETAILS,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onScheduleCtaClick = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				section: selectedView,
				component_name: IComponentName.SCHEDULE_SESSION,
			},
		});
	};

	const onViewSessionModal = () => {
		trackEvent({
			eventName: IEventName.POPUP_VIEWED,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				label: sessionName,
				entity_name: sessionName,
				component_name: IComponentName.EVENT_DETAILS,
				section: selectedView ?? IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onViewMoreSessionDetail = () => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				label: sessionName,
				entity_name: sessionName,
				current_tab: "mentorship",
				component_name: IComponentName.OPTION_MENU,
				section: selectedView ?? IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onSessionMoreItemClick = (
		label: string,
		action: IEntityAction.RESCHEDULE_EVENT | IEntityAction.CANCEL_EVENT,
	) => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				label,
				entity_action: action,
				entity_name: sessionName,
				current_tab: "mentorship",
				component_name: IComponentName.OPTION_MENU,
				section: selectedView ?? IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	// upcoming or past events dropdown
	const onSwitchSessionClick = () => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				current_tab: selectedTab,
				section: IComponentName.COURSE_SESSION,
				component_name: IComponentName.UP_COMING_DROPDOWN,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onSwitchSessionConfirm = (label: string) => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				label,
				entity_name: label,
				current_tab: selectedTab,
				section: IComponentName.COURSE_SESSION,
				component_name: IComponentName.UP_COMING_DROPDOWN,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onClickClock = () => {
		trackEvent({
			eventName: IEventName.FILTER_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				current_tab: selectedTab,
				section: IComponentName.COURSE_SESSION,
				component_name: IComponentName.CLOCK_ICON,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	//* schedule session modal events
	const scheduleSessionComponent = {
		component_name: IComponentName.SCHEDULE_MODAL,
	};
	const onScheduleSessionModalVisible = () => {
		trackEvent({
			eventName: IEventName.POPUP_VIEWED,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				current_tab: selectedTab ?? "NA",
				section: isCalendarPage
					? selectedView
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onScheduleSessionModalClose = () => {
		trackEvent({
			eventName: IEventName.MODAL_CLOSE,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				current_tab: selectedTab ?? "NA",
				section: isCalendarPage
					? selectedView
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onScheduleMonthContinue = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonParams,
				label: strings.CONTINUE,
				...scheduleSessionComponent,
				current_tab: selectedTab ?? "NA",
				section: isCalendarPage
					? selectedView
					: IComponentName.COURSE_SESSION,
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onChooseCourseDropClick = () => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				current_tab: selectedTab ?? "NA",
				section: isCalendarPage ? selectedView : "NA",
				entity_name: IEntityAction.SELECT_COURSE_DROPDOWN,
			},
		});
	};

	const onChooseCourseFromDropDown = (label: string) => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				label,
				current_tab: selectedTab ?? "NA",
				section: isCalendarPage ? selectedView : "NA",
				entity_name: IEntityAction.SELECT_COURSE_DROPDOWN,
			},
		});
	};

	const onChooseDateFromModal = (date: string) => {
		trackEvent({
			eventName: IEventName.RESPONSE_EDIT,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				label: date,
				current_tab: selectedTab ?? "NA",
				entity_name: IEntityAction.DATE_PREFER,
				section: isCalendarPage ? selectedView : "NA",
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onChangeDateFromModal = (label: string) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				label,
				current_tab: selectedTab ?? "NA",
				entity_name: IComponentName.MONTH_CHANGE,
				section: isCalendarPage ? selectedView : "NA",
				course_name,
				course_type,
				course_category,
			},
		});
		onChooseDateFromModal(label);
	};

	const onSlotSelect = (label: string) => {
		trackEvent({
			eventName: IEventName.RESPONSE_EDIT,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				label: label,
				current_tab: selectedTab ?? "NA",
				entity_name: IEntityAction.SLOT_SELECT,
				section: isCalendarPage ? selectedView : "NA",
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onSlotConfirm = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				label: strings.CONTINUE,
				current_tab: selectedTab ?? "NA",
				entity_name: IEntityAction.SESSION_CONFIRM,
				section: isCalendarPage ? selectedView : "NA",
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onSessionConfirm = () => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				label: strings.CONTINUE,
				current_tab: selectedTab ?? "NA",
				entity_name: IEntityAction.SESSION_CONFIRMED,
				section: isCalendarPage ? selectedView : "NA",
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onNoSlot = () => {
		trackEvent({
			eventName: IEventName.ERROR_CAPTURED,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				current_tab: selectedTab ?? "NA",
				entity_name: IEntityAction.NO_SLOT,
				label: strings.NO_SLOT_AVAILABLE_YET,
				section: isCalendarPage ? selectedView : "NA",
				course_name,
				course_type,
				course_category,
			},
		});
	};

	const onGoBackToCalendarModal = () => {
		trackEvent({
			eventName: IEventName.BACK_BUTTON,
			eventData: {
				...commonParams,
				...scheduleSessionComponent,
				current_tab: selectedTab ?? "NA",
				entity_name: IEntityAction.NO_SLOT,
				section: isCalendarPage ? selectedView : "NA",
				course_name,
				course_type,
				course_category,
			},
		});
	};

	return {
		onNoSlot,
		onFabClick,
		onTabSwitch,
		onJoinClick,
		onSwitchCal,
		onSlotSelect,
		onClickClock,
		onFilterClick,
		onFilterApply,
		onDbtBtnClick,
		onClickFilter,
		onSlotConfirm,
		onSelectTimeZone,
		onSessionConfirm,
		onSearchTimeZone,
		onSessionPageLoad,
		onPlayRecordClick,
		onViewDetailClick,
		onViewSessionModal,
		onScheduleCtaClick,
		onCloseTimeZoneModal,
		onSwitchSessionClick,
		onChooseDateFromModal,
		onCalendarMonthChange,
		onChangeDateFromModal,
		onSessionMoreItemClick,
		onSwitchSessionConfirm,
		onChooseCourseDropClick,
		onViewMoreSessionDetail,
		onGoBackToCalendarModal,
		onClickEventFrmCalendar,
		onScheduleMonthContinue,
		onTimeZoneDropDownSelect,
		onChooseCourseFromDropDown,
		onScheduleSessionModalClose,
		onScheduleSessionModalVisible,
		onFilterClickFromCourseDetails,
	};
};
