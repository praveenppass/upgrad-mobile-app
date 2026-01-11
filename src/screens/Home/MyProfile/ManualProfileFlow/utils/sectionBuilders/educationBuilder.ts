import { SectionBuilderFn } from "./sectionBuilder.types";

/**
 * Creates sections for education dynamically
 * Education is typically a single section with all fields
 *
 * @param context - Section builder context containing fields, step info, and config
 * @returns Array with single education section
 */
export const createEducationSections: SectionBuilderFn = ({ fields, step }) => {
	// Education is always a single section
	if (fields.length === 0) return [];

	return [
		{
			id: "education-details",
			title: "Your Education, Your Foundation",
			description:
				"Share your latest educational qualification to help us align the program with your goals.",
			dueDate: step.dueDate,
			status: step.status,
			fields: fields.sort((a, b) => a.order - b.order),
			section: "education",
		},
	];
};
