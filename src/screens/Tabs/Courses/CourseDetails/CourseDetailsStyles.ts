import { StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";

const {
	themes: { primary, text, bg },
	commonStyles: {
		components: { cardViewStyle },
		align: { rowStart, flex1, absolute },
		spacing: { mb10, mh20, ph12, pv10, g6, mb2, mv10, mh14, mv6 },
		text: { md, bold, clrWhite, txtCenter, clrBlack, med, reg, txtStart },
	},
} = C;

const {
	BORDER: { b90, b6, b8, b18 },
	SCREEN_WIDTH,
} = measures;

export const courseDetailsStyles = StyleSheet.create({
	accord: {
		backgroundColor: primary.color2,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
	},
	containerSkeleton: {
		backgroundColor: colors.neutral.grey_06,
		height: measures.SCREEN_HEIGHT - verticalScale(730),
		width: "100%",
	},
	courseTextSkeleton: {
		borderRadius: b18,
		height: verticalScale(16),
		width: horizontalScale(300),
		...absolute,
		left: horizontalScale(15),
		top: verticalScale(15),
	},
	courseTextSkeleton2: {
		borderRadius: b18,
		height: verticalScale(16),
		width: horizontalScale(240),
		...absolute,
		left: horizontalScale(15),
		top: verticalScale(40),
	},
	dueView: {
		...mh20,
		...mb10,
	},
	free: {
		width: SCREEN_WIDTH / 1.4,
	},
	freeExpire: { ...bold, ...md, ...clrWhite, ...mb2 },
	freeTrial: { ...bold, ...clrWhite, ...md },
	freeTrialStyle: {
		...rowStart,
		backgroundColor: text.drkOrange,
		...ph12,
		...pv10,
	},
	header: {
		...mb10,
		backgroundColor: primary.color2,
		elevation: 3,
		shadowColor: primary.color3,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 3,
	},
	iconContainerStyle: {
		borderColor: bg.grey,
		borderWidth: moderateScale(1),
	},
	main: { ...g6, ...rowStart, ...g6 },
	mainBox: { ...flex1, ...mv10 },
	mainContainer: { ...flex1 },
	mainStyle: { backgroundColor: text.dark },
	module: {
		backgroundColor: primary.color2,
		borderRadius: b8,
		...mh14,
		...mv6,
	},
	moduleNameStyle: {
		...med,
		width: horizontalScale(300),
	},
	moduleShadow: {
		backgroundColor: primary.color2,
		...cardViewStyle,
	},
	svgStyle: {
		height: verticalScale(16),
		width: horizontalScale(16),
	},
	titleStyle: { color: bg.disabled, ...reg, ...txtStart },
	upgrade: {
		...rowStart,
		backgroundColor: primary.color2,
		borderColor: text.darkOrange1,
		borderRadius: b90,
		borderWidth: b6,
		padding: b6,
		width: horizontalScale(95),
	},
	upgradeTextStyle: { ...bold, ...clrBlack, ...med, ...txtCenter },
	container:{
		flex:1,
		backgroundColor:colors.neutral.white
	}
});
