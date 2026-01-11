import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	themes: {
		primary,
		bg: { lightBlue },
	},
	commonStyles: {
		text: { bold, clrBlack, md },
		spacing: { g4, p8, p10, g6, pt6, pb100 },
		align: { rowBetween, itemsCenter, selfCenter, fWrap, flex1 },
	},
} = C;

const { BORDER } = measures;

export const ticketDetailStyles = StyleSheet.create({
	arrowDown: {
		transform: [
			{
				rotate: "180deg",
			},
		],
	},
	arrowIcon: {
		...p8,
		flex: 1,
		...selfCenter,
		...itemsCenter,
	},
	dropDownCard: {
		...g6,
		...p10,
		...fWrap,
		backgroundColor: primary.color2,
		elevation: 5,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		width: measures.SCREEN_WIDTH,
		zIndex: 100,
	},
	flg: { flexGrow: 6 },
	listStyle: {
		...pt6,
		...pb100,
	},
	parentView: {
		...p10,
		backgroundColor: primary.color2,
		elevation: 8,
		height: horizontalScale(55),

		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		width: "100%",
	},
	ticketDetailsCard: {
		...flex1,
		backgroundColor: primary.color2,
		marginTop: verticalScale(20),
	},
	topCard: {
		...g4,
		...rowBetween,
		paddingRight: 0,
	},
	topCardTxt: {
		...md,
		...bold,
		flex: 9,
		...clrBlack,
	},
	typeCard: {
		backgroundColor: lightBlue,
		borderRadius: BORDER.b20,
	},
	zMinus: {
		...flex1,
		zIndex: -1,
	},
});
