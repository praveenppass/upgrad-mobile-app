import moment from "moment-timezone";

import { SectionHandlerFn } from "./sectionHandler.types";

/**
 * Extracts value from dropdown/search field objects
 *
 * React Hook Form stores dropdown/select values in different formats depending
 * on the component type. This helper normalizes all formats to a plain string.
 *
 * Handles:
 * - CardInput (gender selection): { label: "Male", value: "MALE" }
 * - SearchField (country/city): { label: "India", value: "IN" }
 * - Dropdown: { label: "Option", value: "option_value" }
 * - Plain string: "value"
 *
 * Priority: value property > label property > string itself
 *
 * @param value - Field value from form (can be object or string)
 * @returns Extracted string value or undefined
 *
 * @example
 * extractValue({ label: "Male", value: "MALE" })    → "MALE"
 * extractValue({ label: "India" })                   → "India"
 * extractValue("DirectString")                       → "DirectString"
 * extractValue(null)                                 → undefined
 */
const extractValue = (value: any): string | undefined => {
	if (typeof value === "object" && value !== null) {
		return value.value || value.label;
	}
	if (typeof value === "string") {
		return value;
	}
	return undefined;
};

/**
 * Handles saving personal details sections
 *
 * Purpose: Saves user's personal information to backend when navigating away from section
 *
 * Original Location: Lines 1588-1814 in useManualFlowController.ts (228 lines)
 * Now: Extracted to focused, testable handler (~160 lines)
 *
 * Sections Handled:
 * ┌──────────────────────────────────────────────────────────────┐
 * │ Section ID                    │ Fields Saved                 │
 * ├──────────────────────────────────────────────────────────────┤
 * │ personal-details-identity     │ firstName, lastName, DOB,    │
 * │                               │ fatherName                   │
 * ├──────────────────────────────────────────────────────────────┤
 * │ personal-details-demographics │ gender, nationality          │
 * ├──────────────────────────────────────────────────────────────┤
 * │ personal-details-location     │ address, city, state,        │
 * │                               │ country, pincode             │
 * ├──────────────────────────────────────────────────────────────┤
 * │ personal-details-social       │ linkedin, github, kaggle,    │
 * │                               │ telegram, stackOverflow      │
 * ├──────────────────────────────────────────────────────────────┤
 * │ personal-details-media        │ profilePicture               │
 * ├──────────────────────────────────────────────────────────────┤
 * │ personal-details-documents    │ resume (separate mutation)   │
 * └──────────────────────────────────────────────────────────────┘
 *
 * Data Flow:
 * 1. Extract form data for current section
 * 2. Transform to API format (dropdowns → strings, dates → ISO)
 * 3. Call appropriate update function
 * 4. Refetch latest data
 * 5. Return success/failure
 *
 * Special Cases:
 * - Resume: Uses separate updateResume mutation
 * - Date of Birth: Converted to ISO string with user's timezone
 * - Dropdowns: Extracted to plain strings (gender, nationality)
 * - Address: Built as nested object
 *
 * @example
 * // When user fills name fields and clicks "Next"
 * const result = await handlePersonalDetailsSection({
 *   formData: { firstName: "John", lastName: "Doe" },
 *   sectionId: "personal-details-identity",
 *   updateFunctions: { updatePersonalDetails },
 *   refetchFunctions: { refetchProfileData },
 *   helpers: { userTimezone: "America/New_York" },
 * });
 * // Result: { success: true }
 * // API called with: { firstName: "John", lastName: "Doe" }
 */
export const handlePersonalDetailsSection: SectionHandlerFn = async ({
	formData,
	sectionId,
	updateFunctions,
	refetchFunctions,
	helpers,
}) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const payload: Record<string, any> = {};

		// Handle identity fields (name, DOB, father's name)
		if (sectionId.startsWith("personal-details-identity")) {
			if (formData.firstName !== undefined) {
				payload.firstName = formData.firstName;
			}
			if (formData.lastName !== undefined) {
				payload.lastName = formData.lastName;
			}
			if (formData.dateOfBirth !== undefined && formData.dateOfBirth) {
				payload.dateOfBirth = moment(formData.dateOfBirth)
					.tz(helpers.userTimezone)
					.toISOString();
			}
			if (formData.fatherName !== undefined) {
				payload.parentDocument = {
					fatherName: formData.fatherName,
				};
			}
		}

		// Handle demographic fields (gender, nationality)
		if (sectionId.startsWith("personal-details-demographics")) {
			if (formData.gender !== undefined) {
				payload.gender = extractValue(formData.gender);
			}
			if (formData.nationality !== undefined) {
				payload.nationality = extractValue(formData.nationality);
			}
		}

		// Handle location fields (address, city, state, country, pincode)
		if (sectionId.startsWith("personal-details-location")) {
			const hasAddressFields =
				formData.address !== undefined ||
				formData.pincode !== undefined ||
				formData.state !== undefined ||
				formData.cityOfResidence !== undefined ||
				formData.countryOfResidence !== undefined;

			if (hasAddressFields) {
				payload.address = {
					...(formData.address !== undefined && {
						flatNo: formData.address,
					}),
					...(formData.pincode !== undefined && {
						pincode: formData.pincode
							? Number(formData.pincode)
							: undefined,
					}),
					...(formData.state !== undefined && {
						state: extractValue(formData.state),
					}),
					...(formData.cityOfResidence !== undefined && {
						city: extractValue(formData.cityOfResidence),
					}),
					...(formData.countryOfResidence !== undefined && {
						country: extractValue(formData.countryOfResidence),
					}),
				};
			}
		}

		// Handle social profile fields
		if (sectionId.startsWith("personal-details-social")) {
			if (formData.linkedin !== undefined) {
				payload.linkedInUrl = formData.linkedin;
			}
			if (formData.telegram !== undefined) {
				payload.telegramId = formData.telegram;
			}
			if (formData.github !== undefined) {
				payload.githubProfile = formData.github;
			}
			if (formData.kaggle !== undefined) {
				payload.kaggleProfile = formData.kaggle;
			}
			if (formData.stackOverflow !== undefined) {
				payload.stackOverflowUrl = formData.stackOverflow;
			}
		}

		// Handle profile picture
		if (sectionId.startsWith("personal-details-media")) {
			if (
				formData.profilePicture !== undefined &&
				formData.profilePicture
			) {
				payload.profilePictureUrl = formData.profilePicture.filePath;
			}
		}

		// Handle resume upload (separate mutation)
		if (sectionId.startsWith("personal-details-documents")) {
			if (formData.resume !== undefined && formData.resume) {
				await updateFunctions.updateResume({
					fileName: formData.resume.fileName,
					filePath: formData.resume.filePath,
				});

				// Refetch resume data to update hasExistingResume check
				// This will trigger sections to recalculate and hide resume section
				if (refetchFunctions.refetchResumeData) {
					await refetchFunctions.refetchResumeData();
				}

				await refetchFunctions.refetchProfileData();

				// Mark section as completed (personal-details-* → personalDetails)
				if (updateFunctions.updateProfileSectionStatus) {
					await updateFunctions.updateProfileSectionStatus(
						"personalDetails",
						true,
					);

					// Refetch completion status to update stepper immediately
					if (refetchFunctions.refetchCompletionStatus) {
						await refetchFunctions.refetchCompletionStatus();
					}
				}

				return { success: true };
			}
		}

		// Call update API if there's data to save
		if (Object.keys(payload).length > 0) {
			await updateFunctions.updatePersonalDetails(payload);
			await refetchFunctions.refetchProfileData();
		}

		// Mark section as completed (personal-details-* → personalDetails)
		if (updateFunctions.updateProfileSectionStatus) {
			await updateFunctions.updateProfileSectionStatus(
				"personalDetails",
				true,
			);

			// Refetch completion status to update stepper immediately
			if (refetchFunctions.refetchCompletionStatus) {
				await refetchFunctions.refetchCompletionStatus();
			}
		}

		return { success: true };
	} catch (error) {
		console.error("Failed to save personal details:", error);
		return {
			success: false,
			error: "Failed to save personal details. Please try again.",
		};
	}
};
