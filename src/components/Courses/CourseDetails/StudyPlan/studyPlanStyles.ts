import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { themes } from "@assets/themes";

const {
	themes: { primary },
	commonStyles: {
		spacing: { pb120, mh12, g10, mt10, ml20 },
		align: { absolute, selfCenter },
		text: { med, sm, semiBold },
	},
} = C;

const { neutral, highlight } = colors;

const {
	BORDER: { b10, b18 },
} = measures;

const studyPlanStyles = StyleSheet.create({
	animatedGif: {
		// backgroundColor: "red",
		height: verticalScale(50),
		width: horizontalScale(50),
	},
	assetView: {
		...absolute,
		bottom: verticalScale(60),
		...selfCenter,
	},
	botView: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: 200,
		elevation: 5,
		height: verticalScale(50),
		justifyContent: "center",
		left: horizontalScale(300),
		position: "relative",
		shadowColor: neutral.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		width: horizontalScale(50),
		zIndex: 10,
	},
	botViewWithNextUp: {
		bottom: 80,
	},

	botViewWithoutNextUp: {
		bottom: 180,
	},
	containerStyle: {
		backgroundColor: themes.text.white,
		borderRadius: b10,
		paddingTop: "2%",
		...pb120,
		paddingBottom: "5%",
	},
	contentContainer: {
		paddingBottom: verticalScale(100),
	},
	courseContainer: {
		marginBottom: "20%",
		paddingLeft: "5%",
		paddingRight: "5%",
	},
	dueDate: {
		marginBottom: horizontalScale(14),
		marginLeft: "8%",
	},
	gradintTop: {
		top: 0,
	},
	main: { ...g10, ...mt10 },
	moduleViewStyle: {
		...mh12,
		borderRadius: b18,
	},

	specializationLine: {
		borderBottomColor: highlight.text_brown,
		borderBottomWidth: verticalScale(1),
	},
	specializationTxt: {
		color: highlight.text_brown,
		...semiBold,
		...sm,
	},
	specializationView: {
		alignItems: "center",
		backgroundColor: highlight.bg_brown,
		flexDirection: "row",
		height: verticalScale(48),
		paddingLeft: verticalScale(16),
	},
	sub: {
		backgroundColor: primary.color2,
		elevation: 3,
		marginHorizontal: horizontalScale(10),
	},
	titleStyle: {
		color: neutral.grey_08,
		...med,
		...ml20,
	},
});

export default studyPlanStyles;
