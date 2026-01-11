import { IUserMilestoneCertificate } from "@graphql/query/studyPlan/container2/getProgramListDataQuery";

import { LearningPathType } from "@interface/app.interface";

export enum IUserProfileConfiguration {
	PERSONAL_DETAILS = "personalDetails",
	WORK_EXPERIENCE = "workExperience",
	EDUCATION = "education",
	ASPIRATION = "aspiration",
	CONTACT_DETAILS = "contactDetails",
}

export interface IGetDeadlineConfiguration {
	dueByDays: number;
	learningPathStartDate: string;
}

export interface ISurveyBlockerData {
	formId: string;
	deadlineDate: string;
	id: string;
}

interface IProfileSectionsCompletionStatus {
	personalDetails: boolean;
	education: boolean;
	workExperience: boolean;
	aspiration: boolean;
	contactDetails: boolean;
}

interface IProfileBlockerConfigurationItem {
	dueByDays: number;
	hasDeadline: boolean;
}

interface IProfileBlockerConfiguration {
	aspiration: IProfileBlockerConfigurationItem;
	contactDetails: IProfileBlockerConfigurationItem;
	education: IProfileBlockerConfigurationItem;
	personalDetails: IProfileBlockerConfigurationItem;
	workExperience: IProfileBlockerConfigurationItem;
}

interface IProfileResponse {
	isCompleted: boolean;
}

export interface IProfileBlockerData {
	profileSectionsCompletionStatus: IProfileSectionsCompletionStatus | null;
	profileBlockerConfiguration: IProfileBlockerConfiguration | null;
	profileResponses: IProfileResponse[] | null;
}

export interface IProfileConfigItem {
	type: IUserProfileConfiguration;
	isCompleted: boolean;
	isDeadlinePassed: boolean;
	deadlineDate: string;
}

export interface ICalculateProfileConfigList {
	profileBlockerData: IProfileBlockerData | null;
	learningPathStartDate: string;
}

export type IProfileBlockerConfigurationEntry = [
	key: string,
	value: IProfileBlockerConfigurationItem,
];

export interface ICertificateData extends IUserMilestoneCertificate {
	courseName: string;
	courseCode: string;
}

export interface IFeedbackData {
	hasPendingFeedback: boolean;
	feedbackId: string | null;
}

export interface IStudyPlanBlocker {
	certificatesData?: ICertificateData[] | null;
	surveyBlockerData?: ISurveyBlockerData | null;
	profileBlockerData?: IProfileBlockerData | null;
	shouldShowFirstAssetCompletionModal?: boolean;
	shouldShowOnboardingModal?: boolean;

	feedbackData?: IFeedbackData | null;
	courseId?: string;
	moduleId?: string;

	learningPathStartDate?: string;
	learningPathType: LearningPathType;
	learningPathId: string;
	learningPathCode: string;
	learningPathName?: string;
	workshopId: string;
	workshopCode?: string;
	refetchLearningPathData?: () => void;
	isLearningPathUpgraded?: boolean;
}
