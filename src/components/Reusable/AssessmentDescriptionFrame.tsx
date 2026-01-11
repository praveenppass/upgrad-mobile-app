import React, { memo, useEffect, useState } from "react";
import {
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import {
	AttemptsIcon,
	PercentageIcon,
	QuestionMarkRed,
	TimerLeftIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";

import RNText from "./RNText";

const {
	themes: { text },
	commonStyles: {
		spacing: { mt6 },
		text: { med, semiBold },
	},
} = C;

interface IAssessmentDescriptionFrameProps {
	assessmentData: {
		data: [];
	};
	style: StyleProp<ViewStyle>;
	reportCheck: boolean;
	showUnderStandModal?: () => void;
}

const AssessmentDescriptionFrame = ({
	assessmentData,
	showUnderStandModal,
	reportCheck,
}: IAssessmentDescriptionFrameProps) => {
	const [noOFQuestions, setNoOfQuestions] = useState<number>();

	const reportData =
		assessmentData && Array.isArray(assessmentData)
			? assessmentData[0]?.data
			: assessmentData?.data || null;

	const currentAttempt = () => {
		let data;
		if (reportData?.getRecallQuizAttempt) {
			data =
				reportData?.getRecallQuizAttempt?.attemptQuiz?.attemptLeft >= 0
					? reportData?.getRecallQuizAttempt?.attemptQuiz?.attemptLeft
					: null;
		} else {
			data =
				["IN_PROGRESS", "NOT_STARTED"].includes(
					reportData?.attempt?.status,
				) && reportData?.attempt?.attemptNumber > 0
					? reportData?.attempt?.attemptNumber - 1
					: ["COMPLETED"].includes(reportData?.attempt?.status)
						? reportData?.attempt?.attemptNumber
						: 0;
		}
		return data;
	};

	useEffect(() => {
		if (reportData?.getRecallQuizAttempt?.extraData?.totalQuestions) {
			setNoOfQuestions(
				reportData?.getRecallQuizAttempt?.extraData?.totalQuestions,
			);
		}
		if (reportData?.extraData?.totalQuestions) {
			setNoOfQuestions(reportData?.extraData?.totalQuestions);
		}
	}, [assessmentData]);

	const textRender = () => {
		let textTitle;
		if (reportData?.getRecallQuizAttempt) {
			const destru = reportData?.getRecallQuizAttempt;
			textTitle =
				currentAttempt() == null
					? "Unlimited Attempt"
					: destru?.quiz?.generalSettings?.attemptLimit
						? `${currentAttempt()}/${destru?.quiz?.generalSettings?.attemptLimit
						} Attempts Left`
						: "";
		} else {
			textTitle = reportData?.settings?.generalSettings?.attemptLimit
				? `${reportData?.attempt?.status === "COMPLETED" &&
					reportData?.attempt?.attemptNumber ===
					reportData?.settings?.generalSettings?.attemptLimit
					? 0
					: reportData?.settings?.generalSettings
						?.attemptLimit - currentAttempt()
				}/${reportData?.settings?.generalSettings?.attemptLimit
				} Attempts Left`
				: reportData?.settings?.generalSettings?.attemptLevel ===
					"question"
					? `Limited Attempt`
					: "Unlimited Attempt";
		}
		return textTitle;
	};

	const viewsData = [
		{
			icon: (
				<View style={styles.percentageView}>
					<PercentageIcon
						width={moderateScale(16)}
						height={moderateScale(16)}
					/>
				</View>
			),
			text:
				reportData?.settings?.generalSettings?.passPercentage &&
				`${reportData?.settings?.generalSettings?.passPercentage}% to Pass`,
		},
		{
			icon: (
				<QuestionMarkRed
					width={moderateScale(24)}
					height={moderateScale(24)}
				/>
			),
			text: `${noOFQuestions} Questions`,
		},
		{
			icon: (
				<TimerLeftIcon
					width={moderateScale(24)}
					height={moderateScale(24)}
				/>
			),
			text:
				reportData?.settings?.generalSettings?.duration &&
				`${reportData?.settings?.generalSettings?.duration} Mins`,
		},
		{
			icon: (
				<AttemptsIcon
					width={moderateScale(24)}
					height={moderateScale(24)}
				/>
			),
			text: textRender(),
			showReport: reportCheck,
		},
	].filter((item) => item.text);

	return (
		<View style={styles.container}>
			{viewsData.map((view, index) => (
				<View key={index} style={styles.itemContainer}>
					{view.icon}
					<RNText
						title={view.text}
						style={[med, mt6, semiBold, styles.txtCenter]}
					/>
					{view.showReport && (
						<TouchableOpacity
							style={styles.report}
							onPress={() => showUnderStandModal?.()}
						>
							<RNText style={styles.viewReport}>
								{strings.VIEW_REPORT}
							</RNText>
						</TouchableOpacity>
					)}
				</View>
			))}
		</View>
	);
};

export default memo(AssessmentDescriptionFrame);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		paddingHorizontal: 16,
	},
	itemContainer: {
		alignItems: "center",
		borderRadius: 8,
		padding: 16,
		width: "45%",
	},
	percentageView: {
		alignItems: "center",
		backgroundColor: "#EFF8FF", //waiting for figma change
		borderRadius: 15,
		height: verticalScale(24),
		justifyContent: "center",
		width: horizontalScale(24),
	},
	report: {
		alignItems: "flex-end",
		display: "flex",
		justifyContent: "center",
	},
	txtCenter: {
		color: text.dark,
		textAlign: "center",
	},
	viewReport: {
		color: colors.neutral.grey_07,
		textDecorationLine: "underline",
	},
});
