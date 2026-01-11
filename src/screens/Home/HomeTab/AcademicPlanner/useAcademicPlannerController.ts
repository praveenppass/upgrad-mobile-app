/**
 * Custom hook to manage the state and logic for the Academic Planner screen.
 *
 * ## Key Features:
 * - Automatically sets the view type to "List" when the screen is focused.
 * - Preserves the current filter, sort, date, and range selection settings on focus.
 * - Resets the page and reloads the starting entries from the beginning when the screen is focused.
 *
 * ## State Management:
 * - Handles filters, sorting, date ranges, and view types for events.
 * - Manages loading states and pagination for event data.
 * - Supports urgent events and learning courses data fetching.
 *
 * ## Usage:
 * This hook is designed to be used in the Academic Planner screen to provide
 * all necessary state and logic for rendering and interacting with the planner.
 */
import { useIsFocused } from "@react-navigation/native";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import extractEventCardData, {
	getSortOrderBasedOnType,
} from "@screens/Home/HomeTab/AcademicPlanner/academicPlanner.utils";
import useAcademicPlannerModel from "@screens/Home/HomeTab/AcademicPlanner/useAcademicPlannerModel";

import { IDateRangeShifterSetDates } from "@components/academicPlanner/common/EventDateSelector/DateRangeShifter";
import {
	ICustomDatesModalOnSubmit,
	IEventViewType,
	IRangeSelectionType,
} from "@components/academicPlanner/common/EventDateSelector/index.interface";
import {
	IEventFilterState,
	IEventFilterType,
} from "@components/academicPlanner/EventListView/common/EventSortFilter/index.interface";
import { ISortType } from "@components/Reusable/SortModal";

import useAppState from "@hooks/useAppState";
import useGetTimezone from "@hooks/useGetTimezone";
import useGetUserType from "@hooks/useGetUserType";

import { RootState } from "@redux/store/root.reducer";

import { IEventType } from "@interface/components/academicPlanner/events.interface";

const DEFAULT_LIMIT = 10;

const URGENT_EVENT_TYPES = [
	IEventType.CONTENT,
	IEventType.PROFILE,
	IEventType.MENTORSHIP,
];

const ALL_EVENT_TYPES = Object.values(IEventType);

const DEFAULT_FILTERS: IEventFilterState = {
	[IEventFilterType.PROGRAM]: [],
	[IEventFilterType.STATUS]: [],
	[IEventFilterType.TASK]: [],
};

interface IHandleGetUserEventsVariables {
	sortType?: ISortType;
	minDate?: string;
	maxDate?: string;
	viewType?: IEventViewType;
	filterState?: IEventFilterState;
	eventViewType?: IEventViewType;
}

const useAcademicPlannerController = () => {
	const id = useSelector((state: RootState) => state.user.user.id);

	const { name: userTimezone } = useGetTimezone();

	const {
		getUrgentUserEvents,
		urgentUserEventsData,
		getEvents,
		userEventsData,
		eventsLoading,
		urgentEventsLoading,
		getLearningCourses,
		userCourses,
		fetchMore,
	} = useAcademicPlannerModel();

	const isFocused = useIsFocused();

	const { hasLearnCourses } = useGetUserType();

	const [minDate, setMinDate] = useState(
		moment().tz(userTimezone).startOf("day").toISOString(),
	);
	const [maxDate, setMaxDate] = useState(
		moment().tz(userTimezone).endOf("day").toISOString(),
	);
	const [rangeSelectionType, setRangeSelectionType] = useState(
		IRangeSelectionType.Day,
	);

	const [filterState, setFilterState] =
		useState<IEventFilterState>(DEFAULT_FILTERS);
	const [sortType, setSortType] = useState<ISortType>(ISortType.Default);
	const [eventViewType, setEventViewType] = useState<IEventViewType>(
		IEventViewType.List,
	);
	const [calendarSelectedDate, setCalendarSelectedDate] = useState<string>(
		moment().tz(userTimezone).toISOString(),
	);
	const [showDateSelector, setShowDateSelector] = useState(false);
	const [showCustomDateSelector, setShowCustomDateSelector] = useState(false);

	const isEventViewTypeCalendar = eventViewType === IEventViewType.Calendar;

	const coursesList = userCourses?.learnerCourses?.result;
	const courseInfos = coursesList?.map((item) => ({
		type: item?.id,
		title: item?.courseInfo?.name,
	}));

	const loading = eventsLoading || urgentEventsLoading;

	const handleGetLearningCourses = () => {
		const variables = {
			sort: { updatedAt: "desc" },
			skip: 0,
		};
		getLearningCourses({ variables });
	};

	const handleRefetchEvents = () => {
		handleGetUserEvents();
		if (!isEventViewTypeCalendar) handleGetUserUrgentEvents();
	};

	useEffect(() => {
		if (!isFocused) return;

		if (isEventViewTypeCalendar) setEventViewType(IEventViewType.List);

		handleGetUserEvents({ eventViewType: IEventViewType.List });
		handleGetUserUrgentEvents();
		handleGetLearningCourses();
	}, [isFocused]);

	useEffect(() => {
		setMinDate(moment().tz(userTimezone).startOf("day").toISOString());
		setMaxDate(moment().tz(userTimezone).endOf("day").toISOString());
		setRangeSelectionType(IRangeSelectionType.Day);
	}, [userTimezone]);

	const handleForeground = () => {
		handleRefetchEvents;
	};
	useAppState({ handleForeground });

	const handleGetUserEvents = (variables?: IHandleGetUserEventsVariables) => {
		const filters = variables?.filterState || filterState;
		const eventType = variables?.eventViewType || eventViewType;

		const commonVariables = {
			sort: {
				endsAt: getSortOrderBasedOnType(
					variables?.sortType || sortType,
				),
			},
			where: {
				endsAt: {
					_gt: variables?.minDate || minDate,
					_lte: moment(variables?.maxDate || maxDate)
						.tz(userTimezone)
						.add(1, "seconds")
						.toISOString(),
				},
				user: id,
				viewType: variables?.eventViewType || eventViewType,
			},
		};

		const calendarViewVariables = {
			...commonVariables,
			where: {
				...commonVariables.where,
				type: {
					_in: ALL_EVENT_TYPES,
				},
			},
		};

		const listViewVariables = {
			...commonVariables,
			where: {
				...commonVariables.where,
				type: {
					_in: filters[IEventFilterType.TASK]?.length
						? filters[IEventFilterType.TASK]
						: ALL_EVENT_TYPES,
				},
				...(filters[IEventFilterType.STATUS]?.length && {
					status: { _in: filters[IEventFilterType.STATUS] },
				}),
			},
			limit: DEFAULT_LIMIT,
			skip: 0,
		};

		getEvents({
			variables:
				eventType === IEventViewType.List
					? listViewVariables
					: calendarViewVariables,
		});
	};

	const handleGetUserUrgentEvents = () => {
		const variables = {
			sort: { endsAt: "asc" },
			where: { user: id, type: { _in: URGENT_EVENT_TYPES } },
		};

		getUrgentUserEvents({ variables });
	};

	const eventCardData = extractEventCardData(
		userEventsData?.userEvents?.result || [],
	);

	const urgentEventCardData = extractEventCardData(
		urgentUserEventsData?.urgentUserEvents?.result || [],
	);

	const handleViewTypeChange = (type: IEventViewType) => {
		setEventViewType(type);

		const isEventTypeCalendar = type === IEventViewType.Calendar;

		if (isEventTypeCalendar) {
			setFilterState(DEFAULT_FILTERS);
			setSortType(ISortType.Default);

			if (rangeSelectionType === IRangeSelectionType.CustomDates) {
				setRangeSelectionType(IRangeSelectionType.Day);

				const minDateString = moment()
					.tz(userTimezone)
					.startOf("day")
					.toISOString();
				const maxDateString = moment()
					.tz(userTimezone)
					.endOf("day")
					.toISOString();

				setMinDate(minDateString);
				setMaxDate(maxDateString);

				handleGetUserEvents({
					eventViewType: type,
					minDate: minDateString,
					maxDate: maxDateString,
					filterState: DEFAULT_FILTERS,
					sortType: ISortType.Default,
				});
			} else {
				handleGetUserEvents({
					eventViewType: type,
					filterState: DEFAULT_FILTERS,
					sortType: ISortType.Default,
				});
			}
		} else {
			handleGetUserEvents({
				eventViewType: type,
			});

			handleGetUserUrgentEvents();
		}
	};

	const handleRangeSelectionChange = (rst: IRangeSelectionType) => {
		setShowDateSelector(false);

		if (rst === IRangeSelectionType.CustomDates)
			return setShowCustomDateSelector(true);

		const startDate = moment().tz(userTimezone).startOf("day");
		const endDate = moment().tz(userTimezone).endOf("day");

		setRangeSelectionType(rst);

		if (rst === IRangeSelectionType.Month) {
			startDate.startOf("month");
			endDate.endOf("month");
		} else if (rst === IRangeSelectionType.Week) {
			startDate.startOf("isoWeek");
			endDate.endOf("isoWeek");
		}

		const currentDate = moment().tz(userTimezone);

		const minDateString = startDate.toISOString();
		const maxDateString = endDate.toISOString();

		if (
			currentDate.isBetween(
				moment(startDate).tz(userTimezone),
				moment(endDate).tz(userTimezone),
				"day",
				`[]`,
			)
		)
			setCalendarSelectedDate(currentDate.toISOString());
		else setCalendarSelectedDate(minDateString);

		setMinDate(minDateString);
		setMaxDate(maxDateString);

		handleGetUserEvents({ minDate: minDateString, maxDate: maxDateString });
		handleGetUserUrgentEvents();
	};

	const handleCustomDatesSubmit = ({
		startDate,
		endDate,
	}: ICustomDatesModalOnSubmit) => {
		const start = moment(startDate)
			.tz(userTimezone)
			.startOf("day")
			.toISOString();
		const end = moment(endDate).tz(userTimezone).endOf("day").toISOString();

		setMinDate(start);
		setMaxDate(end);

		handleGetUserEvents({ minDate: start, maxDate: end });
		handleGetUserUrgentEvents();

		setRangeSelectionType(IRangeSelectionType.CustomDates);
		setShowCustomDateSelector(false);
	};

	const handleShiftDates = ({
		endDate,
		startDate,
	}: IDateRangeShifterSetDates) => {
		setMinDate(startDate);
		setMaxDate(endDate);

		handleGetUserEvents({ minDate: startDate, maxDate: endDate });
		handleGetUserUrgentEvents();

		const currentDate = moment().tz(userTimezone);

		if (currentDate.isBetween(startDate, endDate, "day", `[]`))
			setCalendarSelectedDate(currentDate.toISOString());
		else setCalendarSelectedDate(startDate);
	};

	const loadMore = () => {
		const totalCount = userEventsData?.userEvents.totalCount || 0;
		const hasMoreEvents = eventCardData.length < totalCount;

		if (!hasMoreEvents) return;

		fetchMore({
			variables: {
				skip: eventCardData.length,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return {
					userEvents: {
						...prev.userEvents,
						result: [
							...prev.userEvents.result,
							...fetchMoreResult.userEvents.result,
						],
					},
				};
			},
		});
	};

	const handleCalendarSelectedDateChange = (date: string) => {
		// this is for prev and next months dates
		setCalendarSelectedDate(date);

		if (
			rangeSelectionType === IRangeSelectionType.Month &&
			date &&
			!moment(date)
				.tz(userTimezone)
				.isBetween(minDate, maxDate, "day", "[]")
		) {
			const selectedDateMonthStartDate = moment(date)
				.tz(userTimezone)
				.startOf("month")
				.toISOString();
			const selectedDateMonthEndDate = moment(date)
				.tz(userTimezone)
				.endOf("month")
				.toISOString();

			setMinDate(selectedDateMonthStartDate);
			setMaxDate(selectedDateMonthEndDate);

			handleGetUserEvents({
				minDate: selectedDateMonthStartDate,
				maxDate: selectedDateMonthEndDate,
			});
		}
	};

	const handleSortTypeChange = (type: ISortType) => {
		setSortType(type);
		handleGetUserEvents({
			sortType: type,
		});
		handleGetUserUrgentEvents();
	};

	const handleFilterStateChange = async (filter: IEventFilterState) => {
		setFilterState(filter);
		handleGetUserEvents({
			filterState: filter,
		});
		handleGetUserUrgentEvents();
	};

	const isFilterApplied = !!Object.values(filterState).flat().length;
	const showUrgentEvents = !isFilterApplied;
	const showEmptyView =
		eventCardData.length === 0 &&
		(isFilterApplied || urgentEventCardData.length === 0);

	return {
		loading,
		minDate,
		maxDate,
		rangeSelectionType,
		filterState,
		handleFilterStateChange,
		handleSortTypeChange,
		sortType,
		eventViewType,
		handleViewTypeChange,
		isEventViewTypeCalendar,
		eventCardData,
		urgentEventCardData,
		loadMore,
		calendarSelectedDate,
		handleCalendarSelectedDateChange,
		showDateSelector,
		showCustomDateSelector,
		handleRangeSelectionChange,
		handleCustomDatesSubmit,
		handleShiftDates,
		setShowDateSelector,
		setShowCustomDateSelector,
		handleRefetchEvents,
		showEmptyView,
		showUrgentEvents,
		courseInfos,
		hasLearnCourses,
	};
};
export default useAcademicPlannerController;
