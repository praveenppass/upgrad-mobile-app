import React, { memo, useCallback, useMemo } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import withFormContext from "@components/Inputs/withFormContext";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { AlertIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { sm, regular, md, semiBold } = commonStyles.text;
const { neutral, highlight } = colors;

const ICON_WIDTH = horizontalScale(40);
const ICON_HEIGHT = verticalScale(48);

export interface ICardItem extends IDropdownInputItem {
	icon?: React.ComponentType<{
		width?: number;
		height?: number;
		color?: string;
	}>;
}

interface ICardProps {
	item: ICardItem;
	isSelected: boolean;
	onPress: () => void;
	disabled?: boolean;
}

const Card = memo<ICardProps>(
	({ item, isSelected, onPress, disabled }: ICardProps) => {
		const cardStyle = useMemo(
			() => [
				styles.card,
				isSelected && styles.cardSelected,
				disabled && styles.cardDisabled,
			],
			[isSelected, disabled],
		);

		const labelStyle = useMemo(
			() => [styles.cardLabel, isSelected && styles.cardLabelSelected],
			[isSelected],
		);

		const iconColor = useMemo(
			() => (isSelected ? highlight.text_blue : neutral.grey_08),
			[isSelected],
		);

		const IconComponent = item.icon;

		return (
			<Pressable style={cardStyle} onPress={onPress} disabled={disabled}>
				{IconComponent && (
					<View style={styles.iconContainer}>
						<IconComponent
							width={ICON_WIDTH}
							height={ICON_HEIGHT}
							color={iconColor}
						/>
					</View>
				)}
				<RNText style={labelStyle} title={item.label} />
			</Pressable>
		);
	},
);

Card.displayName = "Card";

export interface ICardInputProps extends UseControllerProps {
	defaultValue?: IDropdownInputItem;
	isMandatory: boolean;
	label: string;
	values: ICardItem[];
	description?: string;
}

const CardInput = (props: ICardInputProps) => {
	const {
		name,
		defaultValue,
		isMandatory,
		rules,
		label,
		values,
		description,
		disabled,
	} = props;

	const {
		field,
		fieldState: { error },
	} = useController({ name, rules, defaultValue });

	const topRowValues = useMemo(() => values.slice(0, 2), [values]);
	const thirdValue = useMemo(
		() => (values.length > 2 ? values[2] : null),
		[values],
	);
	const selectedValue = field.value?.value;

	const handleCardPress = useCallback(
		(item: ICardItem) => {
			if (!disabled) {
				field.onChange(item);
			}
		},
		[disabled, field.onChange],
	);

	const handleThirdCardPress = useCallback(() => {
		if (thirdValue && !disabled) {
			field.onChange(thirdValue);
		}
	}, [thirdValue, disabled, field.onChange]);

	if (!values.length) return null;

	const isThirdSelected = thirdValue
		? selectedValue === thirdValue.value
		: false;

	return (
		<View>
			<RNText style={styles.label}>
				{label}
				{isMandatory && <RNText style={styles.redColor}> *</RNText>}
			</RNText>

			<View style={styles.container}>
				<View style={styles.topRow}>
					{topRowValues.map((item) => {
						const isSelected = selectedValue === item.value;
						return (
							<Card
								key={item.value}
								item={item}
								isSelected={isSelected}
								onPress={() => handleCardPress(item)}
								disabled={disabled}
							/>
						);
					})}
				</View>

				{thirdValue && (
					<View style={styles.bottomRow}>
						<Card
							item={thirdValue}
							isSelected={isThirdSelected}
							onPress={handleThirdCardPress}
							disabled={disabled}
						/>
					</View>
				)}
			</View>

			{error?.message && (
				<View style={styles.errorContainer}>
					<AlertIcon />
					<RNText style={styles.errorLabel} title={error.message} />
				</View>
			)}

			{description && (
				<RNText style={styles.discTxt} title={description} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	bottomRow: {
		flexDirection: "row",
		justifyContent: "center",
	},
	card: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(12),
		borderWidth: 1,
		height: verticalScale(120),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(16),
		width: horizontalScale(155),
	},
	cardDisabled: {
		opacity: 0.5,
	},
	cardLabel: {
		...regular,
		color: neutral.grey_08,
		...md,
		textAlign: "center",
	},
	cardLabelSelected: {
		color: neutral.black,
		...semiBold,
	},
	cardSelected: {
		backgroundColor: neutral.grey_02,
		borderColor: highlight.text_blue,
		borderWidth: 2,
	},
	container: {
		marginBottom: verticalScale(8),
	},
	discTxt: {
		...regular,
		color: neutral.grey_07,
		fontSize: sm.fontSize,
		marginTop: verticalScale(4),
	},
	errorContainer: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: verticalScale(4),
		marginTop: verticalScale(4),
	},
	errorLabel: {
		...regular,
		color: colors.state.error_red,
		...sm,
		marginLeft: horizontalScale(4),
	},
	iconContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: verticalScale(12),
	},
	label: {
		...semiBold,
		color: neutral.black,
		...md,
		marginBottom: verticalScale(12),
	},
	redColor: {
		color: colors.state.error_red,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(12),
	},
});

export default withFormContext(CardInput);
