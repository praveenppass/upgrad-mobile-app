import { StyleSheet } from "react-native";

import { MAX_ALLOWED_WIDTH } from "@components/Reusable/RenderHtml/renderHtml.constants";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { fontFamily } from "@assets/fonts";
import { commonStyles } from "@assets/styles";

const { sm, bold, reg, md, medium, semiBold, regular } = commonStyles.text;

const { neutral, logo, icon } = colors;
const renderHtmlStyles = StyleSheet.create({
	a: {
		color: logo.linkedin,
		textDecorationLine: "underline",
	},
	b: {
		fontWeight: "bold",
	},
	container: {
		maxWidth: "100%",
	},
	defaultTextProps: {
		fontFamily: fontFamily.Regular,
		...sm,
	},
	h1: {
		...bold,
		...reg,
		color: neutral.grey_08,
	},
	h2: {
		...md,
		...bold,
		color: neutral.grey_08,
	},
	h3: {
		...medium,
		...md,
		color: neutral.grey_08,
	},
	h4: {
		...bold,
		...sm,
		color: neutral.grey_08,
	},
	h5: {
		...semiBold,
		...sm,
		color: neutral.grey_08,
	},
	h6: {
		...medium,
		...sm,
		color: neutral.grey_08,
	},
	hideImageOverflow: {
		overflow: "hidden",
	},
	highlight: {
		backgroundColor: icon.rating,
	},
	li: {
		color: neutral.grey_08,
		...regular,
		...sm,
		lineHeight: verticalScale(20),
	},
	maxWidthforImageAndLink: {
		maxWidth: MAX_ALLOWED_WIDTH,
	},
	ol: {
		color: neutral.grey_08,
		...regular,
		...sm,
		lineHeight: verticalScale(20),
	},
	p: {
		...sm,
		...semiBold,
		color: neutral.grey_08,
		lineHeight: verticalScale(20),
		marginVertical: 0,
		paddingVertical: 0,
	},
	pre: {
		backgroundColor: neutral.grey_02,
		borderRadius: verticalScale(6),
		overflow: "hidden",
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(10),
		...md,
		lineHeight: verticalScale(20),
	},
	strong: {
		fontWeight: "bold",
	},
	table: {
		marginVertical: verticalScale(10),
	},
	td: {
		color: neutral.grey_07,
		lineHeight: verticalScale(24),
		maxWidth: horizontalScale(380),
		minWidth: horizontalScale(120),
		paddingHorizontal: horizontalScale(30),
		paddingVertical: verticalScale(16),
		textAlign: "center",
		...regular,
		...sm,
	},
	th: {
		color: neutral.black,
		lineHeight: verticalScale(24),
		...bold,
		...sm,
		paddingVertical: verticalScale(16),
		textAlign: "center",
	},
	ul: {
		color: neutral.grey_08,
		...regular,
		...sm,
		lineHeight: verticalScale(20),
	},
});

export default renderHtmlStyles;
