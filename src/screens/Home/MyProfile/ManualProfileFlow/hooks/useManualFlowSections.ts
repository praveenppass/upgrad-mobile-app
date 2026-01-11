import { useMemo } from "react";

import { IFieldConfig } from "@components/MyProfile/common/profile.interface";
import { IUserProfileConfiguration } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import {
	buildAllSections,
	buildSectionsForStep,
} from "../utils/sectionBuilders/createSectionBuilder";
import {
	IBuiltSection,
	IStep,
} from "../utils/sectionBuilders/sectionBuilder.types";

interface IUseManualFlowSectionsProps {
	steps: IStep[];
	fieldMappers: {
		mapPersonalDetailsFields: () => IFieldConfig[];
		mapWorkExperienceFields: () => IFieldConfig[];
		mapEducationFields: () => IFieldConfig[];
		mapAspirationFields: () => IFieldConfig[];
		mapContactDetailsFields: () => IFieldConfig[];
	};
	shouldShowResume: boolean;
}

/**
 * Hook to manage section building
 * Extracted from useManualFlowController to reduce complexity
 *
 * This hook:
 * - Builds field mapper registry
 * - Creates sections dynamically based on steps and available fields
 * - Handles conditional section visibility (e.g., resume section)
 *
 * @param steps - Array of profile configuration steps
 * @param fieldMappers - Object containing field mapper functions for each step type
 * @param shouldShowResume - Whether to show the resume section in personal details
 * @returns Object containing sections array and total section count
 */
export const useManualFlowSections = ({
	steps,
	fieldMappers,
	shouldShowResume,
}: IUseManualFlowSectionsProps) => {
	// Build field mapper registry
	// Maps each profile configuration type to its field mapper function
	const fieldMapperRegistry = useMemo(
		() => ({
			[IUserProfileConfiguration.PERSONAL_DETAILS]:
				fieldMappers.mapPersonalDetailsFields,
			[IUserProfileConfiguration.WORK_EXPERIENCE]:
				fieldMappers.mapWorkExperienceFields,
			[IUserProfileConfiguration.EDUCATION]:
				fieldMappers.mapEducationFields,
			[IUserProfileConfiguration.ASPIRATION]:
				fieldMappers.mapAspirationFields,
			[IUserProfileConfiguration.CONTACT_DETAILS]:
				fieldMappers.mapContactDetailsFields,
		}),
		[fieldMappers],
	);

	// Build configuration for section builders
	// Allows passing custom config to specific section builders
	const buildConfig = useMemo(
		() => ({
			[IUserProfileConfiguration.PERSONAL_DETAILS]: {
				shouldShowResume,
			},
		}),
		[shouldShowResume],
	);

	// Build all sections dynamically
	// Sections are created by calling field mappers and passing results to section builders
	// Use normal memoization - will recalculate when dependencies change
	const sections = useMemo(() => {
		return buildAllSections(steps, fieldMapperRegistry, buildConfig);
	}, [steps, fieldMapperRegistry, buildConfig]);

	/**
	 * Get sections for a specific step
	 * Useful for step-based navigation
	 */
	const getSectionsForStep = useMemo(() => {
		return (stepIndex: number): IBuiltSection[] => {
			const step = steps[stepIndex];
			if (!step) return [];

			const fieldMapper = fieldMapperRegistry[step.type];
			if (!fieldMapper) return [];

			const fields = fieldMapper();
			return buildSectionsForStep(step.type, {
				fields,
				step,
				config: buildConfig[step.type as keyof typeof buildConfig] as {
					shouldShowResume: boolean;
				},
			});
		};
	}, [steps, fieldMapperRegistry, buildConfig]);

	return {
		sections,
		totalSections: sections.length,
		getSectionsForStep,
	};
};
