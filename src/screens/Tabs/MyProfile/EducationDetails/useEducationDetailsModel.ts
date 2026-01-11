import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";

import getUserEducationDetailsConfigQuery, {
	IGetUserEducationDetailsConfigQuery,
	IGetUserEducationDetailsConfigQueryVariables,
} from "@graphql/query/myProfile/educationDetails/getUserEducationDetailsConfig";
import updateProfileSectionStatusMutation, {
	IUpdateProfileSectionStatusMutation,
	IUpdateProfileSectionStatusMutationVariables,
} from "@graphql/query/myProfile/updateProfileSectionStatus";

import {
	getEducationDetails,
	ICPSEducationDetails,
	PartialEducationDetails,
	updateEducationDetails,
} from "@services/cpsService";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const useEducationDetailsModel = () => {
	const id = useSelector((state: RootState) => state.user.user.id) || "";

	const [educationDetails, setEducationDetails] = useState<
		ICPSEducationDetails[] | null
	>(null);
	const [educationDetailsLoading, setEducationDetailsLoading] =
		useState(false);

	const getUserEducationDetails = async () => {
		setEducationDetailsLoading(true);

		const response = await getEducationDetails();

		if (!response) return setEducationDetailsLoading(false);

		setEducationDetails(response);
		setEducationDetailsLoading(false);
	};

	const [
		getUserEducationDetailsConfig,
		{
			data: educationDetailsConfig,
			loading: educationDetailsConfigLoading,
		},
	] = useLazyQuery<
		IGetUserEducationDetailsConfigQuery,
		IGetUserEducationDetailsConfigQueryVariables
	>(getUserEducationDetailsConfigQuery, {
		client,
		variables: { where: { user: id } },
		fetchPolicy: "no-cache",
	});

	const [
		updateUserEducationDetailsLoading,
		setUpdateUserEducationDetailsLoading,
	] = useState(false);

	const updateUserEducationDetails = async (
		educations: PartialEducationDetails[],
	) => {
		setUpdateUserEducationDetailsLoading(true);
		await updateEducationDetails(educations);
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
				section: "education",
				isCompleted: true,
			},
		},
	});

	return {
		getUserEducationDetails,
		educationDetails,
		educationDetailsLoading,
		getUserEducationDetailsConfig,
		educationDetailsConfig,
		educationDetailsConfigLoading,

		updateUserEducationDetails,
		updateUserEducationDetailsLoading,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	};
};

export default useEducationDetailsModel;
