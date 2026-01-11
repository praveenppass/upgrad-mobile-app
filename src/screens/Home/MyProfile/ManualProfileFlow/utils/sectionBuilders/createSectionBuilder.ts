import { IFieldConfig } from "@components/MyProfile/common/profile.interface";
import { IUserProfileConfiguration } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import { createAspirationSections } from "./aspirationBuilder";
import { createContactDetailsSections } from "./contactDetailsBuilder";
import { createEducationSections } from "./educationBuilder";
import { createPersonalDetailsSections } from "./personalDetailsBuilder";
import {
	IBuiltSection,
	ISectionBuilderContext,
	IStep,
	SectionBuilderFn,
} from "./sectionBuilder.types";
import { createWorkExperienceSections } from "./workExperienceBuilder";

/**
 * Section builder registry - maps profile types to builder functions
 * Follows functional programming patterns used in the project
 *
 * This replaces the static section configuration approach with dynamic building
 */
const SECTION_BUILDERS: Record<IUserProfileConfiguration, SectionBuilderFn> = {
	[IUserProfileConfiguration.PERSONAL_DETAILS]: createPersonalDetailsSections,
	[IUserProfileConfiguration.WORK_EXPERIENCE]: createWorkExperienceSections,
	[IUserProfileConfiguration.EDUCATION]: createEducationSections,
	[IUserProfileConfiguration.ASPIRATION]: createAspirationSections,
	[IUserProfileConfiguration.CONTACT_DETAILS]: createContactDetailsSections,
};

/**
 * Main section builder function
 * Builds sections for a specific step type dynamically
 *
 * @param stepType - The type of profile configuration step
 * @param context - Context containing fields, step info, and additional config
 * @returns Array of built sections for the step
 *
 * @example
 * ```typescript
 * const sections = buildSectionsForStep(
 *   IUserProfileConfiguration.PERSONAL_DETAILS,
 *   {
 *     fields: personalDetailsFields,
 *     step: currentStep,
 *     config: { shouldShowResume: true }
 *   }
 * );
 * ```
 */
export const buildSectionsForStep = (
	stepType: IUserProfileConfiguration,
	context: ISectionBuilderContext,
): IBuiltSection[] => {
	const builder = SECTION_BUILDERS[stepType];

	if (!builder) {
		console.warn(`No section builder found for step type: ${stepType}`);
		return [];
	}

	return builder(context);
};

/**
 * Helper to build all sections for all steps at once
 * Useful for pre-computing all sections during initialization
 *
 * @param steps - Array of steps to build sections for
 * @param fieldMappers - Record of field mapper functions for each step type
 * @param config - Optional configuration object for specific step types
 * @returns Flattened array of all built sections
 *
 * @example
 * ```typescript
 * const allSections = buildAllSections(
 *   steps,
 *   {
 *     [IUserProfileConfiguration.PERSONAL_DETAILS]: mapPersonalDetailsFields,
 *     [IUserProfileConfiguration.WORK_EXPERIENCE]: mapWorkExperienceFields,
 *     // ... other mappers
 *   },
 *   {
 *     [IUserProfileConfiguration.PERSONAL_DETAILS]: {
 *       shouldShowResume: true
 *     }
 *   }
 * );
 * ```
 */
export const buildAllSections = (
	steps: IStep[],
	fieldMappers: Record<IUserProfileConfiguration, () => IFieldConfig[]>,
	config?: Record<string, any>,
): IBuiltSection[] => {
	const allSections: IBuiltSection[] = [];

	steps.forEach((step) => {
		const fieldMapper = fieldMappers[step.type];
		if (!fieldMapper) {
			console.warn(`No field mapper found for step type: ${step.type}`);
			return;
		}

		const fields = fieldMapper();
		const sections = buildSectionsForStep(step.type, {
			fields,
			step,
			config: config?.[step.type],
		});

		allSections.push(...sections);
	});

	return allSections;
};
