import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import withFormContext from "@components/Inputs/withFormContext";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { AlertIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { sm, regular, md, xSm, semiBold } = commonStyles.text;
const { neutral, state, icon } = colors;

export interface IRadioChipValue {
	label: string;
	value: string;
}
export interface IRadioChipInputProps extends UseControllerProps {
	defaultValue?: IRadioChipValue;
	isMandatory: boolean;
	label: string;
	values: IRadioChipValue[];
	description?: string;
	noValuesPlaceholder?: string;
	loading?: boolean;
}

interface IRadioChip {
	isActive: boolean;
	onPress: () => void;
	label: string;
}

const RadioChip = ({ isActive, onPress, label }: IRadioChip) => (
	<Pressable
		style={[styles.itemWrapper, isActive && styles.itemWrapperActive]}
		onPress={onPress}
	>
		<RNText
			style={[
				styles.itemDescription,
				isActive && styles.itemDescriptionActive,
			]}
		>
			{label}
		</RNText>
	</Pressable>
);

const SkeletonRadioChip = () => (
	<Skeleton style={[styles.itemWrapper, styles.skeletonItemWrapper]} />
);

const RadioChipInput = (props: IRadioChipInputProps) => {
	const {
		name,
		defaultValue,
		isMandatory,
		rules,
		label,
		values,
		description,
		disabled,
		noValuesPlaceholder = strings.NO_OPTIONS_AVAIL,
		loading,
	} = props;
	const {
		field,
		fieldState: { error },
	} = useController({ name, rules, defaultValue });

	const valuesLength = values.length;

	const renderRadioChips = () => {
		if (loading)
			return new Array(3)
				.fill(0)
				.map((_, index) => <SkeletonRadioChip key={index} />);

		if (!valuesLength)
			return (
				<RNText
					style={styles.noOptionsLabel}
					title={noValuesPlaceholder}
				/>
			);

		return values.map((item, index) => {
			const isActive = field.value?.value === item.value;

			return (
				<RadioChip
					key={index}
					isActive={isActive}
					onPress={() => !disabled && field.onChange(item)}
					label={item.label}
				/>
			);
		});
	};

	return (
		<View>
			<RNText style={styles.label}>
				{label}
				{isMandatory && <RNText style={styles.redColor}> *</RNText>}
			</RNText>

			<View style={styles.container}>{renderRadioChips()}</View>

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

export default withFormContext(RadioChipInput);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: horizontalScale(12),
		justifyContent: "space-between",
	},
	discTxt: {
		color: neutral.grey_07,
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
		color: state.error_red,
		...regular,
		...sm,
	},
	itemDescription: {
		...regular,
		...xSm,
		color: neutral.black,
	},
	itemDescriptionActive: {
		color: neutral.white,
	},
	itemWrapper: {
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: horizontalScale(4),
		borderWidth: 1,
		justifyContent: "flex-start",
		paddingHorizontal: horizontalScale(6),
		paddingVertical: verticalScale(8),
		width: horizontalScale(160),
	},
	itemWrapperActive: {
		backgroundColor: neutral.black,
	},
	label: {
		...semiBold,
		...md,
		color: neutral.black,
		lineHeight: verticalScale(21),
		marginBottom: verticalScale(6),
	},
	noOptionsLabel: {
		color: neutral.black,
		...regular,
		...sm,
	},
	redColor: {
		color: icon.default_red,
	},
	skeletonItemWrapper: {
		borderWidth: 0,
		height: verticalScale(28),
	},
});
