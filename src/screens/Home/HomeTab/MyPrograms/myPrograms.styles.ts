import { StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	themes: { bg, primary },
	commonStyles: {
		align: { alignCenter, flex1 },
		text: {
			xxxlg,
			bold,
			regular,
			clrDarkBlack,
			clrBlack,
			reg,
			md,
			clrLightBlue,
			txtCenter,
		},
		spacing: { mb2, pr20, mv12, mt6, g6, pl20, mt8 },
	},
} = C;

const {
	BORDER: { b8 },
} = measures;

const homeStyles = StyleSheet.create({
	calendarBtnStyle: {
		...mt6,
		borderRadius: b8,
		borderWidth: horizontalScale(1.2),
		width: "100%",
	},
	container: {
		paddingHorizontal: horizontalScale(20),
	},
	courseListView: {
		gap: verticalScale(24),
		paddingHorizontal: horizontalScale(18),
	},
	desc: {
		...md,
		...clrLightBlue,
		...regular,
		...mt8,
		lineHeight: moderateScale(21),
		...txtCenter,
	},
	description: {
		...reg,
		...clrLightBlue,
		...bold,
		lineHeight: moderateScale(20),
		...txtCenter,
	},
	emptyStyle: { ...g6, ...flex1, ...alignCenter, ...mv12, ...pl20, ...pr20 },
	exploreDescTxt: {
		lineHeight: moderateScale(18),
		maxWidth: "80%",
	},
	freeTrailBtnStyle: {
		borderWidth: 0,
		height: verticalScale(48),
	},
	freeTrailRoot: {
		backgroundColor: bg.blue_bg,
	},
	freeTrailSubTitle: {
		color: primary.color2,
		...xxxlg,
		...bold,
		lineHeight: verticalScale(30),
	},
	freeTrailTitle: {
		...mb2,
		...clrDarkBlack,
	},
	loaderStyle: {
		height: verticalScale(75),
	},
	mainText: { ...reg, ...bold, ...clrBlack, ...mt8, ...txtCenter },
	noUpcomingBtn: {
		width: "75%",
	},
	oops: { ...reg, ...bold, ...clrLightBlue },
	referAndEarnContainerView: {
		marginBottom: verticalScale(24),
	},
	scrollViewContainer: {
		gap: verticalScale(24),
		paddingBottom: verticalScale(12),
		marginTop: verticalScale(20),
	},
	spacing: {
		...pl20,
		...pr20,
	},
});

export default homeStyles;
