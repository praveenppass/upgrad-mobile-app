import { FieldValues } from "react-hook-form";

import { IProfileConfigItem } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

/**
 * Context object passed to section handlers
 * Contains all data and functions needed to validate and save section data
 */
export interface ISectionHandlerContext {
	/** Form data from react-hook-form */
	formData: FieldValues;

	/** ID of the section being handled (e.g., "personal-details-identity") */
	sectionId: string;

	/** Update functions for different profile sections */
	updateFunctions: {
		updatePersonalDetails: (payload: any) => Promise<void>;
		updateWorkExperience: (payload: any) => Promise<void>;
		updateEducation: (payload: any) => Promise<void>;
		updateAspiration: (payload: any) => Promise<void>;
		updateContactDetails: (payload: any) => Promise<void>;
		updateResume: (payload: {
			fileName: string;
			filePath: string;
		}) => Promise<void>;
		updateProfileSectionStatus?: (
			section: string,
			isCompleted: boolean,
		) => Promise<void>;
	};

	/** Refetch functions to reload data after updates */
	refetchFunctions: {
		refetchProfileData: () => Promise<void>;
		refetchWorkExperience: () => Promise<void>;
		refetchAspirationData: () => Promise<void>;
		refetchResumeData?: () => Promise<void>;
		refetchCompletionStatus?: () => Promise<void>;
	};

	/** Helper values and utilities */
	helpers: {
		userTimezone: string;
		[key: string]: any;
	};

	sectionConfig?: IProfileConfigItem;
}

/**
 * Result returned by section handlers
 */
export interface ISectionHandlerResult {
	/** Whether the save operation was successful */
	success: boolean;

	/** Error message if save failed */
	error?: string;
}

/**
 * Function signature for section handlers
 */
export type SectionHandlerFn = (
	context: ISectionHandlerContext,
) => Promise<ISectionHandlerResult>;
