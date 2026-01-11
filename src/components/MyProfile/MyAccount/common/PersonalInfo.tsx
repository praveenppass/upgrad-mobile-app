import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IPersonalInformation } from "@interface/myAccount.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;

const {
	text: { regular, sm, medium },
} = commonStyles;
const PersonalInfo = ({ text, subText, description }: IPersonalInformation) => (
	<View style={styles.listItemPersonal}>
		<View style={styles.itemRowPersonal}>
			<RNText style={styles.itemPersonalKey}>{text}</RNText>
			<RNText style={styles.itemPersonalValue}>{subText}</RNText>
			{description && (
				<RNText style={styles.itemDescription}>{description}</RNText>
			)}
		</View>
	</View>
);

export default PersonalInfo;

const styles = StyleSheet.create({
	itemDescription: {
		...regular,
		color: neutral.grey_07,
		...sm,
	},
	itemPersonalKey: {
		...medium,
		color: neutral.black,
		...sm,
		lineHeight: verticalScale(18),
	},
	itemPersonalValue: {
		...regular,
		color: neutral.grey_07,
		...sm,
	},
	itemRowPersonal: {
		justifyContent: "space-between",
	},
	listItemPersonal: {
		flex: 1,
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(8),
	},
});
