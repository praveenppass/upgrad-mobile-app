import React, { memo } from "react";
import { C } from "@assets/constants";
import { StyleSheet, TouchableOpacity } from "react-native";
import measures from "@utils/measures";
import RNText from "../RNText";
import { IButtonProps } from "@interface/app.interface";
import LinearGradient from "react-native-linear-gradient";
import ButtonLoader from "./ButtonLoader";

const {
	themes: { primary, text, bg },
	commonStyles: {
		align: { rowCenter },
		spacing: { g10, p12 },
		text: { md, bold, clrWhite },
	},
} = C;

const {
	BORDER: { b1 },
} = measures;

type NewTypes = {
	colors: (string | number)[];
};

type ExcludeTypes = {
	isWhite: boolean | undefined;
	isTransparent: boolean | undefined;
	isOutLineButton: boolean | undefined;
};
type GradientButtonType = Omit<IButtonProps, keyof ExcludeTypes> & NewTypes;

function GradientCustomButton({
	icon,
	rightIcon,
	title,
	btnStyle,
	isDisabled,
	onBtnHandler,
	titleStyle,
	colors,
	isLoading,
}: GradientButtonType) {
	return (
		<LinearGradient
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 1 }}
			colors={colors}
			style={[
				!isLoading && p12,
				rowCenter,
				isDisabled ? styles.disabledBtn : styles.blueBtn,
				btnStyle,
			]}
		>
			<TouchableOpacity
				style={[rowCenter, g10]}
				disabled={isDisabled}
				onPress={onBtnHandler}
			>
				{icon}
				{isLoading ? (
					<ButtonLoader />
				) : (
					<RNText
						title={title}
						style={[md, bold, clrWhite, titleStyle]}
					/>
				)}
				{rightIcon}
			</TouchableOpacity>
		</LinearGradient>
	);
}

export default memo(GradientCustomButton);

const styles = StyleSheet.create({
	whiteBtn: {
		backgroundColor: primary.color2,
	},
	transparentBtn: {
		backgroundColor: bg.transparent
	},
	disabledBtn: {
		backgroundColor: bg.disabled,
	},
	blueBtn: {
		backgroundColor: text.dark,
	},
	outLineBtn: {
		borderRadius: measures.BORDER.b6,
		borderWidth: b1,
		borderColor: primary.color3,
		backgroundColor: primary.color2,
	},
});
