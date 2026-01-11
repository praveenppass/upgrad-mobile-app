import moment from "moment-timezone";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import EventCalendarIndicators from "@components/academicPlanner/EventCalendarView/EventCalendar/common/EventCalendarIndicators";
import EventCalendarWeekHeader from "@components/academicPlanner/EventCalendarView/EventCalendar/common/EventCalendarWeekHeader";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { DoubleChevron } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, stroke, content } = colors;
const { mid, medium, regular, xxSm } = commonStyles.text;

interface IEventMonthCalendar {
	monthStartDate: string;
	events: IEventCardProps[];
	selectedDate: string;
	onDatePress(date: string): void;
}

const EventMonthCalendar = ({
	monthStartDate,
	events,
	selectedDate,
	onDatePress,
}: IEventMonthCalendar) => {
	const { name: userTimezone } = useGetTimezone();

	const monthStartMoment = moment(monthStartDate).tz(userTimezone);

	const offset = monthStartMoment.isoWeekday() - 1;
	const prevMonthDate = monthStartMoment.subtract(offset, "day");
	const [isCollapsed, setCollapse] = useState(false);
	const weekDiff = moment(selectedDate)
		.tz(userTimezone)
		.diff(prevMonthDate, "week");

	let weekList = [];
	const fullweek = Array.from({ length: 6 }, (_, i) => i);
	weekList = !isCollapsed ? fullweek : [weekDiff];

	return (
		<View style={styles.month}>
			<EventCalendarWeekHeader />
			{weekList.map((weekNumber) => {
				const nextWeekStartDate = prevMonthDate
					.clone()
					.add(weekNumber * 7, "day");

				return (
					<WeekOfMonth
						weekStartDate={nextWeekStartDate.toString()}
						monthStartDate={monthStartDate}
						events={events}
						key={weekNumber}
						selectedDate={selectedDate}
						onDatePress={(date: string) => {
							setCollapse(true);
							onDatePress(date);
						}}
						userTimezone={userTimezone}
					/>
				);
			})}
			<CollapseButton
				isCollapsed={isCollapsed}
				setCollapse={setCollapse}
			/>
		</View>
	);
};

interface ICollapseButton {
	isCollapsed: boolean;
	setCollapse: (c: boolean) => void;
}

const CollapseButton = ({ isCollapsed, setCollapse }: ICollapseButton) => {
	const collapseBtnText = isCollapsed ? strings.EXPAND : strings.COLLAPSE;
	return (
		<Pressable
			style={styles.collapseBtn}
			onPress={() => setCollapse(!isCollapsed)}
		>
			<DoubleChevron
				style={isCollapsed && styles.toExpandChevron}
				height={verticalScale(8)}
				width={horizontalScale(8)}
				color={content.text.pending}
			/>
			<RNText
				style={styles.collapseBtnText}
				title={`${collapseBtnText} ${strings.CALENDAR_VIEW}`}
			/>
		</Pressable>
	);
};

interface IWeekOfMonth {
	weekStartDate: string;
	monthStartDate: string;
	events: IEventCardProps[];
	selectedDate: string;
	onDatePress(date: string): void;
	userTimezone: string;
}

const WeekOfMonth = ({
	weekStartDate,
	monthStartDate,
	events,
	selectedDate,
	onDatePress,
	userTimezone,
}: IWeekOfMonth) => {
	const weekDayCount = Array.from({ length: 7 }, (_, i) => i);

	return (
		<View style={styles.week}>
			{weekDayCount.map((day) => {
				const date = moment(weekStartDate)
					.tz(userTimezone)
					.add(day, "day");
				return (
					<DayOfWeek
						key={date.toString()}
						date={date.toString()}
						monthStartDate={monthStartDate}
						selectedDate={selectedDate}
						onDatePress={onDatePress}
						events={events}
						userTimezone={userTimezone}
					/>
				);
			})}
		</View>
	);
};

interface IDayOfWeek {
	date: string;
	monthStartDate: string;
	events: IEventCardProps[];
	selectedDate: string;
	onDatePress(date: string): void;
	userTimezone: string;
}

const DayOfWeek = ({
	date,
	monthStartDate,
	selectedDate,
	onDatePress,
	events,
	userTimezone,
}: IDayOfWeek) => {
	const isActive = moment(date)
		.tz(userTimezone)
		.isBetween(
			moment(monthStartDate).tz(userTimezone),
			moment(monthStartDate).tz(userTimezone).endOf("month"),
			"day",
			"[]",
		);
	const isSelected = moment(selectedDate)
		.tz(userTimezone)
		.isSame(moment(date).tz(userTimezone), "day");
	const dateText = moment(date).tz(userTimezone).format(IDateFormat.onlyDate);

	const dayEvents = events.filter((event) =>
		moment(event.eventDate, IDateFormat.dayAndDate)
			.tz(userTimezone)
			.isSame(moment(date).tz(userTimezone), "day"),
	);

	return (
		<View style={styles.dateContainer}>
			<Pressable
				style={[
					styles.dateTextContainer,
					isSelected && styles.selectedDateTextContainer,
				]}
				onPress={() => onDatePress(date)}
			>
				<RNText
					title={dateText}
					style={[
						styles.dateText,
						!isActive && styles.inactiveDays,
						isSelected && styles.selectedDateText,
					]}
				/>
			</Pressable>
			<EventCalendarIndicators events={dayEvents} />
		</View>
	);
};

export default EventMonthCalendar;

const styles = StyleSheet.create({
	chevron: {
		color: content.text.pending,
	},
	collapseBtn: {
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: stroke.white,
		borderRadius: horizontalScale(20),
		bottom: verticalScale(-12),
		elevation: 2,
		flexDirection: "row",
		gap: horizontalScale(4),
		height: verticalScale(24),
		justifyContent: "center",
		position: "absolute",
		shadowColor: neutral.black,
		shadowOffset: { width: 0, height: verticalScale(16) },
		shadowOpacity: 0.2,
		shadowRadius: horizontalScale(2),
		width: horizontalScale(154),
	},

	collapseBtnText: {
		...xxSm,
		...regular,
		color: content.text.pending,
	},
	dateContainer: {
		alignItems: "center",
		gap: verticalScale(3),
	},
	dateText: {
		color: neutral.black,
		...mid,
		...medium,
		lineHeight: verticalScale(20),
	},
	dateTextContainer: {
		alignItems: "center",
		height: horizontalScale(30),
		justifyContent: "center",
		width: horizontalScale(30),
	},
	inactiveDays: {
		color: neutral.grey_06,
	},
	month: {
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		gap: verticalScale(10),
		marginHorizontal: horizontalScale(8),
		marginVertical: verticalScale(5),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(15),
	},
	selectedDateText: {
		color: neutral.white,
	},
	selectedDateTextContainer: {
		backgroundColor: neutral.grey_08,
		borderRadius: horizontalScale(10),
	},
	toExpandChevron: {
		transform: [{ rotate: "180deg" }],
	},
	week: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
