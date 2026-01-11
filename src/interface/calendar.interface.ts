import { UserCourse } from "./assetsCourse.interface";
import { UserProgram } from "./assetsProgram.interface";

interface ICalendarSummary {
	all: number;
	other: number;
	mentor: number;
	training: number;
	problemSolving: number;
	buddyConnect: number;
	careerCounselling: number;
	dailydoubtResolution: number;
	careerPrep: number;
}

interface IDoubtSummary {
	allQuestions: number;
	myQuestions: number;
}

enum IDoubtTab {
	allQuestions = "allQuestions",
	myQuestions = "myQuestions",
}
enum IEventKeys {
	all = "all",
	other = "other",
	mentor = "mentoring-session",
	training = "workshop-session",
	buddyConnect = "buddy-session",
	problemSolving = "problem-solving",
	careerCounselling = "career-counselling",
	group = "session-group",
	dailydoubtResolution = "doubt-resolution-session",
	careerPrep = "pi-session",
	liveSession = "live-session",
}
enum ICalendarTab {
	all = "all",
	other = "other",
	mentor = "mentor",
	training = "training",
	buddyConnect = "buddyConnect",
	problemSolving = "problemSolving",
	careerCounselling = "careerCounselling",
	dailydoubtResolution = "dailydoubtResolution",
	careerPrep = "careerPrep",
	group = "group",
	liveSession = "liveSession",
}

enum ICalendarType {
	all = "all",
	other = "other",
	mentor = "mentoring-session",
	training = "workshop-session",
	buddyConnect = "buddy-session",
	problemSolving = "daily-doubt-resolution",
	careerCounselling = "career-counselling",
	group = "session-group",
	dailydoubtResolution = "doubt-resolution-session",
	careerPrep = "pi-session",
	liveSession = "live-session",
}

enum ICalendarVIewType {
	list = "list_view",
	calendar = "calendar_view",
}

interface IUserEvents {
	totalCount: number;
	result: IUserEventsDetails[];
}

interface IUserEventsDetails {
	id: string;
	type: ICalendarType;
	sessionGroup: ISession;
	buddySession: ISession;
	workshopSession: ISession;
	mentoringSession: ISession;
	sessionGroupSession: ISession;
	session: ISession;
	userCourse: UserCourse | null;
	userProgram: UserProgram | null;
	status: string;
	endsAt: string;
	startsAt: string;
}

interface ISession {
	id: string;
	name: string;
	type: string | undefined;
	endsAt: Date;
	status: IStatusBtn;
	suggestedAt?: string;
	course?: {
		name: string;
	};
	program?: {
		name: string;
	};
	enableDoubtForm?: boolean;
	recordings: { vimeo?: string; brightcove?: string }[];
	order: number;
	startsAt: Date;
	attendance: {
		status: string;
	};
	learnerAttendance: {
		status: string;
	};
	deliveryType: {
		type: string;
		name: string;
	};
	buddy?: {
		status: string;
		lastName: string;
		firstName: string;
	};
	virtualMeeting: {
		code: string;
		encryptedPassword: string;
		joinUrl: string;
		uploadedFiles: {
			vimeoId?: string;
			brightcoveId?: string;
			joinUrl: string;
		}[];
	};
	virtualMeetingProvider?: {
		joinUrl: string;
		virtualMeetingProvider: IVirtualMeetingProviders;
	};
	mentorUser?: {
		mentor?: {
			lastName: string;
			firstName: string;
		};
	};
	workshop?: {
		id: string;
		noOfSessions: number;
		course: {
			id: string;
			name: string;
			variant: string;
		};
		program: {
			id: string;
			name: string;
			variant: string;
		};
		code?: string;
		noOfPax?: string;
		maxPax?: string;
		noOfHours?: string;
		startsAt?: string;
		endsAt?: string;
		timezone?: string;
		status?: string;
		deliveryType: {
			id?: string;
			name?: string;
			type?: string;
		};
		workshopType: {
			id?: string;
			code?: string;
			name?: string;
		};
	};
	instructors: {
		id: string;
		firstName: string;
		lastName: string;
		image?: string;
	}[];
}

enum IVirtualMeetingProviders {
	zoom = "zoom",
	live = "live-stream",
}

enum IUpcomingEventsButton {
	JOIN = "Join",
	JOIN_MEETING = "Join Meeting",
	VIEW_DETAILS = "View Details",
	PLAY_RECORD = "Play Record",
}

enum IStatusBtn {
	isLive = "isLive",
	not_attended = "not-attended",
	reschedule_request = "re-schedule Request",
	cancelled = "cancelled",
	attended = "attended",
	completed = "completed",
	in_progress = "in-progress",
	set_to_go_live = "set-to-go-live",
	yet_to_be_confirmed = "yet-to-be-confirmed",
	scheduled = "scheduled",
	yet_to_start = "yet-to-start",
	absent = "Absent",
	"request-to-rescheduled" = "request-to-rescheduled",
	"conducted-outside-prism" = "conducted-outside-prism",
}

interface IMentorSession {
	endsAt: string;
	startsAt: string;
}

interface IWorkshopChat {
	message: string;
	createdAt: string;
	author: {
		id: string;
		lastName: string;
		firstName: string;
	};
}

interface IWorkshopDoubtRes {
	chatForWorkshopSession: IWorkshopChat[];
}

interface IMentorSessionSummary {
	consumedHours: number;
	remainingHours: number;
	scheduledHours: number;
	totalMentoringHours: number;
}
interface IEventCardProps {
	index?: number;
	isModal?: boolean;
	hideCalendar?: boolean;
	isCourseDetail?: boolean;
	item: IUserEventsDetails;
	onChooseCard?: () => void;
}

interface ISessionDetails extends ISession {
	waitingTime: string;
	stream: {
		id: string;
		timeLapsed: number;
		duration: number;
		startsAt: string;
		endsAt: string;
	};
	video: {
		vimeo: string;
	};
	triggers: {
		timeToTrigger: unknown;
		timer: string;
		answerTimer: string;
		type: unknown;
		quiz: unknown;
		poll: {
			id: string;
			questions: {
				name: string;
				answers: unknown;
			};
		};
	};
}

interface IWorkshopSessionDetails {
	workshopSession: ISessionDetails;
}

interface IPendingFeedbackCourse {
	id: string;
	course: {
		name: string;
	};
}
interface IPendingFeedbackProgram {
	id: string;
	program: {
		name: string;
	};
}

interface IWorkshop {
	id: string;
	code: string;
	course: {
		name: string;
	};
	program: {
		name: string;
	};
}

interface IPendingFeedbackOptions {
	question: IFeedbackCategoryQuestions;
	category: IPendingFeedbackCategory;
}

interface IFeedBackPending {
	id: string;
	name: string;
	type: string;
	children: IPendingFeedbackOptions[];
}

enum IPendingFeedbackCategoryName {
	Instructor = "Instructor",
	Course = "Course",
	Comments = "Comments",
	Custom = "Custom",
	OVERALL = "Overall",
}

interface IPendingFeedbackCategory {
	description: string;
	name: IPendingFeedbackCategoryName;
	questions: IFeedbackCategoryQuestions[];
}

interface IRating {
	rating: number;
	tag: string;
}

enum IPendingFeedbackType {
	RATING = "RATING",
	CHOICE = "CHOICE",
	OPTIONS = "OPTIONS",
	TEXT = "TEXT",
	NUMBER = "NUMBER",
}

interface IFeedbackCategoryQuestions {
	id: string;
	question: string;
	type: IPendingFeedbackType;
	max: number;
	criteria: string;
	options: IFeedbackOptions[];
	ratingTags: IRating[];
}

interface IFeedbackOptions {
	option: string;
	tags: string[];
	tagGroupLabel: string;
}

interface IIPendingFeedbackRes {
	pendingFeedback: IPendingFeedbackData;
}

interface IConstructedFeedbackOptions {
	[key: number]: IPendingFeedbackOptions[];
}

interface IPendingFeedbackData {
	workshop: IWorkshop;
	workshopSession: ISession;
	userCourse: IPendingFeedbackCourse;
	userProgram: IPendingFeedbackProgram;
	deliveryType: {
		id: string;
		type: string;
		name: string;
	};
	isSubmitted: boolean;
	feedback: IFeedBackPending;
}

export {
	ICalendarTab,
	type ISession,
	ICalendarType,
	type IUserEvents,
	ICalendarVIewType,
	type IMentorSession,
	type ISessionDetails,
	type IEventCardProps,
	type ICalendarSummary,
	type IUserEventsDetails,
	type IMentorSessionSummary,
	type IWorkshopSessionDetails,
	IUpcomingEventsButton,
	IStatusBtn,
	type IDoubtSummary,
	IDoubtTab,
	type IWorkshopChat,
	type IWorkshopDoubtRes,
	IVirtualMeetingProviders,
	type IPendingFeedbackData,
	type IIPendingFeedbackRes,
	type IPendingFeedbackCourse,
	type IPendingFeedbackProgram,
	type IRating,
	IPendingFeedbackType,
	IPendingFeedbackCategoryName,
	type IPendingFeedbackOptions,
	type IConstructedFeedbackOptions,
	type IFeedbackCategoryQuestions,
	IEventKeys,
};
