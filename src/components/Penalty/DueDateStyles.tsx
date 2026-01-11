import { StyleSheet } from "react-native";

import { horizontalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	themes: { bg },
	commonStyles: {
		spacing: { p4 },
		text: { sm },
		align: { selfStart },
	},
} = C;
const { BORDER } = measures;

export const dueDateStyles = StyleSheet.create({
	main: {
		marginTop: horizontalScale(4),
		...selfStart,
	},
	
	optionalStyle: { color: bg.grey, ...sm },
});
