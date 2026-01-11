declare module "*.svg" {
	import type React from "react";
	import { type SvgProps } from "react-native-svg";

	const content: React.FC<SvgProps<SVGSVGElement>>;
	export default content;
}

declare module "react-native-smooth-pincode-input" {
	import { ReactElement, Component } from "react";
	import {
		StyleProp,
		ViewStyle,
		TextStyle,
		TextInputProps,
	} from "react-native";
	type SmoothPinCodeInputProps = {
		value?: string;
		codeLength?: number;
		cellSize?: number;
		cellSpacing?: number;
		placeholder?: string | ReactElement;
		mask?: string | ReactElement;
		maskDelay?: number;
		password?: boolean;
		autoFocus?: boolean;
		restrictToNumbers?: boolean;
		containerStyle?: StyleProp<ViewStyle>;
		cellStyle?: StyleProp<ViewStyle>;
		cellStyleFocused?: StyleProp<ViewStyle>;
		cellStyleFilled?: StyleProp<ViewStyle>;
		textStyle?: StyleProp<TextStyle>;
		textStyleFocused?: StyleProp<TextStyle>;
		animated?: boolean;
		animationFocused?: string | unknown;
		onFulfill?: (value: string) => void;
		onChangeText?: TextInputProps["onChangeText"];
		onBackspace?: () => void;
		onTextChange?: TextInputProps["onChangeText"];
		testID?: unknown;
		onFocus?: TextInputProps["onFocus"];
		onBlur?: TextInputProps["onBlur"];
		keyboardType?: string;
		editable?: boolean;
		inputProps?: TextInputProps;
	};

	type SmoothInputSate = {
		maskDelay: boolean;
		focused: boolean;
	};

	export default class SmoothPinCodeInput extends Component<
		SmoothPinCodeInputProps,
		SmoothInputSate
	> {}
}

declare module "*.webp";
declare module "*.png";
declare module "*.gif";
declare module "@instana/react-native-agent";

declare const __COMMIT_ID__: string;
