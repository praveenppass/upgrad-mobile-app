import React from "react";

import { useCTAHandlerHelper } from "@screens/Home/HomeTab/AcademicPlanner/useCTAHandlerHelper";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import { getEventData } from "@components/academicPlanner/cards/eventCard/eventCard.util";
import EventCardModal from "@components/academicPlanner/cards/eventCard/EventCardModal";
import EventCardView from "@components/academicPlanner/cards/eventCard/EventCardView";
import MentorshipScheduleMeetingModal from "@components/academicPlanner/cards/Mentorship/ScheduleMeetingModal";

import useGetTimezone from "@hooks/useGetTimezone";

interface IEventCard {
	event: IEventCardProps;
	onRefetchEvents: () => void;
}
const EventCard: React.FC<IEventCard> = ({ event, onRefetchEvents }) => {
	const {
		id,
		eventType,
		dueDate,
		eventDate,
		duration,
		eventTitle,
		eventStatus,
		mentorWindow,
		mentors,
		sessionId,
		workshopId,
		rescheduleRequestDetails,
	} = event;

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
		handleResourceItemClick,
	} = useCTAHandlerHelper({
		onRefetchEvents,
	});

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

	const handleCtaClick = () => handleEventCTAClick(event);

	return (
		<>
			<EventCardView
				onViewModal={handleToggleModal}
				eventData={eventData}
				onCTAClick={handleCtaClick}
				{...event}
			/>
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
				onResourceCTAClick={() => {
					handleResourceItemClick({ eventType, sessionId });
				}}
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

export default EventCard;
