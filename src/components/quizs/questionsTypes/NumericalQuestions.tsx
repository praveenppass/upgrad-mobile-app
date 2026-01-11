import React, { memo } from "react";
import { Platform, TextInput } from "react-native";

import { styles } from "@components/quizs/questionsTypes/options.style";

import { verticalScale } from "@utils/functions";

import { QuizAnswerStatus } from "@interface/app.interface";

interface INUMERICALQUESTIONPROPS {
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
	questionId: string;
	answerResponse?: string | null;
	correctAnswer: [];
	setselectedAnswer: (data: {
		[questionId: string]: { questionId: string; answer: string[] };
	}) => void;
}

const NumericalQuestions: React.FC<INUMERICALQUESTIONPROPS> = ({
	questionId,
	selectedAnswer,
	answerResponse = QuizAnswerStatus.NO_RESPONSE,
	setselectedAnswer,
}) => {
	const handleInputChange = (id: string) => {
		let trimmedInput = id.trim();

		// If more than one decimal point, remove all except the first
		const dotCount = (trimmedInput.match(/\./g) || []).length;
		if (dotCount > 1) {
			// Keep the first dot, remove the rest
			const firstDotIndex = trimmedInput.indexOf(".");
			trimmedInput =
				trimmedInput.slice(0, firstDotIndex + 1) +
				trimmedInput.slice(firstDotIndex + 1).replace(/\./g, ""); // remove all remaining dots
		}

		// Validate: number or decimal (e.g., 123, 0.5, -0.5, .5)
		const isValid = /^-?(?:\d+(\.\d+)?|\.\d+)$/.test(trimmedInput);
		const answerValue = isValid ? parseFloat(trimmedInput) : trimmedInput;

		const answers = {
			...selectedAnswer,
			[questionId]: {
				questionId,
				answer: [String(answerValue)],
			},
		};

		setselectedAnswer(answers);
	};

	const answer = selectedAnswer?.[questionId]?.answer?.toString() || "";
	const responseWork = answerResponse === QuizAnswerStatus.NO_RESPONSE;

	return (
		<>
			<TextInput
				style={[
					styles.optionButton,
					{ height: verticalScale(45) },
					answerResponse === QuizAnswerStatus?.CORRECT &&
						styles.correctOption,
					answerResponse === QuizAnswerStatus.INCORRECT &&
						styles.wrongOption,
				]}
				editable={responseWork}
				selectTextOnFocus={responseWork}
				onChangeText={handleInputChange}
				value={answer}
				keyboardType={
					Platform.OS === "ios"
						? "numbers-and-punctuation"
						: "numeric"
				}
				placeholder="Type Answer"
			/>
		</>
	);
};
export default memo(NumericalQuestions);
