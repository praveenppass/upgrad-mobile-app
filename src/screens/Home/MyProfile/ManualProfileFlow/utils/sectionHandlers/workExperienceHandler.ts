import { ICPSEmploymentStatus } from "@services/cpsService";

import { SectionHandlerFn } from "./sectionHandler.types";

/**
 * Map field values to API employment status values
 */
const fieldToApiValueMap: Record<string, ICPSEmploymentStatus> = {
	FRESHER: ICPSEmploymentStatus.FRESHER,
	WORKING: ICPSEmploymentStatus.WORKING,
	NOT_WORKING: ICPSEmploymentStatus.NOT_WORKING,
};

/**
 * Handles saving work experience sections
 * Extracted from lines 1448-1585 in useManualFlowController.ts
 *
 * This handler processes three work experience sections:
 * 1. work-experience-status: Updates currentlyWorking status
 * 2. work-experience-total: Updates total work experience years
 * 3. work-experience-addNew: Handles work experience entries (added via modal)
 */
export const handleWorkExperienceSection: SectionHandlerFn = async ({
	formData,
	sectionId,
	updateFunctions,
	refetchFunctions,
}) => {
	try {
		// First section: work-experience-status
		// Updates the employment status (fresher/working/not working)
		if (sectionId === "work-experience-status") {
			const isWorkingValue = formData.isWorking;
			const currentlyWorkingApiValue = isWorkingValue
				? fieldToApiValueMap[
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						(isWorkingValue as any)?.value || isWorkingValue
					]
				: undefined;

			if (currentlyWorkingApiValue) {
				await updateFunctions.updateWorkExperience({
					currentlyWorking: currentlyWorkingApiValue,
				});
				await refetchFunctions.refetchWorkExperience();
				await refetchFunctions.refetchProfileData();
			}

			// Mark section as completed (work-experience-* → workExperience)
			if (updateFunctions.updateProfileSectionStatus) {
				await updateFunctions.updateProfileSectionStatus(
					"workExperience",
					true,
				);

				// Refetch completion status to update stepper immediately
				if (refetchFunctions.refetchCompletionStatus) {
					await refetchFunctions.refetchCompletionStatus();
				}
			}

			return { success: true };
		}

		// Second section: work-experience-total
		// Updates only total work experience in years
		if (sectionId === "work-experience-total") {
			const experienceValue = formData.experience;

			await updateFunctions.updateWorkExperience({
				totalWorkExperience: experienceValue
					? Number(experienceValue)
					: undefined,
			});

			await refetchFunctions.refetchWorkExperience();
			await refetchFunctions.refetchProfileData();

			// Mark section as completed (work-experience-* → workExperience)
			if (updateFunctions.updateProfileSectionStatus) {
				await updateFunctions.updateProfileSectionStatus(
					"workExperience",
					true,
				);

				// Refetch completion status to update stepper immediately
				if (refetchFunctions.refetchCompletionStatus) {
					await refetchFunctions.refetchCompletionStatus();
				}
			}

			return { success: true };
		}

		// Third section: work-experience-addNew
		// Work experiences are added/edited via modal
		// This section just needs to ensure data is synced
		if (sectionId === "work-experience-addNew") {
			// Work experiences are managed via modal callbacks
			// Just refetch to ensure we have latest data
			await refetchFunctions.refetchWorkExperience();
			await refetchFunctions.refetchProfileData();

			// Mark section as completed (work-experience-* → workExperience)
			if (updateFunctions.updateProfileSectionStatus) {
				await updateFunctions.updateProfileSectionStatus(
					"workExperience",
					true,
				);

				// Refetch completion status to update stepper immediately
				if (refetchFunctions.refetchCompletionStatus) {
					await refetchFunctions.refetchCompletionStatus();
				}
			}

			return { success: true };
		}

		// Default: allow navigation for unknown sections
		return { success: true };
	} catch (error) {
		console.error("Failed to save work experience:", error);
		return {
			success: false,
			error: "Failed to save work experience. Please try again.",
		};
	}
};
