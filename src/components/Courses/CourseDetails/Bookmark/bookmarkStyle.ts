import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";

const {
	commonStyles: {
		align: { flex1 },
		text: { md, sm, regular, bold, semiBold, xlg },
	},
} = C;

const bookmarkStyles = StyleSheet.create({
	backgroundView: {
		backgroundColor: colors.neutral.white,
	},
	bookmarkTxt: {
		color: colors.neutral.white,
		padding: horizontalScale(10),
		...md,
		...semiBold,
		textAlign: "center",
	},
	btnContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
		justifyContent: "space-between",
		marginBottom: horizontalScale(10),
		marginTop: verticalScale(15),
	},
	button: {
		alignItems: "center",
		borderColor: colors.neutral.black,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		flex: 1,
		height: horizontalScale(46),
		justifyContent: "center",
	},
	buttonNo: {
		...regular,
	},
	buttonYes: {
		backgroundColor: colors.neutral.black,
	},
	dividerLine: {
		borderBottomColor: colors.neutral.grey_02,
		borderBottomWidth: horizontalScale(1),
		height: verticalScale(1),
	},
	emptyContentWrapper: {
		alignItems: "center",
		marginTop: verticalScale(150),
	},
	emptyView: {
		alignItems: "center",
		flex: 1,
	},

	extension: {
		borderRadius: horizontalScale(8),
		height: verticalScale(10),
		left: horizontalScale(10),
		marginTop: verticalScale(8),
		width: horizontalScale(125),
	},
	flatView: {
		borderRadius: horizontalScale(8),
		marginTop: verticalScale(5),
		paddingHorizontal: horizontalScale(20),
	},
	flex1: {
		...flex1,
		backgroundColor: colors.neutral.grey_02,
	},
	image: {
		height: verticalScale(110),
		marginTop: verticalScale(40),
		width: horizontalScale(110),
	},
	level4: {
		borderRadius: horizontalScale(8),
		height: verticalScale(11),
		right: horizontalScale(50),
		width: horizontalScale(13),
	},
	level5: {
		borderRadius: horizontalScale(8),
		height: verticalScale(11),
		left: horizontalScale(10),
		marginTop: verticalScale(12),
		width: horizontalScale(60),
	},
	level6: {
		borderRadius: horizontalScale(8),
		height: verticalScale(8),
		marginTop: verticalScale(12),
		right: horizontalScale(16),
		width: horizontalScale(15),
	},
	levelView: {
		backgroundColor: colors.neutral.white,
		borderRadius: verticalScale(10),
		height: verticalScale(250),
		width: horizontalScale(330),
	},
	main: { gap: horizontalScale(10), marginTop: verticalScale(20) },
	mb100: {
		marginBottom: horizontalScale(100),
	},
	mt0: {
		marginTop: verticalScale(0),
	},
	mt5: {
		marginTop: verticalScale(5),
	},
	noteItemContainer: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(12),
	},
	noteText: {
		flex: 9,
		paddingHorizontal: horizontalScale(10),
		...sm,
		...regular,
		color: colors.neutral.black,
		lineHeight: verticalScale(20),
	},
	rowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	shadow: {
		backgroundColor: colors.neutral.white,
		elevation: verticalScale(2),
		shadowColor: colors.neutral.white,
		shadowOffset: {
			width: horizontalScale(1),
			height: verticalScale(1),
		},
		shadowOpacity: horizontalScale(0.2),
		shadowRadius: verticalScale(2),
	},
	subtitleText: {
		color: colors.neutral.grey_07,
		...md,
		...regular,
		lineHeight: verticalScale(20),
		padding: verticalScale(10),
		paddingHorizontal: horizontalScale(30),
		textAlign: "center",
	},
	textNo: {
		color: colors.neutral.black,
	},
	textYes: {
		color: colors.neutral.white,
		...regular,
	},
	titleStyle: {
		color: colors.neutral.black,
		marginLeft: horizontalScale(20),
		...md,
		...bold,
	},
	titleText: {
		color: colors.neutral.grey_07,
		marginTop: verticalScale(10),
		...md,
		...bold,
	},
	txtView: {
		backgroundColor: colors.neutral.grey_08,
		borderRadius: verticalScale(8),
		marginBottom: verticalScale(9),
		marginLeft: horizontalScale(20),
		marginTop: verticalScale(10),
		overflow: "hidden",
		width: horizontalScale(110),
	},
	warningText: {
		alignSelf: "center",
		color: colors.neutral.black,
		marginVertical: verticalScale(12),
		textAlign: "center",
		...xlg,
		...semiBold,
	},
	warningTxt: {
		alignSelf: "center",
		color: colors.neutral.black,
		marginVertical: verticalScale(10),
		...regular,
		...sm,
	},
});

export default bookmarkStyles;
