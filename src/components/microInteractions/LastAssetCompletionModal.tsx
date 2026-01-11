import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import MicroInteractionImageModal from "@components/microInteractions/common/MicroInteractionImageModal";
import useMicroInteractionAudio from "@components/microInteractions/common/useMicroInteractionAudio";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import fullMarksAnimation from "@assets/animations/microInteractions/full-marks-recall-quiz.json";
import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { md, regular } = commonStyles.text;
const { neutral, gamification } = colors;

const STRINGS = createStringConstants({
	DESCRIPTION: "common.microInteractions.lastAssetCompletion.description",
	BUTTON: "common.microInteractions.lastAssetCompletion.button",
});

interface ILastAssetCompletionModal {
	isVisible: boolean;
	onClose: () => void;
	onNavigateToStudyPlan: () => void;
}

const LastAssetCompletionModal = ({
	isVisible,
	onClose,
	onNavigateToStudyPlan,
}: ILastAssetCompletionModal) => (
	<MicroInteractionImageModal
		isVisible={isVisible}
		onClose={onClose}
		imageUrl={IMAGE_URLS.LAST_ASSET_BG}
		navigationBarBackgroundColor={gamification.yellow.yellow_01}
	>
		<View style={styles.container}>
			<View style={styles.handleBar} />
			<View style={styles.contentWrapper}>
				<View style={styles.centerContent}>
					<Image
						source={{ uri: IMAGE_URLS.LAST_ASSET_TEXT }}
						style={styles.headerImage}
						resizeMode="contain"
					/>
					<RNText style={styles.descriptionText}>
						{getString(STRINGS.DESCRIPTION)}
					</RNText>

					<CommonButton
						variant={IButtonVariant.Primary}
						onPress={onNavigateToStudyPlan}
						title={getString(STRINGS.BUTTON)}
						style={styles.button}
					/>
				</View>

				<LottieView
					source={fullMarksAnimation}
					autoPlay
					loop
					style={styles.lottieAnimation}
				/>
			</View>
		</View>
	</MicroInteractionImageModal>
);

const styles = StyleSheet.create({
	button: {
		marginTop: verticalScale(24),
		paddingHorizontal: horizontalScale(30),
		paddingVertical: verticalScale(10),
	},
	centerContent: {
		alignItems: "center",
	},
	container: {
		alignItems: "center",
		flex: 1,
	},
	contentWrapper: {
		alignItems: "center",
		flex: 1,
		justifyContent: "space-between",
		marginTop: horizontalScale(52),
	},
	descriptionText: {
		color: neutral.white,
		letterSpacing: verticalScale(0.1),
		lineHeight: verticalScale(20),
		marginHorizontal: horizontalScale(50),
		marginTop: verticalScale(12),
		textAlign: "center",
		...regular,
		...md,
	},
	handleBar: {
		backgroundColor: `${neutral.black}66`,
		borderRadius: 100,
		height: verticalScale(4),
		marginTop: verticalScale(8),
		width: horizontalScale(64),
	},
	headerImage: {
		height: verticalScale(18),
		width: horizontalScale(300),
	},
	lottieAnimation: {
		bottom: -verticalScale(10),
		height: verticalScale(200),
		left: -horizontalScale(35),
		width: horizontalScale(300),
		zIndex: 1,
	},
});

export default LastAssetCompletionModal;
