import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

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

const useAddEducationModel = () => {
	const [
		getUserEducationConfig,
		{ data: educationConfig, loading: educationConfigLoading },
	] = useLazyQuery<
		IGetUserEducationDetailsConfigQuery,
		IGetUserEducationDetailsConfigQueryVariables
	>(getUserEducationDetailsConfigQuery, {
		client: client,
		fetchPolicy: "no-cache",
	});

	return {
		educationConfig,
		educationConfigLoading,
		getUserEducationConfig,
	};
};
export default useAddEducationModel;
