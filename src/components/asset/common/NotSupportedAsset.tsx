import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { NotFoundAssetIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const {
	text: { regular, md, semiBold, xlg },
} = commonStyles;

const { neutral } = colors;

const NotSupportedAsset: React.FC = () => (
	<View style={styles.container}>
		<NotFoundAssetIcon
			height={verticalScale(120)}
			width={horizontalScale(180)}
		/>
		<RNText style={styles.title}>{strings.VIEW_ON_DESKTOP}</RNText>
		<RNText
			title={strings.VIEW_ON_DESKTOP_DESC}
			style={styles.description}
		/>
	</View>
);

export default NotSupportedAsset;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexGrow: 1,
		justifyContent: "center",
		paddingHorizontal: horizontalScale(24),
	},
	description: {
		...md,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(18),
		marginTop: verticalScale(12),
		textAlign: "center",
	},

	title: {
		...semiBold,
		...xlg,
		color: neutral.black,
		lineHeight: verticalScale(27),
		marginTop: verticalScale(12),
		textAlign: "center",
	},
});
