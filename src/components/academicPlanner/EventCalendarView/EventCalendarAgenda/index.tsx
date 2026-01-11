import moment from "moment-timezone";
import React, { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useCTAHandlerHelper } from "@screens/Home/HomeTab/AcademicPlanner/useCTAHandlerHelper";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import { getEventData } from "@components/academicPlanner/cards/eventCard/eventCard.util";
import EventCardModal from "@components/academicPlanner/cards/eventCard/EventCardModal";
import MentorshipScheduleMeetingModal from "@components/academicPlanner/cards/Mentorship/ScheduleMeetingModal";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import {
	IEventStatusType,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral, bg, content, state } = colors;
const { regular, xxSm, medium } = commonStyles.text;

const hours = Array.from({ length: 24 }, (_, i) => {
	let hour = i % 12;
	if (hour === 0) hour = 12;

	const period = i < 12 ? "AM" : "PM";

	return {
		title: `${hour} ${period}`,
		value: i,
	};
});

const getEventStatusColor = (status: IEventStatusType) => {
	switch (status) {
		case IEventStatusType.YET_TO_START:
			return content.text.yet_to_start;
		case IEventStatusType.IN_PROGRESS:
			return content.text.in_progress;
		case IEventStatusType.COMPLETED:
			return content.text.completed;
		case IEventStatusType.OVERDUE:
			return content.text.overdue;
		case IEventStatusType.PENDING:
			return content.text.pending;
		case IEventStatusType.EXPIRED:
			return content.text.expired;
	}
};

const getEventBackgroundColorBasedOnType = (type: IEventType) => {
	switch (type) {
		case IEventType.LECTURE:
			return bg.fill.lecture;
		case IEventType.CONTENT:
			return state.warning_light_yellow;
		case IEventType.PROFILE:
		case IEventType.MENTORSHIP:
			return bg.fill.profile;
		case IEventType.PERSONALISED_INDUSTRY:
			return bg.fill.industry;
		case IEventType.LIVE_SESSION:
		case IEventType.DOUBT_RESOLUTION_SESSION:
		case IEventType.CAREER_COUNSELLING:
		case IEventType.DAILY_DOUBT_RESOLUTION:
		case IEventType.BUDDY_SESSION:
		case IEventType.OTHERS:
			return bg.fill.mentorship;
		case IEventType.TA_CALL:
			return bg.fill.lecture;
	}
};

interface IAgendaHour {
	value: number;
	title: string;
}

const AgendaHour = ({ value, title }: IAgendaHour) => {
	return (
		<View key={value} style={styles.agendaHour}>
			<View style={styles.agendaHourTitle}>
				<RNText style={styles.agendaHourText}>{title}</RNText>
			</View>
			<View style={styles.agendaHourSeparator} />
		</View>
	);
};

interface IEvent {
	event: IEventCardProps;
	eventOverlapCount: number;
	onRefetchEvents: () => void;
	scrollRef: React.RefObject<ScrollView>;
	index: number;
}

const Event = ({
	event,
	eventOverlapCount,
	onRefetchEvents,
	scrollRef,
	index,
}: IEvent) => {
	const {
		eventTitle,
		eventType,
		eventStatus,
		duration,
		eventDate,
		dueDate,
		mentorWindow,
		mentors,
		workshopId,
		sessionId,
		rescheduleRequestDetails,
		endsAt,
		startsAt,
	} = event;
	const { name: userTimezone } = useGetTimezone();

	const eventData = getEventData({
		eventType,
		dueDate,
		eventDate,
		duration,
		bookByDate: mentorWindow?.bookByDate,
		eventStatus,
		userTimezone,
	});

	const {
		handleEventCTAClick,
		scheduleModalVisible,
		handleCloseScheduleModal,

		isModalVisible,
		handleToggleModal,

		isMentorshipReschedule,

		handleCancelMentorshipSession,
		handleRescheduleMentorshipSession,
		handleAcceptRescheduleMentorshipSession,
		handleRejectRescheduleMentorshipSession,
	} = useCTAHandlerHelper({ onRefetchEvents });

	const minutesSinceStartOfDay = moment(startsAt)
		.tz(userTimezone)
		.diff(moment(startsAt).tz(userTimezone).startOf("day"), "minutes");
	const eventDuration = moment(endsAt)
		.tz(userTimezone)
		.diff(moment(startsAt).tz(userTimezone), "minutes");

	const eventHeight = (2 / 3) * eventDuration;
	const eventTop = 10 + (2 / 3) * minutesSinceStartOfDay;
	const showText = eventHeight >= 20;

	const handleCtaClick = () => handleEventCTAClick(event);

	if (index === 0)
		scrollRef.current?.scrollTo({
			y: verticalScale(eventTop) - 100,
			animated: true,
		});

	return (
		<>
			<Pressable
				onPress={handleToggleModal}
				style={[
					styles.event,
					{
						left: eventOverlapCount * horizontalScale(50),
						height: verticalScale(eventHeight),
						backgroundColor:
							getEventBackgroundColorBasedOnType(eventType),
						top: verticalScale(eventTop),
						borderLeftColor: getEventStatusColor(eventStatus),
					},
				]}
			>
				{showText && (
					<RNText style={styles.eventText} numberOfLines={1}>
						{eventTitle}
					</RNText>
				)}
			</Pressable>

			<EventCardModal
				visible={isModalVisible}
				onClose={handleToggleModal}
				eventData={eventData}
				onModalCTAClick={handleCtaClick}
				onRescheduleMentorshipEvent={handleRescheduleMentorshipSession}
				onCancelMentorshipEvent={() =>
					handleCancelMentorshipSession(sessionId)
				}
				onAcceptRescheduleMentorshipEvent={() =>
					handleAcceptRescheduleMentorshipSession({
						mentorshipId: sessionId,
						mentorSlotId: rescheduleRequestDetails?.id || "",
					})
				}
				onRejectRescheduleMentorshipEvent={() =>
					handleRejectRescheduleMentorshipSession(sessionId)
				}
				{...event}
			/>

			<MentorshipScheduleMeetingModal
				visible={scheduleModalVisible}
				onClose={handleCloseScheduleModal}
				eventTitle={eventTitle}
				eventStatus={eventStatus}
				mentor={mentors?.[0]}
				workshopId={workshopId}
				isReschedule={isMentorshipReschedule}
				mentorshipId={sessionId}
				bookByDate={mentorWindow?.bookByDate}
				mentorWindowEventId={mentorWindow?.eventId}
				mentorWindowId={mentorWindow?.id}
				onRefetchEvents={onRefetchEvents}
			/>
		</>
	);
};

interface IGetEventOverlapCount {
	events: IEventCardProps[];
	index: number;
	userTimezone: string;
}

const getEventOverlapCount = ({
	events,
	index,
	userTimezone,
}: IGetEventOverlapCount) => {
	const prevEvents = events.slice(0, index);
	const currentEvent = events[index];

	const eventsMap = new Map<number, number>();

	for (const ev of prevEvents) {
		const startOfDay = moment(ev.startsAt).tz(userTimezone).startOf("day");

		const startMinute = moment(ev.startsAt)
			.tz(userTimezone)
			.diff(startOfDay, "minutes");
		const endMinute = moment(ev.endsAt)
			.tz(userTimezone)
			.diff(startOfDay, "minutes");

		let maxOverlap = 0;
		for (let i = startMinute; i < endMinute; i++)
			maxOverlap = Math.max(maxOverlap, eventsMap.get(i) ?? 0);

		for (let i = startMinute; i < endMinute; i++)
			eventsMap.set(i, maxOverlap + 1);
	}

	const startOfDay = moment(currentEvent.startsAt)
		.tz(userTimezone)
		.startOf("day");
	const startTimeMinutes = moment(currentEvent.startsAt)
		.tz(userTimezone)
		.diff(startOfDay, "minutes");
	const endTimeMinutes = moment(currentEvent.endsAt)
		.tz(userTimezone)
		.diff(startOfDay, "minutes");

	let eventOverlapCount = 0;
	for (let i = startTimeMinutes; i < endTimeMinutes; i++)
		eventOverlapCount = Math.max(eventOverlapCount, eventsMap.get(i) ?? 0);

	return eventOverlapCount;
};

interface IEventCalendarAgenda {
	events: IEventCardProps[];
	onRefetchEvents: () => void;
}

const EventCalendarAgenda = ({
	events,
	onRefetchEvents,
}: IEventCalendarAgenda) => {
	const scrollRef = useRef<ScrollView>(null);
	const { name: userTimezone } = useGetTimezone();

	return (
		<>
			<ScrollView
				style={styles.agendaContainer}
				showsVerticalScrollIndicator={false}
				ref={scrollRef}
			>
				<View style={styles.agendaEventsContainer}>
					{events.map((event, index) => (
						<Event
							key={index}
							event={event}
							eventOverlapCount={getEventOverlapCount({
								events,
								index,
								userTimezone,
							})}
							onRefetchEvents={onRefetchEvents}
							scrollRef={scrollRef}
							index={index}
						/>
					))}
				</View>

				<View style={styles.agenda}>
					{hours.map((hour) => (
						<AgendaHour key={hour.value} {...hour} />
					))}
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	agenda: { paddingBottom: verticalScale(20) },
	agendaContainer: {
		marginTop: verticalScale(12),
		paddingHorizontal: horizontalScale(12),
	},
	agendaEventsContainer: {
		marginLeft: horizontalScale(42),
		position: "relative",
		zIndex: 1,
	},
	agendaHour: {
		alignItems: "center",

		flexDirection: "row",
		gap: horizontalScale(6),
		height: verticalScale(20),
		marginBottom: verticalScale(20),
	},
	agendaHourSeparator: {
		backgroundColor: neutral.grey_04,
		flex: 1,
		height: verticalScale(1),
	},
	agendaHourText: {
		color: neutral.grey_07,
		...xxSm,
		...regular,
	},
	agendaHourTitle: {
		width: horizontalScale(36),
	},
	event: {
		borderLeftWidth: horizontalScale(3),
		borderRadius: horizontalScale(2),
		paddingHorizontal: horizontalScale(12),
		paddingTop: verticalScale(4),
		position: "absolute",
		width: "100%",
		zIndex: 1,
	},
	eventText: {
		fontSize: moderateScale(12),
		...medium,
		color: neutral.black,
	},
});

export default EventCalendarAgenda;
