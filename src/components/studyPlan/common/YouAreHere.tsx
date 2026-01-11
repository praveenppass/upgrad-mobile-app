import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { medium, tiny } = commonStyles.text;

/**
 * YouAreHereTag - A component that displays a "You're here" indicator
 * Used to highlight the current asset in study plan screens
 *
 * @returns JSX.Element - The rendered tag component
 */

const YouAreHereTag = () => (
	<View style={styles.youAreHereContainer}>
		<RNText
			style={styles.youAreHereText}
			title={getString("common.youAreHere")}
		/>
	</View>
);

export default YouAreHereTag;

const styles = StyleSheet.create({
	youAreHereContainer: {
		alignItems: "center",
		borderColor: colors.highlight.text_blue,
		borderRadius: horizontalScale(10),
		borderWidth: 0.5,
		justifyContent: "center",
		paddingHorizontal: horizontalScale(5),
		paddingVertical: verticalScale(3),
	},
	youAreHereText: {
		...medium,
		...tiny,
		color: colors.highlight.text_blue,
	},
});
