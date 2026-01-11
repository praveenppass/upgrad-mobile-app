import { StyleSheet } from "react-native";

import { horizontalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";

const { highlight } = colors;

const { BORDER } = measures;

const deadlineExtensionStyles = StyleSheet.create({
	main: {
		backgroundColor: highlight.bg_brown,
		borderRadius: BORDER.b8,
		padding: horizontalScale(12),
	},
});

export default deadlineExtensionStyles;
