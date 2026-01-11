import { Platform, StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	themes: { text, border, primary, bg },
	commonStyles: {
		spacing: {
			mt10,
			g10,
			mt12,
			ml60,
			mr10,
			mr20,
			mh8,
			pv6,
			mv2,
			mb4,
			p4,
			mv4,
			mb10,
			p10,
			p14,
			pb100,
			ml10,
			mh6,
			pv2,
			ph8,
			ml20,
			mr18,
			mt8,
		},
		align: {
			flex1,
			absolute,
			row,
			justifyBetween,
			alignCenter,
			selfCenter,
			selfEnd,
			justifyCenter,
			justifyEnd,
		},
		text: { bold, md, reg, med, w600, clrBlack, sm, w400, lineHeight19 },
	},
} = C;

const {
	BORDER: { b0, b8, b20, b4 },
} = measures;

export const MyAccountStyles = StyleSheet.create({
	aboutTextView: {
		backgroundColor: primary.color2,
		height: horizontalScale(340),
		width: horizontalScale(340),
		...selfCenter,
		borderRadius: b8,
	},
	b0: { borderRadius: b0 },
	bottomBtn: {
		width: horizontalScale(340),
		...selfCenter,
		borderRadius: b8,
	},
	btmButtonStyle: {
		...p14,
		borderRadius: b8,
		marginHorizontal: moderateScale(20),
		marginTop: moderateScale(20),
	},
	btnContainer: {
		...row,
		...flex1,
		...justifyBetween,
		backgroundColor: primary.color2,
		paddingHorizontal: moderateScale(28),
		paddingVertical: moderateScale(16),
		...alignCenter,
		marginBottom: Platform.OS === "ios" ? 30 : 0,
	},
	btnView: {
		backgroundColor: primary.color2,
		height: horizontalScale(60),
		width: "100%",
		...justifyCenter,
		...selfCenter,
		bottom: 0,
		...absolute,
	},
	certTextStyle: { color: text.dark, ...med },
	certiTitle: {
		color: text.dark,
		...bold,
		...md,
		...mb4,
	},
	certificateView: { ...row, justifyContent: "space-between" },
	chipLoadingSmallStyle: {
		width: "98%",
		...selfCenter,
		borderRadius: b20,
		height: moderateScale(60),
		...mv4,
	},
	choiceQuestionStyle: {
		...reg,
		...bold,
		color: text.dark,
		...mb10,
	},

	clrNavyBlue: {
		...bold,
		...med,
		color: border.skyBlue,
		textDecorationLine: "underline",
	},
	deleteBtn: { ...ml10, ...md, ...clrBlack },
	downloadIconStyle: {
		...mt12,
		...mr10,
		height: horizontalScale(24),
		width: horizontalScale(24),
	},
	editCertificate: {
		...mr18,
		...selfCenter,
	},
	editEducationView: {
		...pv6,
		...row,
		...p10,
		...mh8,
		...justifyBetween,
	},
	educationView: { backgroundColor: primary.color2, flex: 1 },
	externalText: {
		...sm,
		...w600,
		color: bg.drkBlue,
	},
	externalTextView: {
		backgroundColor: bg.lightBlue,
		borderRadius: b20,
		...ph8,
		...pv2,
		...mv4,
	},
	flg: { ...pb100, flexGrow: 1, marginTop: verticalScale(20) },
	footerView: {
		...row,
		...selfEnd,
		...mr20,
		...mt10,
	},
	formContainer: {
		...g10,
		...p10,
	},
	headerAbout: { ...clrBlack, ...bold, ...reg, ...p10, ...ml10 },
	headerAction: {
		...justifyEnd,
		...mr10,
	},
	headerSubTitle: {
		...w400,
		...sm,
		color: text.steelBlue,
		...ml20,
		...lineHeight19,
		...mb10,
	},
	iconView: {
		...row,
		...p10,
	},
	imageTextView: { ...row, ...p10 },
	img: {
		borderRadius: b4,
		height: horizontalScale(80),
		width: horizontalScale(110),
	},
	input: {
		borderColor: bg.disabled,
		borderRadius: b8,
		borderWidth: 0.5,
	},
	inputStyle: { height: horizontalScale(340) },

	linkedinStyle: {
		...mt10,
		...mr10,
		height: horizontalScale(5),
		width: horizontalScale(5),
	},
	mainContainer: {
		backgroundColor: primary.color2,
		...p10,
		...mb10,
	},
	mainView: { ...pv6, ...p10, borderColor: border.color1 },
	readMoreTxt: {
		color: text.steelBlue,
		lineHeight: 21,
		...md,
	},
	requirement: {
		...sm,
		...mt8,
		color: text.steelBlue,
	},
	rightActionStyle: {
		justifyContent: "flex-end",
		...mr10,
	},
	subTitleStyle: {
		color: text.steelBlue,
		...md,
		lineHeight: 21,
		...p4,
		...mh6,
	},
	subtitle: {
		color: text.steelBlue,
		lineHeight: 21,
		...med,
		...mv2,
	},
	textView: { width: "92%" },
	title: { color: bg.dark, lineHeight: 21, ...md, ...mv2 },
	titleStyle: { ...ml60 },
});
