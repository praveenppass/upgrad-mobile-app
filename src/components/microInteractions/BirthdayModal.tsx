import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import MicroInteractionModal from "@components/microInteractions/common/MicroInteractionModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import BirthdayMascot from "@assets/animations/microInteractions/birthday.json";
import { IMAGE_URLS } from "@assets/icons/img";

interface IBirthdayModal {
	isOpen: boolean;
	closeModal: () => void;
}

const BirthdayModal = ({ isOpen, closeModal }: IBirthdayModal) => (
	<MicroInteractionModal isOpen={isOpen} closeModal={closeModal}>
		<View style={styles.container}>
			<Image
				source={{ uri: IMAGE_URLS.BIRTHDAY_BANNER }}
				style={styles.banner}
				resizeMode="contain"
			/>
			<LottieView
				source={BirthdayMascot}
				autoPlay
				loop
				style={styles.lottieView}
			/>
		</View>
	</MicroInteractionModal>
);

export default BirthdayModal;

const styles = StyleSheet.create({
	banner: {
		bottom: verticalScale(150),
		height: verticalScale(220),
		position: "absolute",
		right: horizontalScale(20),
		width: horizontalScale(270),
	},
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(20),
		width: "100%",
	},
	lottieView: {
		bottom: verticalScale(36),
		height: verticalScale(200),
		left: -24,
		position: "absolute",
		width: horizontalScale(200),
		zIndex: 1,
	},
});
