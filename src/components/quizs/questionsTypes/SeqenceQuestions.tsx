import React, { useEffect, useState } from "react";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { styles } from "@components/quizs/questionsTypes/options.style";
import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";

import { QuizAnswerStatus } from "@interface/app.interface";

import { DraggableActiveIcon, DraggableIcon } from "@assets/icons";
import { QuestionFeedbackIcon } from "@assets/icons/img";

interface ISEQUENCEPROPS {
	options: { id: string; text: string }[] | null;
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
	questionId: string;
	setFeedbackModal: (data: boolean) => void;
	isFeedbackEnabled: boolean;
	answerResponse?: string | null;
	setselectedAnswer: (data: {
		[questionId: string]: { questionId: string; answer: string[] };
	}) => void;
	correctAnswer: [];
	setFeedbackDataForSelectedOption: (
		selectedOptionIds: string[],
		isCorrect: boolean,
	) => void;
	setScrollEnabled: (enabled: boolean) => void;
}

const SeqenceQuestions: React.FC<ISEQUENCEPROPS> = ({
	questionId,
	options,
	selectedAnswer,
	answerResponse = QuizAnswerStatus.NO_RESPONSE,
	setselectedAnswer,
	isFeedbackEnabled,
	setFeedbackModal,
	setFeedbackDataForSelectedOption,
	correctAnswer,
	setScrollEnabled,
}) => {
	const [dragbleOptions, setDragbleOptions] = useState<
		{ id: string; text: string }[]
	>([]);

	useEffect(() => {
		const arr =
			options?.map((item) => ({
				id: item?.id,
				text: item.text,
			})) || [];
		setDragbleOptions(arr);
	}, [options]);

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

	const handleReorder = async (fromIndex: number, toIndex: number) => {
		const newSequence = [...dragbleOptions];
		const [moved] = newSequence.splice(fromIndex, 1);
		newSequence.splice(toIndex, 0, moved);

		setDragbleOptions(newSequence);

		const draggedIds = newSequence.map((item) => item.id);
		const answers = {
			...selectedAnswer,
			[questionId]: { questionId: questionId, answer: draggedIds },
		};
		setselectedAnswer(answers);
	};

	const handleFeedbackPress = (optionId: string) => {
		setFeedbackModal(true);
		setFeedbackDataForSelectedOption(
			[optionId],
			(correctAnswer as string[])?.includes(optionId) || false,
		);
	};

	const renderItem = ({
		item,
		onDragStart,
		onDragEnd,
		isActive,
	}: DragListRenderItemInfo<{ id: string; text: string }>) => {
		return (
			<Pressable
				disabled={
					answerResponse &&
					answerResponse !== QuizAnswerStatus.NO_RESPONSE
				}
				style={[
					styles.optionButton,
					correctAnswerCss(item.id),
					incorrectAnswerCss(item.id),
				]}
				onPressIn={() => {
					setScrollEnabled(false);
					onDragStart();
				}}
				onPressOut={() => {
					setScrollEnabled(true);
					onDragEnd();
				}}
				activeOpacity={0.9}
			>
				<View style={styles.optionContainer}>
					{isActive ? <DraggableActiveIcon /> : <DraggableIcon />}
					<RNText style={styles.optionText}>
						<RenderHtml content={item.text} />
					</RNText>
					{isFeedbackEnabled ? (
						<Pressable
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
				</View>
			</Pressable>
		);
	};

	return (
		<GestureHandlerRootView style={styles.gestureHandlerRootView}>
			<DragList
				data={dragbleOptions}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				onReordered={handleReorder}
			/>
		</GestureHandlerRootView>
	);
};

export default React.memo(SeqenceQuestions);
