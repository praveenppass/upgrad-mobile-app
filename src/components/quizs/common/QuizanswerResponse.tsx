import React from "react";
import { StyleSheet, View } from "react-native";

import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";

import { moderateScale, verticalScale } from "@utils/functions";

import { QuizAnswerStatus } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { RightAnswer, WrongAnser } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { md, sm } = commonStyles.text;

const ICON_SIZE = {
	width: moderateScale(35),
	height: moderateScale(35),
};

interface IQuizanswerResponseProps {
	answerResponse: string;
	currentQuestion: Record<string, any>;
}

const QuizanswerResponse = ({
	answerResponse,
	currentQuestion,
}: IQuizanswerResponseProps) => {
	const { correctAnswerReason, wrongAnswerReason } =
		currentQuestion?.questionInfo || {};
	const isAnswerCorrect = answerResponse === QuizAnswerStatus.CORRECT;

	return (
		<View style={styles.container}>
			<View style={styles.reportContainer}>
				<View style={styles.headingContainer}>
					{!isAnswerCorrect ? (
						<WrongAnser {...ICON_SIZE} />
					) : (
						<RightAnswer {...ICON_SIZE} />
					)}

					<RNText style={styles.textHeading}>
						{!isAnswerCorrect
							? strings?.INCORRECT
							: strings.CORRECT}
					</RNText>
				</View>
				{correctAnswerReason || wrongAnswerReason ? (
					<RenderHtml
						tagsStyles={styles.textContent}
						content={
							isAnswerCorrect
								? correctAnswerReason
								: wrongAnswerReason
						}
					/>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: moderateScale(40),
		padding: moderateScale(20),
	},
	headingContainer: {
		alignItems: "center",
		flexDirection: "row",
	},
	reportContainer: {
		backgroundColor: neutral.white,
		borderRadius: moderateScale(10),
		elevation: 2,
		flexDirection: "column",
		padding: moderateScale(16),
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	textContent: {
		color: neutral.black,
		...sm,
		fontWeight: "normal",
		lineHeight: verticalScale(18),
		marginTop: moderateScale(10),
	},
	textHeading: {
		color: neutral.black,
		flexWrap: "wrap",
		flex: 1,
		...md,
		fontWeight: "bold",
		lineHeight: verticalScale(21),
		marginLeft: moderateScale(10),
	},
});

export default React.memo(QuizanswerResponse);
