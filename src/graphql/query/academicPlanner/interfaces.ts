import { IAssetType } from "@interface/asset.interface";
import {
	IEventAttendance,
	IEventStatusType,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";

export interface ISessionActivity {
	id: string;
	maxWatchTime: number;
	totalWatchTime: number;
	brightcoveId: string;
}

export interface IUserEvent {
	id: string;
	type: IEventType;
	startsAt: string;
	endsAt: string;
	status: IEventStatusType;
	userCourse?: IBaseCourse;
	userProgram?: IUserProgram;
	workshop?: IEntity;
	workshopSession?: ISessionDetails;
	sessionGroup?: IEntity;
	sessionGroupSession?: ISessionDetails;
	mentoringSession?: ISessionDetails;
	buddySession?: ISessionDetails;
	session?: ISessionDetails;
	mentorWindow?: IMentorWindow;
	mentorLearner?: IMentorLearner;
	contentDetails?: ISessionDetails;
	userProfileSection: IUserProfileConfiguration;
	sessionActivities?: ISessionActivity[];
}

export enum IUserProfileConfiguration {
	PERSONAL_DETAILS = "personalDetails",
	WORK_EXPERIENCE = "workExperience",
	EDUCATION = "education",
	ASPIRATION = "aspiration",
	CONTACT_DETAILS = "contactDetails",
}

export interface ILearningCourseSection {
	type: string;
	title: string;
}

interface IBaseCourse {
	id: string;
	progress: number;
	totalProjects: number;
	totalAssessments: number;
	totalLevel1Containers: number;
	totalLearningDuration: number;
	totalWorkshopSessions: number;
	expiresAt: string;
	orderInfo: IOrderInfo;
	course: ICourse;
	courseInfo?: {
		name: string;
	};
}

interface IUserProgram extends IBaseCourse {
	program: IProgram;
}

interface IEntity {
	id: string;
	name?: string;
	code?: string;
}

interface IOrderInfo {
	paymentType: string;
	paymentLink: string;
	endsAt: string;
}

interface ICourse {
	name: string;
	courseLevels: ICourseLevel[];
	skills: ISkill[];
	code: string;
}

interface IProgram {
	id: string;
	name: string;
	code: string;
	level: { name: string };
}

interface ICourseLevel {
	name: string;
}

interface ISkill {
	name: string;
}

interface IResource {
	id: string;
}

export interface ISessionDetails extends IEntity {
	id: string;
	aliasName?: string | null;
	status?: string;
	startsAt?: string;
	endsAt?: string;
	order?: number;
	isOpenDoubtForm?: boolean;
	enableDoubtForm?: boolean;
	isShowAskQuestion?: boolean;
	recordingVisibility?: string;
	instructors?: IMentor[];
	agenda?: IAgenda | null;
	recordings?: IRecordings;
	virtualMeeting?: IVirtualMeeting;
	virtualMeetingProvider?: IVirtualMeetingProvider;
	requestedReschedule?: boolean;
	requestedRescheduleTimeSlot?: ITimeSlot;
	rescheduledLearnerCount?: number;
	event?: IEvent;
	attendance?: IAttendance;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	asset?: IAsset;
	track?: ITrack;
	elective?: IElective;
	resources?: IResource[];
}

interface IMentorWindow {
	id: string;
	name: string;
	startsAt: string;
	endsAt: string;
	mentors?: IMentor[];
	event?: IEvent;
}

interface IVirtualMeetingProvider {
	virtualMeetingProvider: "zoom";
	joinUrl?: string;
	startUrl?: string;
	configuration?: string;
}

interface IAgenda {
	agenda: string;
}

interface IEvent {
	agenda?: string;
	agendaDoc?: {
		filePath: string;
	};
	code?: string;
}

interface IRecordings {
	vimeo?: string;
	brightcove?: string;
}

interface IVirtualMeeting {
	joinUrl?: string;
	startUrl?: string;
	encryptedPassword?: string;
	uuid?: string;
	code?: string;
	type?: string;
	status?: string;
	recordingUrl?: string;
	uploadedFiles?: IUploadedFile[];
}

export interface IUploadedFile {
	vimeoId?: string;
	brightcoveId?: string;
	joinUrl: string;
}

export interface ITimeSlot {
	id: string;
	startsAt: string;
	endsAt: string;
	mentor?: IMentor;
}

interface IMentorLearner {
	mentor: IMentor;
}

export interface IMentor {
	id: string;
	firstName: string;
	lastName: string;
}

interface IAsset {
	id: string;
	code: string;
	name: string;
	status: string;
	assetType: {
		type: IAssetType;
	};
}
interface ITrack {
	name: string;
}

interface IElective {
	name: string;
}
export interface IAttendance {
	status: IEventAttendance;
	joinsAt?: string;
}
