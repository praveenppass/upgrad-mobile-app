import { C } from "@assets/constants";
import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale } from "@utils/functions";
import measures from "@utils/measures";

const {
	themes: { primary, text, bg, border },
	commonStyles: {
		text: { txtCenter, lightBold, w600, w400, sm, md, bold, regular, med },
		spacing: {
			pb20,
			mt4,
			ml4,
			g10,
			ml6,
			mv2,
			mh12,
			p12,
			mt0,
			mv10,
			ml20,
			mb16,
			mt16,
			mr24,
			mr20,
		},
		align: { justifyCenter, alignCenter, rowStart },
	},
} = C;

const {
	BORDER: { b8, b31, b6 },
} = measures;

export const TicketScreenStyle = StyleSheet.create({
	main: {
		flex: 1,
	},
	desc: {
		...md,
		...txtCenter,
		color: text.steelBlue,
		width: horizontalScale(300),
		lineHeight: 21,
		...lightBold,
		...mt4,
	},
	emptyStateContainer: {
		flex: 0.9,
		...justifyCenter,
		...alignCenter,
	},
	ticketContainer: {
		...pb20,
	},
	iconCard: {
		...g10,
		...rowStart,
	},
	plusIcon: {
		...ml6,
		...bold,
	},
	ticketStyle: {
		color: text.darkBlue,
		...sm,
		...w600,
		...txtCenter,
		...ml4,
	},
	tabNameStyle: {
		backgroundColor: bg.lightGreen,
		borderRadius: b31,
		width: horizontalScale(28),
		height: horizontalScale(28),
		...justifyCenter,
		...alignCenter,
	},
	conversationViewStyle: {
		backgroundColor: border.green,
		borderRadius: b31,
		width: horizontalScale(18),
		height: horizontalScale(18),
		...justifyCenter,
		...alignCenter,
	},
	conversationTextStyle: {
		color: bg.white,
		...med,
		...w600,
		...txtCenter,
	},
	mainContainer: {
		backgroundColor: primary.color2,
		...mh12,
		...mv10,
		...p12,
		...mt0,
		borderRadius: b8,
		elevation: 2,
	},
	containerMargins: {
		...ml20,
		...mr20,
	},
	titleContainer: {
		backgroundColor: primary.color2,
		...mh12,
		...mv10,
		...mt0,
		...mr24,
		...ml4,
		borderRadius: b8,
		elevation: 2,
	},
	texttyle: {
		color: text.dark,
		...md,
		...mt16,
		...mb16,
		...w400,
		lineHeight: 21,
	},
	btnStyle: {
		height: moderateScale(40),
		borderRadius: b6,
		...mb16,
	},
	titleStyle: {
		color: text.dark,
		...md,
		...w600,
		lineHeight: 21,
	},
	subTitleStyle: {
		color: text.steelBlue,
		...md,
		...w400,
		lineHeight: 21,
		...mv2,
	},
	iconTextStyle: {
		color: text.steelBlue,
		...sm,
		...w400,
		lineHeight: 19,
		...regular,
	},
	iconContainerStyle: {
		width: horizontalScale(24),
		height: horizontalScale(24),
	},
});
