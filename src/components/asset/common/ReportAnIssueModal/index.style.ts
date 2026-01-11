import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { cta, neutral } = colors;
const { reg, md, medium, semiBold, sm, regular } = commonStyles.text;

const reportAnIssueModalStyles = StyleSheet.create({
	btnContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
	},
	btnStyle: {
		flex: 1,
	},
	btnText: {
		color: neutral.white,
		lineHeight: verticalScale(21),
		...md,
		...semiBold,
	},
	cancelBtn: {
		backgroundColor: neutral.white,
	},
	cancelBtnText: {
		color: neutral.black,
	},
	container: {
		gap: verticalScale(24),
		marginBottom: horizontalScale(32),
		marginTop: horizontalScale(36),
	},
	disabledBtn: {
		backgroundColor: neutral.grey_05,
		borderColor: neutral.grey_05,
	},
	handle: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		width: horizontalScale(64),
	},
	headingText: {
		...reg,
		...semiBold,
		color: neutral.black,
		lineHeight: verticalScale(20),
		marginBottom: verticalScale(8),
	},
	modal: {
		paddingBottom: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
	},
	subHeadingText: {
		...sm,
		...regular,
		color: neutral.grey_06,
		lineHeight: verticalScale(16),
	},
	submitBtn: {
		alignItems: "center",
		backgroundColor: neutral.black,
		borderColor: neutral.black,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		color: neutral.white,
		flex: 1,
		height: verticalScale(48),
		justifyContent: "center",
	},
	textInput: {
		borderColor: cta.fill.disable,
		borderRadius: horizontalScale(8),
		borderWidth: horizontalScale(1),
		height: verticalScale(120),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: horizontalScale(12),
		textAlignVertical: "top",
		...sm,
		...medium,
	},
	typeOfissue: {
		lineHeight: verticalScale(21),
		...md,
		...medium,
		color: neutral.black,
	},
});

export default reportAnIssueModalStyles;
