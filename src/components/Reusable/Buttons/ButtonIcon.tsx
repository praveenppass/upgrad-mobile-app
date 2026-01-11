import React, { memo } from "react";
import {
	Image,
	type ViewStyle,
	type StyleProp,
	type ImageStyle,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

interface IconButtonProps {
	onPress: () => void;
	icon: JSX.Element | string;
	iconStyle?: StyleProp<ImageStyle>;
	buttonStyle?: StyleProp<ViewStyle>;
}

function ButtonIcon({
	icon,
	onPress,
	buttonStyle,
	iconStyle,
}: IconButtonProps) {
	return (
		<TouchableOpacity
			style={[styles.button, buttonStyle]}
			onPress={onPress}
		>
			{typeof icon === "string" ? (
				<Image
					source={{ uri: icon }}
					style={[styles.icon, iconStyle]}
				/>
			) : (
				icon
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f4f5f7",
		borderRadius: 6,
		height: 48,
	},
	icon: {
		width: 20,
		height: 20,
	},
});

export default memo(ButtonIcon);
