import { useCallback, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";

import { IProfileConfigItem } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import { RootState } from "@redux/store/root.reducer";

import { IBuiltSection } from "../utils/sectionBuilders/sectionBuilder.types";
import { handleSectionSave } from "../utils/sectionHandlers/createSectionHandler";
import {
	ISectionHandlerContext,
	ISectionHandlerResult,
} from "../utils/sectionHandlers/sectionHandler.types";

interface IUseManualFlowSaveProps {
	sections: IBuiltSection[];
	methods: UseFormReturn<FieldValues>;
	updateFunctions: {
		updatePersonalDetails: (payload: any) => Promise<void>;
		updateWorkExperience: (payload: any) => Promise<void>;
		updateEducation: (payload: any) => Promise<void>;
		updateAspiration: (payload: any) => Promise<void>;
		updateContactDetails: (payload: any) => Promise<void>;
		updateResume: (payload: any) => Promise<void>;
		updateProfileSectionStatus?: (
			section: string,
			isCompleted: boolean,
		) => Promise<void>;
	};
	refetchFunctions: {
		refetchProfileData: () => Promise<void>;
		refetchWorkExperience: () => Promise<void>;
		refetchAspirationData: () => Promise<void>;
		refetchResumeData?: () => Promise<void>;
		refetchCompletionStatus?: () => Promise<void>;
	};
	helpers?: {
		aspiration?: any;
		learningPathId?: string;
		workshopId?: string;
		[key: string]: any;
	};
	activeProfileConfigList: IProfileConfigItem[];
}

/**
 * Hook to manage save operations for sections
 * Extracted from useManualFlowController
 *
 * This hook:
 * - Provides a unified save function for all sections
 * - Delegates to section-specific handlers
 * - Manages save state (loading, errors)
 * - Handles section data extraction from form
 *
 * @param sections - Array of all sections
 * @param methods - React Hook Form methods
 * @param updateFunctions - Object containing update mutation functions
 * @param refetchFunctions - Object containing refetch query functions
 * @returns Save function and state
 */
export const useManualFlowSave = ({
	sections,
	methods,
	updateFunctions,
	refetchFunctions,
	helpers: additionalHelpers = {},
	activeProfileConfigList,
}: IUseManualFlowSaveProps) => {
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	// Get user timezone for date formatting
	const userTimezone = useSelector(
		(state: RootState) => state.personalDetails.timezone?.name || "UTC",
	);

	/**
	 * Check if current section has any data filled
	 */
	const hasDataToSave = useCallback(
		(sectionIndex: number): boolean => {
			const currentSection = sections[sectionIndex];
			if (!currentSection) return false;

			const formValues = methods.getValues();
			const sectionFieldNames = currentSection.fields.map((f) => f.name);

			// Check if any field has data
			for (const fieldName of sectionFieldNames) {
				const value = formValues[fieldName];
				// Check for non-empty values
				if (
					value !== undefined &&
					value !== null &&
					value !== "" &&
					!(
						typeof value === "object" &&
						Object.keys(value).length === 0
					)
				) {
					return true;
				}
			}

			return false;
		},
		[sections, methods],
	);

	/**
	 * Save section data
	 * Extracts form data for the section and calls appropriate handler
	 *
	 * @param sectionIndex - Index of section to save
	 * @returns Promise<boolean> - True if save succeeded, false otherwise
	 */
	const saveSection = useCallback(
		async (sectionIndex: number): Promise<boolean> => {
			const currentSection = sections[sectionIndex];

			const sectionConfig = activeProfileConfigList.find(
				(config) => config.type === currentSection.section,
			);

			if (!currentSection) {
				return true;
			}

			// Check if there's data to save
			if (!hasDataToSave(sectionIndex)) {
				return true;
			}

			setIsSaving(true);
			setSaveError(null);

			try {
				// Get all form values
				const formValues = methods.getValues();

				// Extract only current section's fields
				const sectionFieldNames = currentSection.fields.map(
					(field) => field.name,
				);
				const sectionData: Record<string, unknown> = {};

				sectionFieldNames.forEach((fieldName) => {
					if (formValues[fieldName] !== undefined) {
						sectionData[fieldName] = formValues[fieldName];
					}
				});

				// Build handler context
				const context: ISectionHandlerContext = {
					formData: sectionData,
					sectionId: currentSection.id,
					updateFunctions,
					refetchFunctions,
					helpers: {
						userTimezone,
						currentSection, // Pass current section for field access
						...additionalHelpers, // Merge additional helpers (aspiration, learningPathId, workshopId)
					},
					sectionConfig,
				};

				// Call section handler
				const result: ISectionHandlerResult =
					await handleSectionSave(context);

				if (!result.success) {
					setSaveError(
						result.error ||
							"Failed to save section. Please try again.",
					);
					return false;
				}

				console.log(
					`✅ Section saved successfully: ${currentSection.id}`,
				);
				return true;
			} catch (error) {
				console.error(
					`❌ Error saving section ${currentSection.id}:`,
					error,
				);
				setSaveError("Failed to save section. Please try again.");
				return false;
			} finally {
				setIsSaving(false);
			}
		},
		[
			sections,
			methods,
			updateFunctions,
			refetchFunctions,
			userTimezone,
			additionalHelpers,
			hasDataToSave,
			activeProfileConfigList,
		],
	);

	/**
	 * Clear save error
	 */
	const clearSaveError = useCallback(() => {
		setSaveError(null);
	}, []);

	return {
		saveSection,
		isSaving,
		saveError,
		clearSaveError,
		hasDataToSave,
	};
};
