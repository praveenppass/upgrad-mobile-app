import {
	StackActions,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import moment from "moment-timezone";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
} from "react-hook-form";

import {
	IProfileConfigItem,
	IUserProfileConfiguration,
} from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import {
	getEducationDetails,
	getWorkExperienceDetails,
	ICPSEducationDetails,
	ICPSEmploymentStatus,
	updateEducationDetails,
	updateWorkExperienceDetails,
} from "@services/cpsService";

import { IHomeStackNativeNavigationProp } from "@navigation/navigators/homeNavigator/homeNavigator.interface";
import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";

import { LearningPathType } from "@interface/app.interface";
import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

import { useManualFlowData } from "./hooks/useManualFlowData";
import { useManualFlowNavigation } from "./hooks/useManualFlowNavigation";
import { useManualFlowSave } from "./hooks/useManualFlowSave";
import { useManualFlowSections } from "./hooks/useManualFlowSections";
import { useManualFlowValidation } from "./hooks/useManualFlowValidation";
import {
	useAspirationFieldMapper,
	useContactDetailsFieldMapper,
	useEducationFieldMapper,
	usePersonalDetailsFieldMapper,
	useWorkExperienceFieldMapper,
} from "./utils/fieldMappers";
import { useNavigationCalculator } from "./utils/navigationUtils";
import { IBuiltSection } from "./utils/sectionBuilders/sectionBuilder.types";

// Type definitions
export interface IStep {
	id: string;
	title: string;
	status: string;
	dueDate?: string;
	isCompleted: boolean;
	isDeadlinePassed: boolean;
	type: IUserProfileConfiguration;
}

export interface ISection {
	id: string;
	title: string;
	description?: string;
	dueDate?: string;
	status: string;
	fields: any[];
}

interface IUseManualFlowController {
	profileConfigList?: IProfileConfigItem[];
}

// Map API values to field values for isWorking
const apiToFieldValueMap: Record<string, string> = {
	[ICPSEmploymentStatus.FRESHER]: "FRESHER",
	[ICPSEmploymentStatus.WORKING]: "WORKING",
	[ICPSEmploymentStatus.NOT_WORKING]: "NOT_WORKING",
};

const isWorkingLabelMap = {
	[ICPSEmploymentStatus.FRESHER]: strings.IM_FRESHER,
	[ICPSEmploymentStatus.WORKING]: strings.IM_WORKING_SELF_EMPLOYED,
	[ICPSEmploymentStatus.NOT_WORKING]: strings.HAVE_EXP_NOT_WORKING,
};

/**
 * Main controller hook for Manual Profile Flow
 *
 * REFACTORED VERSION - Uses modular custom hooks
 * Original: 2,269 lines
 * New: ~500 lines (78% reduction)
 *
 * Architecture:
 * - useManualFlowData: Handles all data fetching
 * - useManualFlowSections: Builds sections dynamically
 * - useManualFlowNavigation: Handles navigation logic
 * - useManualFlowValidation: Validates form data
 * - useManualFlowSave: Saves section data
 */
const useManualFlowController = ({
	profileConfigList = [],
}: IUseManualFlowController) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const navigation = useNavigation<any>();
	const route = useRoute<RootHomeStackRouteProps<"ManualProfileFlow">>();

	const {
		profileConfigList: routeProfileConfigList,
		learningPathId,
		learningPathCode,
		learningPathName,
		workshopId,
		workshopCode,
		learningPathType,
	} = route.params || {};

	const activeProfileConfigList = routeProfileConfigList || profileConfigList;

	// State
	const [_resumeUploadedInSession, setResumeUploadedInSession] =
		useState(false);
	const [parseModalConfig, setParseModalConfig] = useState<{
		isVisible: boolean;
		type: number;
	} | null>(null);
	const [showOverdueWarningModal, setShowOverdueWarningModal] =
		useState(false);

	// ============================================================
	// 1. DATA FETCHING (useManualFlowData)
	// ============================================================
	const {
		// Raw data
		personalDetails,
		contactDetails,
		workExperienceDetails,
		workExperienceItems,
		educationList,
		parsedProfileData,
		userPersonalDetailsResume,

		// Configurations
		personalDetailsConfig,
		workExperienceConfig,
		contactDetailsConfig,
		educationConfig,
		aspirationConfigData,

		// Aspiration data
		aspiration,

		// Completion status
		profileCompletionStatus,

		// Steps
		createSteps,

		// Update functions
		updatePersonalDetailsData,
		updateResumeData,
		updateContactDetailsData,
		updateProfileSectionStatusData,
		updateUserProgramAspirations,
		getAspirationCompletionStatus,
		getProfileCompletionStatus,

		// Refetch functions
		fetchAllProfileData,
		fetchWorkExperienceData,
		fetchAspirationData,
		getUserPersonalDetailsResume,
		refetchCompletionStatus,

		// State setters
		setWorkExperienceItems,
		setEducationList,

		// Loading states
		isLoading,

		// User info
		userId,
	} = useManualFlowData({
		profileConfigList: activeProfileConfigList,
		learningPathId: learningPathId || "",
		workshopId: workshopId || "",
	});

	// Create steps (using temporary step index for initialization)
	const [tempCurrentStep, setTempCurrentStep] = useState(0);
	const steps = useMemo(() => {
		const newSteps = createSteps(tempCurrentStep);
		return newSteps;
	}, [createSteps, tempCurrentStep, profileCompletionStatus]);

	// ============================================================
	// 2. FORM MANAGEMENT
	// ============================================================

	/**
	 * Get default values for work experience fields
	 * PRIORITY: Backend data (workExperienceDetails) > Parsed data (parsedProfileData)
	 * This ensures after saving, the form uses updated backend values instead of stale parsed data
	 */
	const getWorkExperienceDefaults = useCallback(() => {
		// First, check if we have backend data (workExperienceDetails)
		// This takes priority to ensure saved values are reflected in the form
		if (workExperienceDetails?.currentlyWorking) {
			const apiValue = workExperienceDetails.currentlyWorking;
			const fieldValue = apiToFieldValueMap[apiValue];
			const label = isWorkingLabelMap[apiValue];

			return {
				isWorking:
					fieldValue && label ? { label, value: fieldValue } : "",
				experience:
					workExperienceDetails.totalWorkExperience?.toString() || "",
			};
		}

		// Fallback to parsed LinkedIn/Resume data (only if no backend data exists)
		if (
			parsedProfileData?.currentlyWorking ||
			parsedProfileData?.totalWorkExp
		) {
			let isWorkingValue: any = "";

			if (parsedProfileData.currentlyWorking) {
				// Parse LinkedIn returns "yes", "no" or boolean - convert to our format
				const workingStatus = parsedProfileData.currentlyWorking;
				const currentlyWorking =
					typeof workingStatus === "string"
						? (workingStatus as string).toLowerCase()
						: String(workingStatus);

				if (currentlyWorking === "yes" || currentlyWorking === "true") {
					isWorkingValue = {
						label: strings.IM_WORKING_SELF_EMPLOYED,
						value: "WORKING",
					};
				}
			}

			return {
				isWorking: isWorkingValue,
				experience: parsedProfileData.totalWorkExp?.toString() || "",
			};
		}

		// No data available - return empty defaults
		return {
			isWorking: "",
			experience: "",
		};
	}, [workExperienceDetails, parsedProfileData]);

	/**
	 * Get default values for education fields
	 */
	const getEducationDefaults = useCallback(() => {
		if (
			parsedProfileData?.education &&
			parsedProfileData.education.length > 0
		) {
			const educationData = parsedProfileData?.education;

			const formattedEducationList = educationData.map((eduItem) => ({
				degree: eduItem?.degree || "",
				graduatingYearFrom:
					eduItem?.graduatingYearFrom?.toString() || "",
				graduatingYearTo: eduItem?.graduatingYearTo?.toString() || "",
				branch: eduItem?.branch || "",
				percentage: eduItem?.percentage?.toString() || "",
				// Prefer instituteName if university is null/empty (autofill data format)
				university: eduItem?.university || eduItem?.instituteName || "",
				educationType: eduItem?.educationType || "",
				board: eduItem?.board || "",
				stream: eduItem?.stream || "",
			}));

			return { formattedEducationList };
		}

		const firstEducation = educationList?.[0];

		return {
			educationList: educationList || [],
			degree: firstEducation?.degree || "",
			graduatingYearFrom:
				firstEducation?.graduatingYearFrom?.toString() || "",
			graduatingYearTo:
				firstEducation?.graduatingYearTo?.toString() || "",
			branch: firstEducation?.branch || "",
			percentage: firstEducation?.percentage?.toString() || "",
			university: firstEducation?.university || "",
			educationType: firstEducation?.educationType || "",
			board: firstEducation?.board || "",
			stream: firstEducation?.stream || "",
		};
	}, [parsedProfileData, educationList]);

	/**
	 * Get default values for personal details
	 */
	const getPersonalDetailsDefaults = useCallback(() => {
		const getLatestResume = () => {
			const resumeList =
				userPersonalDetailsResume?.user?.userProfileResume?.resumes;
			if (!resumeList) return null;

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const activeResumes = resumeList.filter((r: any) => !r._isDeleted);
			if (activeResumes.length === 0) return null;

			return activeResumes[activeResumes.length - 1];
		};

		if (personalDetails?.user) {
			const { user } = personalDetails;

			return {
				firstName: user.firstName || "",
				lastName: user.lastName || "",
				dateOfBirth: user.dateOfBirth || "",
				fatherName: user.fatherName || "",
				gender: user.gender
					? { label: user.gender, value: user.gender }
					: undefined,
				nationality: user.nationality
					? { label: user.nationality, value: user.nationality }
					: undefined,
				countryOfResidence: user.country
					? { label: user.country, value: user.country }
					: undefined,
				state: user.state
					? { label: user.state, value: user.state }
					: undefined,
				cityOfResidence: user.city || "",
				address: user.address || "",
				pincode: user.pincode?.toString() || "",
				linkedin: user.linkedIn || "",
				telegram: user.telegram || "",
				stackOverflow: user.stackOverflow || "",
				github: user.github || "",
				kaggle: user.kaggle || "",
				profilePicture: user.image
					? { filePath: user.image, fileName: "", uploadedAt: "" }
					: null,
				resume: (() => {
					const latestResume = getLatestResume();
					return latestResume
						? {
								fileName: latestResume.fileName,
								filePath: latestResume.filePath,
								uploadedAt: latestResume.uploadedAt,
							}
						: null;
				})(),
			};
		}
		if (parsedProfileData) {
			return {
				firstName: personalDetails?.user?.firstName || "",
				lastName: personalDetails?.user?.lastName || "",
				dateOfBirth: parsedProfileData.dateOfBirth || "",
				fatherName: "",
				gender: parsedProfileData.gender || "",
				nationality: parsedProfileData.nationality || "",
				countryOfResidence: parsedProfileData.address?.country || "",
				state: parsedProfileData.address?.state || "",
				cityOfResidence: parsedProfileData.address?.city || "",
				address: "",
				pincode: parsedProfileData.address?.pincode || "",
				linkedin: parsedProfileData.linkedInUrl || "",
				telegram: "",
				stackOverflow: "",
				github: parsedProfileData.githubProfile || "",
				kaggle: "",
				profilePicture: parsedProfileData.profilePictureUrl || null,
				resume: null,
			};
		}

		return {
			firstName: "",
			lastName: "",
			dateOfBirth: "",
			fatherName: "",
			gender: "",
			nationality: "",
			countryOfResidence: "",
			state: "",
			cityOfResidence: "",
			address: "",
			pincode: "",
			linkedin: "",
			telegram: "",
			stackOverflow: "",
			github: "",
			kaggle: "",
			profilePicture: null,
			resume: null,
		};
	}, [personalDetails, parsedProfileData, userPersonalDetailsResume]);

	/**
	 * Get default values for contact details
	 */
	const getContactDetailsDefaults = useCallback(() => {
		if (contactDetails?.user) {
			const { user } = contactDetails;
			return {
				email: user.email || "",
				alternateEmail: user.alternateEmail || "",
				mobileNumber: user.mobile?.replaceAll("-", "") || "",
				isWhatsappNumber: !!user.whatsAppMobile,
			};
		}
		if (parsedProfileData) {
			return {
				email: parsedProfileData.email || "",
				alternateEmail: "",
				mobileNumber: parsedProfileData.mobileNumber || "",
				isWhatsappNumber: false,
			};
		}

		return {
			email: "",
			alternateEmail: "",
			mobileNumber: "",
			isWhatsappNumber: false,
		};
	}, [contactDetails, parsedProfileData]);

	/**
	 * Get default values for aspiration fields
	 */
	const getAspirationDefaults = useCallback(() => {
		const profileQuestions =
			aspiration?.userProfileCoursesProgramQuestions?.profileQuestions;

		if (!profileQuestions || profileQuestions.length === 0) {
			return {};
		}

		const defaults: Record<string, unknown> = {};

		profileQuestions.forEach((pq) => {
			const { question } = pq;
			const fieldName = question.instruction;

			if (!fieldName) return;

			const answer = question.submittedAnswer || question.preferredAnswer;

			if (answer) {
				defaults[fieldName] = {
					label: answer.option,
					value: answer.code,
				};
			}
		});

		return defaults;
	}, [aspiration]);

	// Combine all default values
	const defaultValues = useMemo(
		() => ({
			...getPersonalDetailsDefaults(),
			...getContactDetailsDefaults(),
			...getWorkExperienceDefaults(),
			...getEducationDefaults(),
			...getAspirationDefaults(),
		}),
		[
			getPersonalDetailsDefaults,
			getContactDetailsDefaults,
			getWorkExperienceDefaults,
			getEducationDefaults,
			getAspirationDefaults,
		],
	);

	// Form setup
	const { ...methods } = useForm<FieldValues>({
		mode: "onChange",
	});

	// Update form when data changes
	useEffect(() => {
		methods.reset(defaultValues);
	}, [defaultValues]);

	// Sync autofill education data to educationList state
	useEffect(() => {
		if (
			parsedProfileData?.education &&
			parsedProfileData.education.length > 0 &&
			educationList.length === 0 // Only autofill if education list is empty
		) {
			const formattedEducationList: ICPSEducationDetails[] =
				parsedProfileData.education.map((eduItem, index) => ({
					degree: eduItem?.degree || "",
					graduatingYearFrom: eduItem?.graduatingYearFrom || 0,
					graduatingYearTo: eduItem?.graduatingYearTo || 0,
					branch: eduItem?.branch || "",
					percentage: eduItem?.percentage || 0,
					// Prefer instituteName if university is null/empty (autofill data format)
					university:
						eduItem?.university || eduItem?.instituteName || "",
					educationType: eduItem?.educationType || "",
					board: eduItem?.board || "",
					stream: eduItem?.stream || "",
					// Mark the first education as highest (usually PGDM/Masters comes first)
					isHighestEducation: index === 0,
				}));

			setEducationList(formattedEducationList);
		}
	}, [parsedProfileData, educationList, setEducationList]);

	// ============================================================
	// 3. FIELD MAPPERS
	// ============================================================

	// Education callbacks
	const handleAddEducation = useCallback(
		async (data: ICPSEducationDetails, index: number) => {
			setEducationList((prevList) => {
				const updatedList = prevList ? [...prevList] : [];
				if (index === null || index === 0) {
					updatedList.push(data);
				} else {
					updatedList[index - 1] = data;
				}
				return updatedList;
			});

			await refetchCompletionStatus();
		},
		[setEducationList, refetchCompletionStatus],
	);

	const handleEditEducation = useCallback(
		(_index: number) => {
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.ManualProfileFieldsModal,
				params: {
					fields: [],
					methods,
					index: _index,
					educationItem: educationList?.[_index - 1],
					onSubmit: () => {
						// Form submission handled by modal
					},
					onError: () => {
						// Error handling by modal
					},
					title: "Education Details",
					description:
						"Share your latest educational qualification to help us align the program with your goals.",
					onSaveSuccess: handleAddEducation,
				},
			});
		},
		[navigation, methods, educationList, handleAddEducation],
	);

	const handleDeleteEducation = useCallback(
		async (index: number) => {
			if (!educationList || educationList.length === 0) {
				return;
			}

			const updatedEducationList = [...educationList];
			updatedEducationList.splice(index - 1, 1);

			// Update backend with the remaining items
			await updateEducationDetails(updatedEducationList);
			// Update local state
			setEducationList(updatedEducationList);

			await fetchAllProfileData();
			await refetchCompletionStatus();
		},
		[
			educationList,
			setEducationList,
			fetchAllProfileData,
			refetchCompletionStatus,
		],
	);

	const handleOpenEducationModal = useCallback(() => {
		navigation.navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.ManualProfileFieldsModal,
			params: {
				fields: [],
				methods,
				index: 0,
				educationItem: [],
				onSubmit: () => {
					// Form submission handled by modal
				},
				onError: () => {
					// Error handling by modal
				},
				title: "Education Details",
				description:
					"Share your latest educational qualification to help us align the program with your goals.",
				onSaveSuccess: handleAddEducation,
			},
		});
	}, [navigation, methods, handleAddEducation]);

	// Work experience callbacks
	const handleWorkExperienceAdd = useCallback(
		async (_data: any) => {
			await fetchWorkExperienceData();
			// Refetch completion status to update stepper immediately after saving work experience
			await refetchCompletionStatus();
		},
		[fetchWorkExperienceData],
	);

	const handleWorkExperienceDelete = useCallback(
		async (id: string) => {
			// Find the index of the item to delete
			const index = workExperienceItems.findIndex(
				(item) => item.id === id,
			);
			if (index === -1) {
				return;
			}

			// Get full work experience details from backend
			const workExpDetails = await getWorkExperienceDetails();

			if (!workExpDetails || !workExpDetails.workExperiences) {
				return;
			}

			// Remove the item from the array
			const updatedWorkExperiences = [...workExpDetails.workExperiences];
			updatedWorkExperiences.splice(index, 1);

			// Update backend with the remaining items
			await updateWorkExperienceDetails({
				workExperiences: updatedWorkExperiences,
				currentlyWorking: workExpDetails.currentlyWorking || undefined,
				totalWorkExperience:
					workExpDetails.totalWorkExperience || undefined,
			});

			// Refresh the work experience list
			await fetchWorkExperienceData();
		},
		[workExperienceItems, fetchWorkExperienceData],
	);

	const handleWorkExperienceEdit = useCallback(
		(id: string) => {
			const itemToEdit = workExperienceItems.find(
				(item) => item.id === id,
			);
			if (!itemToEdit) return;

			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: "ManualProfileFieldsModal",
				params: {
					title: "Edit Work Experience",
					description: "Update your work experience details.",
					workExperienceItem: itemToEdit,
					onDataSaved: handleWorkExperienceAdd,
				},
			});
		},
		[workExperienceItems, handleWorkExperienceAdd, navigation],
	);

	// Field mappers
	const mapPersonalDetailsFields = usePersonalDetailsFieldMapper(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		personalDetailsConfig as any,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		personalDetails as any,
	);

	const mapWorkExperienceFields = useWorkExperienceFieldMapper(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		workExperienceConfig as any,
		workExperienceItems,
		handleWorkExperienceAdd,
		handleWorkExperienceDelete,
		handleWorkExperienceEdit,
	);

	const mapEducationFields = useEducationFieldMapper(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		educationConfig as any,
		educationList,
		handleOpenEducationModal,
		handleEditEducation,
		handleDeleteEducation,
		handleAddEducation,
	);

	const mapContactDetailsFields = useContactDetailsFieldMapper(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		contactDetailsConfig as any,
	);

	const mapAspirationFields = useAspirationFieldMapper(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		aspirationConfigData as any,
		aspiration,
	);

	// ============================================================
	// 4. RESUME HELPERS
	// ============================================================

	/**
	 * Check if resume section should be shown
	 * ALWAYS show resume section - we'll skip it during navigation if uploaded
	 */
	const shouldShowResumeSection = useCallback((): boolean => {
		// Always show the resume section
		return true;
	}, []);

	// ============================================================
	// 5. SECTION BUILDING (useManualFlowSections)
	// ============================================================

	// Make shouldShowResume reactive to resume data changes
	// When resume is uploaded and refetched, this will trigger sections to recalculate
	const shouldShowResume = useMemo(
		() => shouldShowResumeSection(),
		[shouldShowResumeSection],
	);

	const { sections, totalSections } = useManualFlowSections({
		steps,
		fieldMappers: {
			mapPersonalDetailsFields,
			mapWorkExperienceFields,
			mapEducationFields,
			mapAspirationFields,
			mapContactDetailsFields,
		},
		shouldShowResume,
	});

	const handleProfilePictureUpload = useCallback(() => {
		setParseModalConfig({
			isVisible: true,
			type: 1, // IFileUploadModalType.PROFILE_IMAGE
		});
	}, []);

	const handleResumeUpload = useCallback(() => {
		setParseModalConfig({
			isVisible: true,
			type: 0, // IFileUploadModalType.RESUME
		});
	}, []);

	const handleFileUploaded = useCallback(
		(fileData: {
			fileName: string;
			filePath: string;
			uploadedAt: string;
		}) => {
			const fieldName =
				parseModalConfig?.type === 1 ? "profilePicture" : "resume";

			methods.setValue(fieldName, fileData, {
				shouldValidate: true,
				shouldDirty: true,
			});

			// Track resume uploads
			if (fieldName === "resume") {
				setResumeUploadedInSession(true);
			}

			setParseModalConfig(null);
		},
		[parseModalConfig, methods],
	);

	const sectionsWithHandlers = useMemo<IBuiltSection[]>(() => {
		return sections.map((section) => ({
			...section,
			fields: section.fields.map((field) => {
				if (field.name === "profilePicture") {
					return {
						...field,
						onUploadPress: handleProfilePictureUpload,
					};
				}
				if (field.name === "resume") {
					return {
						...field,
						onUploadPress: handleResumeUpload,
					};
				}
				return field;
			}),
		}));
	}, [sections, handleProfilePictureUpload, handleResumeUpload]);

	const transformAspirationFormDataToAPI = useCallback(
		(formData: Record<string, unknown>) => {
			if (
				!aspiration?.userProfileCoursesProgramQuestions
					?.profileQuestions
			)
				return [];

			const profileQuestions =
				aspiration.userProfileCoursesProgramQuestions.profileQuestions;

			const response = Object.entries(formData)
				.filter(([, value]) => !!value)
				.map(([fieldName, fieldValue]) => {
					const matchingQuestion = profileQuestions.find(
						(pq) => pq.question.instruction === fieldName,
					);

					if (!matchingQuestion) return null;

					let answerOption: string;

					if (typeof fieldValue === "object" && fieldValue !== null) {
						answerOption = (fieldValue as any).value;
					} else if (typeof fieldValue === "string") {
						answerOption = fieldValue;
					} else {
						answerOption = String(fieldValue);
					}

					if (!answerOption) return null;

					return {
						question: matchingQuestion.question.id,
						questionType: matchingQuestion.question.type,
						answerOption: answerOption,
					};
				})
				.filter((item) => item !== null);

			return response;
		},
		[aspiration],
	);

	const { saveSection, isSaving, saveError, clearSaveError, hasDataToSave } =
		useManualFlowSave({
			sections: sectionsWithHandlers,
			methods,
			updateFunctions: {
				updatePersonalDetails: async (payload: any) => {
					await updatePersonalDetailsData(payload);
				},
				updateWorkExperience: async (payload: any) => {
					await updateWorkExperienceDetails(payload);
				},
				updateEducation: async (payload: any) => {
					await updateEducationDetails(payload);
				},
				updateAspiration: async (payload: any) => {
					let profileResponseData;

					if (payload.profileResponse) {
						// Already formatted by handler
						profileResponseData = payload.profileResponse;
					} else {
						// Legacy format - transform form data
						// IMPORTANT: Use program CODE (not ID!) for API compatibility
						const programCode =
							aspiration?.userProfileCoursesProgramQuestions
								?.code || "";
						const response =
							transformAspirationFormDataToAPI(payload);

						if (response.length === 0) {
							return;
						}

						profileResponseData = {
							program: programCode, // Use program CODE, not ID
							userProgram: learningPathId,
							workshop: workshopId,
							isCompleted: true,
							hasMandatoryProfileQuestion: false,
							response,
						};
					}

					await updateUserProgramAspirations({
						variables: {
							data: {
								profileResponse: profileResponseData,
							},
						},
					});

					await getAspirationCompletionStatus({
						variables: {
							where: {
								workshop: workshopId,
								userProgram: learningPathId,
							},
						},
					});

					await getProfileCompletionStatus({
						variables: { where: { id: userId } },
					});

					console.log("✅ [Controller] Aspiration update complete");
				},
				updateContactDetails: async (payload: any) => {
					await updateContactDetailsData(payload);
				},
				updateResume: async (payload: any) => {
					await updateResumeData(payload);
				},
				updateProfileSectionStatus: async (
					section: string,
					isCompleted = true,
				) => {
					await updateProfileSectionStatusData(section, isCompleted);
				},
			},
			refetchFunctions: {
				refetchProfileData: fetchAllProfileData,
				refetchWorkExperience: fetchWorkExperienceData,
				refetchAspirationData: fetchAspirationData,
				refetchResumeData: async () => {
					// Refetch resume data after successful upload
					await getUserPersonalDetailsResume({
						variables: { where: { id: userId } },
					});
				},
				refetchCompletionStatus,
			},
			helpers: {
				aspiration,
				learningPathId,
				workshopId,
				educationList,
			},
			activeProfileConfigList,
		});

	const { getStepIndexFromSectionIndex, calculateSectionsBeforeStep } =
		useNavigationCalculator(
			steps,
			mapPersonalDetailsFields,
			mapWorkExperienceFields,
			mapEducationFields,
			mapContactDetailsFields,
			mapAspirationFields,
			shouldShowResumeSection(),
		);

	const {
		currentSectionIndex,
		currentStep,
		setCurrentSectionIndex,
		setCurrentStep,
		handlePrev: navigationHandlePrev,
		handleNext: navigationHandleNext,
		handleStepPress,
		handleSectionPress,
		isEffectivelyLastSection,
		visibleSectionsCount,
		visibleSectionIndex,
	} = useManualFlowNavigation({
		sections: sectionsWithHandlers,
		steps,
		methods,
		onSectionSave: saveSection,
		calculateSectionsBeforeStep,
		getStepIndexFromSectionIndex,
	});
	const homeNavigation = useNavigation<IHomeStackNativeNavigationProp>();

	useEffect(() => {
		setTempCurrentStep(currentStep);
	}, [currentStep]);

	/**
	 * Check if Personal Details step is incomplete
	 * Only Personal Details is mandatory for finishing the flow
	 */
	const hasIncompletePersonalDetails = useCallback((): boolean => {
		// Find the Personal Details step
		const personalDetailsStep = steps.find(
			(step) => step.type === IUserProfileConfiguration.PERSONAL_DETAILS,
		);

		// Return true if Personal Details exists and is NOT completed
		return personalDetailsStep ? !personalDetailsStep.isCompleted : false;
	}, [steps]);

	const handleCompleteOverdue = useCallback(() => {
		setShowOverdueWarningModal(false);

		// Find Personal Details step index
		const personalDetailsStepIndex = steps.findIndex(
			(step) => step.type === IUserProfileConfiguration.PERSONAL_DETAILS,
		);

		if (personalDetailsStepIndex !== -1) {
			setCurrentStep(personalDetailsStepIndex);
			setCurrentSectionIndex(0); // Go to first section of Personal Details
		}
	}, [steps, setCurrentStep, setCurrentSectionIndex]);

	const handleNext = useCallback(async () => {
		// Check if this is effectively the last section (no more non-skippable sections)
		const isEffectivelyLast = isEffectivelyLastSection();

		if (isEffectivelyLast) {
			// Check if there's only one step (Personal Details only)
			const isSingleStepFlow = steps.length === 1;

			// Skip modal check if it's a single step flow (Personal Details only)
			if (!isSingleStepFlow) {
				// Check if Personal Details is incomplete
				const personalDetailsIncomplete =
					hasIncompletePersonalDetails();

				if (personalDetailsIncomplete) {
					setShowOverdueWarningModal(true);
					return;
				}
			}

			// Save the current section
			await saveSection(currentSectionIndex);

			// Pop ManualProfileFlow from stack and return to Container2Screen
			// This ensures clicking back on Container2Screen won't return to ManualProfileFlow
			homeNavigation.dispatch(StackActions.pop(2));
			return;
		}

		await navigationHandleNext();
	}, [
		currentSectionIndex,
		isEffectivelyLastSection,
		hasIncompletePersonalDetails,
		saveSection,
		navigation,
		navigationHandleNext,
		steps,
		learningPathId,
		learningPathCode,
		workshopId,
		workshopCode,
		learningPathType,
		route.params,
	]);

	const handlePrev = navigationHandlePrev;

	const { canProceedToNext, isNextButtonDisabled } = useManualFlowValidation({
		sections: sectionsWithHandlers,
		currentSectionIndex,
		methods,
		isSaving,
	});

	const currentStepDeadline = useMemo(() => {
		const currentStepData = steps[currentStep];
		if (!currentStepData?.dueDate) return null;

		return {
			deadlineDate: currentStepData.dueDate,
			isDeadlinePassed: moment(currentStepData.dueDate).isBefore(
				moment(),
			),
			daysRemaining: moment(currentStepData.dueDate).diff(
				moment(),
				"days",
			),
		};
	}, [steps, currentStep]);

	// ============================================================
	// 12. RETURN API
	// ============================================================

	return {
		// Data
		steps,
		sections: sectionsWithHandlers,
		currentStep,
		currentSectionIndex,
		profileConfigList: activeProfileConfigList,
		currentStepDeadline,
		profileCompletionStatus,

		// Form
		methods,
		handleSubmit: useCallback<SubmitHandler<FieldValues>>((_data) => {
			// TODO: Implement actual submission logic
		}, []),
		handleError: useCallback<SubmitErrorHandler<FieldValues>>((_errors) => {
			// TODO: Implement error handling logic
		}, []),

		// Navigation
		handleStepPress,
		handleSectionPress,
		handlePrev,
		handleNext,

		// State flags
		isFirstStep: currentStep === 0,
		isLastStep: currentStep === steps.length - 1,
		isFirstSection: currentSectionIndex === 0,
		isLastSection: currentSectionIndex === sectionsWithHandlers.length - 1,
		isEffectivelyLastSection,
		totalSteps: steps.length,
		totalSections: totalSections,
		visibleSectionsCount,
		visibleSectionIndex,

		// Loading
		isLoading,
		isSaving,

		// Error handling
		saveError,
		clearSaveError,

		// Validation
		canProceedToNext,
		isNextButtonDisabled,
		hasDataToSave: () => hasDataToSave(currentSectionIndex),

		// File upload modal
		parseModalConfig,
		setParseModalConfig,
		handleFileUploaded,

		// Overdue warning modal
		showOverdueWarningModal,
		setShowOverdueWarningModal,
		handleCompleteOverdue,
		hasIncompletePersonalDetails,
	};
};

export default useManualFlowController;
