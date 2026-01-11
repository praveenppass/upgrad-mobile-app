import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const actionModalStyles = StyleSheet.create({
	container: {
		marginBottom: -verticalScale(1),
	},
	dash: {
		alignSelf: "center",
		height: verticalScale(4),
		width: horizontalScale(46),
	},
	innerPressableContainer: {
		backgroundColor: colors.neutral.white,
		borderTopLeftRadius: horizontalScale(16),
		borderTopRightRadius: horizontalScale(16),
		paddingHorizontal: horizontalScale(15),
		paddingVertical: horizontalScale(12),
	},
	modal: {
		backgroundColor: colors.neutral.black + "CC",
		flex: 1,
		justifyContent: "flex-end",
		margin: 0,
	},
	pressableArea: {
		flex: 1,
	},
	safeContainer: {
		flex: 1,
	},
	swipeableContainer: {
		flex: 1,
	},
});

export default actionModalStyles;
