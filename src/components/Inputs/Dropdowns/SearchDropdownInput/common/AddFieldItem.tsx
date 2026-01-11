import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { AddSearchDropdownIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

interface IAddFieldItem {
	hideItem?: boolean;
	onFieldPress: () => void;
	label: string;
}

const {
	text: { md, semiBold, xxSm, regular },
} = commonStyles;

const { highlight, neutral } = colors;

const AddFieldItem = ({ onFieldPress, label, hideItem }: IAddFieldItem) => {
	if (hideItem) return <></>;

	return (
		<Pressable onPress={onFieldPress} style={styles.modalItem}>
			<View style={styles.addButton}>
				<AddSearchDropdownIcon width={8} height={8} />
				<RNText style={styles.addButtonText} title={strings.ADD} />
			</View>
			<RNText style={styles.modalItemText} title={label} />
		</Pressable>
	);
};

export default AddFieldItem;

const styles = StyleSheet.create({
	addButton: {
		alignItems: "center",
		backgroundColor: highlight.bg_blue,
		borderColor: highlight.text_blue,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		columnGap: horizontalScale(2),
		flexDirection: "row",
		paddingHorizontal: horizontalScale(5),
	},
	addButtonText: {
		color: highlight.text_blue,
		...xxSm,
		...semiBold,
	},
	modalItem: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(4),
		columnGap: horizontalScale(4),
		flexDirection: "row",
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(14),
	},
	modalItemText: {
		...md,
		...regular,
		color: neutral.grey_08,
		flex: 1,
		lineHeight: verticalScale(19),
		...semiBold,
	},
});
