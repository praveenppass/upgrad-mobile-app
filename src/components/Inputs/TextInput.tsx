import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {
	KeyboardTypeOptions,
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps,
	StyleSheet,
	View,
} from "react-native";

import withFormContext from "@components/Inputs/withFormContext";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { AlertIcon } from "@assets/icons";

const {
	commonStyles: {
		text: { sm, md, regular, semiBold },
	},
} = C;
export interface ITextInputProps extends RNTextInputProps, UseControllerProps {
	label?: string;
	defaultValue?: string;
	isMandatory?: boolean;
	description?: string;
	textType?: KeyboardTypeOptions;
}

const TextInput = (props: ITextInputProps) => {
	const {
		name,
		label,
		rules,
		defaultValue,
		isMandatory,
		description,
		disabled,
		textType,
		...inputProps
	} = props;
	const {
		field,
		fieldState: { error },
	} = useController({ name, rules, defaultValue });

	return (
		<View style={styles.container}>
			<View style={styles.txtContainer}>
				{label ? (
					<>
						<RNText style={styles.label} title={label} />
						{isMandatory ? (
							<RNText style={styles.starTxt} title="*" />
						) : (
							<></>
						)}
					</>
				) : (
					<></>
				)}
			</View>

			<RNTextInput
				style={[styles.input, error ? styles.errorInput : null]}
				onChangeText={field.onChange}
				onBlur={field.onBlur}
				value={field.value}
				placeholderTextColor={colors.neutral.grey_05}
				editable={!disabled}
				keyboardType={textType}
				{...inputProps}
			/>

			{error?.message ? (
				<View style={styles.errorContainer}>
					<AlertIcon />
					<RNText style={styles.errorLabel} title={error.message} />
				</View>
			) : (
				<></>
			)}

			{description ? (
				<RNText style={styles.discTxt} title={description} />
			) : (
				<></>
			)}
		</View>
	);
};

export default withFormContext(TextInput);

const styles = StyleSheet.create({
	container: {},
	discTxt: {
		color: colors.neutral.grey_07,
		lineHeight: horizontalScale(19),
		marginTop: horizontalScale(5),
		...sm,
		...regular,
	},
	errorContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: verticalScale(5),
		marginTop: verticalScale(5),
	},
	errorInput: {
		borderColor: colors.state.error_red,
	},
	errorLabel: {
		color: colors.state.error_red,
		...regular,
		...sm,
	},
	input: {
		borderColor: colors.neutral.grey_05,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		color: colors.neutral.grey_07,
		height: horizontalScale(48),
		padding: horizontalScale(10),
		paddingLeft: horizontalScale(16),
		...md,
		...regular,
	},
	label: {
		color: colors.neutral.black,
		...md,
		...semiBold,
		marginBottom: verticalScale(6),
	},
	starTxt: {
		...md,
		...semiBold,
		color: colors.state.error_red,
	},
	txtContainer: {
		flexDirection: "row",
		gap: verticalScale(5),
	},
});
