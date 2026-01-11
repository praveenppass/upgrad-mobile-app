import React from "react";
import { ScrollView, View } from "react-native";

import QuestionOverviewModal from "@screens/Tabs/Courses/AssessmentQuiz/QuestionOverviewModal";
import SkipModal from "@screens/Tabs/Courses/AssessmentQuiz/SkipModal";
import SubmitModal from "@screens/Tabs/Courses/AssessmentQuiz/SubmitModal";
import TimesUpModal from "@screens/Tabs/Courses/AssessmentQuiz/TimesUpModal";
import QuizController from "@screens/Tabs/Courses/AssessmentQuiz/useQuizScreenController";

import AssetbottomTab from "@components/quizs/common/AssetbottomTab";
import AssestName from "@components/quizs/common/Assetname";
import Assetquizheader from "@components/quizs/common/Assetquizheader";
import ContentModel from "@components/quizs/common/Contentmodel";
import CustomProgressBar from "@components/quizs/common/Customprogresspar";
import Questions from "@components/quizs/common/Questions";
import ReportErrors from "@components/quizs/common/ReportErrors";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";
import Skeleton from "@components/Skeleton/Skeleton";

import { verticalScale } from "@utils/functions";

import { AssetModulepopup } from "@interface/assessment.interface";
import { IAssetType } from "@interface/asset.interface";

import { quizStyles as styles } from "../AssessmentQuiz/quiz.styles";

const RecallQuizScreen = () => {
	const {
		assessmentPagedata,
		questionActiveIndex,
		assestModelData,
		selectedAnswer,
		bookMakerArray,
		assesmentModalData,
		questionHandler,
		assestModel,
		setselectedAnswer,
		handleBookmarks,
		openAssessmentModalData,
		newAssessmentTimer,
		questionTimer,
		setquestionAtiveIndex,
		assetCode,
		learningPathId,
		learningPathType,
		courseId,
		learningPathName,
		moduleId,
		segmentId,
		sessionId,
		loading,
		scrollEnabled,
		setScrollEnabled,
		buildPath,
		slowNetworkLoader,
	} = QuizController();

	const questions = assessmentPagedata?.quizQuestions || [];
	const assessmentAttemptId = assessmentPagedata?.attemptID;
	const assessmentName = assessmentPagedata?.pageResponse?.assessment?.name;
	const assessmentExpiresAt =
		assessmentPagedata?.pageResponse?.attempt?.expiredAt;
	const isMoveOnlyForwardEnabled =
		assessmentPagedata?.enableMoveOnlyForward || false;
	const currentQuestion: Record<string, any> =
		questions[questionActiveIndex] || null;
	const isLastQuestion: boolean =
		questions?.length - 1 === questionActiveIndex;

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

	const renderpopupComponent = (type: string) => {
		switch (type) {
			case AssetModulepopup.ASSET_OVERVIEW:
				return (
					<QuestionOverviewModal
						selectedAnswer={selectedAnswer}
						setquestionAtiveIndex={setquestionAtiveIndex}
						questionActiveIndex={questionActiveIndex}
						questions={assesmentModalData?.questions}
						bookMakerArray={assesmentModalData?.bookmarkArray}
						onClose={openAssessmentModalData}
					/>
				);
			case AssetModulepopup?.ASSET_TIMER_COMPLETED:
				return <TimesUpModal questionHandler={questionHandler} />;
			case AssetModulepopup.ASSET_FINSH:
				return (
					<SubmitModal
						selectedAnswer={selectedAnswer}
						onClose={openAssessmentModalData}
						questionHandler={questionHandler}
						questions={assesmentModalData?.questions}
						enableAssessmentLevelTimer={
							assessmentPagedata?.enableAssessmentLevelTimer
						}
						assessmentExpiresAt={assessmentExpiresAt}
						isMoveOnlyForwardEnabled={isMoveOnlyForwardEnabled}
					/>
				);
			case AssetModulepopup.ASSET_SKIP:
				return (
					<SkipModal
						isOpen={true}
						questionHandler={questionHandler}
						onClose={openAssessmentModalData}
						assessmentAttemptId={assessmentAttemptId}
					/>
				);
		}
	};
	const questionType: string | null =
		currentQuestion?.questionInfo?.questionType?.toLowerCase();

	return (
		<ScreenWrapper style={styles.safeAreaView}>
			<Assetquizheader
				questionHandler={questionHandler}
				assetType={IAssetType.ASSESSMENT}
				assessmentTimer={newAssessmentTimer}
				isLastQuestion={isLastQuestion}
				loading={loading}
				slowNetworkLoader={slowNetworkLoader}
			/>
			<CustomProgressBar
				progress={questionActiveIndex + 1}
				totalQuestion={questions?.length}
				progressBarStyle={styles.progressBarStyle}
				quizScreen
			/>
			<AssestName
				isLastQuestion={isLastQuestion}
				openAssessmentModalData={openAssessmentModalData}
				loader={false}
				assestName={assessmentName}
				isOverviewHide={false}
				questionHandler={questionHandler}
				assestModel={assestModel}
				enableQuestionLevelTimer={
					assessmentPagedata?.enableQuestionLevelTimer
				}
				enableMoveOnlyForward={
					assessmentPagedata?.enableMoveOnlyForward
				}
				questionTimer={questionTimer}
			/>

			{loading ? (
				<RenderQuestionSkeleton />
			) : (
				<ScrollView
					style={styles.scrollContainer}
					scrollEnabled={scrollEnabled}
				>
					<Questions
						handleBookmarks={handleBookmarks}
						bookMakerArray={bookMakerArray}
						setScrollEnabled={setScrollEnabled}
						enableMoveOnlyForward={
							assessmentPagedata?.enableMoveOnlyForward
						}
						loader={false}
						assestType={IAssetType.ASSESSMENT}
						assestModel={assestModel}
						currentQuestion={currentQuestion}
						setselectedAnswer={setselectedAnswer}
						selectedAnswer={selectedAnswer}
					/>
					<ReportErrors
						currentQuestion={currentQuestion}
						assetCode={assetCode}
						courseId={courseId}
						moduleId={moduleId}
						sessionId={sessionId}
						segmentId={segmentId}
						learningPathType={learningPathType}
						learningPathId={learningPathId}
						learningPathName={learningPathName}
						assetName={assessmentName}
						buildPath={buildPath}
					/>
				</ScrollView>
			)}

			{Object.keys(assestModelData)?.length > 0 && (
				<ContentModel
					isVisible={true}
					onClose={assestModel}
					contentData={assestModelData}
				/>
			)}
			<AssetbottomTab
				assessmentAttemptId={assessmentAttemptId}
				isLastQuestion={isLastQuestion}
				loading={loading}
				questionType={questionType}
				currentQuestionID={currentQuestion?.questionId}
				selectedAnswer={selectedAnswer}
				questionHandler={questionHandler}
				assestType={IAssetType.ASSESSMENT}
				totalQuestions={questions?.length}
				questionIndex={questionActiveIndex}
				enableSkipping={assessmentPagedata?.enableSkipping}
				enableMoveOnlyForward={
					assessmentPagedata?.enableMoveOnlyForward
				}
				slowNetworkLoader={slowNetworkLoader}
			/>

			{assesmentModalData?.modalType &&
				renderpopupComponent(assesmentModalData?.modalType)}
		</ScreenWrapper>
	);
};

export default RecallQuizScreen;
