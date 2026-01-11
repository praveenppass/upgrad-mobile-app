export interface IMeData {
	me?: IMe;
}

export interface IMe {
	id?: string;
	websiteAccessToken?: string;
	image?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	companyName?: string;
	designation?: string;
	github?: string;
	linkedIn?: string;
	mobile?: string;
	stackOverflow?: string;
	experience?: Experience;
	dateOfBirth?: Date;
	chatToken?: string;
	isEmailVerify?: boolean;
	username?: string;
	userType?: string;
	isOnboardingCompleted?: null;
	isOnboardingSkipped?: null;
	isFreeGroupAssessmentRegistration?: boolean;
	timezone?: string;
	roles?: Role[];
	accessSettings?: AccessSettings;
	enterprise?: null;
	isSkipProductIntroduced?: boolean;
	isProductIntroduced?: boolean;
	isProductTourAccessed?: boolean;
	trialInfo?: null;
	gamificationProfile?: GamificationProfile;
	isGetStartedSkipped?: boolean;
	isGetStartedCompleted?: boolean;
	onboarding?: Onboarding;
	totalCourses?: number;
	country?: Country;
	__typename?: string;
}

interface AccessSettings {
	freeCourses?: boolean;
	freeCourseExpiresAt?: null;
	__typename?: string;
}

interface Country {
	id?: string;
	name?: string;
	__typename?: string;
}

interface Experience {
	year?: number;
	month?: number;
	__typename?: string;
}

interface GamificationProfile {
	id?: string;
	hasVisitedGamificationPage?: boolean;
	__typename?: string;
}

export interface Onboarding {
	enableSkip?: boolean;
	isCompleted?: boolean;
	isShow?: boolean;
	isSkipped?: boolean;
	userType?: string;
	completedStep?: number;
	__typename?: string;
}

export interface Role {
	isDefaultRole?: boolean;
	status?: string;
	role?: Country;
	__typename?: string;
}

export interface IUgMeDetails {
	firstname: string;
	lastname: string;
	id: number;
	email: string;
	profilePic: string;
	phoneNumber: string;
}
