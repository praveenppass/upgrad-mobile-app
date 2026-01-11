import React, { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";

import { buildStudyPlanUrl } from "@screens/Home/StudyPlan/common/studyPlan.utils";
import useContainer2Model from "@screens/Home/StudyPlan/Container2/useContainer2Model";

import BookMarkScreen from "@components/Courses/CourseDetails/Bookmark";
import NotesScreen from "@components/Courses/CourseDetails/Note";
import Session from "@components/Courses/CourseDetails/Session";
import DRBot from "@components/DoubtResolutionBot/DRBot";
import { ToastType, useToast } from "@components/Reusable/Toast";
import {
	IBottomTabItem,
	IBottomTabType,
	IBottomTabViewType,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import Certificates from "@components/studyPlan/common/Certificates";
import Container2Component from "@components/studyPlan/container2/Container2Component";

import downloadBase64File from "@services/downloadBase64File";

import { HOME_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

import { horizontalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { IFileTypeEnum } from "@interface/app.interface";

const MemoisedNotesScreen = memo(NotesScreen);
const MemoisedBookMarkScreen = memo(BookMarkScreen);
const MemoisedDRBot = memo(DRBot);

interface IDRBotComponent {
	onClose?: () => void;
}

const STRINGS = createStringConstants({
	DOWNLOADING: "common.file.downloading",
	DOWNLOAD_SUCCESS: "common.file.downloadSuccess",
	DOWNLOAD_FAILED: "common.file.downloadFailed",
});

const useContainer2WithTabsController = () => {
	const { getProgramScoreCard } = useContainer2Model();

	const { showToast } = useToast();

	// State Management

	const [activeTab, setActiveTab] = useState(IBottomTabType.CONTAINER2);

	// Hooks & Services

	const route = useAppRoute<typeof HOME_ROUTES.Container2Screen>();

	// Route Parameters

	const {
		learningPathId,
		learningPathType,
		learningPathName,
		workshopId,
		workshopCode,
		userProgramId,
		learningPathCode,
	} = route.params;

	const buildPath = useMemo(
		() => buildStudyPlanUrl({ learningPathId }),
		[learningPathId],
	);

	const PlannerComponent = useCallback(
		() => <Session courseId={learningPathId} />,
		[learningPathId],
	);

	const NotesComponent = useCallback(
		() => (
			<MemoisedNotesScreen
				learningPathType={learningPathType}
				learningPathId={learningPathId}
				learningPathName={learningPathName}
				workshopId={workshopId}
				workshopCode={workshopCode}
				userProgramId={userProgramId}
				learningPathCode={learningPathCode}
			/>
		),
		[
			learningPathType,
			learningPathId,
			learningPathName,
			workshopCode,
			userProgramId,
		],
	);

	const BookmarksComponent = useCallback(
		() => (
			<MemoisedBookMarkScreen
				learningPathType={learningPathType}
				learningPathId={learningPathId}
				learningPathName={learningPathName}
				workshopId={workshopId}
				workshopCode={workshopCode}
				userProgramId={userProgramId}
				learningPathCode={learningPathCode}
			/>
		),
		[
			learningPathType,
			learningPathId,
			learningPathName,
			workshopCode,
			userProgramId,
		],
	);

	const downloadProgramScoreCard = useCallback(async () => {
		if (!learningPathId) throw new Error();

		try {
			showToast({
				message: getString(STRINGS.DOWNLOADING),
				type: ToastType.INFO,
			});

			const { data } = await getProgramScoreCard({
				variables: {
					where: {
						userProgram: learningPathId,
						reportType: "original",
					},
				},
			});

			const file = data?.downloadScoreCardReportForUserProgram?.file;

			if (!file) throw new Error();

			downloadBase64File({
				base64File: file,
				fileName: `program_score_card_${learningPathId}`,
				fileExtension: IFileTypeEnum.PDF,
				successCallback: () =>
					showToast({
						message: getString(STRINGS.DOWNLOAD_SUCCESS),
						type: ToastType.SUCCESS,
					}),
				errorCallback: () =>
					showToast({
						message: getString(STRINGS.DOWNLOAD_FAILED),
						type: ToastType.ERROR,
					}),
			});
		} catch (error) {
			showToast({
				message: getString(STRINGS.DOWNLOAD_FAILED),
				type: ToastType.ERROR,
			});
		}
	}, [getProgramScoreCard, learningPathId]);

	const DRBotComponent = useCallback(
		({ onClose }: IDRBotComponent) => (
			<MemoisedDRBot
				onClose={() => onClose?.()}
				learningPathId={learningPathId}
				programName={learningPathName}
				workshopId={workshopId}
				programCode={learningPathCode}
				buildPath={buildPath}
				programId={userProgramId}
				workshopCode={workshopCode}
			/>
		),
		[
			learningPathId,
			learningPathName,
			workshopId,
			learningPathCode,
			userProgramId,
			workshopCode,
		],
	);

	const Container2 = useCallback(
		() => (
			<Container2Component
				learningPathType={learningPathType}
				learningPathName={learningPathName}
				learningPathId={learningPathId}
				workshopId={workshopId}
				workshopCode={workshopCode}
				learningPathCode={learningPathCode}
				userProgramId={userProgramId}
			/>
		),
		[
			learningPathType,
			learningPathName,
			learningPathId,
			workshopId,
			learningPathCode,
			workshopCode,
			userProgramId,
		],
	);

	const CertificateComponent = useCallback(
		() => (
			<Certificates
				learningPathId={learningPathId}
				learningPathType={learningPathType}
			/>
		),
		[learningPathId, learningPathType],
	);

	const tabs: IBottomTabItem[] = useMemo(
		() => [
			{
				type: IBottomTabViewType.COMPONENT,
				order: 1,
				id: IBottomTabType.CONTAINER2,
				Component: Container2,
			},
			{
				id: IBottomTabType.PLANNER,
				order: 2,
				type: IBottomTabViewType.COMPONENT,
				Component: PlannerComponent,
			},
			{
				id: IBottomTabType.CHATBOT,
				order: 3,
				type: IBottomTabViewType.MODAL,
				Component: DRBotComponent,
				modalProps: {
					style: styles.actionModal,
					disableCloseOnSwipeDown: true,
					hideTopIndicator: true,
				},
			},

			{
				id: IBottomTabType.NOTES,
				order: 4,
				type: IBottomTabViewType.COMPONENT,
				Component: NotesComponent,
			},
			{
				id: IBottomTabType.BOOKMARKS,
				order: 5,
				type: IBottomTabViewType.COMPONENT,
				Component: BookmarksComponent,
			},

			{
				id: IBottomTabType.SCORECARD,
				order: 6,
				type: IBottomTabViewType.PRESSABLE,
				onPress: downloadProgramScoreCard,
			},
			{
				id: IBottomTabType.CERTIFICATE,
				order: 7,
				type: IBottomTabViewType.COMPONENT,
				Component: CertificateComponent,
			},
		],
		[
			Container2,
			PlannerComponent,
			DRBotComponent,
			NotesComponent,
			BookmarksComponent,
		],
	);

	return {
		learningPathCode,
		activeTab,
		setActiveTab,
		tabs,
		learningPathId,
		learningPathName,
		workshopId,
		learningPathType,
	};
};

export default useContainer2WithTabsController;

const styles = StyleSheet.create({
	actionModal: {
		borderBottomLeftRadius: horizontalScale(16),
		borderBottomRightRadius: horizontalScale(16),
		marginHorizontal: horizontalScale(13),
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
