import { StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";

const { BORDER } = measures;
const {
	commonStyles: {
		spacing: { p10 },
		text: { md, bold, semiBold, w400, med },
	},
	colors: { neutral, primary },
} = C;

export const assessmentDetailsViewStyles = StyleSheet.create({
	// assessmentName: {
	// 	...semiBold,
	// 	alignItems: "center",
	// 	color: neutral.black,
	// 	display: "flex",
	// 	flex: 1,
	// 	fontSize: 17,
	// 	fontWeight: 500,
	// 	justifyContent: "flex-start",
	// 	marginBottom: verticalScale(10),
	// 	width: "auto",
	// },
	component: {
		marginTop: verticalScale(20),
	},
	containerRecall: {
		padding: moderateScale(20),
	},
	containerView: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	customButtonSkelton: {
		height: moderateScale(45),
		marginTop: verticalScale(10),
		width: "100%",
	},
	extensionSpacing: {},
	frameStyle: {
		backgroundColor: neutral.white,
		borderRadius: 6,
		marginVertical: verticalScale(10),
		padding: moderateScale(16),
	},
	frameView: {
		backgroundColor: neutral.white,
		borderColor: neutral.grey_04,
		borderRadius: verticalScale(10),
		borderWidth: 1,
		marginBottom: verticalScale(10),
		padding: moderateScale(16),
	},
	headingView: {
		alignItems: "flex-start",
		display: "flex",
		flexDirection: "row",
		gap: 20,
	},
	instructionViewSkeleton: {
		height: verticalScale(250),
		width: "100%",
	},
	note: {
		color: colors.neutral.black,
		fontWeight: "bold",
	},
	noteView: {
		backgroundColor: neutral.grey_04,
		borderRadius: verticalScale(5),
		gap: verticalScale(10),
		height: "12%",
		marginVertical: 20,
		padding: verticalScale(10),
	},
	// p: {
	// 	color: neutral.black,
	// 	fontSize: 16,
	// 	fontWeight: "bold",
	// 	marginBottom: 10,
	// 	marginVertical: 0,
	// 	maxWidth: "100%",
	// },
	penaltyNoteView: {
		alignItems: "flex-start",
		backgroundColor: colors.neutral.grey_05,
		borderRadius: 10,
		flex: 1,
		height: "10%",
		justifyContent: "center",
		marginTop: 20,
		padding: horizontalScale(12),
	},
	penaltySpacing: {
		marginTop: verticalScale(20),
	},
	// penaltyText: {
	// 	color: colors.neutral.grey_07,
	// 	fontSize: 14,
	// 	fontWeight: "400",
	// },
	proctorTxtStyle: {
		color: colors.primary.red_04,
		...w400,
		...med,
		lineHeight: 21,
	},
	proctorViewStyle: {
		backgroundColor: colors.primary.red_09,
		...p10,
		borderBottomLeftRadius: BORDER.b8,
		borderBottomRightRadius: BORDER.b8,
	},
	quizDisabledBtn: {
		opacity: 0.7,
	},
	quizcontainerView: {
		padding: moderateScale(20),
	},
	scrollview: {
		flex: 1,
		height: "auto",
		// padding: moderateScale(20),
		// marginBottom: verticalScale(40),
		// marginTop: verticalScale(15),
	},
	skeleton: { height: verticalScale(220), width: "100%" },
	skillChip: {
		alignItems: "center",
		borderColor: "#2BADF8",
		borderRadius: 20,
		borderWidth: 1,
		flexDirection: "row",
		height: verticalScale(25),
		paddingHorizontal: horizontalScale(8),
	},
	skillText: {
		...md,
		color: "#056DA9",
	},
	skillView: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginBottom: verticalScale(16),
		marginTop: verticalScale(8),
	},
	skills: {
		...bold,
		...md,
		color: "#0A192B",
	},
	skillsSkeleton: {
		height: verticalScale(50),
		marginTop: verticalScale(20),
		width: "100%",
	},
	startBtn: {
		alignSelf: "center",
		backgroundColor: primary.red_05,
		borderRadius: 6,
		marginTop: verticalScale(10),
		width: "100%",
	},
	subSkillsSkeleton: {
		height: verticalScale(50),
		marginTop: verticalScale(20),
		width: "100%",
	},
	subSkillview: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginBottom: verticalScale(16),
		marginTop: verticalScale(8),
	},
	subskillChip: {
		alignItems: "center",
		borderColor: "#2BADF8",
		borderRadius: 20,
		borderWidth: 1,
		flexDirection: "row",
		height: verticalScale(25),
		paddingHorizontal: horizontalScale(8),
	},
	subskillText: { ...md, color: "#056DA9" },
});
