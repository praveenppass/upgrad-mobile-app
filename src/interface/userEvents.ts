export interface UserEventsList {
	userEvents?: UserEvents;
}

export interface UserEvents {
	totalCount?: number;
	result?: Result[];
}

export interface Result {
	id?: string;
	type?: string;
	userCourse?: ResultUserCourse | null;
	userProgram?: null;
	workshopSession?: WorkshopSession | null;
	sessionGroup?: ResultSessionGroup | null;
	sessionGroupSession?: SessionGroupSession | null;
	mentoringSession?: MentoringSession | null;
	buddySession?: BuddySession | null;
}

export interface BuddySession {
	id?: string;
	startsAt?: Date;
	endsAt?: Date;
	status?: string;
	buddy?: Buddy;
	learnerAttendance?: null;
	virtualMeeting?: null;
}

export interface Buddy {
	firstName?: string;
	lastName?: string;
}

export interface MentoringSession {
	id?: string;
	startsAt?: Date;
	endsAt?: Date;
	status?: string;
	suggestedAt?: null;
	mentorUser?: MentorUser;
	userCourse?: MentoringSessionUserCourse;
	userProgram?: null;
	learnerAttendance?: null;
	virtualMeeting?: MentoringSessionVirtualMeeting | null;
}

export interface MentorUser {
	mentor?: Buddy;
}

export interface MentoringSessionUserCourse {
	course?: CourseElement;
}

export interface CourseElement {
	name?: string;
}

export interface MentoringSessionVirtualMeeting {
	code?: string;
	type?: number;
	status?: string;
	joinUrl?: string;
	startUrl?: string;
	uuid?: string;
	uploadedFiles?: any[];
	encryptedPassword?: string;
}

export interface ResultSessionGroup {
	id?: string;
	title?: string;
}

export interface SessionGroupSession {
	id?: string;
	name?: string;
	status?: string;
	startsAt?: Date;
	endsAt?: Date;
	order?: number;
	isOpenDoubtForm?: boolean;
	enableDoubtForm?: boolean;
	isShowAskQuestion?: boolean;
	sessionGroup?: SessionGroupSessionSessionGroup;
	virtualMeeting?: SessionGroupSessionVirtualMeeting | null;
	attendance?: null;
	virtualMeetingProvider?: SessionGroupSessionVirtualMeetingProvider;
}

export interface SessionGroupSessionSessionGroup {
	id?: string;
	title?: string;
	course?: CourseElement;
	program?: null;
	workshops?: WorkshopElement[];
	instructors?: Instructor[];
}

export interface Instructor {
	id?: string;
	firstName?: string;
	lastName?: string;
}

export interface WorkshopElement {
	id?: string;
}

export interface SessionGroupSessionVirtualMeeting {
	id?: string;
	code?: string;
	startUrl?: string;
	joinUrl?: string;
	uploadedFiles?: any[];
	encryptedPassword?: string;
}

export interface SessionGroupSessionVirtualMeetingProvider {
	virtualMeetingProvider?: string;
	startUrl?: null;
	joinUrl?: null;
}

export interface ResultUserCourse {
	id?: string;
	totalProjects?: number;
	progress?: number;
	totalAssessments?: number;
	totalLevel1Containers?: number;
	totalLearningDuration?: number;
	totalWorkshopSessions?: number;
	course?: PurpleCourse;
	expiresAt?: null;
	orderInfo?: OrderInfo;
}

export interface PurpleCourse {
	courseLevels?: CourseElement[];
	skills?: CourseElement[];
	name?: string;
}

export interface OrderInfo {
	paymentType?: string;
	paymentLink?: null;
	endsAt?: null;
}

export interface WorkshopSession {
	id?: string;
	status?: string;
	order?: number;
	startsAt?: Date;
	endsAt?: Date;
	workshop?: WorkshopSessionWorkshop;
	deliveryType?: DeliveryType;
	attendance?: null;
	virtualMeeting?: null;
	virtualMeetingProvider?: WorkshopSessionVirtualMeetingProvider;
	recordings?: any[];
	instructors?: any[];
	video?: null;
}

export interface DeliveryType {
	type?: string;
	name?: string;
}

export interface WorkshopSessionVirtualMeetingProvider {
	virtualMeetingProvider?: string;
	joinUrl?: string;
}

export interface WorkshopSessionWorkshop {
	id?: string;
	noOfSessions?: number;
	course?: CourseElement;
	program?: null;
}
