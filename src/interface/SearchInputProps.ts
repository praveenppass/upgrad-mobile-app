import {
	KeyboardTypeOptions,
	ReturnKeyTypeOptions,
	StyleProp,
	TextInputProps,
	TextStyle,
	ViewStyle,
} from "react-native";

interface SearchInputProps {
	value: string;
	editable?: boolean;
	placeholder: string;
	onSubmit?: () => void;
	autoFocus?:boolean;
	onBlur?:TextInputProps["onBlur"];
	selectTextOnFocus?: boolean;
	keyboardType?: KeyboardTypeOptions;
	returnKeyType?: ReturnKeyTypeOptions;
	textInputStyle?: StyleProp<TextStyle>;
	inputContainerStyle?: StyleProp<ViewStyle>;
	onInputHandler: (text: string) => void;
	autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
	placeholderTextColor?: string;
	showClearBtn: Boolean;
	onClear?: () => void;
}

export type { SearchInputProps };
