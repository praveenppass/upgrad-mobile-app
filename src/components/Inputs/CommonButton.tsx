import React from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

export enum IButtonVariant {
	Primary,
	Secondary,
	Tertiary,
	Disabled,
}

const { md, semiBold } = commonStyles.text;
const { neutral, primary, cta, transparent } = colors;

const BUTTON_BACKGROUND_COLORS = {
	[IButtonVariant.Primary]: primary.red_05,
	[IButtonVariant.Secondary]: neutral.black,
	[IButtonVariant.Tertiary]: transparent,
	[IButtonVariant.Disabled]: cta.fill.disable,
};

const BUTTON_TEXT_COLORS = {
	[IButtonVariant.Primary]: neutral.white,
	[IButtonVariant.Secondary]: neutral.white,
	[IButtonVariant.Tertiary]: neutral.black,
	[IButtonVariant.Disabled]: neutral.black,
};

interface IButton {
	variant: IButtonVariant;
	onPress: () => void;
	title: string;
	isDisabled?: boolean;
	style?: StyleProp<ViewStyle>;
	isLoading?: boolean;
	icon?: (props: SvgProps) => React.JSX.Element;
	testID?: string;
}

interface IRenderButton {
	isLoading: boolean;
	textColor: string;
	title: string;
	icon?: (props: SvgProps) => React.JSX.Element;
}

const RenderButton = ({
	isLoading,
	textColor,
	title,
	icon: Icon,
}: IRenderButton): React.ReactNode => {
	if (isLoading) {
		return <Loading imageStyle={{ tintColor: textColor }} />;
	}
	return (
		<View style={styles.rowContainer}>
			{Icon ? (
				<Icon
					width={horizontalScale(24)}
					height={verticalScale(24)}
					fill={textColor}
				/>
			) : (
				<></>
			)}
			<RNText title={title} style={[styles.txt, { color: textColor }]} />
		</View>
	);
};

const CommonButton = ({
	variant,
	onPress,
	title,
	isDisabled,
	style,
	isLoading = false,
	icon,
	testID,
}: IButton) => {
	const effectiveVariant = isDisabled ? IButtonVariant.Disabled : variant;
	const backgroundColor = BUTTON_BACKGROUND_COLORS[effectiveVariant];
	const textColor = BUTTON_TEXT_COLORS[effectiveVariant];

	const containerStyles = [
		styles.container,
		variant === IButtonVariant.Tertiary && styles.btnBorder,
		{ backgroundColor },
		style,
	];

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			style={containerStyles}
			testID={testID || "common_button"}
		>
			<RenderButton
				isLoading={isLoading}
				textColor={textColor}
				title={title}
				icon={icon}
			/>
		</Pressable>
	);
};

export default CommonButton;

const styles = StyleSheet.create({
	btnBorder: {
		borderColor: neutral.black,
		borderWidth: horizontalScale(1),
	},
	container: {
		alignItems: "center",
		borderRadius: horizontalScale(8),
		flexDirection: "row",
		height: verticalScale(48),
		justifyContent: "center",
	},
	rowContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(8),
	},
	txt: {
		...md,
		...semiBold,
	},
});
