import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import RecallquizController from "@screens/Tabs/Courses/Recallquiz/useRecallquizController";

import AssetbottomTab from "@components/quizs/common/AssetbottomTab";
import AssestName from "@components/quizs/common/Assetname";
import Assetquizheader from "@components/quizs/common/Assetquizheader";
import ContentModel from "@components/quizs/common/Contentmodel";
import CustomProgressBar from "@components/quizs/common/Customprogresspar";
import FeedbackModal from "@components/quizs/common/FeedbackModal";
import Questions from "@components/quizs/common/Questions";
import QuizanswerResponse from "@components/quizs/common/QuizanswerResponse";
import ReportErrors from "@components/quizs/common/ReportErrors";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";
import Skeleton from "@components/Skeleton/Skeleton";

import { verticalScale } from "@utils/functions";

import { LearningPathType, QuizAnswerStatus } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

import { quizStyles as styles } from "../AssessmentQuiz/quiz.styles";

interface IRecallQuizScreen {
	pageData?: {
		assetCode: string;
		attemptID: string;
		learningPathId: string;
		learningPathType: LearningPathType;
		parentAssetCode: string;
		previewModeKey: boolean | undefined;
	};
	closeModal?: (response?: string) => void;
}
const RecallQuizScreen = ({ pageData, closeModal }: IRecallQuizScreen) => {
	const isModelpopupOpen = pageData ? true : false;

	const {
		questionHandler,
		getattemptquizProgramLoader,
		getattemptquizProgramData,
		selectedAnswer,
		setselectedAnswer,
		assestModel,
		assestModelData,
		answerResponse,
		pollQuestionCount,
		questionIndex,
		assetCode,
		learningPathId,
		learningPathType,
		courseId,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		previewMode,
		loading,
		feedbackModal,
		setFeedbackModal,
		feedbackData,
		setFeedbackDataForSelectedOption,
		scrollEnabled,
		setScrollEnabled,
		buildPath,
	} = RecallquizController({
		pageData,
		isModelpopupOpen,
		closeModal,
	});

	const quizPageData = getattemptquizProgramData?.getRecallQuizAttempt;
	const quizName = quizPageData?.quiz?.name || "";
	const questions = quizPageData?.attemptQuiz?.questions || [];
	const isLastQuestion: boolean = questions?.length - 1 === questionIndex;

	const isIOS = Platform.OS === "ios";

	const currentQuestion: Record<string, any> =
		questions[questionIndex] || null;

	const questionType: string | null =
		currentQuestion?.questionInfo?.questionType?.toLowerCase();

	const RenderQuestionSkeleton = () => {
		return (
			<View style={styles.skeletonContainerView}>
				<Skeleton style={styles.questionsSkeleton} />
				<View
					style={{
						gap: verticalScale(10),
					}}
				>
					{new Array(4).fill(0).map((_, index) => (
						<Skeleton
							key={index}
							style={styles.optionsSkeleton}
							dark
						/>
					))}
				</View>
			</View>
		);
	};

	return (
		<ScreenWrapper style={styles.safeAreaView}>
			<KeyboardAvoidingView
				behavior={isIOS ? "padding" : "height"}
				style={{ flex: 1 }}
				keyboardVerticalOffset={isIOS ? -verticalScale(70) : 0}
			>
				{!isModelpopupOpen && (
					<>
						<Assetquizheader
							questionHandler={questionHandler}
							assetType={IAssetType.RECALL_QUIZ}
							isLastQuestion={isLastQuestion}
							previewMode={previewMode}
							loading={loading}
						/>
						<CustomProgressBar
							progress={questionIndex + 1}
							totalQuestion={questions?.length}
							progressBarStyle={styles.progressBarStyle}
							quizScreen
						/>
						<AssestName
							loader={getattemptquizProgramLoader}
							assestName={quizName}
							isOverviewHide={true}
							assestModel={assestModel}
						/>
					</>
				)}
				{loading ? (
					<RenderQuestionSkeleton />
				) : (
					<ScrollView
						style={styles.scrollContainer}
						automaticallyAdjustKeyboardInsets
						scrollEnabled={scrollEnabled}
					>
						<View style={{ flex: 1 }}>
							<Questions
								loader={getattemptquizProgramLoader}
								answerResponse={answerResponse}
								questionHandler={questionHandler}
								setScrollEnabled={setScrollEnabled}
								assestType={IAssetType.RECALL_QUIZ}
								assestModel={assestModel}
								currentQuestion={currentQuestion}
								setselectedAnswer={setselectedAnswer}
								selectedAnswer={selectedAnswer}
								pollQuestionCount={pollQuestionCount}
								feedbackModal={feedbackModal}
								setFeedbackModal={setFeedbackModal}
								setFeedbackDataForSelectedOption={
									setFeedbackDataForSelectedOption
								}
							/>
						</View>
						<ReportErrors
							assetName={quizName}
							currentQuestion={currentQuestion}
							assetCode={assetCode}
							courseId={courseId}
							moduleId={moduleId}
							sessionId={sessionId}
							segmentId={segmentId}
							learningPathType={learningPathType}
							learningPathId={learningPathId}
							learningPathName={learningPathName}
							buildPath={buildPath}
						/>

						{answerResponse &&
							questionType !== "poll" &&
							questionType !== "openresponse" &&
							[
								QuizAnswerStatus.CORRECT,
								QuizAnswerStatus.INCORRECT,
							].includes(answerResponse) && (
								<QuizanswerResponse
									currentQuestion={currentQuestion}
									answerResponse={answerResponse}
								/>
							)}
					</ScrollView>
				)}
				{Object.keys(assestModelData)?.length > 0 && (
					<ContentModel
						isVisible={true}
						onClose={assestModel}
						contentData={assestModelData}
					/>
				)}

				<FeedbackModal
					isVisible={feedbackModal}
					onClose={() => setFeedbackModal(false)}
					feedbackData={feedbackData}
				/>

				<AssetbottomTab
					questionType={questionType}
					loading={loading}
					isLastQuestion={isLastQuestion}
					previewMode={previewMode}
					currentQuestionID={currentQuestion?.questionId}
					selectedAnswer={selectedAnswer}
					questionHandler={questionHandler}
					answerResponse={answerResponse}
					assestType={IAssetType.RECALL_QUIZ}
					totalQuestions={questions?.length}
					questionIndex={questionIndex}
				/>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	);
};

export default RecallQuizScreen;
