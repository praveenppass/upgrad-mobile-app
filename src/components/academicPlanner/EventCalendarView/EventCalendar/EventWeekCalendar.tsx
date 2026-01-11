import moment from "moment-timezone";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import EventCalendarIndicators from "@components/academicPlanner/EventCalendarView/EventCalendar/common/EventCalendarIndicators";
import EventCalendarWeekHeader from "@components/academicPlanner/EventCalendarView/EventCalendar/common/EventCalendarWeekHeader";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { medium, md, med, regular } = commonStyles.text;
const { neutral } = colors;

interface IDayOfWeek {
	events: IEventCardProps[];
	weekDate: string;
	selectedDate: string;
	onDatePress(date: string): void;
	day: number;
	userTimezone: string;
}

const DayOfWeek = ({
	events,
	weekDate,
	selectedDate,
	onDatePress,
	day,
	userTimezone,
}: IDayOfWeek) => {
	const currentDate = moment(weekDate).tz(userTimezone).add(day, "day");
	const isActive = moment(selectedDate)
		.tz(userTimezone)
		.isSame(currentDate, "day");
	const dateName = currentDate.tz(userTimezone).format(IDateFormat.onlyDate);

	const dayEvents = events.filter((event) =>
		moment(event.eventDate, IDateFormat.dayAndDate)
			.tz(userTimezone)
			.isSame(currentDate, "day"),
	);

	return (
		<View key={day} style={styles.individualcontainer}>
			<Pressable
				onPress={() => onDatePress(currentDate.toString())}
				style={[
					styles.dateContainer,
					isActive && styles.selectedDateContainer,
				]}
			>
				<RNText
					style={[
						styles.dateText,
						isActive && styles.selectedDateText,
					]}
					title={dateName}
				/>
			</Pressable>
			<EventCalendarIndicators events={dayEvents} />
		</View>
	);
};

interface IEventWeekCalendar {
	weekDate: string;
	events: IEventCardProps[];

	selectedDate: string;
	onDatePress: (date: string) => void;
}

const EventWeekCalendar = ({
	weekDate,
	events,
	selectedDate,
	onDatePress,
}: IEventWeekCalendar) => {
	const week = Array.from({ length: 7 }, (_, i) => i);
	const { name: userTimezone } = useGetTimezone();

	if (moment(weekDate).tz(userTimezone).weekday() !== 1) return <></>;

	return (
		<View style={styles.container}>
			<EventCalendarWeekHeader />
			<View style={styles.weekContainer}>
				{week.map((day) => (
					<DayOfWeek
						events={events}
						selectedDate={selectedDate}
						day={day}
						weekDate={weekDate}
						onDatePress={onDatePress}
						key={day}
						userTimezone={userTimezone}
					/>
				))}
			</View>
		</View>
	);
};

export default EventWeekCalendar;

const styles = StyleSheet.create({
	container: {
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(6),
		borderWidth: 1,
		justifyContent: "space-between",
		marginHorizontal: horizontalScale(8),
		marginVertical: verticalScale(5),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(15),
	},
	dateContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(10),
		height: horizontalScale(30),
		justifyContent: "center",
		marginBottom: verticalScale(3),
		width: horizontalScale(30),
	},
	dateText: {
		color: neutral.grey_08,
		...md,
		...medium,
		lineHeight: verticalScale(18),
	},
	dayText: {
		color: neutral.grey_08,
		...med,
		...regular,
		lineHeight: verticalScale(16),
		marginBottom: verticalScale(16),
	},
	individualcontainer: {
		alignItems: "center",
	},
	selectedDateContainer: {
		backgroundColor: neutral.grey_08,
	},
	selectedDateText: {
		color: neutral.white,
	},
	weekContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
