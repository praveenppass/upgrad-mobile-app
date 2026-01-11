import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { medium, md, reg, semiBold } = commonStyles.text;

const no_content_available_file = require("@assets/animations/contentAvailableOnWeb.json");

const ComboProgramNotAvailable = () => {
	return (
		<View style={styles.container}>
			<LottieView
				loop
				autoPlay
				style={styles.lottieStyle}
				source={no_content_available_file}
				resizeMode={"contain"}
			/>
			<RNText
				title={strings.CONTENT_AVAILABLE_ON_WEB}
				style={styles.titleTxt}
			/>

			<RNText
				title={strings.YOU_CAN_ACCESS_THIS_SECTION}
				style={styles.disc}
			/>
		</View>
	);
};

export default ComboProgramNotAvailable;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		marginBottom: verticalScale(100),
		paddingHorizontal: horizontalScale(16),
		rowGap: verticalScale(16),
	},
	disc: {
		...md,
		...medium,
		color: neutral.black,
		paddingHorizontal: horizontalScale(30),
		textAlign: "center",
	},
	lottieStyle: {
		height: verticalScale(190),
		marginBottom: verticalScale(-40),
		width: horizontalScale(190),
	},
	titleTxt: {
		...semiBold,
		...reg,
		color: neutral.black,
	},
});
