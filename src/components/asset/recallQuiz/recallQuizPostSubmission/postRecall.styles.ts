import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { md, semiBold, sm, reg } = commonStyles.text;

const { state, neutral } = colors;

const postRecallStyles = StyleSheet.create({
	button: {
		marginTop: verticalScale(24),
		width: "100%",
	},
	container: {
		alignItems: "center",
		backgroundColor: neutral.white,
		flex: 1,
	},
	resultsContainer: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(12),
		borderWidth: horizontalScale(1),
		paddingHorizontal: horizontalScale(88),
		paddingVertical: verticalScale(16),
		width: "100%",
	},
	scoreText: {
		color: state.success_green,
		...reg,
		...semiBold,
		marginBottom: verticalScale(8),
	},
	speedometerContainer: {
		marginBottom: verticalScale(16),
		paddingHorizontal: horizontalScale(16),
	},
	statusText: {
		color: neutral.grey_08,
		...sm,
		...semiBold,
	},
	titleText: {
		color: neutral.grey_08,
		...md,
		...semiBold,
		marginBottom: verticalScale(20),
	},
});

export default postRecallStyles;
