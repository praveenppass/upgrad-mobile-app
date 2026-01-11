import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { IWorkExperienceItem } from "@components/Inputs/WorkExperienceCard";
import {
	IProfileConfigItem,
	IUserProfileConfiguration,
} from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import {
	getAllUserProfileData,
	getWorkExperienceDetails,
	ICPSEducationDetails,
	IUnifiedProfileData,
} from "@services/cpsService";

import { RootState } from "@redux/store/root.reducer";

import useManualFlowModel from "../useManualFlowModel";
import { STEP_TITLE_MAP } from "../utils/navigationUtils";
import {
	IProfileSectionStatus,
	IStep,
} from "../utils/sectionBuilders/sectionBuilder.types";

interface IUseManualFlowDataProps {
	profileConfigList: IProfileConfigItem[];
	learningPathId: string;
	workshopId: string;
}

/**
 * Hook to manage all data fetching for manual profile flow
 * Extracted from useManualFlowController
 *
 * This hook:
 * - Fetches profile data, configurations, and completion status
 * - Manages work experience items
 * - Manages education list
 * - Provides refetch functions
 * - Creates steps from profile config
 *
 * @param profileConfigList - List of profile configuration items
 * @param learningPathId - Learning path/program ID
 * @param workshopId - Workshop ID
 * @returns All data and refetch functions
 */
export const useManualFlowData = ({
	profileConfigList,
	learningPathId,
	workshopId,
}: IUseManualFlowDataProps) => {
	// GraphQL queries from model
	const {
		getUserProfileConfiguration,
		configData,
		configLoading,
		getProfileCompletionStatus,
		completionData,
		completionLoading,
		getUserAspirations,
		aspiration,
		getUserAspirationsConfig,
		aspirationConfig,
		aspirationConfigLoading,
		updatePersonalDetailsData,
		updateResumeData,
		updateResumeLoading,
		updateContactDetailsData,
		updateContactDetailsLoading,
		updateProfileSectionStatusData,
		userPersonalDetailsResume,
		getUserPersonalDetailsResume,
		updateUserProgramAspirations,
		updateUserProgramAspirationsLoading,
		getAspirationCompletionStatus,
	} = useManualFlowModel();

	// User ID from Redux
	const userId = useSelector((state: RootState) => state.user.user.id) || "";
	const parsedProfileData = useSelector(
		(state: RootState) => state.user.parsedProfileData,
	);

	// Local state
	const [profileData, setProfileData] = useState<IUnifiedProfileData | null>(
		null,
	);
	const [profileDataLoading, setProfileDataLoading] = useState(false);
	const [workExperienceItems, setWorkExperienceItems] = useState<
		IWorkExperienceItem[]
	>([]);
	const [workExperienceDataLoading, setWorkExperienceDataLoading] =
		useState(false);
	const [educationList, setEducationList] = useState<ICPSEducationDetails[]>(
		[],
	);

	/**
	 * Fetch all GraphQL configurations in parallel
	 */
	const fetchAllConfigurations = useCallback(async () => {
		if (!userId) return;

		await Promise.all([
			getUserProfileConfiguration({
				variables: {
					where: { user: userId },
				},
			}),
			getProfileCompletionStatus({
				variables: {
					where: { id: userId },
				},
			}),
			getUserAspirations({
				variables: {
					where: { user: userId, userProgram: learningPathId },
				},
			}),
			getUserAspirationsConfig({
				variables: { where: { user: userId } },
			}),
			getUserPersonalDetailsResume(),
		]);
	}, [
		getUserProfileConfiguration,
		getProfileCompletionStatus,
		getUserAspirations,
		getUserAspirationsConfig,
		getUserPersonalDetailsResume,
		userId,
		learningPathId,
	]);

	/**
	 * Fetch all profile data from CPS service
	 */
	const fetchAllProfileData = useCallback(async () => {
		setProfileDataLoading(true);

		const data = await getAllUserProfileData();

		if (!data) {
			setProfileDataLoading(false);
			return;
		}

		setProfileData(data);
		setEducationList(data?.educationArray || []);
		setProfileDataLoading(false);
	}, []);

	/**
	 * Refetch aspiration data to get latest submitted answers
	 */
	const fetchAspirationData = useCallback(async () => {
		await getUserAspirations({
			variables: {
				where: { user: userId, userProgram: learningPathId },
			},
		});
	}, [getUserAspirations, userId, learningPathId]);

	/**
	 * Fetch work experience data and transform to UI format
	 */
	const fetchWorkExperienceData = useCallback(async () => {
		setWorkExperienceDataLoading(true);

		const response = await getWorkExperienceDetails();

		if (!response) {
			setWorkExperienceDataLoading(false);
			return;
		}

		// Transform API response to WorkExperienceItem array
		const items: IWorkExperienceItem[] =
			response.workExperiences?.map((exp, index) => {
				// Format duration based on start and end dates
				let duration = "";

				const hasStartMonth =
					exp.startMonth &&
					exp.startMonth !== "" &&
					exp.startMonth !== "Invalid date";
				const hasStartYear =
					exp.startYear !== undefined &&
					exp.startYear !== null &&
					typeof exp.startYear === "number" &&
					exp.startYear > 0;
				const hasStartDate = hasStartMonth && hasStartYear;

				if (hasStartDate) {
					const startDate = `${exp.startMonth} ${exp.startYear}`;

					const hasEndMonth =
						exp.endMonth &&
						exp.endMonth !== "" &&
						exp.endMonth !== "Invalid date";
					const hasEndYear =
						exp.endYear !== undefined &&
						exp.endYear !== null &&
						typeof exp.endYear === "number" &&
						exp.endYear > 0;
					const hasValidEndDate = hasEndMonth && hasEndYear;

					if (exp.currentWorkExperience || !hasValidEndDate) {
						duration = `${startDate} - Present`;
					} else {
						duration = `${startDate} - ${exp.endMonth} ${exp.endYear}`;
					}
				}

				return {
					id: `work-exp-${index}`,
					designation: exp.designation,
					organization: exp.org,
					industry: exp.industry,
					ctc: exp.ctc,
					duration,
				};
			}) || [];

		setWorkExperienceItems(items);
		setWorkExperienceDataLoading(false);
	}, []);

	// Fetch data on mount
	useEffect(() => {
		fetchAllConfigurations();
		fetchAllProfileData();
		fetchWorkExperienceData();
	}, [fetchAllConfigurations, fetchAllProfileData, fetchWorkExperienceData]);

	// Sync work experience items when profileData changes
	useEffect(() => {
		const workExperienceDetails = profileData?.workExperienceDetails;
		if (workExperienceDetails?.workExperiences) {
			const items: IWorkExperienceItem[] =
				workExperienceDetails.workExperiences.map((exp, index) => {
					let duration = "";

					const hasStartMonth =
						exp.startMonth &&
						exp.startMonth !== "" &&
						exp.startMonth !== "Invalid date";
					const hasStartYear =
						exp.startYear !== undefined &&
						exp.startYear !== null &&
						typeof exp.startYear === "number" &&
						exp.startYear > 0;
					const hasStartDate = hasStartMonth && hasStartYear;

					if (hasStartDate) {
						const startDate = `${exp.startMonth} ${exp.startYear}`;

						const hasEndMonth =
							exp.endMonth &&
							exp.endMonth !== "" &&
							exp.endMonth !== "Invalid date";
						const hasEndYear =
							exp.endYear !== undefined &&
							exp.endYear !== null &&
							typeof exp.endYear === "number" &&
							exp.endYear > 0;
						const hasValidEndDate = hasEndMonth && hasEndYear;

						if (exp.currentWorkExperience || !hasValidEndDate) {
							duration = `${startDate} - Present`;
						} else {
							duration = `${startDate} - ${exp.endMonth} ${exp.endYear}`;
						}
					}

					return {
						id: `work-exp-${index}`,
						designation: exp.designation,
						organization: exp.org,
						industry: exp.industry,
						ctc: exp.ctc,
						duration,
					};
				});

			setWorkExperienceItems(items);
		}
	}, [profileData]);

	// Extract individual configurations
	const personalDetailsConfig =
		configData?.userProfileConfigurationForLearner?.personalDetails;
	const workExperienceConfig =
		configData?.userProfileConfigurationForLearner?.workExperience;
	const contactDetailsConfig =
		configData?.userProfileConfigurationForLearner?.contactDetails;
	const educationConfig =
		configData?.userProfileConfigurationForLearner?.education;
	const aspirationConfigData =
		aspirationConfig?.userProfileConfigurationForLearner?.aspiration;

	// Extract completion status - memoized to ensure proper dependency tracking
	const profileCompletionStatus = useMemo(() => {
		const status = completionData?.user?.profileSectionCompletion;
		return status;
	}, [completionData]);

	// Extract profile data
	const personalDetails = profileData?.personalDetails || null;
	const contactDetails = profileData?.contactDetails || null;
	const workExperienceDetails = profileData?.workExperienceDetails || null;
	const educationArray = profileData?.educationArray || null;

	/**
	 * Get completion status for a specific profile type
	 */
	const getCompletionStatus = useCallback(
		(profileType: IUserProfileConfiguration): boolean => {
			if (!profileCompletionStatus) {
				return false;
			}

			const statusMap = {
				[IUserProfileConfiguration.PERSONAL_DETAILS]:
					profileCompletionStatus.personalDetails,
				[IUserProfileConfiguration.EDUCATION]:
					profileCompletionStatus.education,
				[IUserProfileConfiguration.WORK_EXPERIENCE]:
					profileCompletionStatus.workExperience,
				[IUserProfileConfiguration.ASPIRATION]:
					profileCompletionStatus.aspiration,
				[IUserProfileConfiguration.CONTACT_DETAILS]:
					profileCompletionStatus.contactDetails,
			};

			const isCompleted = statusMap[profileType] || false;
			return isCompleted;
		},
		[profileCompletionStatus],
	);

	/**
	 * Determine step status (completed, current, pending)
	 */
	const getStepStatus = useCallback(
		(config: IProfileConfigItem, index: number, currentStep: number) => {
			const isCompleted = getCompletionStatus(config.type);
			if (isCompleted) return IProfileSectionStatus.COMPLETED;
			if (index === currentStep) return IProfileSectionStatus.CURRENT;
			return IProfileSectionStatus.PENDING;
		},
		[getCompletionStatus],
	);

	/**
	 * Create steps from configuration
	 */
	const createSteps = useCallback(
		(currentStep: number): IStep[] => {
			return profileConfigList.map((config, index) => ({
				id: config.type.toLowerCase().replace(/_/g, "-"),
				title:
					STEP_TITLE_MAP[config.type as IUserProfileConfiguration] ||
					config.type,
				status: getStepStatus(config, index, currentStep),
				// Use actual completion status from API, not route params
				isCompleted: getCompletionStatus(config.type),
				dueDate: config.deadlineDate,
				isDeadlinePassed: config.isDeadlinePassed,
				type: config.type,
			}));
		},
		[profileConfigList, getStepStatus, getCompletionStatus],
	);

	// Combined loading state
	const isLoading =
		configLoading ||
		completionLoading ||
		aspirationConfigLoading ||
		updateResumeLoading ||
		updateUserProgramAspirationsLoading ||
		updateContactDetailsLoading ||
		workExperienceDataLoading ||
		profileDataLoading;

	return {
		// Raw data
		profileData,
		personalDetails,
		contactDetails,
		workExperienceDetails,
		educationArray,
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
		getCompletionStatus,

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
		fetchAllConfigurations,
		fetchAllProfileData,
		fetchWorkExperienceData,
		fetchAspirationData,
		getUserPersonalDetailsResume,
		refetchCompletionStatus: async () => {
			await getProfileCompletionStatus({
				variables: { where: { id: userId } },
			});
		},

		// State setters
		setWorkExperienceItems,
		setEducationList,

		// Loading states
		isLoading,
		profileDataLoading,
		workExperienceDataLoading,

		// User info
		userId,
		learningPathId,
		workshopId,
	};
};
