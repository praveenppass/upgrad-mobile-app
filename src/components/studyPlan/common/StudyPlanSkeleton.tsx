import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import bookLoader from "@assets/animations/book-loader.json";
import { colors } from "@assets/colors";

const COLOR_FILTERS = [
	{
		keypath: "*",
		color: colors.neutral.grey_07,
	},
];

const StudyPlanSkeleton = () => (
	<View style={styles.container}>
		<LottieView
			source={bookLoader}
			autoPlay
			loop
			style={styles.skeleton}
			colorFilters={COLOR_FILTERS}
		/>
	</View>
);

export default StudyPlanSkeleton;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	skeleton: {
		height: verticalScale(170),
		width: horizontalScale(170),
	},
});
