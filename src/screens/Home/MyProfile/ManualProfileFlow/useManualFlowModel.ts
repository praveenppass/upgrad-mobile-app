import { useLazyQuery, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import {
	IUpdateUserProgramAspirationsQuery,
	IUpdateUserProgramAspirationsQueryVariables,
} from "@graphql/mutation/myProfile/aspirations/updateUserProgramAspirations";
import updateUserProgramAspirationsMutation from "@graphql/mutation/myProfile/aspirations/updateUserProgramAspirations";
import updateUserResumeMutation, {
	IUpdateUserResumeMutation,
	IUpdateUserResumeMutationVariables,
} from "@graphql/mutation/myProfile/personalDetails/updateUserResume";
import getUserAspirationsQuery, {
	IGetUserAspirationsQuery,
	IGetUserAspirationsQueryVariables,
} from "@graphql/query/myProfile/aspirations/getUserAspirations";
import getUserAspirationsConfigQuery, {
	IGetUserAspirationsConfigQuery,
	IGetUserAspirationsConfigQueryVariables,
} from "@graphql/query/myProfile/aspirations/getUserAspirationsConfig";
import getUserProfileConfigurationQuery, {
	IGetUserProfileConfigurationQuery,
	IGetUserProfileConfigurationQueryVariables,
} from "@graphql/query/myProfile/getUserProfileConfiguration";
import getUserPersonalDetailsResumeQuery, {
	IGetUserPersonalDetailsResumeQuery,
	IGetUserPersonalDetailsResumeQueryVariables,
} from "@graphql/query/myProfile/personalDetails/getUserPersonalDetailsResume";
import updateProfileSectionStatusMutation, {
	IUpdateProfileSectionStatusMutation,
	IUpdateProfileSectionStatusMutationVariables,
} from "@graphql/query/myProfile/updateProfileSectionStatus";
import getProfileStatusCompletionQuery, {
	IProfileCompletionStatus,
} from "@graphql/query/profileBlocker/getProfileStatusCompletionQuery";
import getUserCourseAspirationProfileResponseQuery, {
	IUserCourseAspirationProfileResponse,
} from "@graphql/query/profileBlocker/getUserCourseAspirationProfileResponse";

import {
	getAllUserProfileData,
	IUnifiedProfileData,
	PartialContactDetails,
	PartialPersonalDetails,
	updateContactDetails,
	updatePersonalDetails,
} from "@services/cpsService";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const useManualFlowModel = () => {
	const userId = useSelector((state: RootState) => state.user.user.id) || "";
	// Profile data state

	const [profileData, setProfileData] = useState<IUnifiedProfileData | null>(
		null,
	);
	const [profileDataLoading, setProfileDataLoading] = useState(false);

	// GraphQL queries for configuration and completion status
	const [
		getUserProfileConfiguration,
		{ data: configData, loading: configLoading },
	] = useLazyQuery<
		IGetUserProfileConfigurationQuery,
		IGetUserProfileConfigurationQueryVariables
	>(getUserProfileConfigurationQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getProfileCompletionStatus,
		{ data: completionData, loading: completionLoading },
	] = useLazyQuery<IProfileCompletionStatus>(
		getProfileStatusCompletionQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [
		getUserAspirationsConfig,
		{ data: aspirationConfig, loading: aspirationConfigLoading },
	] = useLazyQuery<
		IGetUserAspirationsConfigQuery,
		IGetUserAspirationsConfigQueryVariables
	>(getUserAspirationsConfigQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getUserPersonalDetailsResume,
		{
			data: userPersonalDetailsResume,
			loading: userPersonalDetailsResumeLoading,
		},
	] = useLazyQuery<
		IGetUserPersonalDetailsResumeQuery,
		IGetUserPersonalDetailsResumeQueryVariables
	>(getUserPersonalDetailsResumeQuery, {
		client,
		variables: { where: { id: userId } },
		fetchPolicy: "no-cache",
	});

	// Resume upload mutation
	const [updateUserResume, { loading: updateResumeLoading }] = useMutation<
		IUpdateUserResumeMutation,
		IUpdateUserResumeMutationVariables
	>(updateUserResumeMutation, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getUserAspirations,
		{ data: aspiration, loading: aspirationLoading },
	] = useLazyQuery<
		IGetUserAspirationsQuery,
		IGetUserAspirationsQueryVariables
	>(getUserAspirationsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		updateProfileSectionStatus,
		{ loading: updateProfileSectionStatusLoading },
	] = useMutation<
		IUpdateProfileSectionStatusMutation,
		IUpdateProfileSectionStatusMutationVariables
	>(updateProfileSectionStatusMutation, {
		client,
		fetchPolicy: "no-cache",
	});

	// Aspiration mutation
	const [
		updateUserProgramAspirations,
		{ loading: updateUserProgramAspirationsLoading },
	] = useMutation<
		IUpdateUserProgramAspirationsQuery,
		IUpdateUserProgramAspirationsQueryVariables
	>(updateUserProgramAspirationsMutation, {
		client,
		fetchPolicy: "no-cache",
	});

	// Aspiration completion status query
	const [
		getAspirationCompletionStatus,
		{
			data: aspirationCompletionData,
			loading: aspirationCompletionLoading,
		},
	] = useLazyQuery<IUserCourseAspirationProfileResponse>(
		getUserCourseAspirationProfileResponseQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	// Consolidated data fetching
	const fetchAllConfigurations = useCallback(async () => {
		if (!userId) {
			return;
		}

		const results = await Promise.all([
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
			getUserPersonalDetailsResume(),
		]);

		return results;
	}, [
		userId,
		getUserProfileConfiguration,
		getProfileCompletionStatus,
		getUserPersonalDetailsResume,
	]);

	const fetchAllProfileData = useCallback(async () => {
		setProfileDataLoading(true);

		const data = await getAllUserProfileData();

		if (!data) {
			setProfileDataLoading(false);
			return;
		}

		setProfileData(data);
		setProfileDataLoading(false);
	}, []);

	// Update personal details (wrapper around CPS service)
	const updatePersonalDetailsData = useCallback(
		async (payload: PartialPersonalDetails) => {
			return await updatePersonalDetails(payload);
		},
		[],
	);

	// Update resume (wrapper around GraphQL mutation)
	const updateResumeData = useCallback(
		async (data: { fileName: string; filePath: string }) => {
			return await updateUserResume({
				variables: {
					data: {
						fileName: data.fileName,
						filePath: data.filePath,
					},
				},
			});
		},
		[updateUserResume],
	);

	// Contact details update state and function
	const [updateContactDetailsLoading, setUpdateContactDetailsLoading] =
		useState(false);

	// Update contact details (wrapper around CPS service)
	const updateContactDetailsData = useCallback(
		async (payload: PartialContactDetails) => {
			setUpdateContactDetailsLoading(true);
			try {
				return await updateContactDetails(payload);
			} finally {
				setUpdateContactDetailsLoading(false);
			}
		},
		[],
	);

	// Update profile section status (wrapper around GraphQL mutation)
	const updateProfileSectionStatusData = useCallback(
		async (section: string, isCompleted = true) => {
			return await updateProfileSectionStatus({
				variables: {
					data: {
						section,
						isCompleted,
					},
				},
			});
		},
		[updateProfileSectionStatus],
	);

	return {
		// Configuration data
		configData,
		configLoading,
		completionData,
		completionLoading,

		// Profile data
		profileData,
		profileDataLoading,

		// Resume data
		userPersonalDetailsResume,
		userPersonalDetailsResumeLoading,

		// Fetch functions
		getUserProfileConfiguration,
		getProfileCompletionStatus,
		getUserPersonalDetailsResume,
		fetchAllConfigurations,
		fetchAllProfileData,

		// Update functions
		updatePersonalDetailsData,
		updateResumeData,
		updateResumeLoading,
		updateContactDetailsData,
		updateContactDetailsLoading,
		updateProfileSectionStatusData,
		updateProfileSectionStatusLoading,

		// Aspiration functions
		getUserAspirations,
		aspiration,
		getUserAspirationsConfig,
		aspirationConfig,
		aspirationConfigLoading,
		aspirationLoading,
		updateUserProgramAspirations,
		updateUserProgramAspirationsLoading,
		getAspirationCompletionStatus,
		aspirationCompletionData,
		aspirationCompletionLoading,
	};
};

export default useManualFlowModel;
