import moment from "moment-timezone";
import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { med, regular } = commonStyles.text;

const { neutral } = colors;

const EventCalendarWeekHeader = () => {
	const weekDays = Array.from({ length: 7 }, (_, i) => i + 1);
	return (
		<View style={styles.weekContainer}>
			{weekDays.map((dayNumber) => (
				<WeekHeaderDay key={dayNumber} dayNumber={dayNumber} />
			))}
		</View>
	);
};

interface IWeekHeader {
	dayNumber: number;
}

const WeekHeaderDay = ({ dayNumber }: IWeekHeader) => {
	const { name: userTimezone } = useGetTimezone();
	const dayName = moment()
		.tz(userTimezone)
		.day(dayNumber)
		.format(IDateFormat.onlyDay);

	return (
		<View style={styles.weekdayTextContainer}>
			<RNText title={dayName} style={styles.weekDayText} />
		</View>
	);
};

export default EventCalendarWeekHeader;

const styles = StyleSheet.create({
	weekContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(10),
	},
	weekDayText: {
		color: neutral.grey_08,
		...med,
		...regular,
		lineHeight: verticalScale(16),
	},
	weekdayTextContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: horizontalScale(30),
	},
});
