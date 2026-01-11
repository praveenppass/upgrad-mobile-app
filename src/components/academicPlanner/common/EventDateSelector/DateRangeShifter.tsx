import moment from "moment-timezone";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";

import { IRangeSelectionType } from "@components/academicPlanner/common/EventDateSelector/index.interface";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { ArrowIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

export interface IDateRangeShifterSetDates {
	startDate: string;
	endDate: string;
}

interface IDateRangeShifter {
	rangeSelectionType: IRangeSelectionType;
	startDate: string;
	endDate: string;
	onShiftDates: ({ startDate, endDate }: IDateRangeShifterSetDates) => void;
}

enum IHandleArrowPressType {
	Left,
	Right,
}

interface IShiftDate {
	date: string;
	duration: moment.unitOfTime.DurationConstructor;
	type: IHandleArrowPressType;
	userTimezone: string;
}

interface IGetDateLabel {
	rangeSelectionType: IRangeSelectionType;
	startDate: string;
	endDate: string;
	userTimezone: string;
}

const { neutral } = colors;
const { md, semiBold } = commonStyles.text;

const dateFormat = "D MMM'YY";
const monthFormat = "MMM'YY";

const getDateLabel = ({
	rangeSelectionType,
	startDate,
	endDate,
	userTimezone,
}: IGetDateLabel) => {
	switch (rangeSelectionType) {
		case IRangeSelectionType.Day:
			return `${moment(startDate).tz(userTimezone).format(dateFormat)}`;
		case IRangeSelectionType.Month:
			return `${moment(startDate).tz(userTimezone).format(monthFormat)}`;
		case IRangeSelectionType.Week:
		case IRangeSelectionType.CustomDates:
			return `${moment(startDate).tz(userTimezone).format(dateFormat)} - ${moment(
				endDate,
			)
				.tz(userTimezone)
				.format(dateFormat)}`;
	}
};

const getDuration = (rangeSelectionType: IRangeSelectionType) => {
	switch (rangeSelectionType) {
		case IRangeSelectionType.Day:
			return "day";
		case IRangeSelectionType.Week:
			return "week";
		case IRangeSelectionType.Month:
		case IRangeSelectionType.CustomDates:
			return "month";
	}
};

const shiftDate = ({ type, date, duration, userTimezone }: IShiftDate) => {
	if (type === IHandleArrowPressType.Left)
		return moment(date)
			.tz(userTimezone)
			.subtract(1, duration)
			.toISOString();
	else return moment(date).tz(userTimezone).add(1, duration).toISOString();
};

const DateRangeShifter = ({
	endDate,
	rangeSelectionType,
	onShiftDates,
	startDate,
}: IDateRangeShifter) => {
	const showArrows = rangeSelectionType !== IRangeSelectionType.CustomDates;
	const duration = getDuration(rangeSelectionType);
	const { name: userTimezone } = useGetTimezone();

	const handleArrowPress = (type: IHandleArrowPressType) => {
		let newStartDate = shiftDate({
			date: startDate,
			duration,
			type,
			userTimezone,
		});
		let newEndDate = shiftDate({
			date: endDate,
			duration,
			type,
			userTimezone,
		});

		if (rangeSelectionType === IRangeSelectionType.Month) {
			newStartDate = moment(newStartDate)
				.tz(userTimezone)
				.startOf("month")
				.toISOString();
			newEndDate = moment(newEndDate)
				.tz(userTimezone)
				.endOf("month")
				.toISOString();
		}

		onShiftDates({ startDate: newStartDate, endDate: newEndDate });
	};

	return (
		<View style={styles.dateTextContainer}>
			{showArrows ? (
				<Pressable
					onPress={() => handleArrowPress(IHandleArrowPressType.Left)}
					style={styles.arrowContainer}
				>
					<ArrowIcon color={neutral.white} style={styles.iconLeft} />
				</Pressable>
			) : (
				<></>
			)}

			<RNText
				title={getDateLabel({
					rangeSelectionType,
					startDate,
					endDate,
					userTimezone,
				})}
				style={styles.dateText}
			/>

			{showArrows ? (
				<Pressable
					onPress={() =>
						handleArrowPress(IHandleArrowPressType.Right)
					}
					style={styles.arrowContainer}
				>
					<ArrowIcon color={neutral.white} />
				</Pressable>
			) : (
				<></>
			)}
		</View>
	);
};

export default DateRangeShifter;

const styles = StyleSheet.create({
	arrowContainer: {
		paddingHorizontal: horizontalScale(6),
		paddingVertical: verticalScale(8),
	},
	dateText: {
		color: neutral.white,
		...md,
		...semiBold,
	},
	dateTextContainer: {
		alignItems: "center",
		columnGap: horizontalScale(2),
		flexDirection: "row",
	},
	iconLeft: {
		transform: [{ rotate: "180deg" }],
	},
});
