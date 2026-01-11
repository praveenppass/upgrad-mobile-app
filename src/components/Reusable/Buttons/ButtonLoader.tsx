import React, { memo } from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { moderateScale } from "@utils/functions";
const lottie_file = require("@assets/animations/button_loader.json");

const ButtonLoader = () => {
	return (
		<LottieView
			loop
			autoPlay
			style={styles.lottieStyle}
			source={lottie_file}
			resizeMode={"contain"}
		/>
	);
};

export default memo(ButtonLoader);

const styles = StyleSheet.create({
	lottieStyle: {
		height: moderateScale(24),
		width: moderateScale(24),
	},
});
