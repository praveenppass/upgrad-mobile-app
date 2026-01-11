import moment from "moment-timezone";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
	ICertificateData,
	IStudyPlanBlocker,
} from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";
import {
	calculateProfileConfigList,
	checkIfLearningPathIsInStorage,
	setStoredLearningPaths,
} from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.utils";
import { useStudyPlanBlockerModel } from "@components/studyPlan/common/StudyPlanBlocker/useStudyPlanBlockerModel";

import { IUpdateOnboardingForProgramVariables } from "@graphql/mutation/microInteractions/updateOnboardingForProgram";
import { IUpdateUserProgramVariables } from "@graphql/mutation/studyPlan/updateUserProgram";

import { HOME_ROUTES, HOME_TAB_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { LearningPathType } from "@interface/app.interface";

const currentDate = moment();

const useStudyPlanController = ({
	learningPathCode,
	learningPathId,
	learningPathName,
	learningPathStartDate,
	learningPathType,
	profileBlockerData,
	surveyBlockerData,
	workshopId,
	workshopCode,
	refetchLearningPathData,
	isLearningPathUpgraded,
	certificatesData,
	shouldShowFirstAssetCompletionModal,
	shouldShowOnboardingModal,
	feedbackData,
}: IStudyPlanBlocker) => {
	const {
		updateBlockSurveyCompletion,
		updateUserProgramMutation,
		updateUserCourseMutation,
		profileEnrichHistoryData,
		updateUserMilestoneCertificateMutation,
		updateProgramOnboardingMutation,
		skipPendingFeedbackMutation,
	} = useStudyPlanBlockerModel();

	const [isSurveyBlockerVisible, setIsSurveyBlockerVisible] = useState(false);
	const [isProfileBlockerVisible, setIsProfileBlockerVisible] =
		useState(false);
	const [isProgramUpgradedModalVisible, setIsProgramUpgradedModalVisible] =
		useState(false);

	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [isCertificateModalVisible, setIsCertificateModalVisible] =
		useState(false);

	const [
		isFirstAssetCompletionModalVisible,
		setIsFirstAssetCompletionModalVisible,
	] = useState(false);

	const [isModuleFeedbackModalVisible, setIsModuleFeedbackModalVisible] =
		useState(false);

	const [isOnboardingModalVisible, setIsOnboardingModalVisible] =
		useState(false);

	const [notNotifiedCertificate, setNotNotifiedCertificate] =
		useState<ICertificateData | null>(null);

	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const navigation = useAppNavigation();

	const profileConfigList = useMemo(() => {
		if (!learningPathStartDate) return [];

		return calculateProfileConfigList({
			profileBlockerData: profileBlockerData ?? null,
			learningPathStartDate,
		});
	}, [profileBlockerData, learningPathStartDate]);

	const incompleteProfileConfigList = useMemo(
		() => profileConfigList.filter((config) => !config.isCompleted),
		[profileConfigList],
	);

	const isDeadlinePassed = useMemo(
		() =>
			incompleteProfileConfigList.some(
				(config) => config.isDeadlinePassed,
			),
		[incompleteProfileConfigList],
	);

	const filteredProfileConfigList = useMemo(() => {
		// If all sections are complete, return empty array (no blocker)
		if (incompleteProfileConfigList.length === 0) {
			return [];
		}

		const isLearningPathInStorage =
			checkIfLearningPathIsInStorage(learningPathId);

		// Use profileConfigList (includes both completed + incomplete sections)
		if (isLearningPathInStorage) {
			// If already seen, only show sections where deadline has passed
			// This includes both completed and incomplete sections
			return profileConfigList.filter(
				(config) => config.isDeadlinePassed,
			);
		}

		// If first time, show all sections (completed + incomplete)
		return profileConfigList;
	}, [incompleteProfileConfigList, profileConfigList, learningPathId]);

	useEffect(() => {
		if (shouldShowOnboardingModal) return setIsOnboardingModalVisible(true);

		if (shouldShowFirstAssetCompletionModal)
			return setIsFirstAssetCompletionModalVisible(true);

		const { deadlineDate } = surveyBlockerData || {};
		const isWithinDeadline = deadlineDate
			? moment(deadlineDate).isAfter(currentDate)
			: false;

		if (surveyBlockerData && isWithinDeadline)
			return setIsSurveyBlockerVisible(true);

		if (filteredProfileConfigList.length) {
			const isLearningPathInStorage =
				checkIfLearningPathIsInStorage(learningPathId);
			if (isDeadlinePassed) {
				if (!isLearningPathInStorage) {
					setStoredLearningPaths(learningPathId);
				}
				return setIsProfileBlockerVisible(true);
			}

			if (!isLearningPathInStorage) {
				setStoredLearningPaths(learningPathId);
				return setIsProfileBlockerVisible(true);
			}
		}

		if (feedbackData?.hasPendingFeedback)
			return setIsModuleFeedbackModalVisible(true);

		if (isLearningPathUpgraded) {
			handleUpdateUserProgram();
			return setIsProgramUpgradedModalVisible(true);
		}

		if (certificatesData?.length) {
			const notNotifiedCertificateCourses = certificatesData.filter(
				(certificate) => !certificate.isNotified,
			);

			const notNotifiedCertificateCoursesLength =
				notNotifiedCertificateCourses.length;

			const certificate = notNotifiedCertificateCoursesLength
				? notNotifiedCertificateCourses[
						notNotifiedCertificateCoursesLength - 1
					]
				: null;

			if (certificate) {
				setNotNotifiedCertificate(certificate);
				return setIsCertificateModalVisible(true);
			}
		}
	}, [
		surveyBlockerData,
		filteredProfileConfigList,
		isDeadlinePassed,
		learningPathId,
		isLearningPathUpgraded,
		certificatesData,
		feedbackData,
		shouldShowFirstAssetCompletionModal,
		shouldShowOnboardingModal,
		isLearningPathUpgraded,
	]);

	const handleSurveyBlockerSubmit = useCallback(async () => {
		await updateBlockSurveyCompletion({
			variables: {
				data: [
					{
						id: surveyBlockerData?.id ?? "",
						status: "completed",
					},
				],
				where: {
					program: learningPathCode,
					workshop: workshopId,
				},
			},
		});

		setIsSurveyBlockerVisible(false);
		setIsSuccessModalVisible(true);
	}, [
		updateBlockSurveyCompletion,
		surveyBlockerData,
		learningPathCode,
		workshopId,
	]);
	const handleSurveyBlockerClose = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const handleSuccessModalClose = useCallback(() => {
		setIsSuccessModalVisible(false);
		refetchLearningPathData?.();
	}, [refetchLearningPathData]);

	const hasProfileEnrichHistory =
		profileEnrichHistoryData?.profileEnrichHistory !== null;

	const handleNavigateToProfileSection = useCallback(() => {
		setIsProfileBlockerVisible(false);

		if (hasProfileEnrichHistory) {
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.ManualProfileFlow,
				params: {
					profileConfigList: filteredProfileConfigList,
					learningPathId,
					learningPathCode,
					learningPathName,
					workshopId,
					workshopCode,
					learningPathType,
				},
			});
		} else {
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.ProfileMethods,
				params: {
					profileConfigList: filteredProfileConfigList,
					learningPathId,
					learningPathCode,
					learningPathName,
					workshopId,
					workshopCode,
					learningPathType,
				},
			});
		}
	}, [
		navigation,
		profileEnrichHistoryData,
		filteredProfileConfigList,
		learningPathId,
		learningPathCode,
		learningPathName,
		workshopId,
		workshopCode,
		learningPathType,
	]);

	const handleProfileBlockerClose = useCallback(() => {
		if (isDeadlinePassed) {
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.MainTabs,
				params: {
					screen: HOME_TAB_ROUTES.MyPrograms,
				},
			});
		}
		setIsProfileBlockerVisible(false);
	}, [isDeadlinePassed, navigation]);

	const handleUpdateUserProgram = useCallback(async () => {
		const variables: IUpdateUserProgramVariables = {
			data: {
				isUpgraded: false,
			},
			where: {
				id: learningPathId,
			},
		};

		const updateUserMutation = isProgram
			? updateUserProgramMutation
			: updateUserCourseMutation;

		await updateUserMutation({
			variables,
		});
	}, [learningPathId]);

	const handleProgramUpgradedModalClose = useCallback(
		() => setIsProgramUpgradedModalVisible(false),
		[handleUpdateUserProgram],
	);

	const handleCertificateModalClose = useCallback(() => {
		updateUserMilestoneCertificateMutation({
			variables: {
				where: {
					userProgram: learningPathId,
					level1: notNotifiedCertificate?.courseCode ?? "",
				},
				data: { isNotified: true },
			},
		});
		setIsCertificateModalVisible(false);
		refetchLearningPathData?.();
	}, [notNotifiedCertificate, learningPathId]);

	const handleFirstAssetCompletionModalClose = useCallback(() => {
		const variables: IUpdateOnboardingForProgramVariables = {
			where: { id: learningPathId },
			data: { firstAssetNotificationViewedAt: new Date().toISOString() },
		};

		updateProgramOnboardingMutation({ variables });

		setIsFirstAssetCompletionModalVisible(false);
		refetchLearningPathData?.();
	}, [setIsFirstAssetCompletionModalVisible, refetchLearningPathData]);

	const handleOnboardingModalClose = useCallback(() => {
		const variables: IUpdateOnboardingForProgramVariables = {
			where: { id: learningPathId },
			data: { firstAccessedAt: new Date().toISOString() },
		};

		updateProgramOnboardingMutation({ variables });

		setIsOnboardingModalVisible(false);

		refetchLearningPathData?.();
	}, [setIsOnboardingModalVisible, refetchLearningPathData]);

	const handleModuleFeedbackModalClose = useCallback(() => {
		//
		skipPendingFeedbackMutation({
			variables: {
				where: { id: feedbackData?.feedbackId ?? "" },
			},
		});
		setIsModuleFeedbackModalVisible(false);
	}, [setIsModuleFeedbackModalVisible]);

	const specialProfileConfigList = useMemo(() => {
		return profileConfigList.filter((config) => !config.isCompleted);
	}, [profileConfigList]);

	return {
		isSurveyBlockerVisible,
		isProfileBlockerVisible,
		isSuccessModalVisible,
		isProgramUpgradedModalVisible,
		isFirstAssetCompletionModalVisible,
		isOnboardingModalVisible,
		isModuleFeedbackModalVisible,
		profileConfigList: specialProfileConfigList,

		handleSurveyBlockerSubmit,
		handleUpdateUserProgram,
		handleSurveyBlockerClose,
		handleSuccessModalClose,
		handleProgramUpgradedModalClose,
		handleFirstAssetCompletionModalClose,
		handleOnboardingModalClose,
		handleModuleFeedbackModalClose,

		handleNavigateToProfileSection,
		handleProfileBlockerClose,
		isCertificateModalVisible,
		notNotifiedCertificate,
		handleCertificateModalClose,
	};
};

export default useStudyPlanController;
