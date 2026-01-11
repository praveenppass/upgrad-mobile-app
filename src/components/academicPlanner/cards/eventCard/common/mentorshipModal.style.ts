import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { cta, neutral, state, primary } = colors;
const { md, semiBold, sm, bold, regular } = commonStyles.text;

const styles = StyleSheet.create({
	btnGradientContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(6),
		justifyContent: "center",
		paddingVertical: verticalScale(14),
	},
	btnText: {
		color: neutral.white,
		...md,
		...semiBold,
	},
	cancelModalTimeBorder: {
		borderColor: primary.red_08,
	},
	confirmButton: {
		marginTop: verticalScale(24),
	},

	dateText: {
		color: neutral.grey_07,
		...md,
		...semiBold,
	},
	handle: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginBottom: verticalScale(30),
		width: horizontalScale(64),
	},
	modal: {
		gap: verticalScale(16),
		paddingBottom: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
		paddingTop: verticalScale(8),
	},

	sessionStartInfoText: {
		...regular,
		...sm,
		color: neutral.grey_07,
		textAlign: "center",
	},
	slotContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(3),
	},
	slotText: {
		...sm,
		...bold,
		color: neutral.grey_08,
		paddingBottom: verticalScale(2),
	},

	slotTextIcon: {
		color: neutral.grey_08,
	},
	statusContainer: {
		alignItems: "center",
		gap: verticalScale(6),
	},
	statusImage: {
		height: horizontalScale(54),
		marginBottom: verticalScale(6),
		width: horizontalScale(54),
	},
	statusSubText: {
		...regular,
		...sm,
		color: neutral.grey_07,
	},
	statusText: {
		...bold,
		...md,
		color: neutral.black,
	},
	successModalTimeBorder: {
		borderColor: state.success_green,
	},
	timeContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(6),
		borderWidth: 1,
		gap: verticalScale(6),
		marginTop: verticalScale(16),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(10),
	},
});

export default styles;
