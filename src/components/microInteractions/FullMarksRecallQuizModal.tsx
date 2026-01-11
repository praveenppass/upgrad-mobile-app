import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import MicroInteractionModal from "@components/microInteractions/common/MicroInteractionModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import FullMarksRecallQuizMascot from "@assets/animations/microInteractions/full-marks-recall-quiz.json";
import { IMAGE_URLS } from "@assets/icons/img";

interface IFullMarksRecallQuizModal {
	isOpen: boolean;
	closeModal: () => void;
}

const FullMarksRecallQuizModal = ({
	isOpen,
	closeModal,
}: IFullMarksRecallQuizModal) => (
	<MicroInteractionModal isOpen={isOpen} closeModal={closeModal}>
		<View style={styles.container}>
			<Image
				source={{
					uri: IMAGE_URLS.FULL_MARKS_RECALL_QUIZ_BANNER,
				}}
				style={styles.banner}
				resizeMode="contain"
			/>
			<LottieView
				source={FullMarksRecallQuizMascot}
				autoPlay
				loop
				style={styles.lottieView}
			/>
		</View>
	</MicroInteractionModal>
);

export default FullMarksRecallQuizModal;

const styles = StyleSheet.create({
	banner: {
		bottom: verticalScale(180),
		height: verticalScale(150),
		left: horizontalScale(20),
		position: "absolute",
		width: horizontalScale(200),
	},
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(20),
		width: "100%",
	},
	lottieView: {
		bottom: verticalScale(36),
		height: verticalScale(180),
		position: "absolute",
		right: 8,
		width: horizontalScale(250),
		zIndex: 1,
	},
});
