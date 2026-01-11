import React from "react";
import { StyleSheet, View } from "react-native";
import { C } from "@assets/constants";
import RNText from "@components/Reusable/RNText";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		align: { container },
	},
} = C;

export default function Skills() {
	return (
		<View style={styles.containerStyle}>
			<RNText title={strings.SKILLS} />
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: { ...container },
});
