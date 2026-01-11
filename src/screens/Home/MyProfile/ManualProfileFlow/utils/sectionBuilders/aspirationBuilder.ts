import { IFieldConfig } from "@components/MyProfile/common/profile.interface";

import { IBuiltSection, SectionBuilderFn } from "./sectionBuilder.types";

/**
 * Aspiration section groups configuration
 */
const ASPIRATION_GROUPS = {
	goals: {
		title: "Your Goals, Our Priority",
		description:
			"Tell us what drives you to pursue this program so we can focus on what matters to you.",
	},
	industryReady: {
		title: "Get Industry-Ready",
		description:
			"Join these sessions to gain insights and prepare for real-world challenges.",
	},
	dreams: {
		title: "Dream Big, Aim High",
		description:
			"Share your aspirations to guide us in supporting your career goals.",
	},
};

/**
 * Groups aspiration fields dynamically based on field name patterns
 * This allows flexibility if API adds new aspiration-related fields
 */
const groupAspirationFields = (
	fields: IFieldConfig[],
): Record<string, IFieldConfig[]> => {
	const groups: Record<string, IFieldConfig[]> = {
		goals: [],
		industryReady: [],
		dreams: [],
	};

	fields.forEach((field) => {
		// Smart categorization based on field name patterns
		if (field.name.includes("reason") || field.name.includes("goal")) {
			groups.goals.push(field);
		} else if (
			field.name.includes("PI") ||
			field.name.includes("interview") ||
			field.name.includes("PreferredTime")
		) {
			groups.industryReady.push(field);
		} else {
			// Default to dreams category for domain, subdomain, etc.
			groups.dreams.push(field);
		}
	});

	return groups;
};

/**
 * Creates sections for aspirations dynamically
 * Replaces static ASPIRATIONS_SECTIONS configuration
 *
 * @param context - Section builder context containing fields, step info, and config
 * @returns Array of built sections for aspirations
 */
export const createAspirationSections: SectionBuilderFn = ({
	fields,
	step,
}) => {
	const groupedFields = groupAspirationFields(fields);
	const sections: IBuiltSection[] = [];

	Object.entries(groupedFields).forEach(([groupKey, groupFields]) => {
		if (groupFields.length === 0) return;

		const groupConfig =
			ASPIRATION_GROUPS[groupKey as keyof typeof ASPIRATION_GROUPS];

		sections.push({
			id: `aspirations-${groupKey}`,
			title: groupConfig.title,
			description: groupConfig.description,
			dueDate: step.dueDate,
			status: step.status,
			fields: groupFields.sort((a, b) => a.order - b.order),
			section: "aspiration",
		});
	});

	return sections;
};
