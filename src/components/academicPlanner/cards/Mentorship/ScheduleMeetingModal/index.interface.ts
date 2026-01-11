import { IRadioValue } from "@components/Inputs/RadioInput";

import { IMentor } from "@graphql/query/academicPlanner/interfaces";

import { IEventStatusType } from "@interface/components/academicPlanner/events.interface";

export enum IMentorshipModalFormKeys {
	MEETING_DATE = "meetingDate",
	MEETING_TIME = "meetingTime",
}

export interface IMentorshipModalFormValues {
	[IMentorshipModalFormKeys.MEETING_DATE]?: string;
	[IMentorshipModalFormKeys.MEETING_TIME]?: IRadioValue;
}

export interface IMentorshipScheduleMeetingModalBase {
	mentor?: IMentor;
	mentorWindowId?: string;
	mentorWindowEventId?: string;
	workshopId?: string;
	bookByDate?: string;
	isReschedule?: boolean;
	mentorshipId: string;
	onClose: () => void;
	onRefetchEvents: () => void;
}

export interface IMentorshipScheduleMeetingModal
	extends IMentorshipScheduleMeetingModalBase {
	visible: boolean;

	eventStatus: IEventStatusType;
	eventTitle: string;
}

export type IUseMentorshipScheduleMeetingModalController =
	IMentorshipScheduleMeetingModalBase;

export interface IParseTimeSlotToRadioValue {
	id: string;
	startsAt: string;
	endsAt: string;
	userTimezone: string;
}
