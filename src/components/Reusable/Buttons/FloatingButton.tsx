import React, { memo } from "react";
import { C } from "@assets/constants";
import measures from "@utils/measures";
import { moderateScale } from "@utils/functions";
import * as Animatable from "react-native-animatable";
import { IEntranceAnimation } from "@interface/app.interface";
import {
	StyleSheet,
	type ViewStyle,
	type StyleProp,
	type TextStyle,
	TouchableOpacity,
} from "react-native";
import RNText from "../RNText";

const {
	BORDER: { b1, b20 },
} = measures;

const {
	themes: { primary, text, border },
	commonStyles: {
		spacing: { ph12, pv8 },
		text: { md, bold, clrBlack },
		align: { rowCenter, selfCenter },
	},
} = C;

interface IFloatingButtonType {
	title?: string;
	visible?: boolean; // ** Incase if u want to hide the fab button pass boolean value as prop
	onFabPress: () => void;
	leftChildren?: JSX.Element;
	rightChildren?: JSX.Element;
	fabStyle?: StyleProp<ViewStyle>;
	animation?: string;
	titleStyle?: StyleProp<TextStyle>;
}

function FloatingButton({
	title,
	fabStyle,
	titleStyle,
	onFabPress,
	leftChildren,
	rightChildren,
	visible = true,
	animation
}: IFloatingButtonType) {
	if (!visible) {
		return;
	}
	const containerStyle = StyleSheet.compose(
		FloatingButtonStyle.floatingButton,
		fabStyle,
	);
	return (
		<Animatable.View
			delay={600}
			duration={400}
			animation={animation ?? IEntranceAnimation.SlideInUp}
		>
			<TouchableOpacity onPress={onFabPress} style={containerStyle}>
				{leftChildren && leftChildren}
				{title ? (
					<RNText
						title={title ?? ""}
						style={[
							md,
							clrBlack,
							bold,
							[FloatingButtonStyle.selectedTitle],
							titleStyle,
						]}
					/>
				) : null}
				{rightChildren && rightChildren}
			</TouchableOpacity>
		</Animatable.View>
	);
}

export default memo(FloatingButton);

export const FloatingButtonStyle = StyleSheet.create({
	floatingButton: {
		...pv8,
		...ph12,
		...rowCenter,
		...selfCenter,
		borderWidth: b1,
		borderRadius: b20,
		position: "absolute",
		bottom: moderateScale(70),
		borderColor: border.color1,
		backgroundColor: text.dark,
	},
	selectedTitle: {
		color: primary.color2,
	},
});
