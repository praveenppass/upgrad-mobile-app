import moment from "moment-timezone";
import React from "react";
import { StyleSheet, View } from "react-native";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import { IRangeSelectionType } from "@components/academicPlanner/common/EventDateSelector/index.interface";
import EventCalendar from "@components/academicPlanner/EventCalendarView/EventCalendar";
import EventCalendarAgenda from "@components/academicPlanner/EventCalendarView/EventCalendarAgenda";

import useGetTimezone from "@hooks/useGetTimezone";

import { IDateFormat } from "@interface/app.interface";

interface IEventCalendarView {
	minDate: string;
	maxDate: string;
	rangeSelectionType: IRangeSelectionType;

	events: IEventCardProps[];

	selectedDate: string;
	onSelectedDateChange: (date: string) => void;

	onRefetchEvents: () => void;
}

const EventCalendarView = ({
	maxDate,
	minDate,
	rangeSelectionType,
	events,
	selectedDate,
	onSelectedDateChange,
	onRefetchEvents,
}: IEventCalendarView) => {
	const { name: userTimezone } = useGetTimezone();
	const selectedDateEvents = events.filter((event) =>
		moment(event.eventDate, IDateFormat.dayAndDate)
			.tz(userTimezone)
			.isSame(moment(selectedDate).tz(userTimezone), "day"),
	);

	return (
		<View style={styles.container}>
			<EventCalendar
				events={events}
				maxDate={maxDate}
				minDate={minDate}
				rangeSelectionType={rangeSelectionType}
				selectedDate={selectedDate}
				onSelectedDatePress={onSelectedDateChange}
			/>
			<EventCalendarAgenda
				events={selectedDateEvents}
				onRefetchEvents={onRefetchEvents}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default EventCalendarView;
