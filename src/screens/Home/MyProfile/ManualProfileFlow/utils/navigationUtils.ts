import { useCallback } from "react";

import { IFieldConfig } from "@components/MyProfile/common/profile.interface";
import { IUserProfileConfiguration } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import { buildSectionsForStep } from "./sectionBuilders/createSectionBuilder";
import { IProfileSectionStatus } from "./sectionBuilders/sectionBuilder.types";

// Step configuration mapping
export const STEP_TITLE_MAP: Partial<
	Record<IUserProfileConfiguration, string>
> = {
	[IUserProfileConfiguration.PERSONAL_DETAILS]: "Personal Details",
	[IUserProfileConfiguration.EDUCATION]: "Education Details",
	[IUserProfileConfiguration.WORK_EXPERIENCE]: "Work Experience",
	[IUserProfileConfiguration.CONTACT_DETAILS]: "Contact Details",
	[IUserProfileConfiguration.ASPIRATION]: "Aspirations",
};

/**
 * Hook to count sections dynamically based on built sections
 * Replaces the old static section counting approach
 */
export const useSectionCounter = (shouldShowResumeSection = true) => {
	const getSectionCountForStep = useCallback(
		(
			stepType: IUserProfileConfiguration,
			dynamicFields: IFieldConfig[],
			stepData?: {
				status: IProfileSectionStatus;
				dueDate?: string;
				isCompleted: boolean;
				isDeadlinePassed: boolean;
			},
		) => {
			// Build sections dynamically using the section builder
			const sections = buildSectionsForStep(stepType, {
				fields: dynamicFields,
				step: {
					id: stepType,
					title: STEP_TITLE_MAP[stepType] || "",
					status: stepData?.status || IProfileSectionStatus.PENDING,
					dueDate: stepData?.dueDate,
					isCompleted: stepData?.isCompleted || false,
					isDeadlinePassed: stepData?.isDeadlinePassed || false,
					type: stepType,
				},
				config: {
					shouldShowResume: shouldShowResumeSection,
				},
			});

			// Return actual count of built sections
			return sections.length || 0;
		},
		[shouldShowResumeSection],
	);

	return {
		getSectionCountForStep,
	};
};

// Step interface for type safety
interface IStep {
	type: IUserProfileConfiguration;
}

// Field mapper function type
type FieldMapper = () => IFieldConfig[];

// Navigation calculation utilities
export const useNavigationCalculator = (
	steps: IStep[],
	mapPersonalDetailsFields: FieldMapper,
	mapWorkExperienceFields: FieldMapper,
	mapEducationFields: FieldMapper,
	mapContactDetailsFields: FieldMapper,
	mapAspirationFields: FieldMapper,
	shouldShowResumeSection = true,
) => {
	const { getSectionCountForStep } = useSectionCounter(
		shouldShowResumeSection,
	);

	// Helper to get dynamic fields for a step type
	const getDynamicFieldsForStep = useCallback(
		(stepType: IUserProfileConfiguration): IFieldConfig[] => {
			switch (stepType) {
				case IUserProfileConfiguration.PERSONAL_DETAILS:
					return mapPersonalDetailsFields();
				case IUserProfileConfiguration.WORK_EXPERIENCE:
					return mapWorkExperienceFields();
				case IUserProfileConfiguration.EDUCATION:
					return mapEducationFields();
				case IUserProfileConfiguration.CONTACT_DETAILS:
					return mapContactDetailsFields();
				case IUserProfileConfiguration.ASPIRATION:
					return mapAspirationFields();
				default:
					return [];
			}
		},
		[
			mapPersonalDetailsFields,
			mapWorkExperienceFields,
			mapEducationFields,
			mapContactDetailsFields,
			mapAspirationFields,
		],
	);

	const getStepIndexFromSectionIndex = useCallback(
		(sectionIndex: number) => {
			let currentSectionCount = 0;

			for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
				const step = steps[stepIndex];
				const dynamicFields = getDynamicFieldsForStep(step.type);
				const stepSectionCount = getSectionCountForStep(
					step.type,
					dynamicFields,
				);

				if (sectionIndex < currentSectionCount + stepSectionCount) {
					return stepIndex;
				}

				currentSectionCount += stepSectionCount;
			}

			return steps.length - 1;
		},
		[steps, getDynamicFieldsForStep, getSectionCountForStep],
	);

	const calculateSectionsBeforeStep = useCallback(
		(stepIndex: number) => {
			return steps.slice(0, stepIndex).reduce((total, step) => {
				const dynamicFields = getDynamicFieldsForStep(step.type);
				return total + getSectionCountForStep(step.type, dynamicFields);
			}, 0);
		},
		[steps, getDynamicFieldsForStep, getSectionCountForStep],
	);

	return {
		getStepIndexFromSectionIndex,
		calculateSectionsBeforeStep,
	};
};
