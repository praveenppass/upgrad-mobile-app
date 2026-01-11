import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ReportAnIssueModal from "@components/asset/common/ReportAnIssueModal";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { moderateScale, removeHtmlTags } from "@utils/functions";

import { LearningPathType } from "@interface/app.interface";

import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { sm } = commonStyles.text;

interface IReportErrors {
	currentQuestion: Record<string, any>;
	assetCode: string;
	assetName: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
	learningPathName: string;
	buildPath: string;
}
// this is a small component so no need to create controller for this.
const ReportErrors = ({
	currentQuestion,
	assetCode,
	courseId,
	learningPathId,
	learningPathName,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	assetName,
	buildPath,
}: IReportErrors) => {
	const [isReportModalVisible, toggleReportModal] = useState<boolean>(false);

	// Close the report modal
	const closeReportModal = () => {
		toggleReportModal(false);
	};

	// Extract the question and sanitize it
	const questionTitle =
		removeHtmlTags(currentQuestion?.questionInfo?.question) || "";

	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => toggleReportModal(true)}
					accessible={true}
					accessibilityLabel={strings.REPORT}
				>
					<RNText style={styles.textLink} title={strings.REPORT} />
				</TouchableOpacity>
			</View>
			<ActionModal
				isOpen={isReportModalVisible}
				closeModal={closeReportModal}
			>
				<ReportAnIssueModal
					isQuiz
					quizQuestionId={currentQuestion?.questionInfo?.qId || 0}
					quizQuestionName={questionTitle}
					assetCode={assetCode}
					assetName={assetName}
					courseId={courseId}
					moduleId={moduleId}
					sessionId={sessionId}
					segmentId={segmentId}
					learningPathType={learningPathType}
					learningPathId={learningPathId}
					learningPathName={learningPathName}
					buildPath={buildPath}
					closeModal={closeReportModal}
				/>
			</ActionModal>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "flex-end",
		paddingBottom: moderateScale(20),
		paddingHorizontal: moderateScale(20),
	},
	textLink: {
		color: "#607290", // Not added in Poilet
		textDecorationLine: "underline",
		...sm,
	},
});

export default React.memo(ReportErrors);
