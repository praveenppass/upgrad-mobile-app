import { SectionBuilderFn } from "./sectionBuilder.types";

/**
 * Field grouping configuration for work experience
 */
const WORK_EXPERIENCE_GROUPS = {
	status: {
		fields: ["isWorking"],
		title: "Tell Us About Your Professional Journey",
		description:
			"Let us know if you're currently employed to tailor your experience.",
	},
	total: {
		fields: ["experience"],
		title: "Your Experience, Your Strength",
		description:
			"Share your total working experience to showcase your expertise.",
	},
	addNew: {
		fields: ["addWorkExperienceCard"],
		title: "Every Role Tells a Story",
		description:
			"Provide details of your roles to showcase your career journey.",
	},
};

/**
 * Creates sections for work experience dynamically
 * Replaces static WORK_EXPERIENCE_SECTIONS configuration
 *
 * @param context - Section builder context containing fields, step info, and config
 * @returns Array of built sections for work experience
 */
export const createWorkExperienceSections: SectionBuilderFn = ({
	fields,
	step,
}) => {
	const sections = [];

	// Create sections only for fields that exist in API response
	for (const [groupKey, groupConfig] of Object.entries(
		WORK_EXPERIENCE_GROUPS,
	)) {
		const groupFields = fields.filter((field) =>
			groupConfig.fields.includes(field.name),
		);

		if (groupFields.length === 0) continue;

		sections.push({
			id: `work-experience-${groupKey}`,
			title: groupConfig.title,
			description: groupConfig.description,
			dueDate: step.dueDate,
			status: step.status,
			fields: groupFields.sort((a, b) => a.order - b.order),
			section: "workExperience",
		});
	}

	return sections;
};
