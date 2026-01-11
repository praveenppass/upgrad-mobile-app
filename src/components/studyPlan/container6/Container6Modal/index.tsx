import React from "react";
import { StyleSheet, View } from "react-native";

import CourseHeader from "@components/studyPlan/container6/Container6Modal/CourseHeader";
import ModuleList from "@components/studyPlan/container6/Container6Modal/ModuleList";
import ModuleNavigation from "@components/studyPlan/container6/Container6Modal/ModuleNavigation";
import useContainer6ModalController from "@components/studyPlan/container6/Container6Modal/useContainer6ModalController";

import { verticalScale } from "@utils/functions";

import { LearningPathType } from "@interface/app.interface";

export interface IContainer6Modal {
	learningPathId: string;
	userProgramOrCourseCode: string;
	learningPathName: string;
	learningPathType: LearningPathType;
	learningPathCode: string;
	elective: string;
	electiveGroup: string;
	track: string;
	trackGroup: string;
	closeModal: () => void;
	workshopId: string;
	assetCode: string;
	level2: string | null;
	level3: string | null;
	level4: string | null;
}

const Container6Modal = ({
	userProgramOrCourseCode,
	learningPathId,
	learningPathName,
	learningPathType,
	learningPathCode,
	elective,
	electiveGroup,
	track,
	trackGroup,
	closeModal,
	workshopId,
	assetCode,
	level2,
	level3,
	level4,
}: IContainer6Modal) => {
	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const {
		courseName,
		courseLabel,
		selectedModule,
		handlePreviousModule,
		handleNextModule,
		disabledNext,
		disabledPrevious,
		moduleCardList,
		onSessionPress,
		sessionList,
		container3SessionDataLoading,
		expandedSessionIndex,
		currentTopicIndex,
	} = useContainer6ModalController({
		userProgramOrCourseCode,
		learningPathId,
		isProgram,
		elective,
		electiveGroup,
		track,
		trackGroup,
		level2,
		level3,
		level4,
	});

	return (
		<View style={styles.modalContainer}>
			<CourseHeader label={courseLabel} title={courseName} />

			<ModuleNavigation
				selectedModule={selectedModule}
				onPreviousModule={handlePreviousModule}
				onNextModule={handleNextModule}
				disabledNext={disabledNext}
				disabledPrevious={disabledPrevious}
			/>

			<ModuleList
				moduleCardList={moduleCardList}
				learningPathName={learningPathName}
				learningPathId={learningPathId}
				learningPathType={learningPathType}
				learningPathCode={learningPathCode}
				onSessionPress={onSessionPress}
				sessionList={sessionList}
				container3SessionDataLoading={container3SessionDataLoading}
				closeModal={closeModal}
				workshopId={workshopId}
				assetCode={assetCode}
				expandedSessionIndex={expandedSessionIndex}
				currentTopicIndex={currentTopicIndex}
			/>
		</View>
	);
};

export default Container6Modal;

const styles = StyleSheet.create({
	modalContainer: {
		height: verticalScale(600),
	},
});
