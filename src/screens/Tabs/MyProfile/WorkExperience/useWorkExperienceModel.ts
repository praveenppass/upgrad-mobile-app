import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";

import updateProfileSectionStatusMutation, {
	IUpdateProfileSectionStatusMutation,
	IUpdateProfileSectionStatusMutationVariables,
} from "@graphql/query/myProfile/updateProfileSectionStatus";
import getUserWorkExperienceConfigQuery, {
	IGetUserWorkExperienceConfigQuery,
	IGetUserWorkExperienceConfigQueryVariables,
} from "@graphql/query/myProfile/workExperience/getUserWorkExperienceConfig";

import {
	getWorkExperienceDetails,
	ICPSWorkExperienceDetails,
	IUpdateWorkExperienceDetails,
	updateWorkExperienceDetails,
} from "@services/cpsService";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const useWorkExperienceModel = () => {
	const id = useSelector((state: RootState) => state.user.user.id) || "";

	const [workExperienceDetails, setWorkExperienceDetails] =
		useState<ICPSWorkExperienceDetails | null>(null);
	const [workExperienceListLoading, setWorkExperienceListLoading] =
		useState(false);
	const [
		updateUserWorkExperienceLoading,
		setUpdateUserEducationDetailsLoading,
	] = useState(false);

	const getUserWorkExperienceList = async () => {
		setWorkExperienceListLoading(true);
		const response = await getWorkExperienceDetails();

		if (!response) return setWorkExperienceListLoading(false);

		setWorkExperienceDetails(response);
		setWorkExperienceListLoading(false);
	};

	const [
		getUserWorkExperienceConfig,
		{ data: workExperienceConfig, loading: workExperienceConfigLoading },
	] = useLazyQuery<
		IGetUserWorkExperienceConfigQuery,
		IGetUserWorkExperienceConfigQueryVariables
	>(getUserWorkExperienceConfigQuery, {
		client,
		variables: { where: { user: id } },
		fetchPolicy: "no-cache",
	});

	const updateUserWorkExperience = async (
		workExperiencesData: IUpdateWorkExperienceDetails,
	) => {
		setUpdateUserEducationDetailsLoading(true);
		await updateWorkExperienceDetails(workExperiencesData);
		setUpdateUserEducationDetailsLoading(false);
	};

	const [
		updateProfileSectionStatus,
		{ loading: updateProfileSectionStatusLoading },
	] = useMutation<
		IUpdateProfileSectionStatusMutation,
		IUpdateProfileSectionStatusMutationVariables
	>(updateProfileSectionStatusMutation, {
		client,
		fetchPolicy: "no-cache",
		variables: {
			data: {
				section: "workExperience",
				isCompleted: true,
			},
		},
	});

	return {
		getUserWorkExperienceList,
		workExperienceDetails,
		workExperienceListLoading,
		getUserWorkExperienceConfig,
		workExperienceConfig,
		workExperienceConfigLoading,
		updateUserWorkExperience,
		updateUserWorkExperienceLoading,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	};
};

export default useWorkExperienceModel;
