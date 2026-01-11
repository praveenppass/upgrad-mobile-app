import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

const htmlContentStyles = StyleSheet.create({
	component: {
		marginBottom: verticalScale(20),
		marginHorizontal: horizontalScale(20),
	},
	endComponent: {
		marginHorizontal: horizontalScale(20),
	},
	main: {
		flex: 1,
		marginTop: verticalScale(12),
	},
	onlineEditorComponent: {
		marginHorizontal: horizontalScale(20),
	},
});

export default htmlContentStyles;
