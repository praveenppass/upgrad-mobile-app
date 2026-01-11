import React, { useCallback } from "react";
import { Controller, FieldErrors, UseFormReturn } from "react-hook-form";
import { TextInput, View } from "react-native";

import { styles } from "@components/asset/classOpinion";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

const { neutral } = colors;

interface CommonTextInputFormProps {
	control: UseFormReturn<{ description: string }>["control"];
	name: "description";
	errors: FieldErrors<{ description: string }>;
	onSubmit: () => void;
	minLength: number;
	maxLength: number;
	currentResponse?: string;
	isModal?: boolean;
	textInputStyle?: object;
	isLoading: boolean;
	isValid: boolean;
	placeHolder?: string;
	minMaxWordLimitMessage?: string;
}

const CommonTextInputForm: React.FC<CommonTextInputFormProps> = ({
	control,
	name,
	onSubmit,
	minLength,
	maxLength,
	currentResponse = "",
	isModal,
	textInputStyle,
	errors,
	isLoading,
	isValid,
	placeHolder,
	minMaxWordLimitMessage,
}) => {
	const countWords = (text: string) => {
		return text.trim().split(/\s+/).length;
	};

	const validateTextInput = useCallback(
		(value: string) => {
			const wordCount = countWords(value);
			if (wordCount < minLength) return false;
			if (wordCount > maxLength) return strings.MAX_WORD_LIMIT_MESSAGE;
			return true;
		},
		[minLength, maxLength, countWords],
	);

	return (
		<View>
			<Controller
				control={control}
				name={name}
				defaultValue={currentResponse}
				render={({ field: { onChange, onBlur, value } }) => {
					const handleTextChange = (value: string) => {
						onChange(value);
					};

					return (
						<View style={styles.textInputContainer}>
							<TextInput
								multiline
								value={value}
								style={[styles.textInput, textInputStyle]}
								placeholder={placeHolder}
								placeholderTextColor={neutral.grey_04}
								returnKeyType="done"
								onChangeText={handleTextChange}
								onBlur={onBlur}
								selectTextOnFocus={false}
							/>
						</View>
					);
				}}
				rules={{
					required: {
						value: true,
						message: strings.MIN_WORD_LIMIT_MESSAGE,
					},
					validate: validateTextInput,
				}}
			/>

			{errors[name]?.message && (
				<RNText
					title={errors[name]?.message}
					style={styles.errorStyle}
				/>
			)}

			<RNText
				title={minMaxWordLimitMessage}
				style={styles.wordLimitMessage}
			/>

			<CommonButton
				title={isModal ? strings.SAVE : strings.SUBMIT}
				onPress={onSubmit}
				isDisabled={!isValid || isLoading}
				variant={IButtonVariant.Primary}
				isLoading={isLoading}
			/>
		</View>
	);
};

export default CommonTextInputForm;
