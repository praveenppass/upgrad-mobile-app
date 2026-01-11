import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";

const {
	commonStyles: {
		align: { flex1 },
		text: { md, bold, sm, regular, semiBold, xlg, xxSm },
	},
} = C;

const notesStyles = StyleSheet.create({
	addNoteButton: {
		alignSelf: "center",
		backgroundColor: colors.neutral.black,
		borderRadius: verticalScale(6),
		marginTop: verticalScale(15),
		paddingHorizontal: verticalScale(12),
		paddingVertical: verticalScale(8),
	},
	addNoteButtonText: {
		color: colors.neutral.white,
		...md,
		...regular,
	},
	addNoteTxt: {
		alignSelf: "flex-end",
		color: colors.neutral.black,
		marginBottom: horizontalScale(20),
		...md,
		...regular,
		borderBottomWidth: horizontalScale(1),
		marginRight: horizontalScale(21),
	},
	btnContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
		justifyContent: "space-between",
		marginBottom: horizontalScale(10),
		marginTop: verticalScale(15),
	},
	btnStyle: {
		flex: 1,
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
		...regular,
	},
	childTxt: {
		color: colors.neutral.black,
		...semiBold,
		...xxSm,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(21),
		paddingVertical: verticalScale(12),
	},
	countNoteTxt: {
		paddingHorizontal: horizontalScale(10),
		...sm,
		...bold,
		color: colors.neutral.black,
		lineHeight: verticalScale(20),
	},
	dividerLine: {
		borderBottomColor: colors.neutral.grey_02,
		borderBottomWidth: horizontalScale(1),
		height: verticalScale(1),
	},
	downloadIcon: {
		alignSelf: "center",
	},
	emptyContentWrapper: {
		alignItems: "center",
		marginTop: verticalScale(120),
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
	flex: {
		flex: 1,
	},
	flex1: {
		...flex1,
		backgroundColor: colors.neutral.grey_02,
	},
	generalNoteText: {
		alignSelf: "center",
		...md,
		...regular,
		color: colors.neutral.grey_07,
		marginTop: verticalScale(150),
		paddingHorizontal: horizontalScale(20),
		textAlign: "center",
	},
	gernalListView: {
		paddingBottom: horizontalScale(100),
		paddingHorizontal: horizontalScale(20),
	},
	iconContainer: {
		alignSelf: "center",
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
		marginBottom: verticalScale(100),
	},
	mt0: {
		marginTop: verticalScale(0),
	},
	mt5: {
		marginTop: verticalScale(5),
	},
	noteItemContainer: {
		alignItems: "center",
		backgroundColor: colors.neutral.white,
		flexDirection: "row",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(10),
	},
	noteText: {
		paddingHorizontal: horizontalScale(10),
		...sm,
		...regular,
		color: colors.neutral.black,
		flexShrink: 1,
		lineHeight: verticalScale(20),
	},
	overflowHidden: {
		backgroundColor: colors.neutral.white,
		overflow: "hidden",
	},
	ph20: {
		paddingHorizontal: horizontalScale(20),
	},
	pr10: {
		paddingRight: horizontalScale(10),
	},
	roundTxt: {
		alignItems: "center",
		backgroundColor: colors.neutral.white,
		borderRadius: horizontalScale(30),
		height: verticalScale(20),
		justifyContent: "center",
		textAlign: "center",
		width: horizontalScale(20),
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
		padding: horizontalScale(10),
		paddingHorizontal: horizontalScale(30),
		textAlign: "center",
	},
	tabActiveContainer: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_08,
		borderRadius: horizontalScale(8),
		flexDirection: "row",
	},
	tabActveText: {
		borderRadius: verticalScale(8),
		color: colors.neutral.white,
		paddingHorizontal: horizontalScale(12),
		paddingVertical: horizontalScale(8),
		...regular,
		...md,
	},
	tabInActiveContainer: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_04,
		borderRadius: horizontalScale(8),
		flexDirection: "row",
		...semiBold,
		...md,
	},
	tabInActveText: {
		borderRadius: verticalScale(8),
		padding: horizontalScale(8),
		paddingHorizontal: horizontalScale(12),
		...md,
		...regular,
		color: colors.neutral.grey_08,
	},
	tabView: {
		flexDirection: "row",
		gap: horizontalScale(10),
	},
	textNo: {
		color: colors.neutral.black,
	},
	textYes: {
		color: colors.neutral.white,
	},
	titleStyle: {
		...bold,
		color: colors.neutral.black,
		marginLeft: horizontalScale(20),
		...md,
	},
	titleText: {
		color: colors.neutral.grey_07,
		marginTop: verticalScale(10),
		...md,
		...bold,
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

export default notesStyles;
