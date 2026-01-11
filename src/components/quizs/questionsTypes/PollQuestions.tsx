import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { styles } from "@components/quizs/questionsTypes/options.style";
import ProgressBar from "@components/Reusable/ProgressBar";
import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";

import { QuizAnswerStatus } from "@interface/app.interface";

import { ToggleBoxIcon, ToggleBoxSelectedIcon } from "@assets/icons";

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
interface IMCQQUESTIONPROPS {
	options: { id: string; text: string; samplePercentage: number }[] | null;
	selectedAnswer:
		| {
				[questionId: string]: {
					questionId: string;
					answer: string[];
					samplePercentage?: Record<string, number>;
				};
		  }
		| undefined;
	questionId: string;
	answerResponse?: string | null;
	setselectedAnswer: (data: {
		[questionId: string]: {
			questionId: string;
			answer: string[];
			samplePercentage?: Record<string, number>;
		};
	}) => void;
	correctAnswer: [];
	recallQuizId?: string;
	pollQuestionCount?: PollQuestionCount;
}

const PollQuestions: React.FC<IMCQQUESTIONPROPS> = ({
	questionId,
	options,
	selectedAnswer,
	answerResponse = QuizAnswerStatus.NO_RESPONSE,
	setselectedAnswer,
	pollQuestionCount,
}) => {
	const [optionPercentages, setOptionPercentages] = useState<
		Record<string, number>
	>({});
	useEffect(() => {
		const percentageMap = selectedAnswer?.[questionId]?.samplePercentage as
			| Record<string, number>
			| undefined;
		if (percentageMap) setOptionPercentages(percentageMap);
	}, [selectedAnswer]);

	const handleOptionPress = (id: string) => {
		const perOptionCount =
			pollQuestionCount?.getPollQuestionAttemptCount?.attemptCount
				?.options || [];
		if (!options || !perOptionCount) return;

		const totalOptionCounts = options.reduce((acc, option) => {
			const optionCount =
				perOptionCount.find((item) => item.option === option.id)
					?.optionCount || 0;
			return acc + option.samplePercentage + optionCount;
		}, 0);

		const newOptionPercentages = options.reduce(
			(acc, option) => {
				const optionCount =
					perOptionCount.find((item) => item.option === option.id)
						?.optionCount || 0;
				const adjustedOptionCount =
					option.id === id ? optionCount + 1 : optionCount;

				const percentage = totalOptionCounts
					? ((option.samplePercentage + adjustedOptionCount) /
							(totalOptionCounts + 1)) *
						100
					: 0;

				return { ...acc, [option.id]: Math.round(percentage) };
			},
			{} as Record<string, number>,
		);

		const totalSum = (
			Object.values(newOptionPercentages) as number[]
		).reduce((a: number, b: number) => a + b, 0);

		const diff = 100 - totalSum;
		const newPercentageForSelectedOption = newOptionPercentages[id] + diff;
		newOptionPercentages[id] = newPercentageForSelectedOption;

		setOptionPercentages(newOptionPercentages);

		const answers = {
			...selectedAnswer,
			[questionId]: {
				questionId: questionId,
				answer: [id],
				samplePercentage: newOptionPercentages,
			},
		};
		setselectedAnswer(answers);
	};

	const isAnswerSelected = (optionID: string) => {
		return (
			selectedAnswer?.[questionId]?.answer?.includes(optionID) ?? false
		);
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

				return (
					<TouchableOpacity
						disabled={
							answerResponse &&
							answerResponse !== QuizAnswerStatus.NO_RESPONSE
								? true
								: false
						}
						key={item.id}
						style={styles.optionButton}
						onPress={() => {
							handleOptionPress(item.id);
						}}
					>
						<View style={styles.optionContainer}>
							{isAnswerSelected(item.id) ? (
								<ToggleBoxSelectedIcon />
							) : (
								<ToggleBoxIcon />
							)}
							<View style={styles.optionText}>
								<RenderHtml content={textPart} />
								{codePart.trim() !== "" && (
									<View style={styles.codeContainer}>
										<RenderHtml content={codePart} />
									</View>
								)}
							</View>
						</View>

						{answerResponse !== QuizAnswerStatus.NO_RESPONSE && (
							<View style={styles.progressBarView}>
								<View style={styles.flexGrow1}>
									<ProgressBar
										progress={
											optionPercentages[item.id] || 0
										}
										leftTextTitle=""
									/>
								</View>
								<RNText>
									{`${optionPercentages[item.id] || 0} %`}
								</RNText>
							</View>
						)}
					</TouchableOpacity>
				);
			})}
		</>
	);
};

export default React.memo(PollQuestions);
