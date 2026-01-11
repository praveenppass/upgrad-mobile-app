import React, { memo } from "react";
import { C } from "@assets/constants";
import CustomButton from "./CustomButton";
import { type IButtonProps } from "@interface/app.interface";
import {
	View,
	ViewStyle,
	StyleProp,
	StyleSheet,
	SafeAreaView,
} from "react-native";

const {
	themes: { primary },
	commonStyles: {
		spacing: { p20 },
		align: { absolute },
	},
} = C;

interface IStickyButton extends Partial<IButtonProps> {
	rootStyle?: StyleProp<ViewStyle>;
	view?: JSX.Element;
}

function StickyButton(props: IStickyButton) {
	return (
		<View style={[styles.stickyContainer, props.rootStyle]}>
			<SafeAreaView>
				{props.view ? (
					props.view
				) : (
					<CustomButton {...(props as IButtonProps)} />
				)}
			</SafeAreaView>
		</View>
	);
}

export default memo(StickyButton);

const styles = StyleSheet.create({
	stickyContainer: {
		...p20,
		bottom: 0,
		...absolute,
		width: "100%",
		backgroundColor: primary.color2,
		elevation: 5,
		borderTopWidth: 0.1,
		borderTopColor: primary.color3,
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 1,
		shadowRadius: 6,
	},
});
