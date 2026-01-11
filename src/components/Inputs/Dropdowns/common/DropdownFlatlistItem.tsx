import React from "react";
import { Pressable, StyleSheet } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const {
	text: { md, regular },
} = commonStyles;

const { neutral } = colors;

interface IDropdownFlatlistItem {
	isActive: boolean;
	label: string;
	onPress: () => void;
}

const DropdownFlatlistItem = ({
	isActive,
	label,
	onPress,
}: IDropdownFlatlistItem) => (
	<Pressable
		onPress={onPress}
		style={[styles.modalItem, isActive && styles.modalItemActive]}
	>
		<RNText style={styles.modalItemText} title={label} />
	</Pressable>
);

export default DropdownFlatlistItem;

const styles = StyleSheet.create({
	modalItem: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(4),
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(14),
	},
	modalItemActive: {
		backgroundColor: neutral.grey_02,
	},
	modalItemText: {
		...md,
		...regular,
		color: neutral.grey_08,
	},
});
