import { C } from "@assets/constants";
import { verticalScale } from "@utils/functions";
import measures from "@utils/measures";
import { StyleSheet } from "react-native";

const {
	commonStyles: {
		spacing: { mv6, mr10 },
		text: { md,clrBlack },
	},
} = C;
const { BORDER } = measures;

export const radioBtnAccountStyles = StyleSheet.create({
	optionContainer: {
		flexDirection: "row",
		alignItems: "center",
		...mv6,
	},
	radioButton: {
		width: verticalScale(16),
		height: verticalScale(16),
		borderRadius: BORDER.b8,
		borderWidth: 1,
		...mr10,
	},
	optionText: {
		...md,
		...clrBlack
	},
});
