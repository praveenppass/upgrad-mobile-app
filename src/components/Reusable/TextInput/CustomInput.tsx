import React, { forwardRef, memo, Ref } from "react";
import {
	type KeyboardTypeOptions,
	ReturnKeyTypeOptions,
	StyleProp,
	StyleSheet,
	TextInput,
	View,
	ViewStyle,
} from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

import AuthInputError from "../AuthInputError";

interface CustomTextInputProps {
	viewStyle?: StyleProp<ViewStyle>;
	placeholder?: string;
	secure?: boolean;
	keyboard?: KeyboardTypeOptions;
	onChangeText?: (text: string) => void;
	value?: string;
	editable?: boolean;
	onSubmitEditing?: () => void;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	multiline?: boolean;
	errorMsg?: string;
	rightIcon?: JSX.Element;
	maxLength?: number;
	inputStyle?: StyleProp<ViewStyle>;
	returnKeyType?: ReturnKeyTypeOptions;
	autoCorrect?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
	leftIcon?: JSX.Element | boolean;
	errorStyle?: StyleProp<ViewStyle>;
	placeholderTextColor?: string;
	toggleSecure?: boolean;
	autoFocus?: boolean;
	hideErrorMsg?: boolean;
	numberOfLines?: number;
	borderColor?: string;
	isError?: boolean;
	isMob?: boolean; // Added isMob prop
}

const {
	themes: { text, primary, bg, snackbar },
} = C;

const {
	BORDER: { b1, b8 },
} = measures;

const CustomInput = forwardRef(
	(props: CustomTextInputProps, ref: Ref<TextInput>) => {
		const {
			viewStyle,
			placeholder,
			secure,
			keyboard,
			onChangeText,
			value,
			editable,
			borderColor,
			onSubmitEditing,
			autoCapitalize = "none",
			multiline = false,
			errorMsg,
			maxLength,
			inputStyle,
			returnKeyType,
			autoCorrect,
			onFocus,
			onBlur,
			autoFocus,
			placeholderTextColor,
			numberOfLines,
			rightIcon,
			leftIcon,
			isError,
			isMob, // Destructuring isMob prop
		} = props;

		return (
			<>
				<View
					style={[
						{
							borderColor: borderColor
								? borderColor
								: errorMsg
									? snackbar.error
									: value
										? text.drkOrange
										: bg.disabled,
						},
						styles.container,
						viewStyle,
					]}
				>
					{isMob && leftIcon ? <View>{leftIcon}</View> : leftIcon}

					<TextInput
						allowFontScaling={false}
						ref={ref}
						numberOfLines={numberOfLines}
						style={[
							styles.inputContainer,
							{
								paddingTop: multiline ? verticalScale(8) : 0,
								paddingBottom: multiline ? verticalScale(4) : 0,
							},
							inputStyle,
						]}
						placeholder={placeholder}
						placeholderTextColor={placeholderTextColor}
						secureTextEntry={secure}
						keyboardType={keyboard}
						onChangeText={onChangeText}
						value={value}
						editable={editable}
						onSubmitEditing={onSubmitEditing}
						autoCapitalize={autoCapitalize}
						multiline={multiline}
						maxLength={maxLength}
						autoFocus={autoFocus}
						autoCorrect={autoCorrect}
						onFocus={onFocus}
						onBlur={onBlur}
						returnKeyType={returnKeyType}
					/>
					{rightIcon}
				</View>
				{isError && errorMsg ? (
					<AuthInputError message={errorMsg} />
				) : null}
			</>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: primary.color2,
		borderRadius: b8,
		borderWidth: b1,
		flexDirection: "row",
		width: "100%",
	},
	inputContainer: {
		backgroundColor: primary.color2,
		borderRadius: b8,
		color: text.input,
		flex: 1,
		paddingHorizontal: horizontalScale(10),
		textAlignVertical: "top",
	},
});

export default memo(CustomInput);
