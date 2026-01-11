import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { cta, bg, group } = colors;

const {
	text: { sm, light },
} = commonStyles;

interface IGroupMemberInitials {
	initials: string;
	style?: StyleProp<ViewStyle>;
	active?: boolean;
	index: number;
}

interface IGroupMemberInitialsSkeleton {
	style?: StyleProp<ViewStyle>;
}

const colorArray = [
	group.group_01,
	group.group_02,
	group.group_03,
	group.group_04,
	group.group_05,
	group.group_06,
	group.group_07,
	group.group_08,
];

export const GroupMemberInitialsSkeleton = ({
	style,
}: IGroupMemberInitialsSkeleton) => (
	<Skeleton
		style={[styles.iconContainer, styles.skeletonIconContainer, style]}
	/>
);

const GroupMemberInitials: React.FC<IGroupMemberInitials> = ({
	initials,
	style,
	active,
	index,
}) => (
	<View
		style={[
			styles.iconContainer,
			{
				backgroundColor: getColorByIndex(index),
				borderColor: active ? group.border : bg.fill.bg_default,
			},
			style,
		]}
	>
		<RNText style={styles.initialsText} title={initials} />
	</View>
);

const getColorByIndex = (index: number) => {
	return colorArray[index % colorArray.length];
};
const styles = StyleSheet.create({
	iconContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(14),
		borderWidth: horizontalScale(1),
		height: horizontalScale(28),
		justifyContent: "center",
		width: horizontalScale(28),
	},
	initialsText: {
		color: cta.text.default_primary,
		...sm,
		...light,
		alignItems: "center",
		justifyContent: "center",
		lineHeight: verticalScale(15),
		textAlign: "center",
	},
	skeletonIconContainer: {
		borderWidth: 0,
	},
});

export default GroupMemberInitials;
