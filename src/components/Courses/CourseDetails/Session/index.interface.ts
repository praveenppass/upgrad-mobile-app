export enum IPrepartionType {
	LIVE_LEARNING,
	CAREER_PREP,
}

export enum ILearningType {
	UPCOMING,
	PAST,
	COURSES,
}

export enum ICarrerStatusType {
	TO_BE_SCHEDULED,
	SCHEDULED,
	EXPIRED,
}

export type ILearningOrCareerStatusType = ILearningType | ICarrerStatusType;

export type IFilterSessionEvents = Record<ISessionFilterType, string[]>;

export enum ISessionFilterType {
	STATUS = "status",
	TYPE = "type",
}

export enum ISessionType {
	LECTURE = "workshop-session",
	BUDDY_SESSION = "buddy-session",
	LIVE_SESSION = "live-session",
	DOUBT_RESOLUTION_SESSION = "problem-solving",
	CAREER_COUNSELLING = "career-counselling",
	DAILY_DOUBT_RESOLUTION = "doubt-resolution-session",
	TA_CALL = "on-demand-session",
	OTHERS = "other",
}

export enum ISessionScheduledType {
	MENTORSHIP = "mentoring-session",
	PERSONALISED_INDUSTRY = "pi-session",
	EXPIRED = "expired",
	PENDING = "pending",
}
//Removed
interface IEventOption {
	title: string;
	type: ILearningOrCareerStatusType;
}

export interface IEventData {
	title: string;
	type: IPrepartionType;
	options: IEventOption[];
}
