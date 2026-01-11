import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;

const { regular, semiBold, xlg, w400, sm } = commonStyles.text;

const deleteConfirmationModalStyles = StyleSheet.create({
	btnContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
		justifyContent: "space-between",
		marginBottom: horizontalScale(10),
		marginTop: verticalScale(15),
	},
	button: {
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		flex: 1,
		height: verticalScale(46),
		justifyContent: "center",
	},
	buttonNo: {
		backgroundColor: colors.transparent,
	},
	buttonYes: {
		backgroundColor: neutral.black,
	},
	image: {
		height: verticalScale(110),
		marginTop: verticalScale(40),
		width: horizontalScale(110),
	},
	textNo: {
		color: neutral.black,
		...regular,
	},
	textYes: {
		color: neutral.white,
		...regular,
	},
	warningText: {
		alignSelf: "center",
		color: neutral.black,
		marginTop: verticalScale(10),
		marginVertical: verticalScale(12),
		paddingHorizontal: horizontalScale(40),
		textAlign: "center",
		...xlg,
		...semiBold,
	},
	warningTxt: {
		alignSelf: "center",
		color: neutral.black,
		marginVertical: verticalScale(10),
		...w400,
		...sm,
	},
});

export default deleteConfirmationModalStyles;
