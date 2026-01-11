import { useCallback } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { IBuiltSection } from "../utils/sectionBuilders/sectionBuilder.types";

interface IUseManualFlowValidationProps {
	sections: IBuiltSection[];
	currentSectionIndex: number;
	methods: UseFormReturn<FieldValues>;
	isSaving: boolean;
}

/**
 * Hook to manage validation for sections
 * Extracted from useManualFlowController
 *
 * This hook provides non-reactive validation callbacks
 * Button state validation is handled at component level to prevent keyboard closing
 *
 * @param sections - Array of all sections
 * @param currentSectionIndex - Current section index
 * @param methods - React Hook Form methods
 * @param isSaving - Whether save operation is in progress
 * @returns Validation callbacks
 */
export const useManualFlowValidation = ({
	sections,
	currentSectionIndex,
	methods,
	isSaving,
}: IUseManualFlowValidationProps) => {
	/**
	 * Check if current section passes validation and can proceed
	 * Non-reactive callback version - only called when needed (e.g., on Next click)
	 *
	 * Validation rules:
	 * 1. No validation errors in current section fields
	 * 2. All mandatory fields are filled
	 *
	 * @returns True if can proceed, false otherwise
	 */
	const canProceedToNext = useCallback((): boolean => {
		const currentSection = sections[currentSectionIndex];
		if (!currentSection) return false;

		const { formState } = methods;
		const formValues = methods.getValues();

		// Get current section field names
		const sectionFieldNames = currentSection.fields.map((f) => f.name);

		// Check for validation errors in current section
		const sectionErrors = Object.keys(formState.errors || {}).filter(
			(errorKey) => sectionFieldNames.includes(errorKey),
		);

		// If there are validation errors, can't proceed
		if (sectionErrors.length > 0) {
			return false;
		}

		// Check mandatory fields are filled
		const mandatoryFields = currentSection.fields.filter(
			(f) => f.isMandatory,
		);

		for (const field of mandatoryFields) {
			const value = formValues[field.name];

			// Check if mandatory field is empty
			if (value === undefined || value === null || value === "") {
				return false;
			}

			// Handle array (empty array is invalid)
			if (Array.isArray(value) && value.length === 0) {
				return false;
			}

			// Handle objects (dropdown values, upload files, etc.)
			if (typeof value === "object" && !Array.isArray(value)) {
				// Empty object is invalid
				if (Object.keys(value).length === 0) {
					return false;
				}

				// Check for dropdown/select values (label/value structure)
				if (value.label !== undefined || value.value !== undefined) {
					if (!value.label && !value.value) {
						return false;
					}
				}

				// Check for upload file values (fileName/filePath structure)
				if (
					value.fileName !== undefined ||
					value.filePath !== undefined
				) {
					if (!value.fileName && !value.filePath) {
						return false;
					}
				}

				// For other objects with keys, consider them valid
			}
		}

		// All validations passed
		return true;
	}, [sections, currentSectionIndex, methods]);

	/**
	 * isNextButtonDisabled is now handled at component level
	 * This just returns the saving state for compatibility
	 */
	const isNextButtonDisabled = isSaving;

	/**
	 * Get validation errors for current section
	 */
	const getCurrentSectionErrors = useCallback((): string[] => {
		const currentSection = sections[currentSectionIndex];
		if (!currentSection) return [];

		const { formState } = methods;
		const sectionFieldNames = currentSection.fields.map((f) => f.name);

		return Object.keys(formState.errors || {}).filter((errorKey) =>
			sectionFieldNames.includes(errorKey),
		);
	}, [sections, currentSectionIndex, methods]);

	/**
	 * Get list of empty mandatory fields in current section
	 */
	const getEmptyMandatoryFields = useCallback((): string[] => {
		const currentSection = sections[currentSectionIndex];
		if (!currentSection) return [];

		const formValues = methods.getValues();
		const mandatoryFields = currentSection.fields.filter(
			(f) => f.isMandatory,
		);

		return mandatoryFields
			.filter((field) => {
				const value = formValues[field.name];

				// Same validation logic as canProceedToNext
				if (value === undefined || value === null || value === "") {
					return true; // Field is empty
				}

				// Handle array
				if (Array.isArray(value) && value.length === 0) {
					return true; // Empty array
				}

				// Handle objects (dropdown values, upload files, etc.)
				if (typeof value === "object" && !Array.isArray(value)) {
					// Empty object is invalid
					if (Object.keys(value).length === 0) {
						return true;
					}

					// Check for dropdown/select values (label/value structure)
					if (
						value.label !== undefined ||
						value.value !== undefined
					) {
						if (!value.label && !value.value) {
							return true;
						}
					}

					// Check for upload file values (fileName/filePath structure)
					if (
						value.fileName !== undefined ||
						value.filePath !== undefined
					) {
						if (!value.fileName && !value.filePath) {
							return true;
						}
					}

					// For other objects with keys, consider them valid
				}

				return false; // Field has a value
			})
			.map((field) => field.name);
	}, [sections, currentSectionIndex, methods]);

	return {
		canProceedToNext,
		isNextButtonDisabled,
		getCurrentSectionErrors,
		getEmptyMandatoryFields,
	};
};
