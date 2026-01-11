import React from "react";
import { Pressable, StyleSheet } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { CloseIcon } from "@assets/icons";

const { neutral } = colors;

interface IEventFilterChip {
	title: string;
	onPress: () => void;
}

const EventFilterChip = ({ title, onPress }: IEventFilterChip) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<RNText style={styles.text} numberOfLines={1}>
				{title}
			</RNText>
			<CloseIcon color={neutral.black} />
		</Pressable>
	);
};

export default EventFilterChip;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(4),
		flexDirection: "row",
		gap: horizontalScale(4),
		marginVertical: verticalScale(3),
		maxWidth: horizontalScale(150),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(8),
	},

	text: {
		color: neutral.black,
	},
});
