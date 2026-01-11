import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

import { styles } from "@components/quizs/questionsTypes/options.style";
import RenderHtml from "@components/Reusable/RenderHtml";

import { QuizAnswerStatus } from "@interface/app.interface";

import { CheckboxIcon, TickboxIcon } from "@assets/icons";
import { QuestionFeedbackIcon } from "@assets/icons/img";

interface IMSQQUESTIONPROPS {
	options: { id: string; text: string }[] | null; // each option has 'id' and 'text'
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
	isFeedbackEnabled: boolean;
	questionId: string;
	answerResponse?: string;
	setFeedbackModal: (data: boolean) => void;
	correctAnswer: [];
	setselectedAnswer: (data: {
		[questionId: string]: { questionId: string; answer: string[] };
	}) => void;
	setFeedbackDataForSelectedOption: (
		selectedOptionIds: string[],
		isCorrect: boolean,
	) => void;
}

const MsqQuestions: React.FC<IMSQQUESTIONPROPS> = ({
	questionId,
	options,
	selectedAnswer,
	isFeedbackEnabled,
	setselectedAnswer,
	setFeedbackModal,
	correctAnswer,
	answerResponse = QuizAnswerStatus.NO_RESPONSE,
	setFeedbackDataForSelectedOption,
}) => {
	const handleOptionPress = (id: string) => {
		const currentAnswer = selectedAnswer?.[questionId]?.answer || [];
		let updatedAnswers = [...currentAnswer];

		// Toggle answer selection
		if (updatedAnswers.includes(id)) {
			// If the answer is already selected, remove it
			updatedAnswers = updatedAnswers.filter(
				(answerId) => answerId !== id,
			);
		} else {
			// Otherwise, add the answer to the list
			updatedAnswers.push(id);
		}

		// Update selected answer state
		setselectedAnswer({
			...selectedAnswer,
			[questionId]: {
				questionId: questionId,
				answer: updatedAnswers,
			},
		});
	};

	const handleFeedbackPress = (optionId: string) => {
		setFeedbackModal(true);
		setFeedbackDataForSelectedOption(
			[optionId],
			(correctAnswer as string[])?.includes(optionId) || false,
		);
	};

	// Check if a given option is selected
	const isAnswerSelected = (optionID: string) => {
		return (
			selectedAnswer?.[questionId]?.answer?.includes(optionID) ?? false
		);
	};

	const correctAnswerCss = (id: string) => {
		if (
			answerResponse !== QuizAnswerStatus.NO_RESPONSE &&
			correctAnswer?.length > 0 &&
			correctAnswer?.includes(id)
		) {
			return styles.correctOption;
		}
		return null;
	};
	const incorrectAnswerCss = (id: string) => {
		if (
			answerResponse === QuizAnswerStatus.INCORRECT &&
			selectedAnswer?.[questionId]?.answer?.includes(id) &&
			!correctAnswer?.includes(id)
		) {
			return styles.wrongOption;
		}
		return null;
	};
	return (
		<>
			{options?.map((item) => {
				const htmlContent = item.text || "";
				const codeMatch = htmlContent.match(
					/<pre.*?>([\s\S]*?)<\/pre>/g,
				);
				const codePart = codeMatch ? codeMatch.join("\n") : "";
				const textPart = htmlContent.replace(
					/<pre.*?>[\s\S]*?<\/pre>/g,
					"",
				);

				const hasImageOrTable = /<(img|table)/.test(textPart);

				return (
					<ScrollView
						key={item.id}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={[
							styles.scrollViewContainerStyle,
							!hasImageOrTable && styles.flexShrink1,
						]}
					>
						<TouchableOpacity
							disabled={
								answerResponse &&
								answerResponse !== QuizAnswerStatus.NO_RESPONSE
									? true
									: false
							}
							style={[
								styles.optionButton,
								correctAnswerCss(item.id),
								incorrectAnswerCss(item.id),
							]}
							onPress={() => handleOptionPress(item.id)}
						>
							<View style={styles.optionContainer}>
								{isAnswerSelected(item.id) ? (
									<TickboxIcon />
								) : (
									<CheckboxIcon />
								)}
								<View
									style={[
										styles.scrollableOptionText,
										!hasImageOrTable && styles.flexShrink1,
									]}
								>
									<RenderHtml content={textPart} />

									{codePart.trim() !== "" && (
										<View style={styles.codeContainer}>
											<RenderHtml content={codePart} />
										</View>
									)}
								</View>
								{isFeedbackEnabled ? (
									<TouchableOpacity
										style={styles.feedbackIcon}
										hitSlop={10}
										onPress={() =>
											handleFeedbackPress(item.id)
										}
									>
										<Image
											source={QuestionFeedbackIcon}
											resizeMode="contain"
											style={styles.feedbackIconStyle}
										/>
									</TouchableOpacity>
								) : (
									<></>
								)}
							</View>
						</TouchableOpacity>
					</ScrollView>
				);
			})}
		</>
	);
};

export default React.memo(MsqQuestions);
