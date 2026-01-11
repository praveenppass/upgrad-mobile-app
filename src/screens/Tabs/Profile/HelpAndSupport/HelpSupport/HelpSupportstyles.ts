import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";

const {
	themes: { text },
	commonStyles: {
		text: { txtCenter, lightBold, md, w400, bold },
		spacing: { mv10 },
		align: { selfCenter },
	},
} = C;

const {
	BORDER: { b8 },
} = measures;

export const HelpSupportStyle = StyleSheet.create({
	bottomBtn: {
		borderRadius: b8,
		height: horizontalScale(48),
		width: "90%",
		...selfCenter,
		...mv10,
	},
	desc: {
		...md,
		...txtCenter,
		color: text.steelBlue,
		lineHeight: 21,
		width: horizontalScale(250),
		...lightBold,
	},
	main: {
		flex: 0.55,
		marginTop: verticalScale(20),
	},
	noQueriesDescriptionStyles: {
		...md,
		color: colors.neutral.black,
		textAlign: "center",
		width: horizontalScale(300),
		...selfCenter,
	},
	noQueriesStyles: {
		...md,
		color: colors.neutral.black,
		marginTop: verticalScale(10),
		textAlign: "center",
		width: horizontalScale(300),
		...selfCenter,
		lineHeight: 22,
		...bold,
	},
	noQueriesView: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		marginTop: verticalScale(150),
	},
	raiseDesc: {
		...md,
		...txtCenter,
		color: text.steelBlue,
		width: horizontalScale(300),
		...selfCenter,
		lineHeight: 22,
		...w400,
	},
});
