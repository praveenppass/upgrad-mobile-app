import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	themes: { text },
	commonStyles: {
		spacing: { mt4, mt10, g8, p10, pv12, g12, p20 },
		text: { md, xlg, bold, clrBlack, clrBlue },
		align: {
			absolute,
			rowCenter,
			flex1,
			selfCenter,
			alignCenter,
			selfStart,
			rowBetween,
			justifyCenter,
		},
	},
	colors: { neutral, primary },
} = C;

const {
	BORDER: { b6 },
} = measures;

const otpStyles = StyleSheet.create({
	backBtn: {
		...g8,
		...p10,
		...pv12,
		...absolute,
		...selfStart,
		...rowBetween,
		left: verticalScale(12),
	},
	container: {
		backgroundColor: neutral.white,
		flex: 1,
	},
	credentialTxt: {
		...md,
		...bold,
		...clrBlack,
		marginLeft: horizontalScale(10),
	},
	editIconStyle: {
		marginLeft: horizontalScale(3),
		marginTop: verticalScale(6),
	},
	header: {
		alignItems: "center",
		flexDirection: "row",
		marginHorizontal: horizontalScale(22),
		marginTop: "6%",
	},
	loginBtn: {
		borderRadius: measures.BORDER.b6,
		height: horizontalScale(48),
		marginHorizontal: horizontalScale(10),
		marginTop: verticalScale(22),
	},
	logoView: { ...flex1, ...alignCenter },
	main: {
		marginTop: horizontalScale(70),
		paddingTop: 0,
	},
	otpContainer: { ...g12, ...p20, ...justifyCenter },
	otpResent: { ...md, ...clrBlue },
	otpSentTxt: {
		...mt4,
		...md,
		...clrBlue,
		marginLeft: horizontalScale(10),
	},
	otpTxtStyle: { color: text.dark, ...xlg },
	otpView: { ...flex1, ...selfCenter },
	resendIn: { ...clrBlue, ...md },
	resent: { ...md, ...bold, color: primary.red_05 },
	resentView: { ...g8, ...mt10, ...rowCenter },
	rnBtn: {
		marginHorizontal: horizontalScale(10),
	},
	verificationTxt: {
		...xlg,
		...bold,
		...clrBlack,
		marginLeft: horizontalScale(10),
	},
});

export default otpStyles;
