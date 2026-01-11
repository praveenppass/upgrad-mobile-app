import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import RNText from "@components/Reusable/RNText";
import { C } from "@assets/constants";

const {
	themes: { text },
	commonStyles: {
		spacing: { mv4 },
		text: { med, bold },
	},
} = C;

interface IAssetExtensionProps {
	onExtensionOnPress?: () => void;
	title?: string;
}
const AssetExtension = ({
	onExtensionOnPress,
	title,
}: IAssetExtensionProps) => {
	return (
		<>
			<TouchableOpacity onPress={onExtensionOnPress}>
				<RNText title={title} style={styles.text} />
			</TouchableOpacity>
		</>
	);
};
export default AssetExtension;

const styles = StyleSheet.create({
	text: {
		color: text.skyBlue,
		textDecorationLine: "underline",
		...med,
		...bold,
		...mv4,
	},
});
