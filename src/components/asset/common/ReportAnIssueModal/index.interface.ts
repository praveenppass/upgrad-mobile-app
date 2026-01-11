import { IRadioValue } from "@components/Inputs/RadioInput";
import { IShowToastOptions, ToastType } from "@components/Reusable/Toast";

import { LearningPathType } from "@interface/app.interface";

export interface IReportAnIssueModaGetContainerName {
	level: number;
	code: string | null;
}

export interface IReportAnIssueModalGetDescription {
	issueType: string;
	issueDescription: string;

	assetName: string;
	isQuiz: boolean;
	quizQuestionName?: string;

	learningPathName: string;
	learningPathType: LearningPathType;

	courseName: string;
	moduleName: string;
	sessionName: string;
	segmentName: string;
	buildPath: string;
}

interface IUseReportAnIssueModalBaseProps {
	assetCode: string;
	assetName: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
	learningPathName: string;
	buildPath: string;

	closeModal(): void;

	isQuiz?: boolean;
	quizQuestionId?: number;
	quizQuestionName?: string;
}

export type IUseReportAnIssueModalController = IUseReportAnIssueModalBaseProps;

export type IUseReportAnIssueModal = IUseReportAnIssueModalBaseProps;

export interface IUseReportAnIssueModalFormValues {
	issueType: IRadioValue | null;
	issueDescription: string;
}

export interface IReportAnIssueModaHandleSubmit {
	issueType: string;
	issueDescription: string;
}

export interface IReportAnIssueModalContainer {
	name: string;
	code: string;
}

export interface IReportAnErrorGetBasicIssueDescription {
	isQuiz: boolean;
	assetName: string;
	learningPathName: string;
	quizQuestionName?: string;
}

export interface IReportAnIssueGetIssueSubject {
	isQuiz: boolean;
	assetName: string;
	learningPathName: string;
}

export interface IReportAnIssueDelayToast {
	showToast: (options: IShowToastOptions) => void;
	type: ToastType;
}

export interface IReportAnIssueFetchAndSetContainerName {
	level: number;
	code: string | null;
	setName: (name: string) => void;
}
