import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import MicroInteractionImageModal from "@components/microInteractions/common/MicroInteractionImageModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";

import BotIntro from "@assets/animations/microInteractions/intro.json";
import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { green } = colors.gamification;
const { xlg, md, regular, extraBold } = commonStyles.text;

interface IIntroModal {
	isOpen: boolean;
	closeModal: () => void;
}

const IntroModal = ({ isOpen, closeModal }: IIntroModal) => (
	<MicroInteractionImageModal
		isVisible={isOpen}
		onClose={closeModal}
		imageUrl={IMAGE_URLS.CLASSROOM_INTRO}
		navigationBarBackgroundColor={green.green_01}
	>
		<LottieView
			source={BotIntro}
			autoPlay
			loop={false}
			style={styles.lottieView}
		/>

		<View style={styles.handle} />
		<View style={styles.container}>
			<Image
				source={{ uri: IMAGE_URLS.INTRO_MODAL_HEADING }}
				style={styles.headingImage}
				resizeMode="contain"
			/>
			<RNText
				title={getString("studyPlan.introModal.description")}
				style={styles.bodyText}
			/>

			<CommonButton
				title={getString("studyPlan.introModal.exploreButton")}
				onPress={closeModal}
				style={styles.button}
				variant={IButtonVariant.Primary}
			/>
		</View>
	</MicroInteractionImageModal>
);

const styles = StyleSheet.create({
	bodyText: {
		...md,
		...regular,
		color: colors.neutral.black,
		lineHeight: horizontalScale(21),
		marginBottom: verticalScale(20),
		textAlign: "center",
	},
	button: {
		alignItems: "center",
		borderRadius: horizontalScale(6),
		height: verticalScale(40),
		justifyContent: "center",
		width: horizontalScale(172),
	},

	container: {
		alignItems: "center",
		gap: verticalScale(10),
		height: verticalScale(400),
		paddingHorizontal: horizontalScale(36),
		top: verticalScale(40),
	},

	handle: {
		alignSelf: "center",
		backgroundColor: colors.neutral.black,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		opacity: 0.2,
		top: verticalScale(8),
		width: horizontalScale(64),
	},

	headingImage: {
		height: verticalScale(40),
		width: horizontalScale(300),
	},

	headingTextBlack: {
		...xlg,
		...extraBold,
		color: colors.neutral.black,
		textAlign: "center",
	},

	headingTextRed: {
		...xlg,
		...extraBold,
		color: colors.primary.red_05,
		marginTop: verticalScale(36),
		textAlign: "center",
	},

	lottieView: {
		height: verticalScale(440),
		position: "absolute",
		width: horizontalScale(380),
	},
});

export default IntroModal;
