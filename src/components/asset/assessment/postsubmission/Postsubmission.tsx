import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import Speedometer from "@components/asset/assessment/postsubmission/Speedomeeter";
import UsepostSubmissionController from "@components/asset/assessment/postsubmission/usePostsubmissionController";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import FullMarksAssessmentsModal from "@components/microInteractions/FullMarksAssessmentsModal";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import {
	convertSecondsToHoursAndMinutes,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { PostsubmissionStatus } from "@interface/assessment.interface";

import { C } from "@assets/constants";
import { fontFamily } from "@assets/fonts";
import { FailedSheetIcon } from "@assets/icons";
import { ClockSimpleIcon } from "@assets/icons";
import { IMAGE_URLS, SuccessGreenTick } from "@assets/icons/img";

interface IPostSubmission {
	showUnderStandModal: () => void;
	pageData?: Object;
	attemptId: string;
	assetCode: string;
	learningPathId: string;
	isProgram: boolean;
	courseId: string;
	moduleId: string;
	sessionId: string;
	segmentId: string;
}
const FAILED_ICON = {
	width: moderateScale(70),
	height: moderateScale(70),
};

const {
	strings,
	colors: { neutral, primary, state },
	themes: { text },
	commonStyles: {
		align: { alignCenter },
		text: { reg },
	},
} = C;
const PostSubmission: React.FC<IPostSubmission> = ({
	showUnderStandModal,
	pageData,
	attemptId,
	assetCode,
	learningPathId,
	isProgram,
	courseId,
	moduleId,
	sessionId,
	segmentId,
}) => {
	const {
		pageLoader,
		postsubmissionData,
		retakeAssessments,
		isFullMarksAssessmentsModalOpen,
		setIsFullMarksAssessmentsModalOpen,
	} = UsepostSubmissionController({
		pageData,
		assetCode,
		learningPathId,
		isProgram,
		courseId,
		moduleId,
		sessionId,
		segmentId,
	});

	const {
		retakeBtnDisabled,
		timeSpent,
		headerMessage,
		headerDiscription,
		submissionStatus,
		showScore,
		showTimeTaken,
		passPercentage,
		enableDetailedReport,
		correctPercentage,
	} = postsubmissionData || {};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				{pageLoader ? (
					<>
						<Skeleton dark style={styles.successImage} />
						<Skeleton dark style={styles.contentSkelton} />
						<Skeleton dark style={styles.contentSkelton} />
						<Skeleton
							dark
							style={[
								styles.contentSkelton,
								{ height: moderateScale(150) },
							]}
						/>

						<Skeleton dark style={styles.contentSkelton} />

						<Skeleton dark style={styles.contentSkelton} />

						<Skeleton dark style={styles.contentSkelton} />
					</>
				) : (
					<>
						{passPercentage > 0 ? (
							<>
								{PostsubmissionStatus.PASS ===
								submissionStatus ? (
									<Image
										source={SuccessGreenTick}
										resizeMode="contain"
										style={styles.successImage}
									/>
								) : (
									<FailedSheetIcon {...FAILED_ICON} />
								)}
							</>
						) : (
							<Image
								source={{
									uri: IMAGE_URLS.ASSESSMENT_SUBMITTED,
								}}
								resizeMode="contain"
								style={{
									width: moderateScale(100),
									height: moderateScale(100),
								}}
							/>
						)}

						<RNText
							title={headerMessage}
							style={[
								styles.headerText,
								{
									marginBottom: verticalScale(12),
									...reg,
									color:
										passPercentage === 0
											? neutral.black
											: PostsubmissionStatus.FAIL ===
												  submissionStatus
												? primary.red_05
												: state.success_green,
								},
							]}
						/>
						<RNText
							title={headerDiscription}
							style={styles.headerDiscription}
						/>
						<View style={styles.boxContainer}>
							{showScore ? (
								<View style={styles.boxColumn}>
									<Speedometer value={correctPercentage} />
									<RNText
										style={styles.headerText}
										title={strings.YOUR_SCORE}
									/>
									<RNText
										style={[
											styles.resultText,
											PostsubmissionStatus.FAIL ===
											submissionStatus
												? { color: primary.red_05 }
												: {},
										]}
										title={`${Math.round(correctPercentage)}/100`}
									/>
								</View>
							) : (
								<></>
							)}
							{showTimeTaken && (
								<View style={styles.boxColumn}>
									<ClockSimpleIcon
										width={moderateScale(80)}
										height={moderateScale(80)}
									/>
									<RNText
										style={styles.headerText}
										title={strings.TIME_TAKEN}
									/>
									<RNText
										style={styles.resultText}
										title={convertSecondsToHoursAndMinutes(
											timeSpent,
										)}
									/>
								</View>
							)}
						</View>

						{passPercentage > 0 &&
							PostsubmissionStatus.FAIL === submissionStatus && (
								<RNText
									title={`A minimum score of ${passPercentage}% is required to pass this assessment.`}
									style={styles.headerDiscription}
								/>
							)}
						{enableDetailedReport && (
							<CommonButton
								title={strings.UNDERSTAND_MY_RESULT}
								onPress={showUnderStandModal}
								variant={IButtonVariant.Secondary}
								style={styles.btnResult}
							/>
						)}
						{!retakeBtnDisabled && (
							<CommonButton
								title={
									strings.RETAKE_ASSESSMENT_POST_SUBMISSION
								}
								onPress={() => retakeAssessments(attemptId)}
								variant={IButtonVariant.Tertiary}
								style={styles.retakeBtn}
							/>
						)}
					</>
				)}
				<FullMarksAssessmentsModal
					isOpen={isFullMarksAssessmentsModalOpen}
					closeModal={() => setIsFullMarksAssessmentsModalOpen(false)}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	boxColumn: {
		alignItems: "center",
		borderColor: neutral.grey_04,
		borderRadius: moderateScale(12),
		borderWidth: 1,
		flex: 1,
		padding: moderateScale(16),
	},
	boxContainer: {
		flexDirection: "row",
		gap: 20,
		justifyContent: "space-between",
		marginBottom: verticalScale(20),
		marginTop: verticalScale(20),
	},
	btnAssessment: {
		alignSelf: "center",
		backgroundColor: text.white,
		borderColor: text.black,
		borderRadius: 6,
		borderWidth: 1,
		width: "100%",
	},
	btnResult: {
		alignSelf: "center",
		backgroundColor: text.black,
		borderRadius: 6,
		marginBottom: verticalScale(20),
		marginTop: verticalScale(20),
		width: "100%",
	},
	container: {
		flex: 1,
		padding: moderateScale(8),
	},
	content: {
		flex: 1,
		justifyContent: "center",
		...alignCenter,
	},
	contentSkelton: {
		height: moderateScale(21),
		marginBottom: moderateScale(13),
		width: "100%",
	},
	headerDiscription: {
		color: neutral.grey_07,
		...reg,
		fontWeight: "400",
		lineHeight: moderateScale(18),
		textAlign: "center",
	},
	headerText: {
		...reg,
		fontWeight: "600",
		lineHeight: moderateScale(18),
		textAlign: "center",
	},
	resultText: {
		color: state.success_green,
		fontFamily: fontFamily.Medium,
		...reg,
	},
	retakeBtn: {
		width: "100%",
	},
	successImage: {
		height: moderateScale(70),
		marginBottom: verticalScale(15),
		width: moderateScale(85),
	},
});

export default PostSubmission;
