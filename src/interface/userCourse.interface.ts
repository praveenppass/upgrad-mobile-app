interface IUserCourseResponse {
	userCourse: IUserCourseData;
}

interface IUserCourseData {
	id: string;
	progress: number;
	labType: string;
	labPath: unknown;
	lab: unknown;
	workshop: unknown;
	totalLearningDuration: number;
	totalAssessments: number;
	totalAssignments: number;
	totalProjects: number;
	totalHandsOns: number;
	totalWorkshopSessions: number;
	mentoring: unknown;
	sessionGroup: unknown;
	userProgram: unknown;
	currentState: unknown;
	accessType: string;
	accessDays: number;
	startedAt: string;
	expiresAt: unknown;
	extendedDays: number;
	trialInfo: unknown;
	isUpgraded: boolean;
	deliveryType: {
		id: string;
		type: string;
		name: string;
	};
	variant: string;
	enableQuestionBank: boolean;
	course: IUserCourse;
	enableUpgrade: boolean;
	userConsent: unknown;
	practiceLabQuestionUrl: unknown;
	orderInfo: {
		paymentType: string;
		paymentLink: string;
		endsAt: string;
		workshopCode: unknown;
	};
	isShowSectionDeadlineCancelButton: boolean;
}

interface IUserCourse {
	author: unknown;
	id: string;
	websiteUrl: unknown;
	name: string;
	description: string;
	enableSkilledAssets: boolean;
	status: string;
	totalAssets: number;
	totalAssessments: number;
	totalProjects: number;
	totalAssignments: number;
	totalHandsOns: number;
	totalLearningDuration: number;
	learningPath: unknown;
	skills: ISkills[];
	courseLevels: {
		name: string;
	}[];
	upgradedSettings: unknown;
	enablePracticeLab: boolean;
	playgroundSettings: unknown;
	labType: string;
	playgroundTemplates: [];
	externalLab: [];
	website: {
		enableFreeTrial: boolean;
		enableFreeAccess: boolean;
	};
	isShowSectionDeadlineCancelButton?: boolean;
	userProfileDeadlines?: IUserProfileDeadLines;
}

interface IUserProfileDeadLines {
	personalDetails?: IDeadLineContent;
	about?: IDeadLineContent;
	education?: IDeadLineContent;
	workExperience?: IDeadLineContent;
	careerProfile?: IDeadLineContent;
	skills?: IDeadLineContent;
	areaOfInterest?: IDeadLineContent;
	programRequireAddProfileInfo?: IDeadLineContent;
	settings?: IDeadLineContent;
}

interface ISkills {
	id: string;
	name: string;
}

interface IDeadLineContent {
	dueByDays: number;
	hasDeadline: boolean;
}

export {
	type IUserCourseData,
	type IDeadLineContent,
	type IUserCourseResponse,
	type IUserProfileDeadLines,
};
