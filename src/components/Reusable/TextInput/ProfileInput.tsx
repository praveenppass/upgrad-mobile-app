import React, { forwardRef, memo, type Ref } from "react";
import {
	type KeyboardTypeOptions,
	type ReturnKeyTypeOptions,
	StyleProp,
	StyleSheet,
	type TextInput,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";
import { type ThemeProp } from "react-native-paper/lib/typescript/types";

import RNText from "@components/Reusable/RNText";

import useDebounce from "@hooks/useDebounce";

import { C } from "@assets/constants";
import { fontFamily } from "@assets/fonts";
import { strings } from "@assets/strings";

export interface IInputProps {
	value: string;
	label: string;
	editable?: boolean;
	maxLength?: number;
	isError?: boolean;
	placeholder: string;
	onSubmit?: () => void;
	onInputClick?: () => void;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	selectTextOnFocus?: boolean;
	inputStyle?: StyleProp<TextStyle>;
	rootViewStyle?: StyleProp<ViewStyle>;
	keyboardType?: KeyboardTypeOptions;
	returnKeyType?: ReturnKeyTypeOptions;
	numberOfLines?: number;
	onInputHandler?: (text: string) => void;
	debounceHandler?: (text: string) => void;
	autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
	description?: string;
	isBottomSheet?: boolean;
	disabled?: boolean;
	isButton?: boolean;
	mandatory?: boolean;
	multiline?: boolean;
}

const {
	themes: { text, primary, border, bg },
	commonStyles: {
		spacing: { g6, mt8 },
		text: { md, clrBlack, bold, clrLightBlue, sm },
		align: { row },
	},
} = C;

const ProfileInput = forwardRef(
	(
		{
			label,
			value,
			editable,
			onSubmit,
			leftIcon,
			rightIcon,
			maxLength,
			numberOfLines,
			inputStyle,
			placeholder,
			keyboardType,
			onInputClick,
			returnKeyType,
			autoCapitalize,
			onInputHandler,
			debounceHandler,
			selectTextOnFocus,
			description,
			isError,
			rootViewStyle,
			disabled,
			mandatory,
			isButton = true,
			multiline = false,
		}: IInputProps,
		ref: Ref<TextInput>,
	) => {
		const handleChangeTextEvent = useDebounce((text: string) => {
			if (debounceHandler) {
				debounceHandler(text);
			}
		}, 1000);

		const theme: ThemeProp = {
			dark: false,
			colors: {
				text: text.darkBlue,
				error: primary.error,
				primary: text.darkBlue,
				background: primary.color2,
				placeholder: text.darkBlue,
			},
			fonts: {
				default: {
					fontFamily: fontFamily.Regular,
				},
				regular: {
					fontFamily: fontFamily.Regular,
				},
			},
		};
		const txtInputStyle = StyleSheet.compose(
			[styles.input, disabled && styles.disabledInputBg],
			inputStyle,
		);

		const onChangeText = (text: string) => {
			if (onInputHandler) onInputHandler(text);
			if (debounceHandler) handleChangeTextEvent(text);
		};

		const renderInput = () => (
			<PaperTextInput
				ref={ref}
				onPressIn={onInputClick}
				value={value}
				theme={theme}
				mode="outlined"
				left={leftIcon}
				right={rightIcon}
				multiline={multiline}
				error={isError}
				autoCorrect={false}
				editable={editable}
				style={txtInputStyle}
				maxLength={maxLength}
				textColor={disabled ? bg.disabled : text.dark}
				numberOfLines={numberOfLines}
				allowFontScaling={false}
				placeholder={placeholder}
				onSubmitEditing={onSubmit}
				keyboardType={keyboardType}
				outlineColor={border.color3}
				onChangeText={onChangeText}
				returnKeyType={returnKeyType}
				autoCapitalize={autoCapitalize}
				activeOutlineColor={text.darkBlue}
				placeholderTextColor={bg.disabled}
				selectTextOnFocus={selectTextOnFocus}
				disabled={disabled}
			/>
		);
		return (
			<View style={[g6, rootViewStyle]}>
				<View style={row}>
					<RNText title={label} style={styles.labelStyle} />
					{mandatory ? (
						<RNText
							title={strings.MANDATORY}
							style={[
								styles.labelStyle,
								{ color: primary.error },
							]}
						/>
					) : null}
				</View>

				{isButton ? (
					<TouchableOpacity onPress={onInputClick as () => void}>
						<View pointerEvents="none">{renderInput()}</View>
					</TouchableOpacity>
				) : (
					renderInput()
				)}
				{description && (
					<RNText
						style={styles.descriptionTextStyle}
						title={description}
					/>
				)}
			</View>
		);
	},
);

const styles = StyleSheet.create({
	descriptionTextStyle: {
		...mt8,
		...clrLightBlue,
		...sm,
		lineHeight: 19,
	},
	disabledInputBg: {
		backgroundColor: bg.chip,
	},
	disabledLabeStyle: {
		color: bg.disabled,
	},
	input: {
		borderColor: border.color3,
	},
	labelStyle: {
		...md,
		...bold,
		...clrBlack,
	},
});

export default memo(ProfileInput);
