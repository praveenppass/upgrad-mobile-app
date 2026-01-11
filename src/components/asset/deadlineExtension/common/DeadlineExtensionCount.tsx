import React from "react";
import { StyleSheet } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

const { neutral } = colors;

interface IDeadlineExtensionCount {
	showExtensions: boolean;
	availableExtensions: number;
	totalExtensionsAllowed: number;
}

const DeadlineExtensionCount = ({
	showExtensions,
	availableExtensions,
	totalExtensionsAllowed,
}: IDeadlineExtensionCount) => {
	if (!showExtensions) return <></>;

	return (
		<RNText
			style={styles.extensionAvailableText}
			title={strings.EXTENSIONS_AVAILABLE}
		>
			<RNText
				style={styles.totalExtensionText}
				title={`${availableExtensions ?? 0}/${totalExtensionsAllowed ?? 0}`}
			/>
		</RNText>
	);
};

export default DeadlineExtensionCount;

const styles = StyleSheet.create({
	extensionAvailableText: {
		color: neutral.black,
		fontStyle: "italic",
		marginTop: horizontalScale(4),
	},
	totalExtensionText: {
		color: neutral.black,
		fontStyle: "italic",
	},
});
