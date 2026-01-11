import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import MicroInteractionModal from "@components/microInteractions/common/MicroInteractionModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import AssignmentSubmissionMascot from "@assets/animations/microInteractions/first-asset-completion.json";
import { IMAGE_URLS } from "@assets/icons/img";

interface IAssignmentSubmissionModal {
	isOpen: boolean;
	closeModal: () => void;
}

const AssignmentSubmissionModal = ({
	isOpen,
	closeModal,
}: IAssignmentSubmissionModal) => (
	<MicroInteractionModal isOpen={isOpen} closeModal={closeModal}>
		<View style={styles.container}>
			<Image
				source={{ uri: IMAGE_URLS.SUBMIT_ASSIGNMENT_BANNER }}
				style={styles.banner}
				resizeMode="contain"
			/>
			<LottieView
				source={AssignmentSubmissionMascot}
				autoPlay
				loop
				style={styles.lottieView}
			/>
		</View>
	</MicroInteractionModal>
);

export default AssignmentSubmissionModal;

const styles = StyleSheet.create({
	banner: {
		bottom: verticalScale(150),
		height: verticalScale(103),
		left: horizontalScale(20),
		position: "absolute",
		width: horizontalScale(250),
	},
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(20),
		width: "100%",
	},
	lottieView: {
		bottom: verticalScale(20),
		height: verticalScale(220),
		position: "absolute",
		right: -20,
		width: horizontalScale(160),
		zIndex: 1,
	},
});
