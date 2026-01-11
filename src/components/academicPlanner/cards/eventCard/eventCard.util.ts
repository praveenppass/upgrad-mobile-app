import moment from "moment-timezone";

import {
	IGetEventData,
	IGetMentorRescheduleRequestText,
	IItem,
} from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { IDateFormat } from "@interface/app.interface";
import {
	IEventButtonTypes,
	IEventStatusType,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";

import { colors } from "@assets/colors";
import { CalendarIcon, ClockLxpIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const { bg, content } = colors;
const { cta } = colors;

const STRINGS = createStringConstants({
	viewResources: "common.resources.viewResources",
});

export const getEventData = ({
	eventType,
	eventStatus,
	bookByDate,
	dueDate,
	duration,
	eventDate,
	userTimezone,
}: IGetEventData): IItem[] => {
	const items: IItem[] = [];

	const addDefaultData = () => {
		if (eventDate) items.push({ Icon: CalendarIcon, text: eventDate });
		if (duration) items.push({ Icon: ClockLxpIcon, text: duration });
	};

	switch (eventType) {
		case IEventType.CONTENT:
			if (dueDate)
				items.push({
					Icon: CalendarIcon,
					text: `${strings.DUE_DATE_HEADER} ${dueDate}`,
				});

			break;
		case IEventType.PROFILE:
			if (dueDate)
				items.push({
					Icon: CalendarIcon,
					text: `${strings.DUE_DATE_HEADER} ${dueDate}`,
				});
			break;
		case IEventType.MENTORSHIP:
			if (bookByDate && eventStatus === IEventStatusType.PENDING)
				items.push({
					Icon: CalendarIcon,
					text: `${strings.BOOK_BY} ${moment.tz(bookByDate, userTimezone).format(IDateFormat.weekDateTime)}`,
				});
			else addDefaultData();
			break;
		default:
			addDefaultData();
			break;
	}

	return items;
};

export const getCTAType = (
	eventType: IEventType,
	eventStatus: IEventStatusType,
): IEventButtonTypes => {
	const eventButtonMapping: Record<IEventStatusType, IEventButtonTypes> = {
		[IEventStatusType.YET_TO_START]: [
			IEventType.CONTENT,
			IEventType.PROFILE,
		].includes(eventType)
			? IEventButtonTypes.START
			: IEventButtonTypes.JOIN_NOW,

		[IEventStatusType.IN_PROGRESS]: [
			IEventType.CONTENT,
			IEventType.PROFILE,
		].includes(eventType)
			? IEventButtonTypes.RESUME
			: IEventButtonTypes.JOIN_NOW,

		[IEventStatusType.OVERDUE]:
			eventType === IEventType.CONTENT
				? IEventButtonTypes.START
				: IEventButtonTypes.RESUME,

		[IEventStatusType.OVERDUE_NOT_STARTED]:
			eventType === IEventType.CONTENT
				? IEventButtonTypes.START
				: IEventButtonTypes.RESUME,

		[IEventStatusType.OVERDUE_IN_PROGRESS]:
			eventType === IEventType.CONTENT
				? IEventButtonTypes.START
				: IEventButtonTypes.RESUME,

		[IEventStatusType.COMPLETED]: [
			IEventType.CONTENT,
			IEventType.PROFILE,
		].includes(eventType)
			? IEventButtonTypes.RESTART
			: IEventButtonTypes.WATCH_RECORDING,

		[IEventStatusType.EXPIRED]: IEventButtonTypes.VIEW_NOTES,
		[IEventStatusType.PENDING]: IEventButtonTypes.SCHEDULE,
		[IEventStatusType.CANCELLED]: IEventButtonTypes.RE_SCHEDULE,
		[IEventStatusType.CONDUCTED_OUTSIDE_PRISM]:
			IEventButtonTypes.WATCH_RECORDING,
	};

	return eventButtonMapping[eventStatus];
};

export const getEventButtonText = (eventButtonType: IEventButtonTypes) => {
	const buttonTextMapping: Record<
		IEventButtonTypes,
		{ title: string; ctaColor: string[] }
	> = {
		[IEventButtonTypes.START]: {
			title: strings.START,
			ctaColor: cta.fill.gradient,
		},
		[IEventButtonTypes.RESUME]: {
			title: strings.RESUME,
			ctaColor: cta.fill.gradient,
		},
		[IEventButtonTypes.RESTART]: {
			title: strings.RESTART,
			ctaColor: [cta.fill.watch_recording, cta.fill.watch_recording],
		},
		[IEventButtonTypes.VIEW_NOTES]: {
			title: strings.VIEW_NOTES,
			ctaColor: cta.fill.gradient,
		},
		[IEventButtonTypes.RE_SCHEDULE]: {
			title: strings.RE_SCHEDULE_WITHOUT_SPACE,
			ctaColor: [
				cta.fill.primary_black_default,
				cta.fill.primary_black_default,
			],
		},
		[IEventButtonTypes.SCHEDULE]: {
			title: strings.SCHEDULE,
			ctaColor: cta.fill.gradient,
		},
		[IEventButtonTypes.JOIN_NOW]: {
			title: strings.JOIN_NOW,
			ctaColor: cta.fill.gradient,
		},
		[IEventButtonTypes.WATCH_RECORDING]: {
			title: strings.WATCH_RECORDING,
			ctaColor: [cta.fill.watch_recording, cta.fill.watch_recording],
		},
		[IEventButtonTypes.VIEW_RESOURCES]: {
			title: getString(STRINGS.viewResources),
			ctaColor: [
				cta.fill.primary_black_hovered,
				cta.fill.primary_black_hovered,
			],
		},
	};

	return (
		buttonTextMapping[eventButtonType] || {
			title: eventButtonType,
			ctaColor: cta.fill.gradient,
		}
	);
};

export const getEventStatusData = (eventStatus: IEventStatusType) => {
	switch (eventStatus) {
		case IEventStatusType.IN_PROGRESS:
			return {
				title: strings.IN_PROGRESS,
				textColor: content.text.in_progress,
				bgColor: bg.fill.in_progress,
			};

		case IEventStatusType.COMPLETED:
			return {
				title: strings.COMPLETED,
				textColor: content.text.completed,
				bgColor: bg.fill.completed,
			};

		case IEventStatusType.YET_TO_START:
			return {
				title: strings.YET_TO_START,
				textColor: content.text.yet_to_start,
				bgColor: bg.fill.yet_to_start,
			};

		case IEventStatusType.OVERDUE:
		case IEventStatusType.OVERDUE_NOT_STARTED:
		case IEventStatusType.OVERDUE_IN_PROGRESS:
			return {
				title: strings.OVERDUE,
				textColor: content.text.overdue,
				bgColor: bg.fill.overdue,
			};

		case IEventStatusType.EXPIRED:
			return {
				title: strings.EXPIRED,
				textColor: content.text.expired,
				bgColor: bg.fill.expired,
			};

		case IEventStatusType.PENDING:
			return {
				title: strings.PENDING,
				textColor: content.text.pending,
				bgColor: bg.fill.pending,
			};
		case IEventStatusType.CANCELLED:
			return {
				title: strings.CANCELLED,
				textColor: content.text.expired,
				bgColor: bg.fill.expired,
			};

		case IEventStatusType.CONDUCTED_OUTSIDE_PRISM:
			return {
				title: strings.CONDUCTED_OUTSIDE_PRISM,
				textColor: content.text.pending,
				bgColor: bg.fill.pending,
			};

		default:
			return {
				title: eventStatus,
				textColor: content.text.pending,
				bgColor: bg.fill.pending,
			};
	}
};

export const getSessionTitleData = (eventType: IEventType) => {
	switch (eventType) {
		case IEventType.MENTORSHIP:
			return {
				title: strings.MENTORSHIP,
				textcolor: content.text.mentorship,
			};
		case IEventType.LECTURE:
			return {
				title: strings.LECTURE,
				textcolor: content.text.lecture,
			};
		case IEventType.PERSONALISED_INDUSTRY:
			return {
				title: strings.PERSONALISED_INDUSTRY,
				textcolor: content.text.industry,
			};
		case IEventType.PROFILE:
			return {
				title: strings.PROFILE,
				textcolor: content.text.profile,
			};
		case IEventType.CONTENT:
			return {
				title: strings.CONTENT_TEXT,
				textcolor: content.text.container,
			};
		case IEventType.BUDDY_SESSION:
			return {
				title: strings.BUDDY_SESSION,
				textcolor: content.text.career_counselling,
			};
		case IEventType.CAREER_COUNSELLING:
			return {
				title: strings.CAREER_COUNSELLING,
				textcolor: content.text.career_counselling,
			};
		case IEventType.DAILY_DOUBT_RESOLUTION:
			return {
				title: strings.DAILY_DOUBT_RESOLUTION,
				textcolor: content.text.career_counselling,
			};
		case IEventType.DOUBT_RESOLUTION_SESSION:
			return {
				title: strings.DOUBT_RESOLUTION_SESSION,
				textcolor: content.text.career_counselling,
			};
		case IEventType.LIVE_SESSION:
			return {
				title: strings.LIVE_SESSION,
				textcolor: content.text.career_counselling,
			};
		case IEventType.OTHERS:
			return {
				title: strings.OTHERS,
				textcolor: content.text.career_counselling,
			};
		case IEventType.TA_CALL:
			return {
				title: strings.TA_CALL,
				textcolor: content.text.lecture,
			};
		default:
			return {
				title: strings.OTHERS,
				textcolor: content.text.career_counselling,
			};
	}
};

export const getMentorRescheduleRequestText = ({
	endsAt,
	mentor,
	startsAt,
	userTimezone,
}: IGetMentorRescheduleRequestText) => {
	const mentorName = mentor
		? `${mentor.firstName} ${mentor.lastName}`
		: strings.MENTOR;

	const formattedStartsAt = moment(startsAt)
		.tz(userTimezone)
		.format(IDateFormat.date);
	const formattedEndsAt = moment(endsAt)
		.tz(userTimezone)
		.format(IDateFormat.time);
	const formattedTimeSlot = `${formattedStartsAt}, ${moment(startsAt).tz(userTimezone).format(IDateFormat.time)} - ${formattedEndsAt}`;

	return `${mentorName} ${strings.HAS_REQUESTED_RESCHEDULE} ${formattedTimeSlot}`;
};
