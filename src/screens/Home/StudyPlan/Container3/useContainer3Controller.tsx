import React, { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";

import { buildStudyPlanUrl } from "@screens/Home/StudyPlan/common/studyPlan.utils";

import BookMarkScreen from "@components/Courses/CourseDetails/Bookmark";
import NotesScreen from "@components/Courses/CourseDetails/Note";
import Session from "@components/Courses/CourseDetails/Session";
import DRBot from "@components/DoubtResolutionBot/DRBot";
import {
	IBottomTabItem,
	IBottomTabType,
	IBottomTabViewType,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import Certificates from "@components/studyPlan/common/Certificates";
import Container3Component from "@components/studyPlan/container3/Container3Component";

import { HOME_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

import { horizontalScale } from "@utils/functions";

interface IDRBotComponent {
	onClose?: () => void;
}

const MemoisedNotesScreen = memo(NotesScreen);
const MemoisedBookMarkScreen = memo(BookMarkScreen);
const MemoisedDRBot = memo(DRBot);

const useContainer3Controller = () => {
	const route = useAppRoute<typeof HOME_ROUTES.Container3Screen>();
	const [activeTab, setActiveTab] = useState(IBottomTabType.CONTAINER3);

	const {
		learningPathId,
		learningPathType,
		courseCode,
		trackGroupCode,
		trackCode,
		electiveCode,
		electiveGroupCode,
		learningPathName,
		learningPathCode,
		workshopId,
		workshopCode,
		userProgramId,
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

	const DRBotComponent = useCallback(
		({ onClose }: IDRBotComponent) => (
			<MemoisedDRBot
				onClose={() => onClose?.()}
				learningPathId={learningPathId}
				programName={learningPathName}
				workshopId={workshopId}
				workshopCode={workshopCode}
				programCode={learningPathCode}
				buildPath={buildPath}
				programId={userProgramId}
			/>
		),
		[
			learningPathId,
			learningPathName,
			workshopId,
			learningPathCode,
			workshopCode,
			userProgramId,
		],
	);

	const Container3 = useCallback(
		() => (
			<Container3Component
				learningPathType={learningPathType}
				learningPathId={learningPathId}
				learningPathName={learningPathName}
				courseCode={courseCode}
				trackGroupCode={trackGroupCode}
				trackCode={trackCode}
				electiveCode={electiveCode}
				electiveGroupCode={electiveGroupCode}
				learningPathCode={learningPathCode}
				workshopId={workshopId}
				workshopCode={workshopCode}
				userProgramId={userProgramId}
			/>
		),
		[
			learningPathType,
			learningPathId,
			learningPathName,
			courseCode,
			trackGroupCode,
			trackCode,
			electiveCode,
			electiveGroupCode,
			learningPathCode,
			workshopId,
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
				id: IBottomTabType.CONTAINER3,
				Component: Container3,
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
				id: IBottomTabType.CERTIFICATE,
				order: 6,
				type: IBottomTabViewType.COMPONENT,
				Component: CertificateComponent,
			},
		],
		[
			Container3,
			PlannerComponent,
			DRBotComponent,
			NotesComponent,
			BookmarksComponent,
			CertificateComponent,
		],
	);

	return {
		activeTab,
		setActiveTab,
		tabs,
		learningPathCode,
		learningPathId,
		courseCode,
		trackGroupCode,
		trackCode,
		electiveCode,
		electiveGroupCode,
		learningPathName,
		workshopId,
		learningPathType,
	};
};

export default useContainer3Controller;

const styles = StyleSheet.create({
	actionModal: {
		borderBottomLeftRadius: horizontalScale(16),
		borderBottomRightRadius: horizontalScale(16),
		marginHorizontal: horizontalScale(13),
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
});
