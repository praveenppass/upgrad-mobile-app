import { StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";

const { neutral } = colors;
const {
	commonStyles: {
		text: { regular, semiBold, xlg, w400, w600, xSm, sm, md },
	},
} = C;

const styles = StyleSheet.create({
	addBtnView: {
		alignSelf: "flex-end",
		flexDirection: "row",
		gap: horizontalScale(8),
		height: verticalScale(40),
		marginVertical: verticalScale(15),
		width: horizontalScale(100),
	},
	btn: {
		flex: 2,
	},
	btnContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
		justifyContent: "space-between",
		marginTop: verticalScale(15),
	},
	btnStyle: {
		borderRadius: measures.BORDER.b6,
	},
	btnView: {
		alignSelf: "flex-end",
		flexDirection: "row",
		gap: horizontalScale(8),
		height: verticalScale(40),
		marginVertical: verticalScale(15),
		width: horizontalScale(200),
	},
	button: {
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: horizontalScale(6),
		borderWidth: 1,
		flex: 1,
		height: verticalScale(48),
		justifyContent: "center",
	},
	buttonNo: {
		// backgroundColor: "transparent",
		...regular,
	},

	buttonYes: {
		backgroundColor: neutral.black,
		...regular,
	},
	deleteBtn: {
		alignSelf: "flex-end",
		borderColor: neutral.black,
		borderRadius: horizontalScale(6),
		borderWidth: 1,
		height: verticalScale(40),
		marginTop: verticalScale(20),
		padding: horizontalScale(10),
	},
	deleteTxt: {
		color: neutral.black,
		...semiBold,
		...md,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(15),
	},
	headerText: {
		color: neutral.black,
		...md,
		...semiBold,
	},
	modalContainer: {
		flexGrow: 1,
	},
	modalHeaderIndicator: {
		alignSelf: "center",
		backgroundColor: neutral.grey_05,
		height: verticalScale(2),
		marginVertical: verticalScale(5),
		width: horizontalScale(80),
	},
	notesTitle: {
		color: colors.neutral.black,
		...w600,
		...md,
	},
	saveTxt: {
		color: neutral.white,
		...md,
		...semiBold,
	},
	savebtn: {
		alignSelf: "flex-end",
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(6),
		height: horizontalScale(40),
		marginTop: verticalScale(20),
		padding: horizontalScale(10),
	},
	shadowEffect: {
		elevation: horizontalScale(1),
		shadowColor: colors.neutral.black,
		shadowOffset: {
			width: horizontalScale(0),
			height: verticalScale(1),
		},
		shadowOpacity: verticalScale(0.2),
		shadowRadius: horizontalScale(1),
	},
	textFieldHieght: {
		height: moderateScale(200),
		lineHeight: verticalScale(19),
	},
	textInput: {
		borderColor: neutral.grey_05,
		borderRadius: horizontalScale(4),
		borderWidth: 1,
		marginTop: verticalScale(10),
		padding: horizontalScale(10),
		...sm,
		color: neutral.black,
		...regular,
		backgroundColor: neutral.white,
	},
	textNo: {
		color: neutral.black,
	},
	textYes: {
		color: neutral.white,
	},
	topBorderView: {
		alignSelf: "center",
		backgroundColor: colors.primary.red_03,
		height: 1,
		marginTop: horizontalScale(15),
		padding: verticalScale(4),
		width: horizontalScale(100),
	},
	warningText: {
		alignSelf: "center",
		color: neutral.black,
		marginTop: verticalScale(10),
		paddingHorizontal: horizontalScale(40),
		textAlign: "center",
		...xlg,
		...semiBold,
	},
	warningTxt: {
		alignSelf: "center",
		color: neutral.black,
		marginTop: verticalScale(20),
		...w400,
		...xSm,
	},
	worningContainer: {
		backgroundColor: neutral.white,
		borderTopLeftRadius: horizontalScale(20),
		borderTopRightRadius: horizontalScale(20),
		height: verticalScale(380),
		paddingHorizontal: horizontalScale(-15),
		paddingVertical: horizontalScale(-12),
	},
	yellowContainer: {
		backgroundColor: colors.state.warning_light_yellow,
		borderTopLeftRadius: verticalScale(20),
		borderTopRightRadius: verticalScale(20),
		height: verticalScale(20),
	},
});

export default styles;
