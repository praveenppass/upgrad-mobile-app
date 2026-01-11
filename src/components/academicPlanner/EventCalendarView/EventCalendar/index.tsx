import React from "react";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import { IRangeSelectionType } from "@components/academicPlanner/common/EventDateSelector/index.interface";
import EventDayCalendar from "@components/academicPlanner/EventCalendarView/EventCalendar/EventDayCalendar";
import EventMonthCalendar from "@components/academicPlanner/EventCalendarView/EventCalendar/EventMonthCalendar";
import EventWeekCalendar from "@components/academicPlanner/EventCalendarView/EventCalendar/EventWeekCalendar";

interface IEventCalendar {
	events: IEventCardProps[];

	minDate: string;
	maxDate: string;

	rangeSelectionType: IRangeSelectionType;

	selectedDate: string;
	onSelectedDatePress(date: string): void;
}

const EventCalendar = ({
	events,
	minDate,
	onSelectedDatePress,
	rangeSelectionType,
	selectedDate,
}: IEventCalendar) => {
	switch (rangeSelectionType) {
		case IRangeSelectionType.Week:
			return (
				<EventWeekCalendar
					weekDate={minDate}
					events={events}
					onDatePress={onSelectedDatePress}
					selectedDate={selectedDate}
				/>
			);
		case IRangeSelectionType.Month:
			return (
				<EventMonthCalendar
					monthStartDate={minDate}
					events={events}
					selectedDate={selectedDate}
					onDatePress={onSelectedDatePress}
				/>
			);
		case IRangeSelectionType.Day:
			return <EventDayCalendar currentDate={minDate} />;
	}
};

export default EventCalendar;
