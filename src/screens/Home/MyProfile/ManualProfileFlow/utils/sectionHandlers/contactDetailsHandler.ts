import { SectionHandlerFn } from "./sectionHandler.types";

/**
 * Handles saving contact details sections
 * Extracted from lines 1787-1800 and 2014-2030 in useManualFlowController.ts
 *
 * Contact details include email, alternate email, mobile number, and WhatsApp preference
 */
export const handleContactDetailsSection: SectionHandlerFn = async ({
	formData,
	updateFunctions,
	refetchFunctions,
	sectionConfig,
}) => {
	try {
		const isWhatsappNumber = !!formData.isWhatsappNumber;
		const mobileNumber = formData.mobileNumber;

		const payload = {
			alternateEmail: formData.alternateEmail,
			whatsAppNumber: isWhatsappNumber ? mobileNumber : null,
			whatsAppNumberCountryCode: isWhatsappNumber ? "+91" : null,
		};

		await updateFunctions.updateContactDetails(payload);
		await refetchFunctions.refetchProfileData();

		// Mark section as completed (contact-details-* → contactDetails)
		if (
			updateFunctions.updateProfileSectionStatus &&
			!sectionConfig?.isCompleted
		) {
			await updateFunctions.updateProfileSectionStatus(
				"contactDetails",
				true,
			);

			// Refetch completion status to update stepper immediately
			if (refetchFunctions.refetchCompletionStatus) {
				await refetchFunctions.refetchCompletionStatus();
			}
		}

		return { success: true };
	} catch (error) {
		console.error("Failed to save contact details:", error);
		return {
			success: false,
			error: "Failed to save contact details. Please try again.",
		};
	}
};
