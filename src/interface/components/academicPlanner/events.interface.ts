export enum IEventStatusType {
	IN_PROGRESS = "in-progress",
	YET_TO_START = "yet-to-start",
	COMPLETED = "completed",
	OVERDUE = "overdue",
	EXPIRED = "expired",
	PENDING = "pending",
	CANCELLED = "cancelled",
	OVERDUE_NOT_STARTED = "overdue-not-started",
	OVERDUE_IN_PROGRESS = "overdue-in-progress",
	CONDUCTED_OUTSIDE_PRISM = "conducted-outside-prism",
}

export enum IEventType {
	CONTENT = "user-content",
	PROFILE = "user-profile",
	LECTURE = "workshop-session",
	PERSONALISED_INDUSTRY = "pi-session",
	BUDDY_SESSION = "buddy-session",
	LIVE_SESSION = "live-session",
	DOUBT_RESOLUTION_SESSION = "problem-solving",
	CAREER_COUNSELLING = "career-counselling",
	DAILY_DOUBT_RESOLUTION = "doubt-resolution-session",
	OTHERS = "other",
	MENTORSHIP = "mentoring-session",
	TA_CALL = "on-demand-session",
}
export enum IEventButtonTypes {
	START = "Start",
	RESUME = "Resume",
	RESTART = "Restart",
	VIEW_NOTES = "View Notes",
	RE_SCHEDULE = "Reschedule",
	SCHEDULE = "Schedule",
	JOIN_NOW = "Join Now",
	WATCH_RECORDING = "Watch Recording",
	VIEW_RESOURCES = "View Resources",
}
export enum IEventAttendance {
	ATTENDED = "attended",
	MISSED = "missed",
	NOT_ATTENDED = "not-attended",
}

export enum IViewedStatus {
	VIEWED = "viewed",
	NOT_VIEWED = "not-viewed",
}
