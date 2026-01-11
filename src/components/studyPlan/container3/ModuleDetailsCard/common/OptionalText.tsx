import React, { memo } from "react";
import { StyleSheet } from "react-native";

import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { regular, sm } = commonStyles.text;
const { neutral } = colors;

// Interfaces
interface IOptionalText {
	isOptional?: boolean;
	testID: string;
}

const OptionalText = ({ isOptional, testID }: IOptionalText) => {
	if (!isOptional) return null;

	return (
		<RNText
			title={strings.OPTIONAL_TXT}
			style={styles.optionalText}
			testID={testID}
		/>
	);
};

const styles = StyleSheet.create({
	optionalText: {
		color: neutral.grey_07,
		...regular,
		...sm,
		lineHeight: verticalScale(18),
		marginBottom: verticalScale(4),
	},
});

export default memo(OptionalText);
