import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { storage } from "@config/mmkvStorage";

import { BottomButton, QuizAnswerStatus } from "@interface/app.interface";
import { EQuestionType } from "@interface/assessment.interface";
import { IAssetType } from "@interface/asset.interface";

import StorageKeys from "@constants/storage.constants";

import { C } from "@assets/constants";

const {
	strings,
	commonStyles: {
		spacing: { g6 },
		text: { bold, md },
		align: { rowCenter },
	},
	colors: { neutral, state },
} = C;
interface IAssestBottomProps {
	assestType: string;
	questionIndex: number;
	totalQuestions: number;
	currentQuestionID: string;
	selectedAnswer: Record<string, any> | undefined;
	questionHandler: (data: string) => void;
	answerResponse?: string;
	enableSkipping?: boolean;
	enableMoveOnlyForward?: boolean;
	questionType: string;
	assessmentAttemptId?: string | null;
	isLastQuestion?: boolean;
	previewMode?: boolean;
	loading?: boolean;
	slowNetworkLoader?: boolean;
}
const AssetbottomTab = ({
	enableSkipping,
	enableMoveOnlyForward,
	answerResponse = QuizAnswerStatus.NO_RESPONSE,
	questionHandler,
	selectedAnswer,
	currentQuestionID,
	assestType,
	questionIndex,
	totalQuestions,
	questionType,
	isLastQuestion,
	assessmentAttemptId,
	loading,
	previewMode,
	slowNetworkLoader,
}: IAssestBottomProps) => {
	const previousButtonHide =
		assestType === IAssetType.RECALL_QUIZ || enableMoveOnlyForward;
	const answerPresent: boolean =
		questionType == EQuestionType.SEQUENCING ||
		selectedAnswer?.[currentQuestionID]?.answer?.length > 0;
	const btnRendered =
		(assestType === IAssetType.RECALL_QUIZ &&
			[QuizAnswerStatus.CORRECT, QuizAnswerStatus.INCORRECT].includes(
				answerResponse as QuizAnswerStatus,
			)) ||
		assestType === IAssetType.ASSESSMENT;
	const onPressBtn = (type: string) => {
		questionHandler(type);
	};

	const actionsCheck = () => {
		let action: BottomButton;
		// 1. Last question & preview mode
		if (isLastQuestion && previewMode) {
			action = BottomButton?.CLOSE;
			// 2. Last question & not preview mode
		} else if (
			isLastQuestion &&
			!previewMode &&
			(questionType === EQuestionType.OPEN_RESPONSE || btnRendered)
		) {
			action = BottomButton?.FINISH;
			// 3. Open response & not last question or btnRendered
		} else if (
			questionType === EQuestionType.OPEN_RESPONSE ||
			btnRendered
		) {
			action = BottomButton.NEXT;
			// 4. Recall quiz handling for other cases
		} else if (assestType === IAssetType.RECALL_QUIZ) {
			action = BottomButton.VERIFY;
			// 5. Default fallback
		} else {
			action = BottomButton.NEXT;
		}
		return action;
	};
	const getButtonText = () => actionsCheck();

	const isBtnDisabled =
		!answerPresent &&
		!previewMode &&
		(assestType === IAssetType.RECALL_QUIZ ||
			(assestType === IAssetType.ASSESSMENT && !isLastQuestion) ||
			(assestType === IAssetType.RECALL_QUIZ &&
				questionType === EQuestionType.OPEN_RESPONSE &&
				isLastQuestion));

	if (loading) {
		return (
			<View style={styles.container}>
				<Skeleton
					style={{
						height: verticalScale(30),
						width: horizontalScale(60),
					}}
				/>
				<Skeleton
					style={{
						height: verticalScale(20),
						width: horizontalScale(100),
					}}
				/>
				<Skeleton
					style={{
						height: verticalScale(30),
						width: horizontalScale(60),
					}}
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{!previousButtonHide && (
				<TouchableOpacity
					style={[g6, rowCenter, styles.btn, styles.whiteBtn]}
					onPress={() => onPressBtn(BottomButton.PREV)}
					disabled={questionIndex === 0}
				>
					<RNText style={styles.btnTxt} title={strings.PREV} />
				</TouchableOpacity>
			)}

			<RNText
				style={styles.noOfQuestions}
				title={`${questionIndex + 1}/${totalQuestions} Questions`}
			/>
			{enableSkipping && !isLastQuestion && (
				<TouchableOpacity
					style={[g6, rowCenter, styles.btn, styles.whiteBtn]}
					onPress={async () => {
						const getAttempt: any = await storage.getString(
							StorageKeys.ASSESSMENT_SKIP_ENABLED,
						);
						const parsedGetAttempt =
							getAttempt !== "undefined" ? getAttempt : "";

						let createArra: never[] =
							parsedGetAttempt &&
							Array.isArray(JSON.parse(parsedGetAttempt))
								? JSON.parse(parsedGetAttempt)
								: [];

						createArra = createArra?.filter(
							(i: string) => i === assessmentAttemptId,
						);
						const btnTitle =
							createArra?.length > 0
								? BottomButton.NEXT
								: BottomButton.SKIP;
						onPressBtn(btnTitle);
					}}
				>
					<RNText style={styles.btnTxt} title={strings.SKIP} />
				</TouchableOpacity>
			)}

			<TouchableOpacity
				onPress={() => {
					onPressBtn(actionsCheck());
				}}
				style={[
					g6,
					rowCenter,
					styles.btn,
					(totalQuestions === questionIndex + 1 || isLastQuestion) &&
						actionsCheck() !== BottomButton.VERIFY &&
						assestType === IAssetType.ASSESSMENT &&
						styles.redFinishButton,
				]}
				disabled={isBtnDisabled}
				accessibilityLabel={getButtonText()}
				accessibilityRole="button"
			>
				{slowNetworkLoader ? (
					<View style={styles.loaderContainer}>
						<Loading imageStyle={{ tintColor: neutral.white }} />
					</View>
				) : (
					<RNText
						title={getButtonText()}
						style={[
							styles.btnTxt,
							!isBtnDisabled && { color: neutral.white },
						]}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	btn: {
		alignItems: "center",
		backgroundColor: neutral.black,
		borderColor: neutral.black,
		borderRadius: verticalScale(5),
		borderWidth: 1,
		color: neutral.white,
		flexDirection: "row",
		paddingHorizontal: horizontalScale(15),
		paddingVertical: horizontalScale(10),
	},
	btnTxt: {
		...md,
		...bold,
		color: neutral.grey_07,
	},
	container: {
		alignItems: "center",
		backgroundColor: neutral.white,
		bottom: verticalScale(0),
		flexDirection: "row",
		height: "auto",
		justifyContent: "space-between",
		left: 0,
		paddingHorizontal: horizontalScale(20),
		paddingTop: moderateScale(10),
		position: "absolute",
		width: "100%",
	},
	disabledBtn: {
		opacity: 0.9,
	},
	loaderContainer: {
		paddingHorizontal: horizontalScale(16),
	},
	noOfQuestions: {
		color: neutral.black,
		fontWeight: "bold",
	},
	redFinishButton: {
		backgroundColor: state.error_red,
		borderColor: neutral.white,
		borderWidth: 0,
	},
	redFinishButtonText: {
		color: neutral.white,
	},

	whiteBtn: {
		backgroundColor: neutral.white,
	},
});

export default memo(AssetbottomTab);
