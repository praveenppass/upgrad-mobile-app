import React from "react";
import { View, StyleSheet } from "react-native";
import RNText from "@components/Reusable/RNText";
import { C } from "@assets/constants";
import measures from "@utils/measures";
import { horizontalScale } from "@utils/functions";

interface CustomBadgeProps {
	badge?: number | string;
	focused: boolean;
}

const {
	BORDER: { b90 },
} = measures;

const {
	themes: { border, bg },
	commonStyles: {
		align: { itemsCenter },
		text: { xxSm, regular, w600, clrWhite, clrBlue },
	},
} = C;

const CustomBadge: React.FC<CustomBadgeProps> = ({ badge, focused }) => {
	return (
		<View
			style={[styles.countView, focused ? styles.activeCountCard : null]}
		>
			<RNText
				title={`${badge}`}
				style={[styles.count, focused ? clrWhite : clrBlue]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	countView: {
		...itemsCenter,
		borderRadius: b90,
		width: horizontalScale(22),
		height: horizontalScale(22),
		backgroundColor: border.color1,
	},
	activeCountCard: {
		backgroundColor: bg.dark,
	},
	count: {
		...xxSm,
		...regular,
		...w600,
		gap: 8,
	},
});

export default CustomBadge;
