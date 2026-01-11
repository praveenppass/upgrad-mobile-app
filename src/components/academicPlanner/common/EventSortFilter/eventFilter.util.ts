import {
	IEventStatusType,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";

import { strings } from "@assets/strings";

export const eventFilterStatusTypes = [
	{ title: strings.YET_TO_START, type: IEventStatusType.YET_TO_START },
	{ title: strings.IN_PROGRESS, type: IEventStatusType.IN_PROGRESS },
	{ title: strings.COMPLETED, type: IEventStatusType.COMPLETED },
	{ title: strings.OVERDUE, type: IEventStatusType.OVERDUE },
	{ title: strings.EXPIRED, type: IEventStatusType.EXPIRED },
	{ title: strings.CANCELLED, type: IEventStatusType.CANCELLED },
];

export const eventFilterTaskTypes = [
	{ title: strings.LECTURE, type: IEventType.LECTURE },
	{ title: strings.CONTENT_TEXT, type: IEventType.CONTENT },
	{ title: strings.PROFILE, type: IEventType.PROFILE },
	{ title: strings.MENTORSHIP, type: IEventType.MENTORSHIP },
	{
		title: strings.PERSONALISED_INDUSTRY,
		type: IEventType.PERSONALISED_INDUSTRY,
	},
	{ title: strings.LIVE_SESSION, type: IEventType.LIVE_SESSION },
	{
		title: strings.DOUBT_RESOLUTION_SESSION,
		type: IEventType.DOUBT_RESOLUTION_SESSION,
	},
	{ title: strings.CAREER_COUNSELLING, type: IEventType.CAREER_COUNSELLING },
	{
		title: strings.DAILY_DOUBT_RESOLUTION,
		type: IEventType.DAILY_DOUBT_RESOLUTION,
	},
	{ title: strings.BUDDY_SESSION, type: IEventType.BUDDY_SESSION },
	{ title: strings.TA_CALL, type: IEventType.TA_CALL },
	{ title: strings.OTHERS_CAMEL, type: IEventType.OTHERS },
];
