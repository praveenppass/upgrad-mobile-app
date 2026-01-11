import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { text } = commonStyles;

const { neutral } = colors;

const { md, medium } = text;

const welcomeScreenStyles = StyleSheet.create({
	containerView: {
		flex: 1,
	},
	footerTextView: {
		paddingHorizontal: horizontalScale(40),
	},
	imageStyle: {
		alignItems: "center",
		paddingTop: verticalScale(26),
	},
	logInButtonStyle: {
		marginBottom: verticalScale(140),
		marginHorizontal: horizontalScale(25),
		marginTop: verticalScale(20),
	},
	skipBtnContainer: {
		alignSelf: "flex-end",
	},
	skipBtnText: {
		...md,
		...medium,
		color: neutral.grey_07,
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(5),
	},
	subHeading: {
		color: neutral.grey_07,
		textAlign: "center",
		...md,
	},
	topContainer: {
		paddingTop: verticalScale(16),
	},
	upGradLogoStyle: {
		marginTop: verticalScale(125),
	},
});

export default welcomeScreenStyles;
