import { StyleSheet } from "react-native";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const {
	text: { regular, sm, md },
} = commonStyles;

export const styles = StyleSheet.create({
	codeContainer: {
		backgroundColor: colors.neutral.grey_05,
		borderRadius: 5,
		padding: verticalScale(10),
	},
	correctOption: {
		backgroundColor: colors.state.success_light_green,
		borderColor: colors.state.success_green,
	},
	countView: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	feedbackIcon: {
		alignItems: "center",
		justifyContent: "center",
	},
	feedbackIconStyle: {
		height: verticalScale(20),
		width: horizontalScale(20),
	},
	flexGrow1: {
		flexGrow: 1,
	},
	flexShrink1: {
		flexShrink: 1,
	},
	gestureHandlerRootView: {
		flex: 1,
	},
	openResponseInput: {
		backgroundColor: colors.neutral.white,
		borderColor: colors.neutral.grey_04,
		borderRadius: 8,
		borderWidth: 1,
		...regular,
		...sm,
		height: verticalScale(110),
		lineHeight: verticalScale(19),
		marginBottom: verticalScale(10),
		padding: verticalScale(10),
		textAlignVertical: "top",
	},
	optionButton: {
		backgroundColor: colors.neutral.grey_02,
		borderRadius: moderateScale(8),
		flexGrow: 1,
		flexShrink: 1,
		marginBottom: verticalScale(10),
		padding: verticalScale(10),
	},
	optionContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(10),
		justifyContent: "flex-start",
	},
	optionText: {
		...md,
		...regular,
		maxWidth: "80%",
		minWidth: "80%",
	},
	progressBarView: {
		flexDirection: "row",
		gap: horizontalScale(10),
		paddingTop: verticalScale(8),
	},
	scrollViewContainerStyle: {
		flexGrow: 1,
	},
	scrollableOptionText: {
		...md,
		...regular,
		flexGrow: 1,
		flexShrink: 1,
	},
	wordCountText: {
		...regular,
		...sm,
		color: colors.neutral.grey_06,
		lineHeight: verticalScale(19),
	},
	wrongOption: {
		backgroundColor: colors.state.error_light_red,
		borderColor: colors.state.error_red,
	},
});
