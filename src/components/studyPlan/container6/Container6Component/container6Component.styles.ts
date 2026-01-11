import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;

const { md, bold } = commonStyles.text;

const assetStyles = StyleSheet.create({
	buttonText: {
		...md,
		...bold,
		color: neutral.grey_07,
	},
	buttonTextDisabled: {
		color: colors.neutral.grey_04,
	},

	changeAsset: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(6),
		paddingHorizontal: horizontalScale(8),
	},
	container: {
		flex: 1,
		marginTop: verticalScale(20),
	},

	optionalContainer: {
		marginHorizontal: horizontalScale(20),
	},
	prevNextButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(16),
		paddingHorizontal: horizontalScale(24),
		width: "100%",
	},
	scrollContainer: {
		flexGrow: 1,
		paddingBottom: verticalScale(60),
	},
});

export default assetStyles;
