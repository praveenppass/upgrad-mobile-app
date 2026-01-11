import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";

import updateUserPersonalDetailsResumeQuery, {
	IUpdateUserPersonalDetailsResumeQuery,
	IUpdateUserPersonalDetailsResumeQueryVariables,
} from "@graphql/mutation/myProfile/personalDetails/updateUserPersonalDetailsResume";
import getUserPersonalDetailsConfigQuery, {
	IGetUserPersonalDetailsConfigQuery,
	IGetUserPersonalDetailsConfigQueryVariables,
} from "@graphql/query/myProfile/personalDetails/getUserPersonalDetailsConfig";
import getUserPersonalDetailsResumeQuery, {
	IGetUserPersonalDetailsResumeQuery,
	IGetUserPersonalDetailsResumeQueryVariables,
} from "@graphql/query/myProfile/personalDetails/getUserPersonalDetailsResume";
import updateProfileSectionStatusMutation, {
	IUpdateProfileSectionStatusMutation,
	IUpdateProfileSectionStatusMutationVariables,
} from "@graphql/query/myProfile/updateProfileSectionStatus";

import {
	getPersonalDetails,
	PartialPersonalDetails,
	updatePersonalDetails,
} from "@services/cpsService";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const usePersonalDetailsModel = () => {
	const id = useSelector((state: RootState) => state.user.user.id) || "";

	const [personalDetails, setPersonalDetails] = useState<any>(null);
	const [personalDetailsLoading, setPersonalDetailsLoading] = useState(false);
	const [
		updateUserPersonalDetailsLoading,
		setUpdateUserPersonalDetailsLoading,
	] = useState(false);

	const getUserPersonalDetails = async () => {
		setPersonalDetailsLoading(true);

		const response = await getPersonalDetails();

		if (!response) return setPersonalDetailsLoading(false);

		setPersonalDetails(response);
		setPersonalDetailsLoading(false);
	};

	const [
		getUserPersonalDetailsConfig,
		{ data: personalDetailsConfig, loading: personalDetailsConfigLoading },
	] = useLazyQuery<
		IGetUserPersonalDetailsConfigQuery,
		IGetUserPersonalDetailsConfigQueryVariables
	>(getUserPersonalDetailsConfigQuery, {
		client,
		variables: { where: { user: id } },
		fetchPolicy: "no-cache",
	});

	const updateUserPersonalDetails = async (
		personalDetailsData: PartialPersonalDetails,
	) => {
		setUpdateUserPersonalDetailsLoading(true);
		await updatePersonalDetails(personalDetailsData);
		setUpdateUserPersonalDetailsLoading(false);
	};

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
		variables: { where: { id } },
		fetchPolicy: "no-cache",
	});

	const [
		updateUserPersonalDetailsResume,
		{ loading: updateUserPersonalDetailsResumeLoading },
	] = useMutation<
		IUpdateUserPersonalDetailsResumeQuery,
		IUpdateUserPersonalDetailsResumeQueryVariables
	>(updateUserPersonalDetailsResumeQuery, {
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
		variables: {
			data: {
				section: "personalDetails",
				isCompleted: true,
			},
		},
	});

	return {
		getUserPersonalDetails,
		personalDetails,
		personalDetailsLoading,
		getUserPersonalDetailsConfig,
		personalDetailsConfig,
		personalDetailsConfigLoading,

		updateUserPersonalDetails,
		updateUserPersonalDetailsLoading,

		updateUserPersonalDetailsResume,
		updateUserPersonalDetailsResumeLoading,

		getUserPersonalDetailsResume,
		userPersonalDetailsResume,
		userPersonalDetailsResumeLoading,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	};
};

export default usePersonalDetailsModel;
