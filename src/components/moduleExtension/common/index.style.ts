import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { cta, neutral } = colors;

const { lg, semiBold, md, regular, sm, medium, xxSm, bold, xSm } =
	commonStyles.text;

const styles = StyleSheet.create({
	acceptBtn: {
		backgroundColor: neutral.black,
	},
	acceptBtnText: {
		color: neutral.white,
	},
	btn: {
		borderColor: neutral.black,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		paddingHorizontal: horizontalScale(68),
		paddingVertical: verticalScale(14),
	},
	btnText: {
		...md,
		...semiBold,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
		marginBottom: verticalScale(32),
		marginTop: verticalScale(32),
	},
	detailSubtext: {
		...medium,
		...sm,
		lineHeight: verticalScale(20),
	},
	detailText: {
		...md,
		...semiBold,
		alignItems: "center",
		color: neutral.grey_08,
		lineHeight: verticalScale(24),
	},
	detailTextContainer: {
		alignItems: "center",
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(4),
		elevation: 2,
		marginBottom: verticalScale(16),
		marginTop: verticalScale(6),
		paddingBottom: verticalScale(8),
		paddingTop: verticalScale(8),
		shadowColor: neutral.black,
		shadowOffset: { width: 0, height: verticalScale(1) },
		shadowOpacity: 0.25,
		shadowRadius: 1,
	},
	groupSubmission: {
		color: neutral.grey_08,
		lineHeight: verticalScale(18),
		textAlign: "center",
		...medium,
		...sm,
	},
	handle: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		width: horizontalScale(64),
	},
	hideBtn: {
		alignItems: "center",
		alignSelf: "flex-end",
		flexDirection: "row",
		gap: horizontalScale(4),
		marginTop: verticalScale(4),
	},
	hideBtnText: {
		...xxSm,
		...semiBold,
		color: neutral.grey_08,
		lineHeight: verticalScale(16),
		textDecorationLine: "underline",
	},
	imageStyle: {
		alignSelf: "center",
		height: verticalScale(78),
		marginBottom: verticalScale(32),
		marginTop: verticalScale(64),
		width: horizontalScale(146),
	},
	knowMore: {
		textDecorationLine: "underline",
		...sm,
		...semiBold,
		color: neutral.grey_08,
		lineHeight: verticalScale(18),
	},
	modal: {
		marginBottom: verticalScale(20),
		width: "100%",
	},
	modalHeading: {
		...lg,
		...semiBold,
		color: neutral.black,
		lineHeight: verticalScale(18),
		textAlign: "center",
	},
	penaltyDetailsDropDown: {
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(4),
		paddingBottom: horizontalScale(10),
		paddingLeft: horizontalScale(14),
		paddingRight: horizontalScale(8),
		paddingTop: horizontalScale(10),
	},
	penaltyDetailsDropDownHeading: {
		...sm,
		...semiBold,
	},
	penaltyItem: {
		alignItems: "flex-end",
		columnGap: horizontalScale(20),
		flexDirection: "row",
		justifyContent: "space-between",
	},
	penaltyItemPercentage: {
		...xSm,
		...bold,
		color: neutral.grey_08,
	},
	penaltyItemString: {
		...xSm,
		...regular,
		flexShrink: 1,
		lineHeight: verticalScale(18),
	},
	percentagePenaltyNotice: {
		marginBottom: verticalScale(8),
		paddingHorizontal: horizontalScale(28),
		textAlign: "center",
	},

	percentagePenaltyNoticeText: {
		textAlign: "center",
		...sm,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(18),
	},
	rejectBtnText: { color: neutral.black },
});

export default styles;
