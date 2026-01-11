import { SectionHandlerFn } from "./sectionHandler.types";

/**
 * Transforms aspiration form data to API format
 * Extracted from transformAspirationFormDataToAPI in useManualFlowController.ts
 */
const transformAspirationFormDataToAPI = (
	formData: Record<string, unknown>,
	aspiration: any,
) => {
	if (!aspiration?.userProfileCoursesProgramQuestions?.profileQuestions) {
		return [];
	}

	const profileQuestions =
		aspiration.userProfileCoursesProgramQuestions.profileQuestions;

	const response = Object.entries(formData)
		.filter(([, value]) => !!value)
		.map(([fieldName, fieldValue]) => {
			// Find matching question from API
			const matchingQuestion = profileQuestions.find(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(pq: any) => pq.question.instruction === fieldName,
			);

			if (!matchingQuestion) return null;

			let answerOption: string;

			if (typeof fieldValue === "object" && fieldValue !== null) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				answerOption = (fieldValue as any).value;
			} else if (typeof fieldValue === "string") {
				answerOption = fieldValue;
			} else {
				answerOption = String(fieldValue);
			}

			if (!answerOption) {
				return null;
			}

			return {
				question: matchingQuestion.question.id,
				questionType: matchingQuestion.question.type,
				answerOption: answerOption,
			};
		})
		.filter((item) => item !== null);

	return response;
};

/**
 * Handles saving aspiration sections
 * Extracted from lines 1371-1446 in useManualFlowController.ts
 *
 * Aspirations include goals, industry readiness preferences, and career aspirations
 */
export const handleAspirationSection: SectionHandlerFn = async ({
	formData,
	sectionId,
	updateFunctions,
	refetchFunctions,
	helpers,
}) => {
	try {
		// Get field names for current section
		const currentSection = helpers.currentSection;
		if (!currentSection) {
			return { success: true };
		}

		const sectionFieldNames = currentSection.fields.map(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(field: any) => field.name,
		);

		// Extract only current section's data
		const sectionData: Record<string, unknown> = {};
		sectionFieldNames.forEach((fieldName: string) => {
			if (formData[fieldName] !== undefined) {
				sectionData[fieldName] = formData[fieldName];
			}
		});

		// Skip if no data to save
		if (Object.keys(sectionData).length === 0) {
			return { success: true };
		}

		// Transform form data to API format (section-wise)
		const response = transformAspirationFormDataToAPI(
			sectionData,
			helpers.aspiration,
		);

		if (response.length === 0) {
			return { success: true }; // No valid responses to save
		}

		// Get metadata from aspiration API response and route params
		// IMPORTANT: Use program CODE (not ID!) for API compatibility
		const programCode =
			helpers.aspiration?.userProfileCoursesProgramQuestions?.code || "";
		const userProgramId = helpers.learningPathId || "";
		const workshopId = helpers.workshopId || "";

		// Check if any field is mandatory
		const hasMandatoryProfileQuestion = currentSection.fields.some(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(f: any) => f.isMandatory,
		);

		const payload = {
			profileResponse: {
				program: programCode, // Use program CODE, not ID
				userProgram: userProgramId,
				workshop: workshopId,
				isCompleted: true,
				hasMandatoryProfileQuestion,
				response,
			},
		};

		// Call update API
		await updateFunctions.updateAspiration(payload);

		// Refetch aspiration data to get updated submitted answers for next section
		await refetchFunctions.refetchAspirationData();

		// Refetch profile data
		await refetchFunctions.refetchProfileData();

		// Mark section as completed (aspiration-* → aspiration)
		// This is CRITICAL - without this, the stepper won't show as complete!
		// The stepper checks profileSectionCompletion.aspiration, which is only
		// updated when we call updateProfileSectionStatus
		if (updateFunctions.updateProfileSectionStatus) {
			await updateFunctions.updateProfileSectionStatus(
				"aspiration",
				true,
			);

			// Refetch completion status to update stepper immediately
			if (refetchFunctions.refetchCompletionStatus) {
				await refetchFunctions.refetchCompletionStatus();
			}
		}

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error: "Failed to save aspiration. Please try again.",
		};
	}
};
