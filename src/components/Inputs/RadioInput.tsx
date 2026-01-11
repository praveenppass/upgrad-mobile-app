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
		text: { sm, regular, md, semiBold, medium },
	},
} = C;

export enum IRadioInputSize {
	LARGE,
	SMALL,
}
export interface IRadioValue {
	label: string;
	value: string;
}
export interface IRadioInputProps extends UseControllerProps {
	defaultValue?: IRadioValue;
	isMandatory: boolean;
	label: string;
	values: IRadioValue[];
	description?: string;
	verticalValues?: boolean;
	size?: IRadioInputSize;
}

const RadioInput = (props: IRadioInputProps) => {
	const {
		name,
		defaultValue,
		isMandatory,
		rules,
		label,
		values,
		description,
		disabled,
		verticalValues,
		size = IRadioInputSize.LARGE,
		...inputProps
	} = props;
	const {
		field,
		fieldState: { error },
	} = useController({ name, rules, defaultValue });

	const valuesLength = values.length;
	if (!valuesLength) return <></>;

	const isRadioHorizontal = !verticalValues && valuesLength <= 2;

	const isSmall = size === IRadioInputSize.SMALL;

	return (
		<View>
			<RNText style={styles.label}>
				{label}
				{isMandatory ? (
					<RNText style={styles.redColor}> *</RNText>
				) : (
					<></>
				)}
			</RNText>

			<View style={styles.container}>
				<View style={isRadioHorizontal ? styles.row : styles.column}>
					{values.map((item, index) => (
						<Pressable
							key={index}
							style={styles.itemWrapper}
							onPress={() => !disabled && field.onChange(item)}
						>
							<View
								style={[
									styles.radio,
									isSmall && styles.smallRadio,
									error?.message ? styles.errorRadio : null,
								]}
								{...inputProps}
							>
								{field.value?.value === item.value && (
									<View
										style={[
											styles.selectedOption,
											isSmall &&
												styles.smallSelectedOption,
										]}
									/>
								)}
							</View>
							<RNText
								style={[
									styles.description,
									isSmall && styles.smallDescription,
								]}
							>
								{item.label}
							</RNText>
						</Pressable>
					))}
				</View>
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

export default withFormContext(RadioInput);

const styles = StyleSheet.create({
	column: {
		display: "flex",
		flexDirection: "column",
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
	},
	description: {
		...regular,
		...md,
		color: colors.neutral.grey_07,
		flexShrink: 1,
		lineHeight: verticalScale(21),
	},
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
	errorLabel: {
		color: colors.state.error_red,
		...regular,
		...sm,
	},
	errorRadio: {
		borderColor: colors.state.error_red,
	},
	itemWrapper: {
		flexDirection: "row",
		marginBottom: verticalScale(10),
	},
	label: {
		...semiBold,
		...md,
		color: colors.neutral.black,
		lineHeight: verticalScale(21),
		marginBottom: verticalScale(6),
	},
	radio: {
		alignItems: "center",
		borderColor: colors.neutral.grey_07,
		borderRadius: horizontalScale(10),
		borderWidth: 1,
		height: horizontalScale(20),
		justifyContent: "center",
		marginRight: horizontalScale(4),
		marginTop: verticalScale(2),
		width: horizontalScale(20),
	},
	redColor: { color: colors.icon.default_red },
	row: {
		flexDirection: "row",
		gap: horizontalScale(28),
		justifyContent: "space-between",
	},
	selectedOption: {
		backgroundColor: colors.neutral.grey_07,
		borderRadius: verticalScale(5),
		height: horizontalScale(8),
		width: horizontalScale(8),
	},
	smallDescription: {
		...medium,
		...sm,
	},
	smallRadio: {
		height: horizontalScale(14),
		marginRight: horizontalScale(8),
		width: horizontalScale(14),
	},
	smallSelectedOption: {
		height: horizontalScale(8),
		width: horizontalScale(8),
	},
});
