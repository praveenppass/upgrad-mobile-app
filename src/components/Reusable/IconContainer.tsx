import React, { memo } from "react";
import { C } from "@assets/constants";
import {
	type StyleProp,
	StyleSheet,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import RNText from "./RNText";

const {
	themes: {
		bg: { lightBlue },
	},
	commonStyles: {
		spacing: { g6 },
		text: { md, bold, clrBlue },
		align: { rowStart, itemsCenter },
	},
} = C;

interface IIconCardProps {
	title: string;
	icon: JSX.Element;
	color?: string;
	rootStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	iconContainerStyle?: StyleProp<TextStyle>;
}

function IconContainer({
	icon,
	title,
	rootStyle,
	textStyle,
	iconContainerStyle,
	color,
}: IIconCardProps) {
	return (
		<View style={[g6, rowStart, rootStyle]}>
			<View
				style={[
					styles.iconCard,
					{ backgroundColor: color ? color : lightBlue },
					itemsCenter,
					iconContainerStyle,
				]}
			>
				{icon}
			</View>
			<RNText title={title} style={[md, bold, clrBlue, textStyle]} />
		</View>
	);
}

export default memo(IconContainer);

const styles = StyleSheet.create({
	iconCard: {
		width: 22,
		height: 22,
		borderRadius: 90,
		aspectRatio: 1 / 1,
	},
});
