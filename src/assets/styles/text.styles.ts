import { StyleSheet } from "react-native";

import { moderateScale } from "@utils/functions";

import { fontFamily } from "@assets/fonts";
import { themes } from "@assets/themes";

const text = StyleSheet.create({
	bold: {
		fontFamily: fontFamily.Bold, //700
	},
	clrBlack: {
		color: themes.text.black,
	},
	clrBlue: {
		color: themes.text.darkBlue,
	},
	clrDarkBlack: {
		color: themes.text.darkBlack,
	},
	clrDarkRed: {
		color: themes.text.drkRed,
	},
	clrDisabled: {
		color: themes.bg.disabled,
	},
	clrError: {
		color: themes.primary.error,
	},
	clrGray: {
		color: themes.bg.grey,
	},
	clrLightBlue: {
		color: themes.text.steelBlue,
	},
	clrSkyBlue: {
		color: themes.bg.drkBlue,
	},
	clrWhite: {
		color: themes.primary.color2,
	},
	extraBold: {
		fontFamily: fontFamily.ExtraBold, //800
	},
	extraLight: {
		fontFamily: fontFamily.ExtraLight, //200
	},
	large: {
		fontSize: moderateScale(32),
	},
	lg: {
		fontSize: moderateScale(18),
	},
	light: {
		fontFamily: fontFamily.Light, //300
	},
	lightBold: {
		fontWeight: "500",
	},
	lineHeight19: {
		lineHeight: moderateScale(19),
	},
	lineHeight22: {
		lineHeight: moderateScale(22),
	},
	lineHeight27: {
		lineHeight: moderateScale(27),
	},
	md: {
		fontSize: moderateScale(14),
	},
	med: {
		fontSize: moderateScale(13),
	},
	medium: {
		fontFamily: fontFamily.Medium, //500
	},
	mid: {
		fontSize: moderateScale(15),
	},
	reg: {
		fontSize: moderateScale(16),
	},
	regular: {
		fontFamily: fontFamily.Regular, //400
	},
	semiBold: {
		fontFamily: fontFamily.SemiBold, //600
	},
	sm: {
		fontSize: moderateScale(12),
	},
	tiny: {
		fontSize: moderateScale(8),
	},
	txtCenter: {
		textAlign: "center",
	},
	txtEnd: {
		textAlign: "right",
	},
	txtStart: {
		textAlign: "left",
	},
	txtTransCapt: {
		textTransform: "capitalize",
	},
	underlineText: {
		textDecorationLine: "underline",
	},
	w400: {
		fontWeight: "400",
	},
	w500: {
		fontWeight: "500",
	},
	w600: {
		fontWeight: "600",
	},
	w700: {
		fontWeight: "700",
	},
	xSm: {
		fontSize: moderateScale(11),
	},
	xbold: {
		fontWeight: "700",
	},
	xlg: {
		fontSize: moderateScale(20),
	},
	xxSm: {
		fontSize: moderateScale(10),
	},
	xxlg: {
		fontSize: moderateScale(22),
	},
	xxxlg: {
		fontSize: moderateScale(24),
	},
});

export default text;
