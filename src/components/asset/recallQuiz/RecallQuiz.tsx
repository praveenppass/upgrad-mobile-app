import React from "react";
import { ScrollView, View } from "react-native";

import { assessmentDetailsViewStyles as styles } from "@components/asset/assessment/common/assessmentDetails.syles";
import AssetFrame from "@components/asset/common/AssetFrame";
import AssetInstructions from "@components/asset/common/AssetInstructions";
import PostRecallScreen from "@components/asset/recallQuiz/recallQuizPostSubmission/PostRecallScreen";
import useRecallquizController from "@components/asset/recallQuiz/useRecallquizController";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import Skeleton from "@components/Skeleton/Skeleton";

import { AssestQuiz, IAssessment } from "@interface/assessment.interface";

import { strings } from "@assets/strings";

type IRecallQuizProps = IAssessment;

const RecallQuiz = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	assetType,
	isScreenModel,
	input,
	setAttemptId,
	setPreviewMode,
	attemptID,
	recallQuizCode,
}: IRecallQuizProps) => {
	const {
		pageLoader,
		getattemptquizProgramData,
		startQuiz,
		showPostRecallSubmissionScreen,
	} = useRecallquizController({
		assetCode,
		courseId,
		learningPathId,
		learningPathType,
		moduleId,
		segmentId,
		sessionId,
		isScreenModel,
		input,
		setAttemptId,
		setPreviewMode,
		recallQuizCode,
	});

	const pageData =
		getattemptquizProgramData?.getRecallQuizAttempt || undefined;
	const instruction: string = pageData?.quiz?.instruction;
	const noAttemptsLeft = pageData?.attemptQuiz?.attemptLeft === 0;
	const btnDisabled =
		noAttemptsLeft &&
		pageData?.attemptQuiz?.status === AssestQuiz.IN_PROGRESS;

	const btnTitle =
		pageData?.attemptQuiz?.status === AssestQuiz.IN_PROGRESS
			? strings.RESUME_QUIZ
			: noAttemptsLeft
				? strings.PREVIEW
				: strings.START_QUIZ;
	return (
		<View style={[styles.containerView, styles.containerRecall]}>
			{showPostRecallSubmissionScreen ? (
				<PostRecallScreen
					attemptID={attemptID ?? ""}
					recallQuizCode={recallQuizCode ?? ""}
					noAttemptsLeft={noAttemptsLeft}
				/>
			) : (
				<ScrollView
					style={styles.scrollview}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.frameView}>
						<AssetFrame
							assetType={assetType}
							assestData={pageData || undefined}
							style={styles.frameStyle}
							loader={pageLoader}
						/>
						{pageLoader ? (
							<Skeleton style={styles.customButtonSkelton} dark />
						) : (
							<CommonButton
								title={btnTitle}
								onPress={startQuiz}
								variant={IButtonVariant.Primary}
								isDisabled={btnDisabled}
							/>
						)}
					</View>

					<AssetInstructions
						html={instruction ?? ""}
						loading={pageLoader}
					/>
				</ScrollView>
			)}
		</View>
	);
};

export default RecallQuiz;
