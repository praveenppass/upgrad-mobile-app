import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import withFormContext from "@components/Inputs/withFormContext";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { AlertIcon } from "@assets/icons";

const {
	commonStyles: {
		text: { sm, regular },
	},
} = C;
export interface ICheckboxInput extends UseControllerProps {
	description?: string;
	defaultValue?: boolean;
	isMandatory: boolean;
	label: string;
}

const CheckboxInput = (props: ICheckboxInput) => {
	const {
		name,
		defaultValue = false,
		description,
		isMandatory,
		disabled,
		label,
	} = props;

	const {
		field,
		fieldState: { error },
	} = useController({ name, defaultValue });

	return (
		<View style={styles.container}>
			<View style={styles.checkboxContainer}>
				<Pressable
					style={[
						styles.checkbox,
						error?.message ? styles.errorCheckbox : null,
					]}
					onPress={() => !disabled && field.onChange(!field.value)}
				>
					{field.value && <View style={styles.tickTail} />}
				</Pressable>
				{label ? (
					<RNText style={styles.label}>
						{label}
						{isMandatory ? (
							<RNText style={styles.redColor}> *</RNText>
						) : (
							<></>
						)}
					</RNText>
				) : null}
			</View>
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

export default withFormContext(CheckboxInput);

const styles = StyleSheet.create({
	checkbox: {
		alignItems: "center",
		borderColor: colors.neutral.grey_07,
		borderRadius: verticalScale(3),
		borderWidth: verticalScale(2),
		height: verticalScale(18),
		justifyContent: "center",
		width: horizontalScale(18),
	},
	checkboxContainer: {
		flexDirection: "row",
		gap: horizontalScale(7),
	},
	container: {},
	discTxt: {
		color: colors.neutral.grey_07,
		lineHeight: horizontalScale(19),
		marginTop: horizontalScale(5),
		...sm,
		...regular,
	},
	errorCheckbox: {
		borderColor: colors.state.error_red,
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
	label: {
		color: colors.neutral.grey_07,
		...regular,
		...sm,
		lineHeight: verticalScale(18),
	},
	redColor: { color: colors.icon.default_red },
	tickTail: {
		borderColor: colors.neutral.grey_07,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		borderWidth: horizontalScale(2),
		height: verticalScale(10),
		transform: [{ rotate: "45deg" }],
		width: horizontalScale(6),
	},
});
