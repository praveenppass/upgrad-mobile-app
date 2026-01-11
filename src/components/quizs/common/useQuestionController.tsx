import React from "react";

import McqQuestions from "@components/quizs/questionsTypes/McqQuestions";
import MsqQuestions from "@components/quizs/questionsTypes/MsqQuestions";
import NumericalQuestions from "@components/quizs/questionsTypes/NumericalQuestions";
import OpenResponseQuestions from "@components/quizs/questionsTypes/OpenResponseQuestions";
import PollQuestions from "@components/quizs/questionsTypes/PollQuestions";
import SeqenceQuestions from "@components/quizs/questionsTypes/SeqenceQuestions";

import { QuizAnswerStatus } from "@interface/app.interface";
import { EQuestionType } from "@interface/assessment.interface";
import { IAssetType } from "@interface/asset.interface";

type PollOption = {
	option: string;
	optionCount: number;
};
type PollQuestionCount = {
	getPollQuestionAttemptCount: {
		attemptCount: {
			options: PollOption[];
		};
	};
};
interface IQuestioncontrollerProps {
	currentQuestion: Record<string, any>;
	questionType: string;
	answerResponse?: string;
	recallQuizId?: string;
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
	setselectedAnswer: (data: {
		[questionId: string]: { questionId: string; answer: string[] };
	}) => void;
	pollQuestionCount?: PollQuestionCount;
	setFeedbackModal: (data: boolean) => void;
	assestType: string;
	setFeedbackDataForSelectedOption: (
		selectedOptionIds: string[],
		isCorrect: boolean,
	) => void;
	setScrollEnabled: (data: boolean) => void;
}

const QuestionController = ({
	currentQuestion,
	questionType,
	setselectedAnswer,
	selectedAnswer,
	answerResponse,
	pollQuestionCount,
	setFeedbackModal,
	assestType,
	setFeedbackDataForSelectedOption,
	setScrollEnabled,
}: IQuestioncontrollerProps) => {
	const renderOptionComponent = (type: string) => {
		const isFeedbackEnabled =
			currentQuestion?.questionInfo?.[questionType]?.isFeedbackEnable &&
			answerResponse !== QuizAnswerStatus.NO_RESPONSE &&
			assestType === IAssetType.RECALL_QUIZ;
		const options =
			currentQuestion?.questionInfo?.[questionType]?.options || []; // Use optional chaining safely
		const correctAnswer =
			currentQuestion?.questionInfo?.[questionType]?.correctAnswer || [];
		switch (type) {
			case EQuestionType.MCQ:
				return (
					<McqQuestions
						correctAnswer={correctAnswer}
						isFeedbackEnabled={isFeedbackEnabled}
						answerResponse={answerResponse}
						setFeedbackModal={setFeedbackModal}
						setselectedAnswer={setselectedAnswer}
						questionId={currentQuestion?.questionId}
						options={options}
						setFeedbackDataForSelectedOption={
							setFeedbackDataForSelectedOption
						}
						selectedAnswer={selectedAnswer}
					/>
				);
			case EQuestionType.MSQ:
				return (
					<MsqQuestions
						correctAnswer={correctAnswer}
						setFeedbackModal={setFeedbackModal}
						isFeedbackEnabled={isFeedbackEnabled}
						answerResponse={answerResponse}
						setselectedAnswer={setselectedAnswer}
						questionId={currentQuestion?.questionId}
						options={options}
						setFeedbackDataForSelectedOption={
							setFeedbackDataForSelectedOption
						}
						selectedAnswer={selectedAnswer}
					/>
				);
			case EQuestionType.NUMERICAL:
				return (
					<NumericalQuestions
						correctAnswer={correctAnswer}
						answerResponse={answerResponse}
						setselectedAnswer={setselectedAnswer}
						questionId={currentQuestion?.questionId}
						selectedAnswer={selectedAnswer}
					/>
				);
			case EQuestionType.SEQUENCING:
				return (
					<SeqenceQuestions
						correctAnswer={correctAnswer}
						isFeedbackEnabled={isFeedbackEnabled}
						setFeedbackModal={setFeedbackModal}
						setFeedbackDataForSelectedOption={
							setFeedbackDataForSelectedOption
						}
						setScrollEnabled={setScrollEnabled}
						answerResponse={answerResponse}
						setselectedAnswer={setselectedAnswer}
						questionId={currentQuestion?.questionId}
						options={options}
						selectedAnswer={selectedAnswer}
					/>
				);
			case EQuestionType.POLL:
				return (
					<PollQuestions
						correctAnswer={correctAnswer}
						answerResponse={answerResponse}
						setselectedAnswer={setselectedAnswer}
						questionId={currentQuestion?.questionId}
						options={options}
						selectedAnswer={selectedAnswer}
						pollQuestionCount={pollQuestionCount}
					/>
				);
			case EQuestionType.OPEN_RESPONSE:
				return (
					<OpenResponseQuestions
						answerResponse={answerResponse}
						setselectedAnswer={setselectedAnswer}
						currentQuestion={currentQuestion}
						questionId={currentQuestion?.questionId}
						selectedAnswer={selectedAnswer}
					/>
				);
			default:
				return null;
		}
	};
	return { renderOptionComponent };
};

export default QuestionController;
