import { IFieldConfig } from "@components/MyProfile/common/profile.interface";
import { IUserProfileConfiguration } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

/**
 * Section status enum
 * Indicates the current state of a profile section
 */
export enum IProfileSectionStatus {
	CURRENT,
	PENDING,
	COMPLETED,
}

export interface IStep {
	id: string;
	title: string;
	status: IProfileSectionStatus;
	dueDate?: string;
	isCompleted: boolean;
	isDeadlinePassed: boolean;
	type: IUserProfileConfiguration;
}

export interface ISectionBuilderContext {
	fields: IFieldConfig[];
	step: IStep;
	config?: {
		shouldShowResume?: boolean;
		maxFieldsPerSection?: number;
		[key: string]: any;
	};
}

export interface IBuiltSection {
	id: string;
	title: string;
	description?: string;
	dueDate?: string;
	status: IProfileSectionStatus;
	fields: IFieldConfig[];
	section: string;
}

export type SectionBuilderFn = (
	context: ISectionBuilderContext,
) => IBuiltSection[];
