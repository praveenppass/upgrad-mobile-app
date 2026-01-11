import { useLazyQuery, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { IGetUserContactDetailsQuery } from "@graphql/query/myProfile/contactDetails/getUserContactDetails";
import getUserContactDetailsConfigQuery, {
	IGetUserContactDetailsConfigQuery,
	IGetUserContactDetailsConfigQueryVariables,
} from "@graphql/query/myProfile/contactDetails/getUserContactDetailsConfig";
import updateProfileSectionStatusMutation, {
	IUpdateProfileSectionStatusMutation,
	IUpdateProfileSectionStatusMutationVariables,
} from "@graphql/query/myProfile/updateProfileSectionStatus";

import {
	getContactDetails,
	PartialContactDetails,
	updateContactDetails,
} from "@services/cpsService";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const useContactDetailsModel = () => {
	const id = useSelector((state: RootState) => state.user.user.id) || "";

	const [contactDetails, setContactDetails] =
		useState<IGetUserContactDetailsQuery | null>(null);
	const [contactDetailsLoading, setContactDetailsLoading] = useState(false);

	const getUserContactDetails = async () => {
		setContactDetailsLoading(true);

		const response = await getContactDetails();

		if (!response) return setContactDetailsLoading(false);

		setContactDetails(response);
		setContactDetailsLoading(false);
	};

	const refetchUserContactDetails = useCallback(async () => {
		await getUserContactDetails();
	}, [getUserContactDetails]);

	const [
		getUserContactDetailsConfig,
		{ data: contactDetailsConfig, loading: contactDetailsConfigLoading },
	] = useLazyQuery<
		IGetUserContactDetailsConfigQuery,
		IGetUserContactDetailsConfigQueryVariables
	>(getUserContactDetailsConfigQuery, {
		client: client,
		variables: { where: { user: id } },
		fetchPolicy: "no-cache",
	});

	const [
		updateUserContactDetailsLoading,
		setUpdateUserContactDetailsLoading,
	] = useState(false);

	const updateUserContactDetails = async (
		contactDetailsData: PartialContactDetails,
	) => {
		setUpdateUserContactDetailsLoading(true);

		await updateContactDetails(contactDetailsData);

		setUpdateUserContactDetailsLoading(false);
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
				section: "contactDetails",
				isCompleted: true,
			},
		},
	});

	return {
		getUserContactDetails,
		refetchUserContactDetails,
		contactDetails,
		contactDetailsLoading,
		getUserContactDetailsConfig,
		contactDetailsConfig,
		contactDetailsConfigLoading,
		updateUserContactDetails,
		updateUserContactDetailsLoading,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	};
};

export default useContactDetailsModel;
