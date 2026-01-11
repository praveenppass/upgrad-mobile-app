import { IUserProfileConfiguration } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import { handleAspirationSection } from "./aspirationHandler";
import { handleContactDetailsSection } from "./contactDetailsHandler";
import { handleEducationSection } from "./educationHandler";
import { handlePersonalDetailsSection } from "./personalDetailsHandler";
import {
	ISectionHandlerContext,
	ISectionHandlerResult,
	SectionHandlerFn,
} from "./sectionHandler.types";
import { handleWorkExperienceSection } from "./workExperienceHandler";

/**
 * Section handler registry - maps section ID patterns to handler functions
 * Replaces the massive switch statement in updateCurrentSection
 */
const SECTION_HANDLERS: Array<{
	pattern: RegExp;
	handler: SectionHandlerFn;
	type: IUserProfileConfiguration;
}> = [
	{
		pattern: /^personal-details-/,
		handler: handlePersonalDetailsSection,
		type: IUserProfileConfiguration.PERSONAL_DETAILS,
	},
	{
		pattern: /^work-experience-/,
		handler: handleWorkExperienceSection,
		type: IUserProfileConfiguration.WORK_EXPERIENCE,
	},
	{
		pattern: /^education-/,
		handler: handleEducationSection,
		type: IUserProfileConfiguration.EDUCATION,
	},
	{
		pattern: /^aspirations-/,
		handler: handleAspirationSection,
		type: IUserProfileConfiguration.ASPIRATION,
	},
	{
		pattern: /^contact-details-/,
		handler: handleContactDetailsSection,
		type: IUserProfileConfiguration.CONTACT_DETAILS,
	},
];

/**
 * Main handler function - finds and executes appropriate handler
 * Replaces the massive updateCurrentSection function (lines 1361-2094)
 *
 * @param context - Context containing form data, section ID, and update functions
 * @returns Result indicating success or failure with optional error message
 *
 * @example
 * ```typescript
 * const result = await handleSectionSave({
 *   formData: methods.getValues(),
 *   sectionId: "personal-details-identity",
 *   updateFunctions: { ... },
 *   refetchFunctions: { ... },
 *   helpers: { userTimezone: "UTC" }
 * });
 *
 * if (result.success) {
 *   // Navigate to next section
 * } else {
 *   // Show error: result.error
 * }
 * ```
 */
export const handleSectionSave = async (
	context: ISectionHandlerContext,
): Promise<ISectionHandlerResult> => {
	const { sectionId } = context;

	// Find matching handler
	const handlerConfig = SECTION_HANDLERS.find(({ pattern }) =>
		pattern.test(sectionId),
	);

	if (!handlerConfig) {
		console.warn(`No handler found for section: ${sectionId}`);
		return { success: true }; // Allow navigation if no handler found
	}

	// Execute handler
	return await handlerConfig.handler(context);
};

/**
 * Check if section has any data to save
 * Useful for validation before attempting save
 *
 * @param formData - Form data from react-hook-form
 * @param fieldNames - Array of field names in the current section
 * @returns True if any field has a non-empty value
 */
export const hasSectionData = (
	formData: Record<string, any>,
	fieldNames: string[],
): boolean => {
	return fieldNames.some((fieldName) => {
		const value = formData[fieldName];
		return (
			value !== undefined &&
			value !== null &&
			value !== "" &&
			!(typeof value === "object" && Object.keys(value).length === 0)
		);
	});
};

/**
 * Get handler type for a section ID
 * Useful for determining which profile type a section belongs to
 */
export const getHandlerType = (
	sectionId: string,
): IUserProfileConfiguration | null => {
	const handlerConfig = SECTION_HANDLERS.find(({ pattern }) =>
		pattern.test(sectionId),
	);
	return handlerConfig?.type || null;
};
