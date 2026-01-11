import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import MicroInteractionModal from "@components/microInteractions/common/MicroInteractionModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import FullMarksAssessmentsMascot from "@assets/animations/microInteractions/full-marks-assessment.json";
import { IMAGE_URLS } from "@assets/icons/img";

interface IFullMarksAssessmentsModal {
	isOpen: boolean;
	closeModal: () => void;
}

const FullMarksAssessmentsModal = ({
	isOpen,
	closeModal,
}: IFullMarksAssessmentsModal) => (
	<MicroInteractionModal isOpen={isOpen} closeModal={closeModal}>
		<View style={styles.container}>
			<Image
				source={{
					uri: IMAGE_URLS.FULL_MARKS_ASSESSMENTS_BANNER,
				}}
				style={styles.banner}
				resizeMode="contain"
			/>
			<LottieView
				source={FullMarksAssessmentsMascot}
				autoPlay
				loop
				style={styles.lottieView}
			/>
		</View>
	</MicroInteractionModal>
);

export default FullMarksAssessmentsModal;

const styles = StyleSheet.create({
	banner: {
		bottom: verticalScale(180),
		height: verticalScale(140),
		left: horizontalScale(20),
		position: "absolute",
		width: horizontalScale(260),
	},
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(20),
		width: "100%",
	},
	lottieView: {
		bottom: verticalScale(36),
		height: verticalScale(190),
		position: "absolute",
		right: 8,
		width: horizontalScale(130),
		zIndex: 1,
	},
});
