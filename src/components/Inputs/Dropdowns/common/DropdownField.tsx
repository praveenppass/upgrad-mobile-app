import React from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { AlertIcon, ArrowDownIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const ARROW_DIMENSION = {
	height: verticalScale(12),
	width: horizontalScale(12),
};

const {
	text: { sm, md, regular, semiBold },
} = commonStyles;

const { state, neutral } = colors;

export interface IDropdownField {
	label: string;
	isMandatory?: boolean;
	error?: string;
	description?: string;
	value?: string;
	disabled?: boolean;
	onFieldPress: () => void;
}

const DropdownField = ({
	label,
	isMandatory,
	error,
	description,
	value,
	disabled,
	onFieldPress,
}: IDropdownField) => {
	return (
		<View>
			<View style={styles.txtContainer}>
				<RNText style={styles.label} title={label} />
				{isMandatory ? (
					<RNText style={styles.starTxt} title="*" />
				) : null}
			</View>

			<Pressable
				onPress={() => {
					if (disabled) return;

					Keyboard.dismiss();
					onFieldPress();
				}}
				style={[styles.dropdown, !!error && styles.dropdownError]}
				testID={`dropdown-field-${label}`}
			>
				<RNText
					style={[
						styles.dropdownSelectedText,
						!value && styles.dropdownPlaceholderText,
					]}
					numberOfLines={1}
				>
					{value || strings.CHOOSE_OPTION}
				</RNText>

				<ArrowDownIcon {...ARROW_DIMENSION} color={neutral.grey_07} />
			</Pressable>

			{error ? (
				<View style={styles.errorContainer}>
					<AlertIcon />
					<RNText style={styles.errorLabel} title={error} />
				</View>
			) : null}

			{description ? (
				<RNText style={styles.discTxt} title={description} />
			) : null}
		</View>
	);
};

export default DropdownField;

const styles = StyleSheet.create({
	discTxt: {
		color: neutral.grey_07,
		lineHeight: horizontalScale(19),
		marginTop: horizontalScale(5),
		...sm,
		...regular,
	},
	dropdown: {
		alignItems: "center",
		borderColor: neutral.grey_05,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		flexDirection: "row",
		gap: horizontalScale(12),
		height: verticalScale(48),
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(16),
	},
	dropdownError: {
		borderColor: state.error_red,
	},
	dropdownPlaceholderText: {
		color: neutral.grey_05,
	},
	dropdownSelectedText: {
		...md,
		...regular,
		color: neutral.grey_07,
		flex: 1,
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
	label: {
		color: neutral.black,
		...md,
		...semiBold,
		marginBottom: verticalScale(6),
	},
	starTxt: {
		...md,
		...semiBold,
		color: state.error_red,
	},
	txtContainer: {
		flexDirection: "row",
		gap: verticalScale(5),
	},
});
