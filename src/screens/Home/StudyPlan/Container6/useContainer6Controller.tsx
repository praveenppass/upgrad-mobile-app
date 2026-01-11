import { isEqual } from "lodash";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { buildStudyPlanUrl } from "@screens/Home/StudyPlan/common/studyPlan.utils";
import useContainer6Model from "@screens/Home/StudyPlan/Container6/useContainer6Model";

import ReportAnIssueModal from "@components/asset/common/ReportAnIssueModal";
import DRBot from "@components/DoubtResolutionBot/DRBot";
import {
	IBottomTabItem,
	IBottomTabType,
	IBottomTabViewType,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import Container6Component from "@components/studyPlan/container6/Container6Component";
import Container6Modal from "@components/studyPlan/container6/Container6Modal";
import AssetNotes from "@components/studyPlan/container6/Container6Notes";

import { IGetCourseAssetBasicDetailsQuery } from "@graphql/query/asset/basicDetails/getCourseAssetBasicDetails";
import { IGetProgramAssetBasicDetailsQuery } from "@graphql/query/asset/basicDetails/getProgramAssetBasicDetails";

import useAssetLanguageSwitcher from "@hooks/useAssetLanguageSwitcher";

import { HOME_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

import { horizontalScale, verticalScale } from "@utils/functions";

import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";
import { IStatus } from "@interface/asset.interface";

interface IBottomTabComponent {
	onClose?: () => void;
}

const MemoisedAssetNotes = memo(AssetNotes);
const MemoisedDRBot = memo(DRBot);
const MemoisedReportAnIssueModal = memo(ReportAnIssueModal);

const useContainer6Controller = () => {
	const route = useAppRoute<typeof HOME_ROUTES.Container6Screen>();
	const [activeTab, setActiveTab] = useState<IBottomTabType | null>(null);

	const userId = useSelector((state: RootState) => state.user.user?.id);

	const {
		courseAssetLoading,
		courseAssetRefetch,

		getCourseAssetBasicDetails,
		getProgramAssetBasicDetails,
		programAssetLoading,
		programAssetRefetch,
	} = useContainer6Model();

	const {
		learningPathId,
		learningPathCode,
		learningPathType,
		assetCode,
		courseId,
		elective,
		electiveGroup,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		track,
		trackGroup,
		workshopId,
		ispostSubmission,
		assetType,
		attemptID,
		workshopCode,
		userProgramId,
	} = route.params;

	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const [programAssetBasicDetails, setProgramAssetBasicDetails] =
		useState<IGetProgramAssetBasicDetailsQuery | null>(null);

	const comboCurriculumCode = useMemo(() => {
		return programAssetBasicDetails?.userProgram?.comboCurriculum?.code;
	}, [programAssetBasicDetails]);

	const [courseAssetBasicDetails, setCourseAssetBasicDetails] =
		useState<IGetCourseAssetBasicDetailsQuery | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const assetBasicDetails = useMemo(
		() =>
			isProgram
				? programAssetBasicDetails?.getAssetFromUserProgram
				: courseAssetBasicDetails?.getAssetFromUserCourse,
		[isProgram, programAssetBasicDetails, courseAssetBasicDetails],
	);

	const assetTitle = useMemo(
		() =>
			isProgram
				? programAssetBasicDetails?.getAssetFromUserProgram
						?.aliasName ||
					programAssetBasicDetails?.getAssetFromUserProgram?.asset
						?.name
				: courseAssetBasicDetails?.getAssetFromUserCourse?.asset?.name,
		[isProgram, programAssetBasicDetails, courseAssetBasicDetails],
	);

	const surveyBlockerData = useMemo(
		() =>
			isProgram
				? programAssetBasicDetails?.blockerSurveyForUser || null
				: courseAssetBasicDetails?.blockerSurveyForUser || null,
		[isProgram, programAssetBasicDetails, courseAssetBasicDetails],
	);

	const profileBlockerData = useMemo(() => {
		const profileBlockerConfiguration = isProgram
			? programAssetBasicDetails?.userProfileConfiguration
			: courseAssetBasicDetails?.userProfileConfiguration;

		const profileSectionsCompletionStatus = isProgram
			? programAssetBasicDetails?.user.profileSectionCompletion
			: courseAssetBasicDetails?.user.profileSectionCompletion;

		const profileResponses = isProgram
			? programAssetBasicDetails?.userCourseProfileResponses
			: courseAssetBasicDetails?.userCourseProfileResponses;

		return {
			profileSectionsCompletionStatus:
				profileSectionsCompletionStatus || null,
			profileBlockerConfiguration: profileBlockerConfiguration || null,
			profileResponses: profileResponses || null,
		};
	}, [isProgram, programAssetBasicDetails, courseAssetBasicDetails]);

	const buildPath = useMemo(
		() =>
			buildStudyPlanUrl({
				...(courseId && { courseCode: courseId }),
				...(moduleId && { moduleCode: moduleId }),
				...(sessionId && { sessionCode: sessionId }),
				...(segmentId && { segmentCode: segmentId }),
				...(assetCode && { assetCode }),
				...(learningPathCode && { learningPathCode }),
				...(trackGroup && { trackGroupCode: trackGroup }),
				...(track && { trackCode: track }),
				...(electiveGroup && { electiveGroupCode: electiveGroup }),
				...(elective && { electiveCode: elective }),
				...(comboCurriculumCode && { comboCurriculumCode }),
			}),
		[
			courseId,
			moduleId,
			sessionId,
			segmentId,
			assetCode,
			learningPathCode,
			trackGroup,
			track,
			electiveGroup,
			elective,
			comboCurriculumCode,
		],
	);
	const shouldShowFirstAssetCompletionModal = useMemo(() => {
		const userProgram = programAssetBasicDetails?.userProgram;

		if (!userProgram) return false;

		const { firstAssetNotificationViewedAt, progressStatus } =
			userProgram ?? {};

		return (
			!firstAssetNotificationViewedAt &&
			progressStatus === IStatus.IN_PROGRESS
		);
	}, [programAssetBasicDetails?.userProgram]);

	const feedbackData = useMemo(() => {
		const pendingFeedback = programAssetBasicDetails?.pendingFeedback;

		if (!pendingFeedback) return null;

		return {
			hasPendingFeedback: true,
			feedbackId: pendingFeedback?.id,
		};
	}, [programAssetBasicDetails]);

	const getAssetBasicDetails = useCallback(async () => {
		setIsLoading(true);

		try {
			if (isProgram) {
				const { data } = await getProgramAssetBasicDetails({
					learningPathId,
					learningPathCode,
					workshopId,
					userId: userId ?? "",
					assetCode,
					courseId,
					moduleId,
					sessionId,
					segmentId,
				});
				if (data) {
					setProgramAssetBasicDetails(data);
				}

				setIsLoading(false);
			} else {
				const { data } = await getCourseAssetBasicDetails({
					learningPathId,
					learningPathCode,
					workshopId,
					userId: userId ?? "",
					assetCode,
					courseId,
					moduleId,
				});
				if (data) setCourseAssetBasicDetails(data);
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
		}
	}, [
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		isProgram,
		getProgramAssetBasicDetails,
		getCourseAssetBasicDetails,
		learningPathId,
		learningPathCode,
		workshopId,
		userId,
	]);

	useEffect(() => {
		getAssetBasicDetails();
	}, [getAssetBasicDetails]);

	const NotesModal = useCallback(
		({ onClose }: IBottomTabComponent) => (
			<MemoisedAssetNotes
				onClose={onClose}
				assetCode={assetCode}
				learningPathId={learningPathId}
				level1={courseId || null}
				level2={moduleId || null}
				level3={sessionId || null}
				level4={segmentId || null}
				isProgram={isProgram}
			/>
		),
		[
			assetCode,
			learningPathId,
			courseId,
			moduleId,
			sessionId,
			segmentId,
			isProgram,
		],
	);

	const ReportIssueModal = useCallback(
		({ onClose }: IBottomTabComponent) => (
			<MemoisedReportAnIssueModal
				assetCode={assetCode}
				assetName={assetTitle || ""}
				courseId={courseId || null}
				moduleId={moduleId || null}
				sessionId={sessionId || null}
				segmentId={segmentId || null}
				learningPathType={learningPathType}
				learningPathId={learningPathId}
				learningPathName={learningPathName}
				buildPath={buildPath}
				closeModal={() => onClose?.()}
			/>
		),
		[
			assetCode,
			assetTitle,
			courseId,
			moduleId,
			sessionId,
			segmentId,
			learningPathType,
			learningPathId,
			learningPathName,
			buildPath,
		],
	);

	const DRBotComponent = useCallback(
		({ onClose }: IBottomTabComponent) => (
			<MemoisedDRBot
				onClose={() => onClose?.()}
				learningPathId={learningPathId}
				programName={learningPathName}
				workshopId={workshopId}
				programCode={learningPathCode}
				programId={userProgramId}
				assetCode={assetCode}
				courseId={courseId || undefined}
				moduleId={moduleId || undefined}
				sessionId={sessionId || undefined}
				segmentId={segmentId || undefined}
				assetType={assetType}
				buildPath={buildPath}
				workshopCode={workshopCode}
			/>
		),
		[
			learningPathId,
			learningPathName,
			workshopId,
			learningPathCode,
			courseId,
			moduleId,
			sessionId,
			segmentId,
			assetType,
			buildPath,
			assetCode,
			workshopCode,
			userProgramId,
		],
	);

	const Container6ModalComponent = useCallback(
		({ onClose }: IBottomTabComponent) => (
			<Container6Modal
				learningPathId={learningPathId}
				userProgramOrCourseCode={courseId || ""}
				learningPathName={learningPathName}
				learningPathType={learningPathType}
				learningPathCode={learningPathCode}
				elective={elective}
				electiveGroup={electiveGroup}
				workshopId={workshopId}
				track={track}
				trackGroup={trackGroup}
				closeModal={() => onClose?.()}
				assetCode={assetCode}
				level2={moduleId}
				level3={sessionId}
				level4={segmentId}
			/>
		),
		[
			learningPathId,
			courseId,
			learningPathName,
			learningPathType,
			learningPathCode,
			elective,
			electiveGroup,
			track,
			trackGroup,
			assetCode,
			workshopId,
			courseId,
			moduleId,
			sessionId,
			segmentId,
		],
	);

	const tabs: IBottomTabItem[] = useMemo(
		() => [
			{
				id: IBottomTabType.CONTAINER6,
				order: 1,
				type: IBottomTabViewType.MODAL,
				Component: Container6ModalComponent,
				modalProps: {
					disableCloseOnSwipeDown: true,
					style: styles.modalContainer,
				},
			},
			{
				id: IBottomTabType.CHATBOT,
				order: 2,
				type: IBottomTabViewType.MODAL,
				Component: DRBotComponent,
				modalProps: {
					style: styles.actionModal,
					disableCloseOnSwipeDown: true,
					hideTopIndicator: true,
				},
			},
			{
				id: IBottomTabType.ADD_NOTE,
				order: 3,
				type: IBottomTabViewType.MODAL,
				Component: NotesModal,
				modalProps: {
					disableCloseOnSwipeDown: true,
					hideTopIndicator: false,
					style: { flexGrow: 1 },
				},
			},
			{
				id: IBottomTabType.REPORT,
				order: 4,
				type: IBottomTabViewType.MODAL,
				Component: ReportIssueModal,
				modalProps: {
					disableCloseOnSwipeDown: true,
					hideTopIndicator: true,
					style: { flexGrow: 1 },
				},
			},
		],
		[
			DRBotComponent,
			NotesModal,
			ReportIssueModal,
			Container6ModalComponent,
		],
	);

	const refetchAssetBasicDetails = useCallback(async () => {
		if (isProgram) {
			const { data } = await programAssetRefetch();

			setProgramAssetBasicDetails((prev) =>
				isEqual(prev, data) ? prev : data,
			);
		} else {
			const { data } = await courseAssetRefetch();

			setCourseAssetBasicDetails((prev) =>
				isEqual(prev, data) ? prev : data,
			);
		}
	}, [
		isProgram,
		programAssetRefetch,
		courseAssetRefetch,
		setProgramAssetBasicDetails,
		setCourseAssetBasicDetails,
	]);

	const loading = useMemo(
		() => courseAssetLoading || programAssetLoading || isLoading,
		[courseAssetLoading, programAssetLoading, isLoading],
	);

	const learningPathDetails = useMemo(
		() =>
			isProgram
				? programAssetBasicDetails?.userProgram
				: courseAssetBasicDetails?.userCourse,
		[isProgram, programAssetBasicDetails, courseAssetBasicDetails],
	);

	// Translation state and logic (only for programs)
	const translationData = useMemo(() => {
		if (!isProgram || !programAssetBasicDetails) {
			return null;
		}

		// Create original language object (English is the default content language)
		const originalLanguage = {
			id: "original",
			name: "English",
		};

		// Get translation languages from API
		const translationLanguages =
			programAssetBasicDetails.userProgram?.program?.languages ?? [];

		// Combine original + translations for the language selector
		const allLanguages = [originalLanguage, ...translationLanguages];

		// Get currently selected translation (null = original language)
		const currentTranslation =
			programAssetBasicDetails.userProgram?.translationLanguage;

		return {
			enableTranslation:
				programAssetBasicDetails.userProgram?.program
					?.enableTranslation ?? false,
			languages: allLanguages,
			translationLanguages: translationLanguages, // For API calls
			originalLanguage: originalLanguage,
			translationLanguage: currentTranslation ?? null,
		};
	}, [isProgram, programAssetBasicDetails]);

	// Default original language for when translation is disabled
	const defaultOriginalLanguage = { id: "original", name: "English" };

	// Language switcher (always called to satisfy React Hooks rules)
	// Will automatically return multilingualEnabled: false when not applicable
	const languageSwitcher = useAssetLanguageSwitcher({
		userProgramId: learningPathId,
		enableTranslation: translationData?.enableTranslation ?? false,
		languages: translationData?.languages ?? [defaultOriginalLanguage],
		originalLanguage:
			translationData?.originalLanguage ?? defaultOriginalLanguage,
		currentTranslationLanguage: translationData?.translationLanguage,
		onLanguageChanged: getAssetBasicDetails,
	});

	const Container6 = useCallback(
		() => (
			<Container6Component
				assetCode={assetCode}
				learningPathType={learningPathType}
				learningPathCode={learningPathCode}
				learningPathId={learningPathId}
				learningPathName={learningPathName}
				assetBasicDetails={assetBasicDetails || null}
				learningPathDetails={learningPathDetails || null}
				refetchAssetBasicDetails={refetchAssetBasicDetails}
				assetBasicDetailsLoading={loading}
				isPostSubmission={ispostSubmission || false}
				courseId={courseId || null}
				moduleId={moduleId || null}
				sessionId={sessionId || null}
				segmentId={segmentId || null}
				workshopId={workshopId}
				surveyBlockerData={surveyBlockerData}
				profileBlockerData={profileBlockerData}
				attemptID={attemptID ?? ""}
				workshopCode={workshopCode}
				userProgramId={userProgramId}
				shouldShowFirstAssetCompletionModal={
					shouldShowFirstAssetCompletionModal
				}
				feedbackData={feedbackData}
				translationData={translationData}
				languageSwitcher={languageSwitcher}
			/>
		),
		[
			assetCode,
			learningPathType,
			learningPathCode,
			learningPathId,
			learningPathName,
			assetBasicDetails,
			refetchAssetBasicDetails,
			learningPathDetails,
			loading,
			ispostSubmission,
			courseId,
			moduleId,
			sessionId,
			segmentId,
			workshopId,
			surveyBlockerData,
			profileBlockerData,
			attemptID,
			workshopCode,
			userProgramId,
			translationData,
			languageSwitcher,
			shouldShowFirstAssetCompletionModal,
			feedbackData,
		],
	);

	return {
		Container6,
		activeTab,
		setActiveTab,
		tabs,
		learningPathCode,
		learningPathId,
		assetCode,
		courseId,
		elective,
		electiveGroup,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		track,
		trackGroup,
		workshopId,
		assetType,
		learningPathType,
		// Translation exports
		translationData,
		languageSwitcher,
	};
};

export default useContainer6Controller;

const styles = StyleSheet.create({
	actionModal: {
		borderBottomLeftRadius: horizontalScale(16),
		borderBottomRightRadius: horizontalScale(16),
		marginHorizontal: horizontalScale(13),
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	modalContainer: {
		justifyContent: "space-between",
		paddingBottom: verticalScale(14),
		paddingHorizontal: horizontalScale(20),
		paddingTop: verticalScale(8),
	},
});
