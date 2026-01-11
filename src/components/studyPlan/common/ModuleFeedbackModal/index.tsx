import LottieView from "lottie-react-native";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";
import SafeImage from "@components/Reusable/SafeImage";
import Questionnaire from "@components/studyPlan/common/ModuleFeedbackModal/Questionnaire";
import Ratings from "@components/studyPlan/common/ModuleFeedbackModal/Ratings";
import useModuleFeedbackModalController from "@components/studyPlan/common/ModuleFeedbackModal/useModuleFeedbackModalController";

import { IPendingFeedbackType } from "@graphql/query/microInteractions/pendingFeedbackQuery";

import useAppNavigation from "@navigation/useAppNavigation";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { LearningPathType } from "@interface/app.interface";

import ModuleFeedbackMascot from "@assets/animations/microInteractions/module-feedback.json";
import { colors } from "@assets/colors";
import { CloseIcon } from "@assets/icons";
import { IMAGE_URLS } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const STRINGS = createStringConstants({
	BANNER_TEXT1: "studyPlan.moduleFeedback.banner.text1",
	BANNER_TEXT2: "studyPlan.moduleFeedback.banner.text2",
});

const TOTAL_RATING_STARS = 5;

const { semiBold, reg, regular, md, medium } = commonStyles.text;

const { gamification, neutral } = colors;

interface IBanner {
	moduleName: string;
}

interface IModuleFeedbackModal {
	level1: string;
	level2?: string;
	learningPathId: string;
	allowSkip?: boolean;
	learningPathType: LearningPathType;

	isOpen: boolean;
	closeModal: () => void;
}

const ModuleFeedbackModal = ({
	level1,
	level2 = "",
	learningPathId,
	allowSkip = false,
	learningPathType,
	isOpen,
	closeModal,
}: IModuleFeedbackModal) => {
	const { questionMap, moduleName, handleSubmitFeedback } =
		useModuleFeedbackModalController({
			level1,
			level2,
			learningPathId,
			learningPathType,
			closeModal,
		});
	const [selectedStar, setSelectedStar] = useState(0);
	const hasSelectedStar = selectedStar > 0;

	const ratingQuestion =
		questionMap[IPendingFeedbackType.RATING]?.[0]?.question;
	const questionnaireQuestion =
		questionMap[IPendingFeedbackType.OPTIONS]?.[selectedStar - 1]?.question;
	const questionnaireOptions =
		questionMap[IPendingFeedbackType.OPTIONS]?.[selectedStar - 1]
			?.options || [];

	const navigation = useAppNavigation();

	const handleCloseModal = useCallback(() => {
		if (allowSkip) closeModal();
		else navigation.goBack();
	}, [allowSkip, closeModal, navigation]);

	return (
		<ActionModal
			isOpen={isOpen}
			closeModal={handleCloseModal}
			style={[styles.modal, hasSelectedStar && styles.modalYellow02]}
			onBackPress={handleCloseModal}
		>
			<View
				style={[
					styles.container,
					!hasSelectedStar && styles.containerMinHeight,
				]}
			>
				{allowSkip ? (
					<CloseIcon
						height={horizontalScale(12)}
						width={horizontalScale(12)}
						color={colors.neutral.grey_07}
						style={styles.closeIcon}
						onPress={closeModal}
						hitSlop={horizontalScale(10)}
					/>
				) : null}
				<View style={styles.handle} />
				{!hasSelectedStar && <Banner moduleName={moduleName ?? ""} />}
				<View
					style={[
						styles.modalHeadingContainer,
						!hasSelectedStar
							? styles.modalHeadingLargeMargin
							: styles.modalHeadingSmallMargin,
					]}
				>
					<RNText
						title={ratingQuestion}
						style={styles.modalHeading}
					/>
					<Ratings
						totalStars={TOTAL_RATING_STARS}
						selectedStar={selectedStar}
						setSelectedStar={setSelectedStar}
					/>
				</View>

				{!hasSelectedStar ? (
					<>
						<Image
							source={{ uri: IMAGE_URLS.MODULE_FEEDBACK_CLOUD1 }}
							style={styles.cloud1}
							height={verticalScale(55)}
							width={horizontalScale(360)}
						/>
						<LottieView
							source={ModuleFeedbackMascot}
							autoPlay
							loop
							style={styles.lottieView}
						/>
						<Image
							source={{ uri: IMAGE_URLS.MODULE_FEEDBACK_CLOUD2 }}
							style={styles.cloud2}
							height={verticalScale(150)}
							width={horizontalScale(404)}
						/>
					</>
				) : null}
				{hasSelectedStar ? (
					<Questionnaire
						onSubmit={(optionSelected, textFeedback) =>
							handleSubmitFeedback(
								selectedStar,
								optionSelected,
								textFeedback,
							)
						}
						rating={selectedStar}
						question={questionnaireQuestion}
						options={questionnaireOptions}
					/>
				) : null}
			</View>
		</ActionModal>
	);
};

export default ModuleFeedbackModal;

const Banner = ({ moduleName }: IBanner) => {
	return (
		<View style={styles.bannerContainer}>
			<SafeImage
				source={{ uri: IMAGE_URLS.MODULE_FEEDBACK_BANNER }}
				imageStyle={styles.banner}
				resizeMode="contain"
			/>
			<RNText
				title={getString(STRINGS.BANNER_TEXT1)}
				style={[styles.bannerText, styles.bannerText1]}
				numberOfLines={4}
			>
				<RNText
					title={`"${moduleName}".`}
					style={[
						styles.bannerText,
						styles.bannerText1,
						styles.bannerTextBold,
					]}
				/>
			</RNText>
			<RNText
				title={getString(STRINGS.BANNER_TEXT2)}
				style={[styles.bannerText, styles.bannerText2]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	banner: {
		height: verticalScale(200),
		width: horizontalScale(300),
	},
	bannerContainer: {
		alignItems: "center",
		alignSelf: "center",
		height: verticalScale(200),
		justifyContent: "space-around",
		position: "absolute",
		top: verticalScale(-60),
		width: horizontalScale(300),
	},
	bannerText: {
		position: "absolute",
		width: horizontalScale(230),
		...md,
		...regular,
		color: colors.neutral.black,
		opacity: 0.8,
		textAlign: "center",
		transform: [{ rotate: "-2deg" }],
	},
	bannerText1: {
		top: verticalScale(70),
		transform: [{ rotate: "0deg" }],
	},
	bannerText2: {
		bottom: verticalScale(36),
	},
	bannerTextBold: {
		...medium,
	},
	closeIcon: {
		position: "absolute",
		right: horizontalScale(20),
		top: verticalScale(20),
		zIndex: 2,
	},
	cloud1: {
		bottom: 0,
		position: "absolute",
		zIndex: 3,
		...commonStyles,
	},
	cloud2: {
		bottom: 0,
		position: "absolute",
		zIndex: 1,
	},
	container: {
		backgroundColor: gamification.yellow.yellow_02,
		borderRadius: horizontalScale(16),
		paddingBottom: verticalScale(16),
		position: "relative",
	},
	containerMinHeight: {
		minHeight: verticalScale(420),
	},
	handle: {
		alignSelf: "center",
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginTop: verticalScale(8),
		opacity: 0.2,
		width: horizontalScale(64),
	},
	lottieView: {
		alignSelf: "center",
		bottom: -15,
		height: verticalScale(180),
		position: "absolute",
		width: horizontalScale(180),
		zIndex: 2,
	},
	modal: {
		backgroundColor: gamification.yellow.yellow_05,
		margin: 0,
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	modalHeading: {
		...semiBold,
		...reg,
		color: colors.neutral.black,
		lineHeight: verticalScale(24),
	},
	modalHeadingContainer: {
		alignItems: "center",
		gap: verticalScale(24),
		justifyContent: "center",
		// marginBottom: verticalScale(200),
		// marginTop: verticalScale(140),
	},
	modalHeadingLargeMargin: {
		marginTop: verticalScale(140),
	},
	modalHeadingSmallMargin: {
		marginTop: verticalScale(36),
	},
	modalYellow02: {
		backgroundColor: gamification.yellow.yellow_02,
	},
});
