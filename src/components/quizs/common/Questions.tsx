import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";

import QuestionController from "@components/quizs/common/useQuestionController";
import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { AssetModulepopup } from "@interface/assessment.interface";
import { IAssetType } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import { AssetHintIcon, BookMarkedIcon, BookmarkIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { md, sm } = commonStyles.text;
enum QUESTIONTYPE {
	mcq = "Single Selection",
	msq = "Multi Selection",
	numerical = "Numerical",
	sequence = "Sequencing",
	openresponse = "Open Response",
	poll = "Poll",
}
interface IQUESTIONCARDPROPS {
	currentQuestion: Record<string, any>;
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
	assestType: string;
	setselectedAnswer: (data: {
		[questionId: string]: { questionId: string; answer: string[] };
	}) => void;
	assestModel: (data: string) => void;
	answerResponse?: string;
	loader?: boolean;
	enableMoveOnlyForward: boolean;
	bookMakerArray?: never[];
	handleBookmarks?: (data: any) => void;
	recallQuizId?: string;
	feedbackModal?: boolean;
	pollQuestionCount?: number | undefined;
	setFeedbackModal: (data: boolean) => void;
	setFeedbackDataForSelectedOption: (
		selectedOptionIds: string[],
		isCorrect: boolean,
	) => void;
	setScrollEnabled: (data: boolean) => void;
}
const ICON_SIZE = {
	width: moderateScale(20),
	height: moderateScale(20),
};
const QuestionsCard = ({
	handleBookmarks,
	bookMakerArray,
	enableMoveOnlyForward,
	setFeedbackDataForSelectedOption,
	loader,
	currentQuestion,
	setselectedAnswer,
	selectedAnswer,
	assestType,
	assestModel,
	answerResponse,
	recallQuizId,
	pollQuestionCount,
	feedbackModal,
	setFeedbackModal,
	setScrollEnabled,
}: IQUESTIONCARDPROPS) => {
	const questionType =
		currentQuestion?.questionInfo?.questionType?.toLowerCase();
	const questiontypeName =
		QUESTIONTYPE[questionType as keyof typeof QUESTIONTYPE];

	const { renderOptionComponent } = QuestionController({
		questionType,
		currentQuestion,
		setselectedAnswer,
		selectedAnswer,
		setFeedbackModal,
		setScrollEnabled,
		answerResponse,
		recallQuizId,
		pollQuestionCount,
		feedbackModal,
		assestType,
		setFeedbackDataForSelectedOption,
	});
	const isBookMakerd = bookMakerArray?.find(
		(i: string) => i == currentQuestion?.questionId,
	);

	const areIconsPresent = Boolean(
		currentQuestion?.questionInfo?.hint || enableMoveOnlyForward === false,
	);

	// code support for questions
	const htmlContent = currentQuestion?.questionInfo?.question || "";
	const codeMatch = htmlContent.match(/<pre.*?>([\s\S]*?)<\/pre>/g);
	const codePart = codeMatch ? codeMatch.join("\n") : "";
	const textPart = htmlContent.replace(/<pre.*?>[\s\S]*?<\/pre>/g, "");

	const [imgWidth, imgHeight] = textPart
		.match(/width="(\d+)" height="(\d+)"/)
		?.slice(1)
		.map(Number) || [600, 400];

	return (
		<View style={styles.container}>
			{questiontypeName && (
				<View style={styles.labelWrapper}>
					{loader ? (
						<Skeleton dark style={styles.skeleton} />
					) : (
						<RNText style={styles.label} title={questiontypeName} />
					)}
				</View>
			)}
			{currentQuestion?.questionInfo?.question && (
				<View style={styles.questionHeading}>
					<View
						style={
							areIconsPresent
								? styles.questionHeadingContainerWithIcons
								: styles.questionHeadingContainerWithoutIcons
						}
					>
						<RenderHtml
							customStyles={{
								img: {
									width: imgWidth,
									height: imgHeight,
								},
							}}
							content={textPart}
						/>
						{codePart.trim() !== "" && (
							<View style={styles.codeContainer}>
								<RenderHtml
									content={codePart}
									tagsStyles={{ p: styles.code }}
								/>
							</View>
						)}
					</View>

					<View style={styles.iconsView}>
						{currentQuestion?.questionInfo?.hint && (
							<TouchableOpacity
								onPress={() =>
									assestModel(AssetModulepopup.ASSET_HINT)
								}
								style={styles.questionIcon}
							>
								<AssetHintIcon {...ICON_SIZE} />
							</TouchableOpacity>
						)}
						{assestType === IAssetType.ASSESSMENT &&
							!enableMoveOnlyForward && (
								<TouchableOpacity
									onPress={() =>
										handleBookmarks(isBookMakerd)
									}
									style={styles.questionIcon}
								>
									{isBookMakerd ? (
										<BookMarkedIcon {...ICON_SIZE} />
									) : (
										<BookmarkIcon {...ICON_SIZE} />
									)}
								</TouchableOpacity>
							)}
					</View>
				</View>
			)}

			<View style={styles.optionsContainer}>
				{questionType && renderOptionComponent(questionType)}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	code: {
		color: colors.neutral.black,
		...sm,
	},
	codeContainer: {
		backgroundColor: colors.neutral.grey_04,
		borderRadius: 5,
		marginVertical: verticalScale(5),
		padding: horizontalScale(10),
	},
	container: {
		borderColor: neutral.grey_03,
		borderRadius: moderateScale(10),
		borderWidth: 2,
		margin: moderateScale(20),
		paddingVertical: verticalScale(20),
	},
	iconsView: {
		flexDirection: "row",
		paddingRight: horizontalScale(5),
		position: "absolute",
		right: 0,
		top: 0,
		width: horizontalScale(40),
	},

	img: {
		marginTop: verticalScale(5),
		width: "100%",
	},
	label: {
		color: neutral.grey_07,
		fontWeight: "bold",
	},
	labelWrapper: {
		backgroundColor: neutral.grey_03,
		left: moderateScale(16),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(4),
		position: "absolute",
		top: moderateScale(-12),
	},
	optionsContainer: {
		paddingHorizontal: horizontalScale(20),
	},

	p: {
		color: neutral.black,
		...md,
		fontWeight: "bold",
		lineHeight: verticalScale(18),
		marginVertical: 0,
	},
	questionHeading: {
		flexShrink: 1,
		justifyContent: "flex-start",
		marginVertical: verticalScale(15),
		paddingHorizontal: horizontalScale(10),
	},
	questionHeadingContainerWithIcons: {
		maxWidth: "85%",
	},
	questionHeadingContainerWithoutIcons: {
		maxWidth: "100%",
	},
	questionIcon: {
		alignItems: "flex-end",
		alignSelf: "flex-start",
		flexGrow: 1,
	},
	skeleton: { height: moderateScale(21), width: "100%" },
});
export default memo(QuestionsCard);
