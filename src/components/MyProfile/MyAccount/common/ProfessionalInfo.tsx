import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IProfessionalInformation } from "@interface/myAccount.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;

const {
	text: { regular, md, sm },
} = commonStyles;
export const ProfessionalInfo = ({
	text,
	subText,
	description,
}: IProfessionalInformation) => (
	<View style={styles.listItem}>
		<View style={styles.itemRow}>
			<RNText style={styles.itemKey}>{text}</RNText>
			<RNText style={styles.itemValue}>{subText}</RNText>
			{description ? (
				<RNText style={styles.itemDescription}>{description}</RNText>
			) : (
				<></>
			)}
		</View>
	</View>
);

const styles = StyleSheet.create({
	itemDescription: {
		...regular,
		color: neutral.grey_07,
		...sm,
	},
	itemKey: {
		...regular,
		color: neutral.black,
		...md,
		lineHeight: verticalScale(18),
	},
	itemRow: {
		gap: verticalScale(4),
		justifyContent: "space-between",
	},
	itemValue: {
		...regular,
		color: neutral.grey_07,
		...sm,
	},
	listItem: {
		flex: 1,
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(12),
	},
});
