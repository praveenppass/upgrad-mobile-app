import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import TimerComponent from "@components/asset/assessment/common/TimerComponent";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import { assessmentHttpClient } from "@utils/httpClientList";

import { BottomButton } from "@interface/app.interface";
import { QuestionStatusEnum } from "@interface/assessment.interface";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img/index";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;

const { md, xlg, semiBold, reg } = commonStyles.text;

interface ISubmitModal {
	isOpen: boolean;
	type: string;
	onClose: (data: string) => void;
	onTimesUp: () => void;
	questionHandler: (data: string) => void;
	questions: [];
	newAssessmentTimer: number;
	serverTime: string;
	enableAssessmentLevelTimer: boolean;
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
	assessmentExpiresAt: string;
	isMoveOnlyForwardEnabled: boolean;
}

const SubmitModal = ({
	isOpen,
	onClose,
	questions,
	questionHandler,
	enableAssessmentLevelTimer,
	selectedAnswer,
	assessmentExpiresAt,
	isMoveOnlyForwardEnabled,
}: ISubmitModal) => {
	const [timer, setTimer] = useState(0);

	const labels = isMoveOnlyForwardEnabled
		? {
				submit: strings.SUBMIT,
				cancel: strings.CANCEL,
				confirmation: strings.SUBMIT_CONFIRMATION,
			}
		: {
				submit: strings.SUBMIT_ANYWAY,
				cancel: strings.CHECK_AGAIN,
				confirmation: strings.PLEASE_REVIEW,
			};

	useEffect(() => {
		const fetchServerTime = async () => {
			try {
				const response = await assessmentHttpClient.get(
					`/api/assessment-attempt/server-time`,
				);
				if (response.status !== 200) {
					throw new Error(
						`Failed to fetch server time: ${response.statusText}`,
					);
				}
				const responseDate = response.headers.map.date;
				if (!responseDate) {
					throw new Error("No date header in response");
				}

				const formattedDate = new Date(responseDate).toISOString();

				const time1 = new Date(formattedDate);
				const time2 = new Date(assessmentExpiresAt);
				const differenceInmilliSeconds =
					time2.getTime() - time1.getTime();
				const differenceInSeconds = Math.floor(
					differenceInmilliSeconds / 1000,
				);

				setTimer(differenceInSeconds);
			} catch (error) {
				console.error("Error fetching server time:", error);
			}
		};

		enableAssessmentLevelTimer && fetchServerTime();
	}, []);
	const notVisitedQuestions: number =
		questions?.filter((i: { status: QuestionStatusEnum }) =>
			[QuestionStatusEnum.NOT_VISITED].includes(i?.status),
		)?.length || 0;
	const answeredCount: number =
		(selectedAnswer && Object.keys(selectedAnswer).length) || 0;
	const unAnsweredCount = Math.max(
		0,
		(questions?.length || 0) - answeredCount,
	);

	return (
		<ConfirmationModal
			visible={isOpen}
			onClose={() => onClose("")}
			icon={IMAGE_URLS.ASSESSMENT}
			bgColor={colors.primitive.accent}
		>
			<View style={styles.modalContent}>
				{unAnsweredCount === 0 ? (
					<></>
				) : (
					<RNText style={styles.unattemptedText}>
						{strings.SOME_QUESTIONS_UNATTEMPTED}
					</RNText>
				)}
				<RNText style={styles.reviewText}>{labels.confirmation}</RNText>

				<TimerComponent
					duration={timer}
					type={"modalTimer"}
					onTimesUp={() => questionHandler(BottomButton.TIMES_UP)}
				/>

				<View style={styles.countView}>
					<View style={styles.boxContainer}>
						<View style={styles.infoBox}>
							<RNText style={styles.infoBoxText1}>
								{notVisitedQuestions}
							</RNText>
							<RNText style={styles.infoBoxText2}>
								{strings.NOT_VISITED}
							</RNText>
						</View>
						<View style={styles.infoBox}>
							<RNText style={styles.infoBoxText1}>
								{unAnsweredCount}
							</RNText>
							<RNText style={styles.infoBoxText2}>
								{strings.UNANSWERED}
							</RNText>
						</View>
					</View>
				</View>

				<View style={styles.containerBoxes}>
					<CommonButton
						title={labels.cancel}
						onPress={() => onClose("")}
						variant={IButtonVariant.Secondary}
						style={styles.checkAgainBtn}
					/>
					<CommonButton
						title={labels.submit}
						onPress={() =>
							questionHandler(BottomButton.SUBMIT_ASSESMENT)
						}
						variant={IButtonVariant.Tertiary}
						style={styles.finishButtonStyle}
					/>
				</View>
			</View>
		</ConfirmationModal>
	);
};

export default SubmitModal;

const styles = StyleSheet.create({
	boldText: {
		color: neutral.black,
		fontWeight: "bold",
	},
	boxContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: verticalScale(10),
		width: "80%",
	},
	checkAgainBtn: {
		marginTop: horizontalScale(10),
		width: "100%",
	},
	containerBoxes: {
		alignItems: "center",
		gap: horizontalScale(20),
		justifyContent: "flex-end",
	},
	countView: {
		alignItems: "center",
		marginBottom: verticalScale(20),
	},
	finishButtonStyle: {
		marginBottom: horizontalScale(10),
		width: "100%",
	},
	infoBox: {
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: 5,
		borderWidth: 1,
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		marginHorizontal: horizontalScale(10),
		padding: 5,
	},
	infoBoxText1: {
		color: neutral.black,
		...reg,
		fontWeight: "bold",
	},
	infoBoxText2: {
		color: neutral.grey_07,
		...md,
		fontWeight: "bold",
	},
	modalButtonText1: {
		color: neutral.white,
		fontWeight: "bold",
	},
	modalButtonText2: {
		color: neutral.black,
		fontWeight: "bold",
	},
	modalContent: {
		backgroundColor: neutral.white,
		justifyContent: "space-between",
		width: "100%",
	},
	reviewText: {
		color: neutral.grey_07,
		...md,
		fontWeight: "300",
		marginVertical: 10,
		textAlign: "center",
	},
	// timeLeftText2: {
	// 	// alignItems: "center",
	// 	backgroundColor: "yellow",
	// 	color: neutral.grey_07,
	// 	fontSize: 16,
	// 	fontWeight: "300",
	// 	// justifyContent: "center",
	// 	marginBottom: 10,
	// 	// textAlign: "center",
	// },
	unattemptedText: {
		color: neutral.black,
		...xlg,
		...semiBold,
		marginBottom: 10,
		paddingHorizontal: horizontalScale(10),
		textAlign: "center",
	},
});
