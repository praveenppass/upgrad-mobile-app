import LottieView from "lottie-react-native";
import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";

import MicroInteractionModal from "@components/microInteractions/common/MicroInteractionModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import FirstAssetCompletionMascot from "@assets/animations/microInteractions/first-asset-completion.json";
import { IMAGE_URLS } from "@assets/icons/img";

interface IFirstAssetCompletionModal {
	isOpen: boolean;
	closeModal: () => void;
}

const FirstAssetCompletionModal = ({
	isOpen,
	closeModal,
}: IFirstAssetCompletionModal) => (
	<MicroInteractionModal isOpen={isOpen} closeModal={closeModal}>
		<View style={styles.container}>
			<Image
				source={{ uri: IMAGE_URLS.FIRST_ASSET_COMPLETION }}
				style={styles.banner}
				resizeMode="contain"
			/>
			<LottieView
				source={FirstAssetCompletionMascot}
				autoPlay
				loop
				style={styles.lottieView}
			/>
		</View>
	</MicroInteractionModal>
);

export default memo(FirstAssetCompletionModal);

const styles = StyleSheet.create({
	banner: {
		bottom: verticalScale(150),
		height: verticalScale(200),
		position: "absolute",
		right: horizontalScale(20),
		width: horizontalScale(250),
	},
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(20),
		width: "100%",
	},
	lottieView: {
		bottom: verticalScale(20),
		height: verticalScale(200),
		position: "absolute",
		width: horizontalScale(150),
		zIndex: 1,
	},
});
