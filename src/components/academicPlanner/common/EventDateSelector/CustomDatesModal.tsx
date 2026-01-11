import moment from "moment-timezone";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import { ICustomDatesModalOnSubmit } from "@components/academicPlanner/common/EventDateSelector/index.interface";
import DateInput from "@components/Inputs/DateInput";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

interface IFormValues {
	endDate: string;
	startDate: string;
}

interface ICustomDatesModal {
	isVisible: boolean;
	onCloseModal: () => void;
	onSubmit: ({ startDate, endDate }: ICustomDatesModalOnSubmit) => void;
}

const { sm, md, regular, semiBold } = commonStyles.text;
const { cta, neutral } = colors;

const CustomDatesModal = ({
	isVisible,
	onCloseModal,
	onSubmit,
}: ICustomDatesModal) => {
	const { ...methods } = useForm<IFormValues>();
	const { name: userTimezone } = useGetTimezone();

	useEffect(() => {
		if (!isVisible) return;

		methods.reset({
			startDate: "",
			endDate: "",
		});
	}, [isVisible]);

	return (
		<ActionModal
			isOpen={isVisible}
			closeModal={onCloseModal}
			onBackPress={onCloseModal}
		>
			<View style={styles.indicator} />
			<View style={styles.container}>
				<RNText style={styles.heading}>
					{strings.SELECT_CUSTOM_DATES}
				</RNText>
				<RNText style={styles.description}>
					{strings.SELECT_START_END_DATE}
				</RNText>
			</View>

			<FormProvider {...methods}>
				<View style={styles.inputContainer}>
					<DateInput
						name="startDate"
						label={strings.START_DATE}
						isMandatory
						rules={{
							required: strings.PLEASE_ENTER_VALID_VALUE,
						}}
						placeholder={strings.SELECT_PLACEHOLDER}
						dateFormat={IDateFormat.date}
					/>
					<DateInput
						name="endDate"
						label={strings.END_DATE}
						isMandatory
						rules={{
							required: strings.PLEASE_ENTER_VALID_VALUE,
							validate: (value) => {
								const startDate = methods.watch("startDate");

								if (startDate && value) {
									const start =
										moment(startDate).tz(userTimezone);
									const end = moment(value).tz(userTimezone);

									if (start.isSameOrAfter(end, "day"))
										return strings.START_DATE_END_DATE_ERROR;

									return true;
								}
							},
						}}
						placeholder={strings.SELECT_PLACEHOLDER}
						dateFormat={IDateFormat.date}
					/>
				</View>

				<Pressable
					style={styles.button}
					onPress={methods.handleSubmit(onSubmit)}
				>
					<RNText title={strings.APPLY} style={styles.buttonText} />
				</Pressable>
			</FormProvider>
		</ActionModal>
	);
};

export default CustomDatesModal;

const styles = StyleSheet.create({
	button: {
		backgroundColor: cta.fill.primary_black_default,
		borderRadius: horizontalScale(6),
		marginTop: verticalScale(36),
		paddingVertical: verticalScale(14),
	},
	buttonText: {
		textAlign: "center",
		...semiBold,
		...md,
		color: neutral.white,
	},
	container: {
		alignItems: "center",
		marginBottom: verticalScale(16),
		marginTop: verticalScale(16),
		rowGap: verticalScale(6),
	},
	description: {
		...regular,
		...sm,
		color: neutral.grey_07,
	},
	heading: {
		...md,
		...semiBold,
		color: neutral.black,
	},
	indicator: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginBottom: verticalScale(12),
		width: horizontalScale(64),
	},
	inputContainer: {
		rowGap: verticalScale(12),
	},
});
