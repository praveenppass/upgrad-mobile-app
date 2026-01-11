import React, { useEffect, useRef, useState } from "react";
import {
	I18nManager,
	NativeSyntheticEvent,
	StyleSheet,
	Text,
	TextInput,
	TextInputKeyPressEventData,
	TextStyle,
	View,
	ViewStyle,
	KeyboardTypeOptions,
	TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { commonStyles } from "@assets/styles";

interface SmoothOtpInputProps {
	value: string;
	codeLength?: number;
	cellSize?: number;
	cellSpacing?: number;
	placeholder?: string | React.ReactNode;
	mask?: string | React.ReactNode;
	maskDelay?: number;
	password?: boolean;
	autoFocus?: boolean;
	restrictToNumbers?: boolean;
	containerStyle?: ViewStyle;
	cellStyle?: ViewStyle;
	cellStyleFocused?: ViewStyle;
	cellStyleFilled?: ViewStyle;
	textStyle?: TextStyle;
	textStyleFocused?: TextStyle;
	animated?: boolean;
	animationFocused?: string | object;
	onFulfill?: (code: string) => void;
	onChangeText?: (text: string) => void;
	onBackspace?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
	keyboardType?: KeyboardTypeOptions;
	editable?: boolean;
	inputProps?: object;
	disableFullscreenUI?: boolean;
	testID?: string;
}

const { xlg } = commonStyles.text;

const styles = StyleSheet.create({
	containerDefault: {},
	// cellDefault: {
	//     borderColor: 'gray',
	//     borderWidth: 1,
	// },
	// cellFocusedDefault: {
	//     borderColor: 'black',
	//     borderWidth: 2,
	// },
	textStyleDefault: {
		color: "gray",
		...xlg,
	},
	textStyleFocusedDefault: {
		color: "black",
	},
});

const SmoothOtpInput: React.FC<SmoothOtpInputProps> = ({
	value = "",
	codeLength = 4,
	cellSize = 48,
	cellSpacing = 4,
	placeholder = "",
	mask = "*",
	maskDelay = 200,
	password = false,
	autoFocus = false,
	restrictToNumbers = false,
	containerStyle = styles.containerDefault,
	cellStyle,
	cellStyleFocused,
	cellStyleFilled,
	textStyle = styles.textStyleDefault,
	textStyleFocused = styles.textStyleFocusedDefault,
	animated = true,
	animationFocused = "pulse",
	onFulfill,
	onChangeText,
	onBackspace,
	onFocus,
	onBlur,
	keyboardType = "number-pad",
	editable = true,
	inputProps = {},
	disableFullscreenUI = true,
	testID,
}) => {
	const [maskDelayState, setMaskDelay] = useState(false);
	const [focused, setFocused] = useState(false);
	const ref = useRef<any>(null);
	const inputRef = useRef<TextInput>(null);
	let maskTimeout: NodeJS.Timeout;

	const animate = ({
		animation = "shake",
		duration = 650,
	}: {
		animation?: string;
		duration?: number;
	}) => {
		if (!animated) {
			return Promise.reject(new Error("Animations are disabled"));
		}
		return ref.current[animation](duration);
	};

	const shake = () => animate({ animation: "shake" });

	const focus = () => inputRef.current?.focus();
	const blur = () => inputRef.current?.blur();
	const clear = () => inputRef.current?.clear();

	const _inputCode = (code: string) => {
		if (restrictToNumbers) {
			code = (code.match(/[0-9]/g) || []).join("");
		}

		if (onChangeText) {
			onChangeText(code);
		}

		if (code.length === codeLength && onFulfill) {
			onFulfill(code);
		}

		const shouldMask = password && code.length > value.length;
		setMaskDelay(shouldMask);

		if (shouldMask) {
			clearTimeout(maskTimeout);
			maskTimeout = setTimeout(() => setMaskDelay(false), maskDelay);
		}
	};

	const _keyPress = (
		event: NativeSyntheticEvent<TextInputKeyPressEventData>,
	) => {
		if (
			event.nativeEvent.key === "Backspace" &&
			value === "" &&
			onBackspace
		) {
			onBackspace();
		}
	};

	const _onFocused = () => {
		setFocused(true);
		onFocus && onFocus();
	};

	const _onBlurred = () => {
		setFocused(false);
		onBlur && onBlur();
	};

	useEffect(() => {
		return () => clearTimeout(maskTimeout);
	}, []);

	return (
		<TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
			<Animatable.View
				ref={ref}
				style={[
					{
						alignItems: "stretch",
						flexDirection: "row",
						justifyContent: "center",
						position: "relative",
						width:
							cellSize * codeLength + cellSpacing * (codeLength - 1),
						height: cellSize,
					},
					containerStyle,
				]}
			>
				<View
					style={{
						position: "absolute",
						margin: 0,
						height: "100%",
						flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
						alignItems: "center",
						// width: "100%",
					}}
				>
					{Array.from({ length: codeLength }).map((_, idx) => {
						const cellFocused = focused && idx === value.length;
						const filled = idx < value.length;
						const last = idx === value.length - 1;
						const showMask =
							filled && password && (!maskDelayState || !last);
						const isPlaceholderText = typeof placeholder === "string";
						const isMaskText = typeof mask === "string";
						const pinCodeChar = value.charAt(idx);

						let cellText = null;
						if (filled || placeholder !== null) {
							if (showMask && isMaskText) {
								cellText = mask;
							} else if (!filled && isPlaceholderText) {
								cellText = placeholder;
							} else if (pinCodeChar) {
								cellText = pinCodeChar;
							}
						}

						const placeholderComponent = !isPlaceholderText
							? placeholder
							: null;
						const maskComponent = showMask && !isMaskText ? mask : null;
						const isCellText = typeof cellText === "string";

						return (
							<Animatable.View
								key={idx}
								style={[
									{
										width: cellSize,
										height: cellSize,
										marginLeft: cellSpacing / 2,
										marginRight: cellSpacing / 2,
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
									},
									cellStyle,
									cellFocused ? cellStyleFocused : {},
									filled ? cellStyleFilled : {},
								]}
								animation={
									idx === value.length && focused && animated
										? animationFocused
										: undefined
								}
								iterationCount="infinite"
								duration={500}
							>
								{isCellText && !maskComponent && (
									<Text
										style={[
											textStyle,
											cellFocused ? textStyleFocused : {},
										]}
									>
										{cellText}
									</Text>
								)}
								{!isCellText &&
									!maskComponent &&
									placeholderComponent}
								{isCellText && maskComponent}
							</Animatable.View>
						);
					})}
				</View>
				<TextInput
					disableFullscreenUI={disableFullscreenUI}
					value={value}
					ref={inputRef}
					onChangeText={_inputCode}
					onKeyPress={_keyPress}
					onFocus={_onFocused}
					onBlur={_onBlurred}
					spellCheck={false}
					autoFocus={autoFocus}
					keyboardType={keyboardType}
					numberOfLines={1}
					caretHidden
					maxLength={codeLength}
					selection={{ start: value.length, end: value.length }}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						opacity: 0,
						textAlign: "center",
					}}
					testID={testID}
					editable={editable}
					{...inputProps}
				/>
			</Animatable.View>
		</TouchableWithoutFeedback>
	);
};

export default SmoothOtpInput;
