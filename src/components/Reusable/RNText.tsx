import React, { memo } from "react";
import {
	type StyleProp,
	StyleSheet,
	Text,
	type TextProps,
	type TextStyle,
} from "react-native";

import { useContentRTL } from "@hooks/useContentRTL";

import { colors } from "@assets/colors";
import { fontFamily } from "@assets/fonts";

interface CustomTextProps extends TextProps {
	title?: string | number;
	children?: React.ReactNode;
	style?: StyleProp<TextStyle>;
	/**
	 * Enable automatic RTL text alignment based on translation language
	 * Set to true for content that should adapt to Arabic/Hebrew RTL
	 */
	enableRTL?: boolean;
}

// 'style' prop allows you to apply custom styles to the text
// 'children' prop represents the text content
// 'enableRTL' enables automatic RTL support for translated content
// 'rest' represents any additional props passed to the component

const RNText = ({
	style,
	title,
	children,
	enableRTL = false,
	...rest
}: CustomTextProps) => {
	const { textAlign, writingDirection } = useContentRTL();

	// Apply RTL styles only if enableRTL is true
	const rtlStyle: TextStyle = enableRTL
		? {
				textAlign,
				writingDirection,
			}
		: {};

	return (
		<Text
			allowFontScaling={false}
			style={[styles.textStyle, rtlStyle, style]}
			{...rest}
		>
			{title}
			{children ?? null}
		</Text>
	);
};

const styles = StyleSheet.create({
	textStyle: {
		color: colors.neutral.black,
		fontFamily: fontFamily.Regular,
	},
});

export default memo(RNText);
