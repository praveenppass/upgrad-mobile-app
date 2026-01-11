import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { sm, regular, semiBold, lineHeight22, reg } = commonStyles.text;

const { neutral } = colors;

export const SessionStyles = StyleSheet.create({
	container: {
		alignContent: "flex-end",
		alignItems: "center",
		backgroundColor: neutral.white,
		flexDirection: "row",
		height: verticalScale(50),
		paddingHorizontal: horizontalScale(20),
	},

	flex1: {
		flex: 1,
	},
	liveContainer: {
		alignSelf: "flex-end",
		marginRight: horizontalScale(20),
	},
	prepContainer: {
		alignSelf: "flex-end",
	},
	regularEventStatus: {
		backgroundColor: neutral.grey_08,
		borderRadius: horizontalScale(6),
		marginRight: horizontalScale(10),
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(5),
	},
	regularEventText: {
		color: neutral.white,
		...regular,
		...sm,
	},

	regularHeaderText: {
		color: neutral.grey_06,
		...reg,
		...regular,
		...lineHeight22,
	},
	regularLine: {
		backgroundColor: neutral.white,
		height: verticalScale(3),
		marginBottom: verticalScale(5),
	},
	selectEventText: {
		color: neutral.grey_08,
		...regular,
		...sm,
	},
	selectedEventStatus: {
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(6),
		marginRight: horizontalScale(10),
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(5),
	},
	selectedHeaderText: {
		color: neutral.grey_08,
		...reg,
		...semiBold,
		...lineHeight22,
	},
	selectedLine: {
		backgroundColor: neutral.black,
		height: verticalScale(3),
	},

	subContainer: {
		flexDirection: "row",
		paddingBottom: verticalScale(10),
		paddingLeft: horizontalScale(20),
		paddingTop: verticalScale(15),
	},
});
