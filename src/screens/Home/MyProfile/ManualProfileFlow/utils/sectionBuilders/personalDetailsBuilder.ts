import { IFieldConfig } from "@components/MyProfile/common/profile.interface";

import { IBuiltSection, SectionBuilderFn } from "./sectionBuilder.types";

/**
 * Field grouping configuration for personal details
 *
 * Purpose: Defines how personal details fields should be organized into sections
 * This matches the original UX flow with granular sections for better user experience
 *
 * Each group represents a logical section in the UI:
 * - identityName: First and last name together
 * - identityDOB: Date of birth (separate section for better UX)
 * - identityFather: Father's name (separate for official documentation)
 * - demographicsGender: Gender selection
 * - demographicsNationality: Nationality selection
 * - location: All address-related fields together
 * - social: All social media profiles together
 * - media: Profile picture upload
 * - documents: Resume upload
 *
 * Note: This creates 9 sections for personal details, matching the original flow
 *
 * @example
 * If API only sends firstName and lastName:
 * → Only "identityName" section will be created
 *
 * If all fields are present:
 * → All 9 sections will be created (identityName, identityDOB, identityFather, etc.)
 */
const FIELD_GROUPS = {
	identityName: {
		fields: ["firstName", "lastName"],
		title: "Introduce Yourself",
		description:
			"Your name is the first step to making your mark on your learning journey.",
	},
	identityDOB: {
		fields: ["dateOfBirth"],
		title: "Let's Celebrate You!",
		description: "Your date of birth helps us personalise your experience.",
	},
	identityFather: {
		fields: ["fatherName"],
		title: "A Part of Your Identity",
		description:
			"Adding your father's name helps us maintain accurate records for official documentation and support.",
	},
	demographicsGender: {
		fields: ["gender"],
		title: "Who You Are!",
		description:
			"Sharing your gender helps us create an inclusive environment.",
	},
	demographicsNationality: {
		fields: ["nationality"],
		title: "Your Identity Matters",
		description:
			"Your nationality helps us understand and cater to your needs better.",
	},
	location: {
		fields: [
			"countryOfResidence",
			"state",
			"cityOfResidence",
			"address",
			"pincode",
		],
		title: "Your Location, Your Advantage!",
		description: "Your address helps us provide a tailored experience.",
	},
	social: {
		fields: ["linkedin", "telegram", "stackOverflow", "github", "kaggle"],
		title: "Showcase your work",
		description:
			"Your social profile connects your learning with your professional journey.",
	},
	media: {
		fields: ["profilePicture"],
		title: "Put a face to your Name!",
		description: "Upload your picture to personalize your profile.",
	},
	documents: {
		fields: ["resume"],
		title: "Highlight your Achievements",
		description:
			"Your resume helps us understand your background and support your goals.",
	},
};

/**
 * Groups fields dynamically based on field names and configuration
 *
 * Algorithm:
 * 1. Initialize empty arrays for each group
 * 2. Iterate through each field
 * 3. Match field name to group configuration
 * 4. Add field to appropriate group
 * 5. Filter out empty groups
 *
 * Special handling:
 * - Resume field: Conditionally included based on shouldShowResume flag
 * - Empty groups: Automatically removed (no empty sections)
 *
 * @param fields - Array of field configurations from field mapper
 * @param shouldShowResume - Whether to include resume field (false if already uploaded)
 * @returns Object with group keys and their fields, empty groups removed
 *
 * @example
 * Input: [
 *   { name: "firstName", order: 1 },
 *   { name: "lastName", order: 2 },
 *   { name: "resume", order: 10 }
 * ]
 * Output: {
 *   identity: [firstName, lastName],
 *   documents: [resume]  // Only if shouldShowResume is true
 * }
 */
const groupFieldsByCategory = (
	fields: IFieldConfig[],
	shouldShowResume: boolean,
): Record<string, IFieldConfig[]> => {
	const grouped: Record<string, IFieldConfig[]> = {};

	// Step 1: Initialize empty arrays for each group
	// This creates the structure: { identity: [], demographics: [], location: [], ... }
	Object.keys(FIELD_GROUPS).forEach((key) => {
		grouped[key] = [];
	});

	// Step 2: Distribute fields into appropriate groups
	fields.forEach((field) => {
		// Find which group this field belongs to by checking field name
		for (const [groupKey, groupConfig] of Object.entries(FIELD_GROUPS)) {
			if (groupConfig.fields.includes(field.name)) {
				// Special case: Skip resume field if user already uploaded one
				// This allows dynamic hiding of upload section
				if (field.name === "resume" && !shouldShowResume) {
					continue;
				}

				// Add field to its group
				grouped[groupKey].push(field);

				// Break to avoid adding same field to multiple groups
				break;
			}
		}
	});

	// Step 3: Remove empty groups (no sections for groups with no fields)
	// Only return groups that have at least one field
	// This prevents empty sections from appearing in UI
	return Object.fromEntries(
		Object.entries(grouped).filter(
			([_, groupFields]) => groupFields.length > 0,
		),
	);
};

/**
 * Creates sections for personal details dynamically
 *
 * This is the main builder function that replaces the static PERSONAL_DETAILS_SECTIONS
 * configuration. It creates sections based on what fields are actually available from
 * the API, rather than assuming a fixed structure.
 *
 * Process:
 * 1. Extract shouldShowResume from config (default: true)
 * 2. Group fields by category (identity, location, social, etc.)
 * 3. Create section for each non-empty group
 * 4. Sort fields within each section by order property
 * 5. Assign step status and due date to sections
 *
 * Key Features:
 * - Dynamic: Only creates sections for existing fields
 * - Conditional: Can hide/show sections based on config (e.g., resume)
 * - Ordered: Fields sorted by their order property
 * - Flexible: Easy to add new field groups
 *
 * @param context - Section builder context
 * @param context.fields - Fields from field mapper (already transformed from API)
 * @param context.step - Current step information (title, status, due date)
 * @param context.config - Optional configuration (e.g., { shouldShowResume: false })
 *
 * @returns Array of built sections ready for UI rendering
 *
 * @example
 * // Basic usage
 * const sections = createPersonalDetailsSections({
 *   fields: personalDetailsFields,
 *   step: currentStep,
 *   config: { shouldShowResume: true }
 * });
 *
 * // Result: 2-9 sections depending on available fields
 * // Each section has: id, title, description, fields, status, dueDate
 */
export const createPersonalDetailsSections: SectionBuilderFn = ({
	fields,
	step,
	config = {},
}) => {
	// Extract configuration (with sensible default)
	const { shouldShowResume = true } = config;

	// Step 1: Group fields by category (identity, location, social, etc.)
	const groupedFields = groupFieldsByCategory(fields, shouldShowResume);

	// Step 2: Build sections array
	const sections: IBuiltSection[] = [];

	// Step 3: Convert each group into a section
	Object.entries(groupedFields).forEach(([groupKey, groupFields]) => {
		// Get the configuration for this group
		const groupConfig = FIELD_GROUPS[groupKey as keyof typeof FIELD_GROUPS];

		// Safety check: Skip if group config missing or no fields
		if (!groupConfig || groupFields.length === 0) return;

		// Create section object
		sections.push({
			// Section ID format: "personal-details-{groupKey}"
			// Examples: "personal-details-identity", "personal-details-location"
			id: `personal-details-${groupKey}`,

			// UI text from group configuration
			title: groupConfig.title,
			description: groupConfig.description,

			// Metadata from step
			dueDate: step.dueDate,
			status: step.status,

			// Fields sorted by their order property (from API)
			// This ensures fields appear in the order backend specifies
			fields: groupFields.sort((a, b) => a.order - b.order),
			section: "personalDetails",
		});
	});

	// Return all created sections
	// This array is what the UI will render
	return sections;
};
