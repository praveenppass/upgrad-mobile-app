import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { IUserProfileConfiguration } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import {
	IBuiltSection,
	IStep,
} from "../utils/sectionBuilders/sectionBuilder.types";

interface IUseManualFlowNavigationProps {
	sections: IBuiltSection[];
	steps: IStep[];
	methods: UseFormReturn<FieldValues>;
	onSectionSave: (sectionIndex: number) => Promise<boolean>;
	calculateSectionsBeforeStep: (stepIndex: number) => number;
	getStepIndexFromSectionIndex: (sectionIndex: number) => number;
}

/**
 * Hook to manage navigation between sections and steps
 * Extracted from useManualFlowController
 *
 * This hook:
 * - Manages current section and step indices
 * - Handles navigation (prev/next/jump to step)
 * - Implements special navigation rules (e.g., skip work experience for freshers)
 * - Saves section data before navigation
 *
 * @param sections - Array of all sections
 * @param steps - Array of profile steps
 * @param methods - React Hook Form methods
 * @param onSectionSave - Callback to save section data
 * @param calculateSectionsBeforeStep - Helper to calculate section index from step
 * @param getStepIndexFromSectionIndex - Helper to calculate step from section index
 * @returns Navigation state and handlers
 */
export const useManualFlowNavigation = ({
	sections,
	steps,
	methods,
	onSectionSave,
	calculateSectionsBeforeStep,
	getStepIndexFromSectionIndex,
}: IUseManualFlowNavigationProps) => {
	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);

	// Track previous sections array to detect when it changes
	const previousSectionsRef = useRef<IBuiltSection[]>(sections);
	const previousSectionIdRef = useRef<string | undefined>(sections[0]?.id);

	// Watch for sections array changes and adjust currentSectionIndex if needed
	// This handles cases like resume section being removed after upload
	useEffect(() => {
		const currentSection = sections[currentSectionIndex];

		// If current section index is out of bounds or pointing to undefined
		if (!currentSection) {
			// Clamp to valid range
			const validIndex = Math.min(
				Math.max(0, currentSectionIndex),
				sections.length - 1,
			);

			if (validIndex >= 0 && sections[validIndex]) {
				setCurrentSectionIndex(validIndex);
				setCurrentStep(getStepIndexFromSectionIndex(validIndex));
			}
		}

		// Update refs to track current state
		previousSectionsRef.current = sections;
		previousSectionIdRef.current = sections[currentSectionIndex]?.id;
	}, [sections, currentSectionIndex, getStepIndexFromSectionIndex]);

	// Get current section
	const currentSection = useMemo(
		() => sections[currentSectionIndex],
		[sections, currentSectionIndex],
	);

	/**
	 * Check if a section has any visible fields
	 * A section is considered "skippable" if all its fields are hidden by dependencies
	 */
	const isSectionSkippable = useCallback(
		(section: IBuiltSection): boolean => {
			const formValues = methods.getValues();

			// Check if all fields in the section are hidden by dependencies
			const hasAnyVisibleField = section.fields.some((field) => {
				// Check if field has valuesDependency property (not all field types have it)
				if (
					!("valuesDependency" in field) ||
					!field.valuesDependency?.hideUntilDependency
				) {
					return true; // Field is always visible
				}

				const { dependency, dependencyValues } = field.valuesDependency;
				if (!dependency) return true;

				const dependencyValue = formValues[dependency];

				// If no dependencyValues specified, field is visible when dependency has ANY value
				if (!dependencyValues || dependencyValues.length === 0) {
					// Check if dependency has a non-empty value
					if (!dependencyValue) return false;

					// Handle object values (dropdown/radio)
					if (
						typeof dependencyValue === "object" &&
						"value" in dependencyValue
					) {
						return !!dependencyValue.value;
					}

					// Handle string/primitive values
					return !!dependencyValue;
				}

				// If dependencyValues specified, check if dependency value matches any of them
				const dependencyMatches = dependencyValues.some(
					(reqValue: string) => {
						// Handle object values (dropdown/radio)
						if (
							dependencyValue &&
							typeof dependencyValue === "object" &&
							"value" in dependencyValue
						) {
							return dependencyValue.value === reqValue;
						}
						// Handle string values
						return dependencyValue === reqValue;
					},
				);

				return dependencyMatches || false;
			});

			return !hasAnyVisibleField;
		},
		[methods],
	);

	/**
	 * Navigate to previous section
	 * Special handling:
	 * 1. If coming from work-experience-status and resume is uploaded, skip resume section
	 * 2. If coming from education and user was fresher, go back to work-experience-status
	 * 3. Skip sections where all fields are hidden by dependencies
	 */
	const handlePrev = useCallback(async () => {
		if (currentSectionIndex <= 0) return;

		const currentSectionId = sections[currentSectionIndex]?.id;
		const formValues = methods.getValues();

		// SPECIAL CASE: If we're on work-experience-status and resume is uploaded
		// Skip the resume section and go to the section before it
		if (currentSectionId === "work-experience-status") {
			const hasResume = formValues.resume && formValues.resume.filePath;

			if (hasResume) {
				// Find the resume section
				const resumeSectionIndex = sections.findIndex((s) =>
					s.id.includes("documents"),
				);

				if (resumeSectionIndex !== -1 && resumeSectionIndex > 0) {
					// Go to the section BEFORE resume section
					const targetIndex = resumeSectionIndex - 1;
					setCurrentSectionIndex(targetIndex);
					setCurrentStep(getStepIndexFromSectionIndex(targetIndex));
					return;
				}
			}
		}

		const currentStepData = steps[currentStep];

		// Check if we're on education section and user had selected FRESHER
		if (
			currentStepData?.type === IUserProfileConfiguration.EDUCATION &&
			formValues.isWorking
		) {
			const isWorkingValue = formValues.isWorking;
			const isFresher =
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(isWorkingValue as any)?.value === "FRESHER" ||
				isWorkingValue === "FRESHER";

			if (isFresher) {
				// Find the work experience step
				const workExperienceStepIndex = steps.findIndex(
					(step) =>
						step.type === IUserProfileConfiguration.WORK_EXPERIENCE,
				);

				if (workExperienceStepIndex !== -1) {
					// Calculate the section index for the first work experience section
					const workExperienceSectionIndex =
						calculateSectionsBeforeStep(workExperienceStepIndex);
					setCurrentSectionIndex(workExperienceSectionIndex);
					setCurrentStep(workExperienceStepIndex);
					return;
				}
			}
		}

		// Navigate backwards, skipping sections with all hidden fields
		let targetIndex = currentSectionIndex - 1;

		// Keep going back until we find a non-skippable section or reach the start
		while (targetIndex >= 0) {
			const targetSection = sections[targetIndex];

			// If section exists and is not skippable, go to it
			if (targetSection && !isSectionSkippable(targetSection)) {
				setCurrentSectionIndex(targetIndex);
				setCurrentStep(getStepIndexFromSectionIndex(targetIndex));
				return;
			}

			// Otherwise, keep going back
			targetIndex--;
		}

		// If we couldn't find any non-skippable section, stay at first section
		setCurrentSectionIndex(0);
		setCurrentStep(0);
	}, [
		currentSectionIndex,
		currentStep,
		sections,
		steps,
		methods,
		calculateSectionsBeforeStep,
		getStepIndexFromSectionIndex,
		isSectionSkippable,
	]);

	/**
	 * Navigate to next section
	 * Special handling:
	 * 1. If user is fresher, skip work experience detail sections
	 * 2. Skip sections where all fields are hidden by dependencies
	 * 3. Handle dynamic section changes (e.g., resume section being removed after upload)
	 */
	const handleNext = useCallback(async () => {
		// Snapshot current section data BEFORE saving
		const currentSectionId = sections[currentSectionIndex]?.id;
		const isResumeSection = currentSectionId?.includes("documents");
		const isProfilePictureSection = currentSectionId?.includes("media");

		// Save current section first
		const saved = await onSectionSave(currentSectionIndex);

		if (!saved) {
			return; // Don't navigate if save failed
		}

		const formValues = methods.getValues();
		const hasResume = formValues.resume && formValues.resume.filePath;

		// SPECIAL CASE 1: If we're on resume section and it was just uploaded
		// Skip to the next section after resume
		if (isResumeSection && hasResume) {
			// Find the resume section index
			const resumeSectionIndex = sections.findIndex((s) =>
				s.id.includes("documents"),
			);

			if (resumeSectionIndex !== -1) {
				// Go to the section AFTER resume
				let targetIndex = resumeSectionIndex + 1;

				// Skip any hidden sections
				while (targetIndex < sections.length) {
					const targetSection = sections[targetIndex];
					if (targetSection && !isSectionSkippable(targetSection)) {
						setCurrentSectionIndex(targetIndex);
						setCurrentStep(
							getStepIndexFromSectionIndex(targetIndex),
						);
						return;
					}
					targetIndex++;
				}
			}
		}

		// SPECIAL CASE 2: If we're on profile picture section and resume is already uploaded
		// Skip the resume section entirely
		if (isProfilePictureSection && hasResume) {
			// Find the resume section index
			const resumeSectionIndex = sections.findIndex((s) =>
				s.id.includes("documents"),
			);

			if (resumeSectionIndex !== -1) {
				// Go to the section AFTER resume
				let targetIndex = resumeSectionIndex + 1;

				// Skip any hidden sections
				while (targetIndex < sections.length) {
					const targetSection = sections[targetIndex];
					if (targetSection && !isSectionSkippable(targetSection)) {
						setCurrentSectionIndex(targetIndex);
						setCurrentStep(
							getStepIndexFromSectionIndex(targetIndex),
						);
						return;
					}
					targetIndex++;
				}
			}
		}

		// Normal navigation - go to next section
		let targetIndex = currentSectionIndex + 1;

		// Navigate forward, skipping sections with all hidden fields
		while (targetIndex < sections.length) {
			const targetSection = sections[targetIndex];

			if (targetSection && !isSectionSkippable(targetSection)) {
				setCurrentSectionIndex(targetIndex);
				setCurrentStep(getStepIndexFromSectionIndex(targetIndex));
				return;
			}

			targetIndex++;
		}

		// If we couldn't find any non-skippable section, we're at the end
	}, [
		currentSectionIndex,
		sections,
		onSectionSave,
		methods,
		getStepIndexFromSectionIndex,
		isSectionSkippable,
	]);

	/**
	 * Jump to a specific step
	 */
	const handleStepPress = useCallback(
		(stepIndex: number) => {
			setCurrentStep(stepIndex);
			const sectionIndex = calculateSectionsBeforeStep(stepIndex);
			setCurrentSectionIndex(sectionIndex);
		},
		[calculateSectionsBeforeStep],
	);

	/**
	 * Jump to a specific section
	 */
	const handleSectionPress = useCallback((sectionIndex: number) => {
		setCurrentSectionIndex(sectionIndex);
	}, []);

	/**
	 * Check if current section is effectively the last section
	 * (i.e., no more non-skippable sections ahead)
	 * This is used to show "Finish" vs "Next" button
	 */
	const isEffectivelyLastSection = useCallback((): boolean => {
		// Check if there are any non-skippable sections ahead
		for (let i = currentSectionIndex + 1; i < sections.length; i++) {
			const section = sections[i];
			if (section && !isSectionSkippable(section)) {
				return false; // Found a non-skippable section ahead
			}
		}
		return true; // No non-skippable sections ahead
	}, [currentSectionIndex, sections, isSectionSkippable]);

	/**
	 * Calculate total visible sections (non-skippable sections only)
	 * This is used for accurate progress display (e.g., "9/12" instead of "9/16")
	 */
	const visibleSectionsCount = useMemo(() => {
		let count = 0;
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			if (section && !isSectionSkippable(section)) {
				count++;
			}
		}
		return count;
	}, [sections, isSectionSkippable]);

	/**
	 * Calculate the visible section index (excluding skipped sections)
	 * For example, if we're at section index 11 but 3 sections before it are skipped,
	 * the visible index would be 8
	 */
	const visibleSectionIndex = useMemo(() => {
		let count = 0;
		for (let i = 0; i < currentSectionIndex; i++) {
			const section = sections[i];
			if (section && !isSectionSkippable(section)) {
				count++;
			}
		}
		// Add 1 for the current section if it's visible
		const activeSection = sections[currentSectionIndex];
		if (activeSection && !isSectionSkippable(activeSection)) {
			count++;
		}
		return count;
	}, [sections, currentSectionIndex, isSectionSkippable]);

	return {
		currentSectionIndex,
		currentStep,
		currentSection,
		setCurrentSectionIndex,
		setCurrentStep,
		handlePrev,
		handleNext,
		handleStepPress,
		handleSectionPress,
		isEffectivelyLastSection,
		visibleSectionsCount,
		visibleSectionIndex,
	};
};
