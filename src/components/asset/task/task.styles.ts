import { StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

const taskStyles = StyleSheet.create({
	component: {
		marginBottom: verticalScale(20),
		marginHorizontal: horizontalScale(20),
	},
	endComponent: {
		marginHorizontal: horizontalScale(20),
	},
	groupSubmissionDetails: {
		marginTop: verticalScale(6),
	},
	main: {
		flex: 1,
	},
	submissionTemplateContainer: {
		marginHorizontal: horizontalScale(20),
	},
	topComponent: {
		marginTop: verticalScale(6),
	},
});

export default taskStyles;
