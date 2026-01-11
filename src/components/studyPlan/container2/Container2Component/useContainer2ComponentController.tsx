import { useFocusEffect } from "@react-navigation/native";
import moment from "moment-timezone";
import React, { useEffect } from "react";
import { useCallback, useMemo, useState } from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { useSelector } from "react-redux";

import { ICertificateData } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";
import {
	IContainer2Component,
	ICourseItem,
	IProductivityGPTData,
	ISelectionModalData,
} from "@components/studyPlan/container2/Container2Component/container2Component.interface";
import {
	calculateGPTAccessTimeLeft,
	fetchGptAccessData,
	getTrackAndElectiveSelectionModalData,
	mapCourseContainers,
	mapProgramContainers,
} from "@components/studyPlan/container2/Container2Component/container2Component.utils";
import useContainer2ComponentModel from "@components/studyPlan/container2/Container2Component/useContainer2ComponentModel";
import Container2ListHeader from "@components/studyPlan/container2/Container2ListHeader";
import CourseCard from "@components/studyPlan/container2/CourseCard";
import {
	IBannerType,
	INotificationCard,
} from "@components/studyPlan/container2/NotificationCard";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { convertSecondsToHours, horizontalScale } from "@utils/functions";

import { ENV } from "@config/env";

import { RootState } from "@redux/store/root.reducer";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { LearningPathType } from "@interface/app.interface";

import { colors } from "@assets/colors";

const { state, bg } = colors;

// Constants
const STRINGS = createStringConstants({
	PRODUCTIVITY_GPT: "studyPlan.container2.notificationCard.productivityGpt",
	PRODUCTIVITY_GPT_DESCRIPTION:
		"studyPlan.container2.notificationCard.productivityGptDesktopMessage",
	UPCOMING_SPECIALIZATIONS:
		"studyPlan.container2.notificationCard.upcomingSpecializations",
	SPECIALIZATION_DESCRIPTION:
		"studyPlan.container2.notificationCard.specializationDesktopLoginMessage",
});

/** Auto-scroll interval for carousel in milliseconds */
const AUTOSCROLL_INTERVAL = 5000;

const IN_APP_BROWSER_OPTIONS = {
	dismissButtonStyle: "close" as const,
	preferredControlTintColor: colors.neutral.black,
	showTitle: true,
	hasBackButton: true,
};

/**
 * Custom hook for modal visibility management
 */
const useModal = () => {
	const [visible, setVisible] = useState(false);
	const toggle = useCallback(() => setVisible((v) => !v), []);
	return [visible, toggle] as const;
};

/**
 * Container2 controller hook
 */

const useContainer2ComponentController = ({
	workshopId,
	workshopCode,
	userProgramId,
	learningPathId,
	learningPathType,
	learningPathName,
	learningPathCode,
}: IContainer2Component) => {
	// Navigation
	const navigation = useAppNavigation();

	const { id: userId } = useSelector((s: RootState) => s.user.user);
	const { access_token, refresh_token } = useSelector(
		(s: RootState) => s.user?.token,
	);

	const [productivityGPTData, setProductivityGPTData] =
		useState<IProductivityGPTData | null>(null);

	const [productivityGPTDataLoading, setProductivityGPTDataLoading] =
		useState(false);

	const fetchProductivityGPTData = useCallback(async () => {
		setProductivityGPTDataLoading(true);
		const gptAccessData = await fetchGptAccessData({
			learningPathId,
			userId,
		});
		setProductivityGPTData(gptAccessData);
		setProductivityGPTDataLoading(false);
	}, [learningPathId]);

	const {
		getProgramListData,
		programListData,
		programListDataLoading,
		getCourseListData,
		courseListData,
		courseListDataLoading,
		refetchProgramListData,
		refetchCourseListData,
		updateUserMilestoneCertificate,
	} = useContainer2ComponentModel();

	const [isSpecializationModalVisible, toggleSpecializationModal] =
		useModal();
	const [isViewOnDesktopModalVisible, toggleViewOnDesktopModal] = useModal();

	const [viewModalData, setViewModalData] =
		useState<ISelectionModalData | null>(null);

	// Derived State

	const isProgram = learningPathType === LearningPathType.PROGRAM;
	const loading =
		programListDataLoading ||
		courseListDataLoading ||
		productivityGPTDataLoading;

	// Data Selectors

	const programOrCourseData = isProgram
		? programListData?.userProgram
		: courseListData?.userCourse;

	const baseProgramOrCourseData = isProgram
		? programListData?.userProgram.program
		: courseListData?.userCourse.course;

	const userProgramData = programListData?.userProgram;

	// Extracted program data with defaults
	const {
		program,
		specializationsPurchasedCount = 0,
		totalExtensionsTaken = 0,
		isSpecialization = false,
		relatedUserPrograms = [],
		registeredAt = "",
		comboCurriculum,
	} = userProgramData || {};

	const { enableProductivityGPT = false, enableComboCurriculum = false } =
		program || {};

	useEffect(() => {
		if (!enableProductivityGPT) return;
		fetchProductivityGPTData();
	}, [enableProductivityGPT]);

	const totalExtensionsAllowed = useMemo(() => {
		if (enableComboCurriculum && comboCurriculum) {
			return comboCurriculum.totalExtensionsAllowed;
		}
		return program?.totalExtensionsAllowed;
	}, [enableComboCurriculum, comboCurriculum, program]);

	// Computed Values

	const learningPathStartDate = programOrCourseData?.workshop?.startsAt || "";

	const computedSpecializationCount =
		specializationsPurchasedCount - (relatedUserPrograms.length - 1);

	const specializationCount = specializationsPurchasedCount
		? computedSpecializationCount
		: 0;

	// Data Fetching

	useFocusEffect(
		useCallback(() => {
			if (!userId) return;

			const params = {
				learningPathId,
				learningPathCode,
				workshopId,
				userId,
			};

			if (isProgram) getProgramListData(params);
			else getCourseListData(params);
		}, [userId]),
	);

	const isLearningPathUpgraded = programOrCourseData?.isUpgraded || false;

	const description = baseProgramOrCourseData?.description || "";
	const totalLearningDuration = convertSecondsToHours({
		seconds: programOrCourseData?.totalLearningDuration || 0,
		isRoundedOffToTens: true,
	});
	const progress = Math.round(programOrCourseData?.progress || 0);
	const firstAccessedAt = programOrCourseData?.firstAccessedAt || "";

	// Processed course/program list
	const courseList = useMemo(
		() =>
			isProgram
				? mapProgramContainers(
						programListData?.userProgramContainers || [],
					)
				: mapCourseContainers(
						courseListData?.userCourseContainers || [],
					),
		[
			isProgram,
			programListData?.userProgramContainers,
			courseListData?.userCourseContainers,
		],
	);

	const surveyBlockerData = isProgram
		? programListData?.blockerSurveyForUser || null
		: courseListData?.blockerSurveyForUser || null;

	const profileBlockerConfiguration = isProgram
		? programListData?.userProfileConfiguration
		: courseListData?.userProfileConfiguration;

	const profileSectionsCompletionStatus = isProgram
		? programListData?.user.profileSectionCompletion
		: courseListData?.user.profileSectionCompletion;

	const profileResponses = isProgram
		? programListData?.userCourseProfileResponses
		: courseListData?.userCourseProfileResponses;

	const profileBlockerData = useMemo(() => {
		return {
			profileSectionsCompletionStatus:
				profileSectionsCompletionStatus || null,
			profileBlockerConfiguration: profileBlockerConfiguration || null,
			profileResponses: profileResponses || null,
		};
	}, [
		profileSectionsCompletionStatus,
		profileBlockerConfiguration,
		profileResponses,
	]);

	const refetchLearningPathData = useCallback(() => {
		if (isProgram) refetchProgramListData();
		else refetchCourseListData();
	}, [isProgram, refetchProgramListData, refetchCourseListData]);

	const isLearningPathStarted = useMemo(() => {
		if (!learningPathStartDate) return false;

		const start = moment(learningPathStartDate);
		const today = moment();

		return start.isSameOrBefore(today);
	}, [learningPathStartDate]);

	const showOnboardingModal = useMemo(() => {
		if (!programOrCourseData || !isProgram) return false;

		return !firstAccessedAt && !progress && isLearningPathStarted;
	}, [
		firstAccessedAt,
		progress,
		programOrCourseData,
		isProgram,
		isLearningPathStarted,
	]);

	// URL for productivity GPT
	const gptUrl = useMemo(() => {
		const url = new URL(`${ENV.productivityGPTUrl}/${learningPathId}`);
		url.searchParams.append("token", access_token);
		url.searchParams.append("refreshToken", refresh_token);
		return url.toString();
	}, [learningPathId, access_token, refresh_token]);

	// Event handlers
	const handleGPTBannerPress = useCallback(async () => {
		const isInAppBrowserAvailable = await InAppBrowser.isAvailable();

		if (!gptUrl || !isInAppBrowserAvailable) return;

		await InAppBrowser.open(gptUrl, IN_APP_BROWSER_OPTIONS);
	}, [gptUrl]);

	const { accessText, isExpired } = calculateGPTAccessTimeLeft({
		registeredAt,
	});

	const carouselData: INotificationCard[] = useMemo(() => {
		const { message, is_expired, limit_reached } =
			productivityGPTData || {};
		return [
			...(enableProductivityGPT
				? [
						{
							cardType: IBannerType.PRODUCTIVITY_GPT,
							titleText: getString(STRINGS.PRODUCTIVITY_GPT),
							onBannerPress: handleGPTBannerPress,
							secondaryText: message,
							disabled: is_expired || limit_reached,
							secondaryTextStyle: is_expired
								? styles.expiredAccessMessage
								: undefined,
							testID: "container2_notification_card_productivity_gpt",
							cardBGColor: bg.fill.in_progress,
						},
					]
				: []),

			...(specializationCount
				? [
						{
							cardType: IBannerType.SPECIALIZATION,
							titleText: `${specializationCount} ${getString(STRINGS.UPCOMING_SPECIALIZATIONS)}. `,
							onBannerPress: toggleSpecializationModal,
							descriptionText: `${getString(
								STRINGS.SPECIALIZATION_DESCRIPTION,
							)}.`,
							testID: "container2_notification_card_specialization",
							cardBGColor: bg.fill.expired,
						},
					]
				: []),
		];
	}, [
		enableProductivityGPT,
		handleGPTBannerPress,
		accessText,
		isExpired,
		specializationCount,
		toggleSpecializationModal,
		productivityGPTData,
	]);

	const handleCourseCardPress = ({
		courseCode,
		isTrackGroup,
		isElectiveGroup,
		trackCode,
		electiveCode,
		trackGroupCode,
		electiveGroupCode,
		electiveAvailableTill,
		trackSelectionFrom,
		electiveSelectionFrom,
		trackAvailableTill,
	}: ICourseItem) => {
		if (isTrackGroup || isElectiveGroup) {
			const modalData = getTrackAndElectiveSelectionModalData({
				isTrackGroup: isTrackGroup || false,
				isElectiveGroup: isElectiveGroup || false,
				trackSelectionFrom,
				trackAvailableTill,
				electiveSelectionFrom,
				electiveAvailableTill,
			});

			setViewModalData(modalData);

			return toggleViewOnDesktopModal();
		}

		navigation.navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.Container3Screen,
			params: {
				learningPathId,
				learningPathType,
				learningPathCode,
				learningPathName,
				courseCode,
				trackCode,
				electiveCode,
				trackGroupCode,
				electiveGroupCode,
				workshopId,
				workshopCode,
				userProgramId,
			},
		});
	};

	const handleUpdateUserMilestoneCertificate = useCallback(
		(item: ICourseItem) => {
			updateUserMilestoneCertificate({
				variables: {
					where: {
						userProgram: learningPathId,
						level1: item.courseCode,
					},
					data: {
						isNotified: true,
					},
				},
			});
		},
		[updateUserMilestoneCertificate, learningPathId],
	);

	const handleRenderCourseItem: ListRenderItem<ICourseItem> = useCallback(
		({ item, index }) => {
			return (
				<CourseCard
					{...item}
					index={index ?? 0}
					isProgram={isProgram}
					onCourseCardPress={() => handleCourseCardPress(item)}
					onShareAchievementPress={() =>
						handleUpdateUserMilestoneCertificate(item)
					}
					style={styles.courseCard}
				/>
			);
		},
		[isProgram, handleCourseCardPress],
	);

	const handleRenderListHeader = useCallback(
		() => (
			<Container2ListHeader
				carouselData={carouselData}
				description={description}
				learningPathName={learningPathName}
				totalExtensionsTaken={totalExtensionsTaken || 0}
				totalExtensionsAllowed={totalExtensionsAllowed || 0}
				totalLearningDuration={totalLearningDuration}
				progress={progress}
				isProgram={isProgram}
				isSpecialization={isSpecialization}
				autoScrollInterval={AUTOSCROLL_INTERVAL}
			/>
		),
		[
			carouselData,
			description,
			learningPathName,
			totalExtensionsTaken,
			totalExtensionsAllowed || 0,
			totalLearningDuration,
			progress,
			isProgram,
			isSpecialization,
			AUTOSCROLL_INTERVAL,
		],
	);

	const viewOnDesktopModalDescription = useMemo(() => {
		return `${viewModalData?.description}
		 ${viewModalData?.title}`;
	}, [viewModalData]);

	const certificates: ICertificateData[] = useMemo(
		() =>
			courseList
				.map((course) => {
					if (!course.certificate) return null;
					return {
						...course.certificate,
						courseName: course.name,
						courseCode: course.courseCode,
					};
				})
				.filter((c) => c !== null),
		[courseList],
	);

	return {
		isSpecializationModalVisible,
		toggleSpecializationModal,
		isViewOnDesktopModalVisible,
		toggleViewOnDesktopModal,
		handleRenderCourseItem,
		handleRenderListHeader,
		loading,
		courseList,
		specializationCount,
		learningPathStartDate,
		surveyBlockerData,
		profileBlockerData,
		refetchLearningPathData,
		isLearningPathUpgraded,
		viewOnDesktopModalDescription,
		certificates,
		showOnboardingModal,
	};
};

export default useContainer2ComponentController;

const styles = StyleSheet.create({
	courseCard: {
		marginHorizontal: horizontalScale(24),
	},
	expiredAccessMessage: {
		color: state.error_red,
	},
});
