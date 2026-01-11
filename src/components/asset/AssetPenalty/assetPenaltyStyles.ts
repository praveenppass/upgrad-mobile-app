import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { bold, semiBold, md, med } = commonStyles.text;
const { row, justifyBetween } = commonStyles.align;
const { neutral } = colors;

const assetPenaltystyles = StyleSheet.create({
	dateView: {
		...row,
		...justifyBetween,
		marginVertical: horizontalScale(4),
	},
	heading: {
		color: neutral.black,
		...semiBold,
		...md,
		marginBottom: horizontalScale(6),
	},
	main: {
		marginHorizontal: horizontalScale(8),
	},
	penaltyDate: {
		color: neutral.grey_08,
		...med,
		alignSelf: "flex-start",
		flex: 1,
		lineHeight: horizontalScale(20),
		marginRight: horizontalScale(4),
	},
	percentageView: {
		color: neutral.black,
		...bold,
		...med,
		textAlign: "right",
	},

	rowContainer1: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		marginTop: verticalScale(13),
	},
	rowContainer2: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		marginTop: verticalScale(2),
	},
	rowContainer3: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		marginTop: verticalScale(5),
	},
	skeleton1: {
		borderRadius: horizontalScale(17),
		height: verticalScale(12),
		width: horizontalScale(160),
	},
	skeleton2: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		width: horizontalScale(181),
	},
	skeleton3: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		width: horizontalScale(209),
	},
	skeleton4: {
		borderRadius: horizontalScale(15),
		height: verticalScale(12),
		width: horizontalScale(222),
	},
	skeleton5: {
		borderRadius: horizontalScale(15),
		height: verticalScale(12),
		width: horizontalScale(223),
	},
	skeleton6: {
		borderRadius: horizontalScale(15),
		height: verticalScale(12),
		width: horizontalScale(255),
	},
	skeleton7: {
		borderRadius: horizontalScale(15),
		height: verticalScale(12),
		width: horizontalScale(182),
	},
	text1: {
		alignSelf: "flex-end",
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		width: horizontalScale(14),
	},
	text2: {
		alignSelf: "flex-end",
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginBottom: verticalScale(5),
		marginTop: verticalScale(5),
		width: horizontalScale(14),
	},
	text3: {
		alignSelf: "flex-end",
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		width: horizontalScale(16),
	},
	text4: {
		alignSelf: "flex-end",
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		width: horizontalScale(19),
	},
	text5: {
		alignSelf: "flex-end",
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		width: horizontalScale(17),
	},
	text6: {
		alignSelf: "flex-end",
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		width: horizontalScale(19),
	},
	uploadContainer: {
		paddingHorizontal: horizontalScale(10),
	},
});

export default assetPenaltystyles;
