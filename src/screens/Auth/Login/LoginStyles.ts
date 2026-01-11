import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";
import { fontFamily } from "@assets/fonts";
import { themes } from "@assets/themes";

const {
	themes: { text, bg },
	commonStyles: {
		align: { rowCenter },
		spacing: { g6 },
		text: { md, sm, bold, clrBlack, reg, medium },
	},
	colors: { neutral, primary },
} = C;

export const loginStyles = StyleSheet.create({
	btmChild1: {
		flex: 2,
	},
	btmChild2: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	btmView: {
		paddingTop: 0,
	},
	centerItems: {
		alignItems: "center",
		justifyContent: "center",
	},
	childView: {
		flex: 1,
	},
	closeIcon: {
		padding: 8,
		position: "absolute",
		right: horizontalScale(18),
		top: horizontalScale(12),
		zIndex: 10,
	},
	componentSwitchView: {
		alignItems: "center",
		marginTop: verticalScale(15),
	},
	contentContainerStyle: {
		flexGrow: 1,
	},

	flagTxt: {
		...md,
		marginLeft: 5,
		...clrBlack,
	},
	inputView: {
		marginHorizontal: horizontalScale(25),
		marginTop: verticalScale(30),
	},
	inputViewAvoidKeyboard: {
		marginTop: "20%",
	},
	khLogo: {
		left: verticalScale(20),
		top: -horizontalScale(40),
	},

	leftContainer: {
		borderBottomLeftRadius: 8,
		borderTopLeftRadius: 8,
		height: verticalScale(45),
		...g6,
		...rowCenter,
		backgroundColor: themes.bg.chip,
		paddingHorizontal: 10,
	},

	loginBtn: {
		borderRadius: measures.BORDER.b6,
		height: horizontalScale(50),
		marginHorizontal: horizontalScale(10),
	},
	loginBtnDisabled: {
		backgroundColor: bg.disabled,
		borderRadius: measures.BORDER.b6,
		height: horizontalScale(48),
		marginTop: horizontalScale(20),
	},
	loginBtnEnabled: {
		backgroundColor: primary.red_05,
		borderRadius: measures.BORDER.b6,
		height: horizontalScale(48),
		marginTop: horizontalScale(20),
	},
	loginTerms: {
		color: text.lightGrey,
		fontFamily: fontFamily.Regular,
		...sm,
	},
	modalContainer: {
		backgroundColor: neutral.white,
		borderRadius: 12,
		height: horizontalScale(180),
		justifyContent: "space-evenly",
		left: 10,
		marginHorizontal: 30,
		position: "absolute",
		top: 350,
	},
	modalHeading1: {
		color: neutral.black,
		fontFamily: fontFamily.SemiBold,
		...reg,
		marginTop: 20,
	},
	modalHeading2: {
		color: neutral.grey_08,
		fontFamily: fontFamily.SemiBold,
		textAlign: "center",
		...md,
		marginHorizontal: 30,
	},
	modalHeading3: {
		color: primary.red_05,
		fontFamily: fontFamily.SemiBold,
		...md,
	},
	modalOverlay: {
		alignItems: "center",
		backgroundColor: "#00000080",
		flex: 1,
		justifyContent: "center",
	},
	modalOverlay: {
		alignItems: "center",
		backgroundColor: "#00000080",
		flex: 1,
		justifyContent: "center",
	},
	rnBtn: {
		marginTop: verticalScale(20),
	},
	signInOptionHeading: {
		color: text.lightGrey,
		fontFamily: fontFamily.Regular,
		...sm,
	},
	signInOptionSubHeading: {
		color: primary.red_05,
		...bold,
		...sm,
	},
	signInPrivacy: {
		color: text.lightGrey,
		fontFamily: fontFamily.Regular,
		textAlign: "center",
		...sm,
		lineHeight: 21,
	},
	skipBtnText: {
		...md,
		...medium,
		color: neutral.grey_07,
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(5),
		textAlign: "right",
	},
	subHeading: {
		color: neutral.grey_07,
		...md,
	},
	subHeadingView: {
		alignItems: "center",
	},
	tC_PPView: {
		alignSelf: "center",
		flex: 1,
		justifyContent: "flex-end",
		marginHorizontal: horizontalScale(40),
	},
	termsAndCondition: {
		...bold,
		...sm,
		color: primary.red_05,
	},
	topContainer: {
		backgroundColor: neutral.white,
		flex: 1,
	},
	topImg: {
		alignItems: "center",
		paddingTop: verticalScale(26),
	},
	upGradIconLogo: {
		marginTop: "8%",
	},
});
