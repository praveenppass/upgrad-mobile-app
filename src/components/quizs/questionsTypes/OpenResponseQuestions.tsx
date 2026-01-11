import React, { memo, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

import { styles } from "@components/quizs/questionsTypes/options.style";
import RNText from "@components/Reusable/RNText";

import { removeHtmlTags, verticalScale } from "@utils/functions";

import { QuizAnswerStatus } from "@interface/app.interface";

import { strings } from "@assets/strings";

interface IOPENRESPONSEQUESTIONPROPS {
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
	questionId: string;
	answerResponse?: string | null;
	currentQuestion: Record<string, any>;
	setselectedAnswer: (data: {
		[questionId: string]: { questionId: string; answer: string[] };
	}) => void;
}

const OpenResponseQuestions: React.FC<IOPENRESPONSEQUESTIONPROPS> = ({
	questionId,
	selectedAnswer,
	answerResponse = QuizAnswerStatus.NO_RESPONSE,
	setselectedAnswer,
	currentQuestion,
}) => {
	const [answer, setAnswer] = useState("");
	const { minWords, maxWords } =
		currentQuestion?.questionInfo?.openResponse || {};

	//for use in case of assessment
	// useEffect(() => {
	// 	setAnswer(selectedAnswer[questionId]?.answer.toString());
	// }, []);

	useEffect(() => {
		if (selectedAnswer && selectedAnswer[questionId]) {
			setAnswer(selectedAnswer[questionId].answer.join("\n"));
		} else {
			setAnswer("");
		}
	}, [questionId]);

	const wrapTextInHTMLTags = (text: string): string => {
		if (!text.trim()) return "<p><br></p>";

		const lines = text.split("\n");
		const wrappedText = lines.map((line) => {
			if (line.trim() === "") {
				return "<p><br></p>";
			}

			const processedLine = line.replace(/^ +| +$/g, (spaces) =>
				"&nbsp;".repeat(spaces.length),
			);
			return `<p>${processedLine}</p>`;
		});

		return wrappedText.join("");
	};

	const handleInputChange = (text: string) => {
		setAnswer(text);
		const count = handleCount(text);
		if (count >= minWords && count <= maxWords) {
			const wrappedText = wrapTextInHTMLTags(text);
			const answers = {
				...selectedAnswer,
				[questionId]: { questionId: questionId, answer: [wrappedText] },
			};
			setselectedAnswer(answers);
		} else {
			const answers = {
				...selectedAnswer,
				[questionId]: { questionId: questionId, answer: [] },
			};
			setselectedAnswer(answers);
		}
	};

	const handleCount = (inputValue: string) => {
		const count = inputValue
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0).length;

		return count;
	};

	const responseWork = answerResponse === QuizAnswerStatus.NO_RESPONSE;

	return (
		<>
			<TextInput
				style={styles.openResponseInput}
				editable={responseWork}
				onChangeText={handleInputChange}
				value={answer ? removeHtmlTags(answer) : ""}
				multiline={true}
				spellCheck={false}
				numberOfLines={10}
				selectTextOnFocus={false}
				keyboardType={"ascii-capable"}
				placeholder={strings.ENTERRESPONSE}
			/>
			<View style={styles.countView}>
				<RNText style={styles.wordCountText}>
					{`Word Count: ${handleCount(answer)}`}
				</RNText>
				<RNText style={styles.wordCountText}>
					{"Word Limit: "}
					{`${minWords}-${maxWords}`}
				</RNText>
			</View>
		</>
	);
};

export default memo(OpenResponseQuestions);
