import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

interface IOptionalAssetBanner {
	style?: StyleProp<ViewStyle>;
}

const { regular, sm } = commonStyles.text;

const OptionalAssetBanner = ({ style }: IOptionalAssetBanner) => (
	<View style={[styles.container, style]}>
		<RNText title={strings.OPTIONAL_ASSET} style={styles.text} />
	</View>
);

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-start",
		backgroundColor: colors.neutral.grey_02,
		borderRadius: horizontalScale(2),
		paddingHorizontal: horizontalScale(4),
	},
	text: {
		color: colors.neutral.grey_06,
		lineHeight: verticalScale(20),
		...sm,
		...regular,
	},
});

export default OptionalAssetBanner;
