import { SectionHandlerFn } from "./sectionHandler.types";

/**
 * Handles saving education sections
 * Extracted from lines 2047-2070 in useManualFlowController.ts
 *
 * Education entries are managed via modal (add/edit/delete callbacks)
 * This handler ensures the data is saved when navigating away
 */
export const handleEducationSection: SectionHandlerFn = async ({
	updateFunctions,
	refetchFunctions,
	helpers,
}) => {
	try {
		// Education list is managed via modal callbacks
		// The educationList state is updated when user adds/edits/deletes entries
		// Here we just save the current education list
		const educationList = helpers.educationList || [];

		if (educationList.length > 0) {
			await updateFunctions.updateEducation(educationList);
		} else {
			await refetchFunctions.refetchWorkExperience();
		}

		await refetchFunctions.refetchProfileData();

		// Mark section as completed (education-* → education)
		if (updateFunctions.updateProfileSectionStatus) {
			await updateFunctions.updateProfileSectionStatus("education", true);

			// Wait a moment for backend to process
			await new Promise((resolve) => setTimeout(resolve, 300));

			// Refetch completion status to update stepper immediately
			if (refetchFunctions.refetchCompletionStatus) {
				await refetchFunctions.refetchCompletionStatus();
				// Additional delay to ensure React processes state updates
				await new Promise((resolve) => setTimeout(resolve, 200));
			}
		}

		return { success: true };
	} catch (error) {
		console.error("Failed to save education details:", error);
		return { success: false };
	}
};
