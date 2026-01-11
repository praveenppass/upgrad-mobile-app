import React from "react";
import { StyleSheet, View } from "react-native";

import AssessmentComponent from "@components/asset/assessment/common/AssessmentComponent";
import PostSubmission from "@components/asset/assessment/postsubmission/Postsubmission";
import AssessmentController from "@components/asset/assessment/useAssessmentController";
import ViewOnDesktopModal from "@components/Reusable/ViewOnDesktopModal";

import { horizontalScale } from "@utils/functions";

import { IAssessment } from "@interface/assessment.interface";

const Assessment = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	ispostSubmission,
	assetType,
	assessmentCode,
}: IAssessment) => {
	const {
		assessmentData,
		assessmentProgramInfo,
		isProgram,
		submittedDate,
		pageData,
		assetShowModal,
		showUnderStandModal,
		setShowAssetModal,
		pageLoader,
		learningPathCode,
		getAssessmentBasicDetails,
		totalExtensionsAllowed,
		dueDateExtensionMode,
		comboCurriculumCode,
	} = AssessmentController({
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathId,
		learningPathType,
		assessmentCode,
	});

	const attemptId: string = pageData?.attempt?.code || null;
	return (
		<View style={styles.container}>
			{ispostSubmission ? (
				<PostSubmission
					attemptId={attemptId || ""}
					pageData={pageData}
					showUnderStandModal={showUnderStandModal}
					assetCode={assetCode}
					learningPathId={learningPathId}
					isProgram={isProgram}
					courseId={courseId}
					moduleId={moduleId}
					sessionId={sessionId}
					segmentId={segmentId}
				/>
			) : (
				<AssessmentComponent
					assessmentData={assessmentData}
					assessmentProgramInfo={assessmentProgramInfo}
					submittedDate={submittedDate}
					learningPathCode={learningPathCode}
					isProgram={isProgram}
					assetType={assetType}
					attemptId={attemptId}
					pageData={pageData}
					loader={pageLoader}
					sessionId={sessionId}
					learningPathType={learningPathType}
					showUnderStandModal={showUnderStandModal}
					refetch={getAssessmentBasicDetails}
					totalExtensionsAllowed={totalExtensionsAllowed}
					dueDateExtensionMode={dueDateExtensionMode}
					comboCurriculumCode={comboCurriculumCode}
				/>
			)}

			{assetShowModal ? (
				<ViewOnDesktopModal
					showModal={assetShowModal}
					setShowModal={setShowAssetModal}
				/>
			) : (
				<></>
			)}
		</View>
	);
};

export default Assessment;

const styles = StyleSheet.create({
	container: { paddingHorizontal: horizontalScale(20) },
});
