import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const {
	text: { md, regular },
} = commonStyles;

const { neutral } = colors;

interface IEmptyDropdown {
	hideDropdown?: boolean;
	title: string;
}

const EmptyDropdown = ({ hideDropdown = false, title }: IEmptyDropdown) => {
	if (hideDropdown) return <></>;

	return (
		<View style={styles.emptyContainer}>
			<RNText style={styles.emptyText} title={title} />
		</View>
	);
};

const styles = StyleSheet.create({
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: verticalScale(16),
	},
	emptyText: {
		...md,
		...regular,
		color: neutral.grey_06,
	},
});

export default EmptyDropdown;
