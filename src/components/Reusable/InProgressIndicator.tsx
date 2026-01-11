import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

import { horizontalScale } from "@utils/functions";

import blinkingDot from "@assets/animations/blinking-dot.json";
import { colors } from "@assets/colors";

const COLOR_FILTERS = [
	{
		keypath: "*",
		color: colors.neutral.grey_08,
	},
];

interface IInProgressIndicator {
	size?: number;
}

const InProgressIndicator = ({
	size = horizontalScale(24),
}: IInProgressIndicator) => (
	<View style={styles.container}>
		<LottieView
			source={blinkingDot}
			autoPlay
			loop
			style={{ height: size, width: size }}
			colorFilters={COLOR_FILTERS}
		/>
	</View>
);

export default InProgressIndicator;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		height: horizontalScale(14),
		justifyContent: "center",
		width: horizontalScale(14),
	},
});
