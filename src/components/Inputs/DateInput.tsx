import moment from "moment-timezone";
import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";

import withFormContext from "@components/Inputs/withFormContext";
import DatePicker from "@components/Reusable/DatePicker";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { formatDate, horizontalScale, verticalScale } from "@utils/functions";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { AlertIcon, CalendarIconGray } from "@assets/icons";

const {
	commonStyles: {
		text: { sm, md, regular, semiBold },
	},
} = C;
export interface IDateInputProps extends UseControllerProps {
	label: string;
	placeholder?: string;
	defaultValue?: string;
	isMandatory?: boolean;
	description?: string;
	disableFutureDates?: boolean;
	disablePastDates?: boolean;
	maximumDate?: string;
	dateFormat?: IDateFormat;
}

const DateInput = (props: IDateInputProps) => {
	const {
		name,
		label,
		rules,
		placeholder,
		defaultValue,
		isMandatory,
		description,
		disabled,
		disableFutureDates,
		disablePastDates,
		dateFormat = IDateFormat.dob,
		maximumDate,
		...inputProps
	} = props;
	const {
		field,
		fieldState: { error },
	} = useController({ name, rules, defaultValue });

	const [showDatePicker, setShowDatePicker] = useState(false);
	const { name: userTimezone } = useGetTimezone();
	return (
		<View style={styles.container}>
			<View style={styles.txtContainer}>
				<RNText style={styles.label} title={label} />
				{isMandatory ? (
					<RNText style={styles.starTxt} title="*" />
				) : (
					<></>
				)}
			</View>

			<Pressable
				onPress={() => {
					if (disabled) return;
					setShowDatePicker(true);

					Keyboard.dismiss();
				}}
				testID={`date-input-pressable-${label}`}
			>
				<RNText
					style={[
						styles.input,
						error && styles.errorInput,
						!field.value
							? styles.placeholderColor
							: styles.inputColor,
					]}
					title={
						field.value
							? formatDate(field.value, dateFormat)
							: placeholder
					}
				/>

				<View style={styles.inputContainer}>
					<CalendarIconGray />
				</View>
			</Pressable>

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

			<DatePicker
				show={showDatePicker}
				setShow={setShowDatePicker}
				onSubmit={(date) => {
					field.onChange(
						moment(date)
							.tz(userTimezone)
							.startOf("day")
							.toISOString(),
					);
					setShowDatePicker(false);
				}}
				initialDate={field.value ? new Date(field.value) : new Date()}
				disableFutureDates={disableFutureDates}
				disablePastDates={disablePastDates}
				maximumDate={maximumDate}
				{...inputProps}
			/>
		</View>
	);
};

export default withFormContext(DateInput);

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
		height: horizontalScale(48),
		paddingLeft: horizontalScale(16),
		paddingTop: verticalScale(14),
		...md,
		...regular,
	},
	inputColor: {
		color: colors.neutral.grey_07,
	},
	inputContainer: {
		position: "absolute",
		right: horizontalScale(10),
		top: verticalScale(16),
	},
	label: {
		color: colors.neutral.black,
		...md,
		...semiBold,
		marginBottom: verticalScale(6),
	},
	placeholderColor: {
		color: colors.neutral.grey_05,
	},
	starTxt: {
		...md,
		...semiBold,
		color: colors.state.error_red,
	},
	txtContainer: {
		flexDirection: "row",
		gap: horizontalScale(5),
	},
});
