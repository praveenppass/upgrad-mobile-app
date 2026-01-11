import { SectionBuilderFn } from "./sectionBuilder.types";

/**
 * Creates sections for contact details dynamically
 * Contact details is typically a single section with all fields
 *
 * @param context - Section builder context containing fields, step info, and config
 * @returns Array with single contact details section
 */
export const createContactDetailsSections: SectionBuilderFn = ({
	fields,
	step,
}) => {
	if (fields.length === 0) return [];

	return [
		{
			id: "contact-details-info",
			title: "Stay Connected, Stay Informed",
			description:
				"Provide your contact information so we can keep you updated on your learning journey.",
			dueDate: step.dueDate,
			status: step.status,
			fields: fields.sort((a, b) => a.order - b.order),
			section: "contactDetails",
		},
	];
};
