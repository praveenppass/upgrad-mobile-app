import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { setBackButtonPressCallback } from "@components/BackBtn/BackButtonService";
import BookMarkScreen from "@components/Courses/CourseDetails/Bookmark";
import NotesScreen from "@components/Courses/CourseDetails/Note";
import StudyPlan from "@components/Courses/CourseDetails/StudyPlan";
import { FreeTrialIconSVG } from "@components/Modals/BottomSheetIcon";

import {
	updateCourseSectionDeadlineCancel,
	updateProgramSectionDeadlineCancel,
} from "@graphql/mutation/updateSessionCancelButton";

import { useAnalytics } from "@hooks/useAnalytics";
import useGetTimezone from "@hooks/useGetTimezone";

import { canOpenURL } from "@utils/functions";

import { client } from "@config/apollo";

import { modalSlice } from "@redux/slices/modal.slice";
import { studyPlanSlice } from "@redux/slices/studyplan.slice";
import { RootState } from "@redux/store/root.reducer";

import {
	ICourseAccessType,
	IHalfBottomSheetType,
} from "@interface/app.interface";
import {
	IComponentName,
	IEventName,
	IPageCategory,
	ISection,
} from "@interface/events.interface";
import { IUserProgramContainer } from "@interface/milestonetype.interface";

import { C } from "@assets/constants";
import { strings } from "@assets/strings";

import Session from "../../../../components/Courses/CourseDetails/Session";
import { useCourseDetailsModelLxp } from "./CourseDetailsModel";

interface IVariables {
	where: { id: string };
}

const {
	themes: { bg },
} = C;

export const useCourseDetailsController = () => {
	const {
		getData,
		coursesDetails,
		coursesDetailsLoading,
		userData,
		milestoneDetailsData,
		moduleLoading,
		courseID,
		courseVariant,
		isSpecialization,
	} = useCourseDetailsModelLxp();

	const navigation = useNavigation();

	const dispatch = useDispatch();
	const { trackEvent } = useAnalytics();
	const [activeTab, setActiveTab] = useState("StudyPlan");
	const [isDrawerOpend, setDrawerOpend] = useState(false);
	// remove this code after discussion
	const courseCategory = useSelector(
		(state: RootState) => state.studyPlan?.courseCategory,
	);
	const selectedMilestone = useSelector(
		(state: RootState) => state.studyPlan?.selectedMilestone,
	);
	// remove this code after discussion

	const variables: IVariables = {
		where: {
			id: courseID,
		},
	};

	const { name: userTimezone } = useGetTimezone();

	const courseDetailBanner =
		coursesDetails?.userProgram ?? coursesDetails?.userCourse;
	const courseDetail =
		coursesDetails?.userProgram?.courseInfo ??
		coursesDetails?.userProgram?.program ??
		coursesDetails?.userCourse?.course;

	const userProgramCode = coursesDetails?.userProgram?.program?.code;
	const userProgramIdForProgram = coursesDetails?.userProgram?.program?.id;
	const userProgramId = coursesDetails?.userProgram?.id;

	const programName = coursesDetails?.userProgram?.program?.name;
	const workshopId = coursesDetails?.userProgram?.workshop?.id;

	const currentDate = moment().tz(userTimezone);
	const ExpiredDate = moment(courseDetailBanner?.expiresAt).tz(userTimezone);

	const WebsiteUrl = courseDetailBanner?.course
		? courseDetailBanner?.course?.websiteUrl
		: courseDetailBanner?.program
			? courseDetailBanner?.program?.websiteUrl
			: strings.KH_URL;

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", async () => {
			await getData();
		});
		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		if (
			courseDetailBanner?.accessDays !== 0 &&
			courseDetailBanner?.expiresAt != null &&
			currentDate > ExpiredDate
		) {
			openFreeTrialSheet();
		}
	}, [courseDetailBanner]);

	const hardDeadlineDays =
		courseDetailBanner?.course?.hardDeadlineDays ||
		courseDetailBanner?.program?.hardDeadlineDays ||
		0;

	const dueDateExtensionMode =
		courseDetailBanner?.course?.dueDateExtensionMode ||
		courseDetailBanner?.program?.dueDateExtensionMode ||
		"";

	useEffect(() => {
		trackPageLoadAnalytics();
	}, []);

	useEffect(() => {
		if (coursesDetails) {
			dispatch(
				studyPlanSlice.actions.selectedCourseDetailsAction({
					selectedCourseDetails: coursesDetails,
				}),
			);
		}
	}, [coursesDetails]);

	const trackPageLoadAnalytics = () => {
		if (coursesDetails) {
			trackEvent({
				eventName: IEventName.PAGE_LOADED,
				eventData: {
					page_category: IPageCategory.COURSE_DETAILS,
					course_name: courseDetail?.name ?? "",
					course_type: courseDetailBanner?.variant,
					course_category: courseCategory,
				},
			});
		}
	};

	const closeModal = () => {
		dispatch(modalSlice.actions.hideModals());
		trackEvent({
			eventName: IEventName.ERROR_CLOSED,
			eventData: {
				page_category: IPageCategory.COURSE_DETAILS,
				course_name: courseDetail?.name ?? "",
				section: ISection.TRAIL_EXPIRED,
				component_name: IComponentName.CLOSE_BUTTON,
				label: strings.FREE_TRIAL_ERROR,
				entity_name: courseDetail?.name ?? "",
				course_type: courseDetailBanner?.variant,
				course_category: strings.TRAIL_EXPIRES,
			},
		});
	};

	const openFreeTrialSheet = () => {
		const bottomSheetOptions: IHalfBottomSheetType = {
			showBottomButton: true,
			buttonText: strings.BACK,
			onButtonPress: closeModal,
			icon: <FreeTrialIconSVG />,
			backGroundColor: bg.yellowBottomSheet,
			primaryButtonText: strings.UPGRADE_NOW,
			primaryButtonPress: upgradeFreeTrialBtnClicked,
			title:
				courseDetailBanner?.accessType === ICourseAccessType.TRIAL
					? strings.FREE_TRIAL
					: strings.TRIAL_END,
			subTitle:
				courseDetailBanner?.accessType === ICourseAccessType.TRIAL
					? strings.FREE_TRIAL_DESCRIPTION
					: strings.TRIAL_END_DESC,
		};
		dispatch(modalSlice.actions.showBottomSheet(bottomSheetOptions));
		trackEvent({
			eventName: IEventName.ERROR_CAPTURED,
			eventData: {
				page_category: IPageCategory.COURSE_DETAILS,
				course_name: courseDetail?.name ?? "",
				section: ISection.TRAIL_EXPIRED,
				label: strings.FREE_TRIAL,
				entity_name: courseDetail?.name,
				course_type: courseVariant,
				course_category: strings.TRAIL_EXPIRES,
			},
		});
	};

	const upgradeFreeTrialBtnClicked = () => {
		canOpenURL(WebsiteUrl ?? strings.KH_URL);
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				page_category: IPageCategory.COURSE_DETAILS,
				course_name: courseDetail?.name ?? "",
				section: ISection.TRAIL_EXPIRED,
				component_name: IComponentName.UPGRADE_NOW_BTN,
				label: strings.FREE_TRIAL,
				course_type: courseDetailBanner?.variant,
				course_category: strings.TRAIL_EXPIRES,
			},
		});
	};

	const pressactiveState = (type: string) => {
		if (type === "AssistiveDrawer") {
			setDrawerOpend(!isDrawerOpend);
			return false;
		}
		setActiveTab(type);
		setDrawerOpend(false);
	};

	const selectMileStone = (
		data: IUserProgramContainer | null,
		shouldTrackEvent = true,
	) => {
		dispatch(studyPlanSlice.actions.selectMilestone(data));
		dispatch(modalSlice.actions.hideModals());
		if (shouldTrackEvent) {
			trackEvent({
				eventName: IEventName.CTA_CLICK,
				eventData: {
					page_category: IPageCategory.COURSE_DETAILS,
					course_name: courseDetail?.name ?? "",
					section: ISection.COURSE_STUDY_PLAN,
					component_name: IComponentName.MILESTONE_LIST,
					label: selectedMilestone?.label,
					entity_name: selectedMilestone?.name,
					course_type: courseVariant,
					course_category: courseCategory,
				},
			});
		}
	};

	const componentRender = (type: string) => {
		switch (type) {
			case "StudyPlan":
				return (
					<StudyPlan
						userProgramCode={userProgramCode}
						userProgramId={userProgramId}
						userProgramIdForProgram={userProgramIdForProgram}
						programName={programName}
						workshopId={workshopId}
						hardDeadlineDays={hardDeadlineDays}
						dueDateExtensionMode={dueDateExtensionMode}
					/>
				);
			case "Session":
				return <Session courseId={courseID} />;
			case "NotesScreen":
				return <NotesScreen />;
			case "Bookmarks":
				return <BookMarkScreen />;
		}
	};

	// setBackButtonPressCallback(() =>
	// 	trackEvent({
	// 		eventName: IEventName.BACK_BUTTON,
	// 		eventData: {
	// 			page_category: IPageCategory.COURSE_DETAILS,
	// 			course_name: courseDetail?.name ?? "",
	// 			section: ISection.OS_BUILT_IN,
	// 		},
	// 	}),
	// );

	const [updateCourseSectionDeadlineCancelFunc] = useMutation(
		updateCourseSectionDeadlineCancel,
		{
			client,
			variables,
		},
	);
	const [updateProgramSectionDeadlineCancelFunc] = useMutation(
		updateProgramSectionDeadlineCancel,
		{
			client,
			variables,
		},
	);

	return {
		updateCourseSectionDeadlineCancelFunc,
		updateProgramSectionDeadlineCancelFunc,
		userData,
		milestoneDetailsData,
		selectMileStone,
		pressactiveState,
		componentRender,
		coursesDetailsLoading,
		activeTab,
		isDrawerOpend,
		courseDetail,
		coursesDetails,
		moduleLoading,
		isSpecialization,
	};
};

export default useCourseDetailsController;
