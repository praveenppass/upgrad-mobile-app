import { IUserProfileDeadLines } from "./userCourse.interface";

/**
 * Language interface for multilingual support
 */
export interface ILanguage {
	id: string;
	name: string;
}

export interface Program {
	id?: string;
	code?: string;
	name?: string;
	description?: string;
	image?: string;
	noOfDaysFromAssetPostDueDate?: number;
	learningPath?: null;
	enableQuestionBank?: boolean;
	totalEnrolledLearners?: number;
	level?: Level[];
	labType?: string;
	enablePracticeLab?: boolean;
	externalLab?: string[];
	websiteUrl?: string;
	tabsConfig?: IProgramTabConfig;
	enableTranslation?: boolean;
	languages?: ILanguage[];
}

export interface IProgramTabConfig {
	deliveryType: string | number;
	config: IProgramDeliveryTypeTabConfig;
}

export interface IProgramDeliveryTypeTabConfig {
	type: EnumStudyPlanTabType;
	name: string;
	containers: string | number[];
}

enum EnumStudyPlanTabType {
	SESSIONS,
	STUDY_PLAN,
	EXTENDED_STUDY_PLAN,
	RESOURCES,
}

interface Level {
	name?: string;
}

interface Course {
	id?: string;
	name?: string;
	description?: string;
	status?: string;
	courseLevels?: CourseLevel[];
}
interface CourseLevel {
	name?: string;
}

interface IUserProgramResponse {
	userProgram: IUserProgram;
}

interface IUserProgram {
	id: string;
	totalLevel1Containers: number;
	totalAssets: number;
	totalAssessments: number;
	totalProjects: number;
	totalAssignments: number;
	totalHandsOns: number;
	totalLearningDuration: number;
	totalExtensionsTaken: number;
	deliveryType: {
		id: string;
		name: string;
		type: string;
	};
	user: {
		id: string;
	};
	enterprise: null;
	enableQuestionBank: boolean;
	program: IProgram;
	remainingUnlockRequests: number;
	progress: number;
	variant: string;
	totalWorkshopSessions: number;
	isUpgraded: boolean;
	startedAt: string;
	expiresAt: string;
	accessDays: number;
	accessType: string;
	extendedDays: number;
	trialInfo: null;
	labType: string;
	currentState: null;
	workshop: {
		id: string;
		code: string;
		userProfileDeadlines: null;
	};
	mentoring: null;
	sessionGroup: null;
	weekContainerConfig: null;
	orderInfo: {
		paymentType: string;
		paymentLink: string;
		endsAt: string;
	};
	enableAvailableAndDueDate: boolean;
	isShowSectionDeadlineCancelButton: boolean;
	translationLanguage?: ILanguage | null;
}

interface IProgram {
	id: string;
	code: string;
	name: string;
	description: string;
	image: string;
	noOfDaysFromAssetPostDueDate: number;
	learningPath: null;
	enableAssetPenalty: boolean;
	enableResponseVerification: boolean;
	enableContentAgents: boolean;
	totalExtensionsAllowed: null;
	dueDateExtensionMode: string;
	enableSkilledAssets: boolean;
	totalEnrolledLearners: number;
	level: [
		{
			name: string;
		},
	];
	labType: string;
	playgroundTemplates: [];
	enablePracticeLab: boolean;
	externalLab: [];
	websiteUrl: string;
	tabsConfig: null;
	credlyBadgeImageUrl: boolean;
	isShowSectionDeadlineCancelButton?: boolean;
	userProfileDeadlines?: IUserProfileDeadLines;
	hardDeadlineDays: null;
	enableTranslation?: boolean;
	languages?: ILanguage[];
}

export {
	type Course,
	type IProgram,
	type IUserProgram,
	type IUserProgramResponse,
};
