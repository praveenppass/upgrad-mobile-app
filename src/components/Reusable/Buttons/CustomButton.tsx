import LottieView from "lottie-react-native";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { moderateScale } from "@utils/functions";
import measures from "@utils/measures";

import { IButtonProps } from "@interface/app.interface";

import { C } from "@assets/constants";

import RNText from "../RNText";

const {
	themes: { primary, text, bg },
	commonStyles: {
		align: { rowCenter },
		spacing: { g10, p12 },
		text: { md, bold, clrBlack, clrWhite },
	},
} = C;

const {
	BORDER: { b1 },
} = measures;

const lottie_file = require("@assets/animations/button_loader.json");

const ButtonLoader = () => {
	return (
		<LottieView
			loop
			autoPlay
			style={styles.lottieStyle}
			source={lottie_file}
			resizeMode={"contain"}
		/>
	);
};

const CustomButton = ({
	icon,
	rightIcon,
	title,
	isWhite,
	btnStyle,
	isDisabled,
	onBtnHandler,
	isTransparent,
	titleStyle,
	isOutLineButton,
	isLoading,
	isExtensionDisable,
}: IButtonProps) => {
	return (
		<TouchableOpacity
			disabled={isDisabled || isExtensionDisable}
			onPress={onBtnHandler}
			style={[
				p12,
				g10,
				rowCenter,
				isOutLineButton && styles.outLineBtn,
				isDisabled
					? styles.disabledBtn
					: isExtensionDisable
						? styles.deadlineDisabledBtn
						: isTransparent
							? styles.transparentBtn
							: isWhite
								? styles.whiteBtn
								: styles.blueBtn,
				btnStyle,
				!isLoading && p12, // Ensures p12 is applied only when not loading
			]}
		>
			{icon}
			{isLoading ? (
				<View style={p12}>
					<ButtonLoader />
				</View>
			) : (
				<RNText
					title={title}
					style={[
						md,
						bold,
						(isTransparent ?? isWhite) ? clrBlack : clrWhite,
						titleStyle,
					]}
				/>
			)}
			{rightIcon}
		</TouchableOpacity>
	);
};

export default memo(CustomButton);

const styles = StyleSheet.create({
	blueBtn: {
		backgroundColor: text.drkRed,
	},
	deadlineDisabledBtn: {
		backgroundColor: "transparent",
	},
	disabledBtn: {
		backgroundColor: bg.disabled,
	},
	lottieStyle: {
		height: moderateScale(24),
		width: moderateScale(24),
	},
	outLineBtn: {
		backgroundColor: primary.color2,
		borderColor: primary.color3,
		borderRadius: measures.BORDER.b6,
		borderWidth: b1,
	},
	transparentBtn: {
		backgroundColor: "transparent",
	},
	whiteBtn: {
		backgroundColor: primary.color2,
	},
});
