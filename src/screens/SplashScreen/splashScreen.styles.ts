import { StyleSheet } from "react-native";

import { colors } from "@assets/colors";

const { neutral, icon } = colors;

export const splashStyles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: neutral.white,
		flex: 1,
		justifyContent: "center",
	},
	logoTransitionBackground: {
		backgroundColor: icon.default_red,
	},
});

export default splashStyles;
