import React, { memo, useCallback, useMemo } from "react";
import {
	FieldValues,
	FormProvider,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
} from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

import { IProfileSectionStatus } from "@screens/Home/MyProfile/ManualProfileFlow/utils/sectionBuilders/sectionBuilder.types";
import ParseLoader from "@screens/Home/MyProfile/ProfileMethods/ParseLoader";
import ParseResumeModal, {
	IFileUploadModalType,
	IUploadedFileData,
} from "@screens/Home/MyProfile/ProfileMethods/ParseResumeModal";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import { IFieldConfig } from "@components/MyProfile/common/profile.interface";
import { renderFields } from "@components/MyProfile/common/profile.util";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { semiBold, md } = commonStyles.text;

const STRINGS = createStringConstants({
	prev: "studyPlan.container6.prev",
	next: "studyPlan.container6.next",
	finish: "studyPlan.container6.finish",
});

export interface ISection {
	id: string;
	title: string;
	description?: string;
	dueDate?: string;
	status: IProfileSectionStatus;
	fields: IFieldConfig[];
}

interface IEditDetailsComponentProps {
	loading: boolean;
	sections: ISection[];
	sectionIndex: number;
	methods: UseFormReturn<FieldValues>;
	onError: SubmitErrorHandler<FieldValues>;
	onSubmit: SubmitHandler<FieldValues>;
	onSectionPress: (sectionIndex: number) => void;
	onPrev: () => void;
	onNext: () => void;
	totalSections: number;
	visibleSectionsCount: number;
	visibleSectionIndex: number;
	isNextButtonDisabled: boolean;
	isEffectivelyLastSection: () => boolean;
	isSaving?: boolean;
	parseModalConfig?: {
		isVisible: boolean;
		type: number;
	} | null;
	setParseModalConfig?: (
		config: { isVisible: boolean; type: number } | null,
	) => void;
	handleFileUploaded?: (fileData: IUploadedFileData) => void;
}

const isFieldEmpty = (v: unknown): boolean => {
	if (v == null || v === "" || (Array.isArray(v) && !v.length)) return true;

	if (typeof v === "object") {
		// Check if object has any keys
		if (!Object.keys(v).length) return true;

		// Check for dropdown/select values (label/value structure)
		const { label, value } = v as { label?: string; value?: string };
		if (label !== undefined || value !== undefined) {
			return !label && !value;
		}

		// Check for upload file values (fileName/filePath structure)
		const { fileName, filePath } = v as {
			fileName?: string;
			filePath?: string;
		};
		if (fileName !== undefined || filePath !== undefined) {
			return !fileName && !filePath;
		}

		// For other objects, consider them non-empty if they have keys
		return false;
	}

	return false;
};

interface INextButton {
	sections: ISection[];
	sectionIndex: number;
	isNextButtonDisabled: boolean;
	onNext: () => void;
	shouldShowFinish: boolean;
	methods: UseFormReturn<FieldValues>;
}

const NextButton = ({
	sections,
	sectionIndex,
	isNextButtonDisabled,
	onNext,
	shouldShowFinish,
	methods,
}: INextButton) => {
	const currentSection = useMemo(
		() => sections[sectionIndex],
		[sections, sectionIndex],
	);

	const mandatoryFieldNames = useMemo(
		() =>
			currentSection?.fields
				.filter((f) => f.isMandatory)
				.map((f) => f.name) ?? [],
		[currentSection],
	);

	const controlFields =
		methods.control && methods.control._fields
			? (Object.values(methods.control._fields) as Array<{
					_f: { name: string };
				}>)
			: [];

	const intersectingFields = controlFields
		.filter((f) => mandatoryFieldNames.includes(f._f.name))
		.map((f) => f._f.name);

	const watchedMandatoryFields = useMemo(
		() =>
			methods.watch(intersectingFields.length ? intersectingFields : []),
		[methods, intersectingFields],
	);

	const isButtonDisabled = useMemo(() => {
		if (isNextButtonDisabled) return true;
		if (!mandatoryFieldNames.length) return false;

		const values = Array.isArray(watchedMandatoryFields)
			? watchedMandatoryFields
			: [watchedMandatoryFields];

		return values.some(isFieldEmpty);
	}, [
		isNextButtonDisabled,
		mandatoryFieldNames,
		watchedMandatoryFields,
		isFieldEmpty,
	]);

	return (
		<CommonButton
			title={
				shouldShowFinish
					? getString(STRINGS.finish)
					: getString(STRINGS.next)
			}
			variant={IButtonVariant.Secondary}
			onPress={onNext}
			isDisabled={isButtonDisabled}
			style={styles.navButton}
		/>
	);
};

const EditDetailsComponent = ({
	loading,
	sections,
	sectionIndex,
	methods,
	onPrev,
	onNext,
	totalSections,
	visibleSectionsCount,
	visibleSectionIndex,
	isNextButtonDisabled,
	isEffectivelyLastSection,
	isSaving,
	parseModalConfig,
	setParseModalConfig,
	handleFileUploaded,
}: IEditDetailsComponentProps) => {
	const currentSection = useMemo(
		() => sections[sectionIndex],
		[sections, sectionIndex],
	);
	const isFirstSection = useMemo(() => sectionIndex === 0, [sectionIndex]);

	// Use isEffectivelyLastSection to determine if this is the last screen
	// This considers sections that will be skipped (e.g., work exp details for freshers)
	const shouldShowFinish = useMemo(
		() => isEffectivelyLastSection(),
		[isEffectivelyLastSection],
	);

	// Mandatory field names
	// const mandatoryFieldNames = useMemo(
	// 	() =>
	// 		currentSection?.fields
	// 			.filter((f) => f.isMandatory)
	// 			.map((f) => f.name) ?? [],
	// 	[currentSection],
	// );

	// console.log("mandatoryFieldNames", mandatoryFieldNames);

	// Watch mandatory fields
	// const watchedMandatoryFields = useWatch({
	// 	// control: methods.control,
	// 	name: mandatoryFieldNames,
	// 	disabled: !mandatoryFieldNames.length,
	// });

	// console.log("watchedMandatoryFields", watchedMandatoryFields);

	// Empty check

	// useEffect(() => {

	// }, [methods]);

	// console.log("methods", methods.control._fields);

	// Button disabled
	// const isButtonDisabled = useMemo(() => {
	// 	if (isNextButtonDisabled) return true;
	// 	if (!mandatoryFieldNames.length) return false;

	// 	const values = Array.isArray(watchedMandatoryFields)
	// 		? watchedMandatoryFields
	// 		: [watchedMandatoryFields];

	// 	return values.some(isFieldEmpty);
	// }, [
	// 	isNextButtonDisabled,
	// 	mandatoryFieldNames,
	// 	watchedMandatoryFields,
	// 	isFieldEmpty,
	// ]);

	const handleModalVisibilityChange = useCallback(
		(visible: boolean) => {
			if (setParseModalConfig && parseModalConfig) {
				setParseModalConfig(visible ? parseModalConfig : null);
			}
		},
		[setParseModalConfig, parseModalConfig],
	);

	// Memoize the form fields to prevent re-render when button state changes
	const formFields = useMemo(
		() => renderFields(currentSection?.fields || []),
		[currentSection?.fields],
	);

	if (loading || !currentSection) {
		return (
			<View style={styles.loadingContainer}>
				<RNText title="Loading..." style={styles.loadingText} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FormProvider {...methods}>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					keyboardShouldPersistTaps="handled"
					automaticallyAdjustsScrollIndicatorInsets={false}
				>
					{/* Section Header */}
					<View style={styles.sectionHeader}>
						<View style={styles.sectionTitleContainer}>
							<RNText
								title={currentSection.title}
								style={styles.sectionTitle}
							/>
							{currentSection.description && (
								<RNText
									title={currentSection.description}
									style={styles.sectionDescription}
								/>
							)}
						</View>
					</View>

					{/* Form Fields - Memoized to prevent re-render */}

					<View style={styles.fields}>{formFields}</View>
				</ScrollView>

				{/* Navigation Footer */}
				<View style={styles.footerContainer}>
					<View style={styles.navigationContainer}>
						{!isFirstSection ? (
							<CommonButton
								title={getString(STRINGS.prev)}
								variant={IButtonVariant.Tertiary}
								onPress={onPrev}
								style={styles.navButton}
							/>
						) : (
							<View style={styles.navButton} />
						)}

						<View style={styles.progressContainer}>
							<RNText
								title={`${visibleSectionIndex}/${visibleSectionsCount}`}
								style={styles.progressText}
							/>
						</View>

						{/* <CommonButton
						title={
							shouldShowFinish
								? getString(STRINGS.finish)
								: getString(STRINGS.next)
						}
						variant={IButtonVariant.Secondary}
						onPress={onNext}
						isDisabled={isButtonDisabled}
						style={styles.navButton}
					/> */}

						<NextButton
							sections={sections}
							sectionIndex={sectionIndex}
							isNextButtonDisabled={isNextButtonDisabled}
							onNext={onNext}
							shouldShowFinish={shouldShowFinish}
							methods={methods}
						/>
					</View>
				</View>
			</FormProvider>

			{/* File Upload Modal */}
			{parseModalConfig && handleFileUploaded && setParseModalConfig && (
				<ParseResumeModal
					isModalVisible={parseModalConfig.isVisible}
					setIsModalVisible={handleModalVisibilityChange}
					modalType={parseModalConfig.type as IFileUploadModalType}
					skipParsing={true}
					onFileUploaded={handleFileUploaded}
				/>
			)}

			{/* Loading Overlay */}
			{isSaving && (
				<View style={styles.loadingOverlay}>
					<ParseLoader
						linkedinLoading={true}
						resumeLoading={false}
						hideText={true}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	fields: {
		gap: verticalScale(16),
	},
	footerContainer: {
		backgroundColor: colors.neutral.white,
		borderTopColor: colors.neutral.grey_03,
		borderTopWidth: 1,
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(16),
	},
	loadingContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	loadingOverlay: {
		alignItems: "center",
		backgroundColor: colors.neutral.white,
		bottom: 0,
		justifyContent: "center",
		left: 0,
		opacity: 0.95,
		position: "absolute",
		right: 0,
		top: 0,
		zIndex: 1000,
	},
	loadingText: {
		...md,
		...semiBold,
		color: colors.neutral.grey_07,
	},
	navButton: {
		borderRadius: horizontalScale(6),
		height: verticalScale(40),
		width: horizontalScale(70),
	},
	navigationContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	progressContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	progressText: {
		...md,
		...semiBold,
		color: colors.neutral.grey_07,
	},
	scrollContainer: {
		paddingHorizontal: horizontalScale(20),
		paddingTop: verticalScale(20),
	},
	sectionDescription: {
		...md,
		...commonStyles.text.regular,
		color: colors.neutral.grey_07,
		lineHeight: verticalScale(20),
	},
	sectionHeader: {
		marginBottom: verticalScale(24),
	},
	sectionTitle: {
		...md,
		...semiBold,
		color: colors.neutral.black,
		marginBottom: verticalScale(4),
	},
	sectionTitleContainer: {
		marginBottom: verticalScale(8),
	},
});

export default memo(EditDetailsComponent);
