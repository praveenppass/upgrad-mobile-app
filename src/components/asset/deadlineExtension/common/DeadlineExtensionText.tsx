import React from "react";
import { StyleSheet } from "react-native";

import RNText from "@components/Reusable/RNText";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { sm } = commonStyles.text;

interface IDeadlineExtensionText {
	extensionText: string;
}

const DeadlineExtensionText = ({ extensionText }: IDeadlineExtensionText) => {
	if (!extensionText) return <></>;

	return <RNText style={styles.deadlineDesc} title={extensionText} />;
};

export default DeadlineExtensionText;

const styles = StyleSheet.create({
	deadlineDesc: {
		color: neutral.grey_08,
		...sm,
	},
});
