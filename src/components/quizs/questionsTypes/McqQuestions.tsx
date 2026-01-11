import React from "react";
import {
	FlatList,
	Image,
	Pressable,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

import { styles } from "@components/quizs/questionsTypes/options.style";
import RenderHtml from "@components/Reusable/RenderHtml";

import { QuizAnswerStatus } from "@interface/app.interface";

import { ToggleBoxIcon, ToggleBoxSelectedIcon } from "@assets/icons";
import { QuestionFeedbackIcon } from "@assets/icons/img";

interface IMCQQUESTIONPROPS {
	options: { id: string; text: string }[] | null;
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
	questionId: string;
	isFeedbackEnabled: boolean;
	answerResponse?: string | null;
	setFeedbackModal: (data: boolean) => void;
	setselectedAnswer: (data: {
		[questionId: string]: { questionId: string; answer: string[] };
	}) => void;
	correctAnswer: string[];
	setFeedbackDataForSelectedOption: (
		selectedOptionIds: string[],
		isCorrect: boolean,
	) => void;
}

const McqQuestions: React.FC<IMCQQUESTIONPROPS> = ({
	questionId,
	options,
	selectedAnswer,
	isFeedbackEnabled,
	answerResponse = QuizAnswerStatus.NO_RESPONSE,
	setselectedAnswer,
	setFeedbackModal,
	correctAnswer,
	setFeedbackDataForSelectedOption,
}) => {
	const handleOptionPress = (id: string) => {
		const answers = {
			...selectedAnswer,
			[questionId]: { questionId: questionId, answer: [id] }, // Storing the selected option's id
		};
		setselectedAnswer(answers); // Update the selected answer state
	};

	// Check if a given option is selected
	const isAnswerSelected = (optionID: string) => {
		return (
			selectedAnswer?.[questionId]?.answer?.includes(optionID) ?? false
		); // Safe check
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
			selectedAnswer?.[questionId]?.answer?.includes(id)
		) {
			return styles.wrongOption;
		}
		return null;
	};

	const handleFeedbackPress = (optionId: string) => {
		setFeedbackModal(true);
		setFeedbackDataForSelectedOption(
			[optionId],
			(correctAnswer as string[])?.includes(optionId) || false,
		);
	};

	const renderOption = ({ item }: { item: { id: string; text: string } }) => {
		const htmlContent = item.text || "";
		const codeMatch = htmlContent.match(/<pre.*?>([\s\S]*?)<\/pre>/g);
		const codePart = codeMatch ? codeMatch.join("\n") : "";
		const textPart = htmlContent.replace(/<pre.*?>[\s\S]*?<\/pre>/g, "");
		const hasImageOrTable = /<(img|table)/.test(textPart);

		return (
			<ScrollView
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
						styles.optionContainer,
					]}
					onPress={() => handleOptionPress(item.id)}
					activeOpacity={0.7}
				>
					{isAnswerSelected(item.id) ? (
						<ToggleBoxSelectedIcon />
					) : (
						<ToggleBoxIcon />
					)}
					<View
						style={[
							styles.scrollableOptionText,
							!hasImageOrTable && styles.flexShrink1,
						]}
					>
						<RenderHtml content={textPart} />
						{codePart.trim() !== "" && (
							<RenderHtml content={codePart} />
						)}
					</View>
					{isFeedbackEnabled ? (
						<Pressable
							style={styles.feedbackIcon}
							hitSlop={10}
							onPress={() => handleFeedbackPress(item.id)}
						>
							<Image
								source={QuestionFeedbackIcon}
								resizeMode="contain"
								style={styles.feedbackIconStyle}
							/>
						</Pressable>
					) : null}
				</TouchableOpacity>
			</ScrollView>
		);
	};

	return (
		<FlatList
			data={options || []}
			renderItem={renderOption}
			keyExtractor={(item) => item.id}
			scrollEnabled={false}
			nestedScrollEnabled={true}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default React.memo(McqQuestions);
