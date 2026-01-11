import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import updateUserProgramAspirationsQuery, {
	IUpdateUserProgramAspirationsQuery,
	IUpdateUserProgramAspirationsQueryVariables,
} from "@graphql/mutation/myProfile/aspirations/updateUserProgramAspirations";
import getUserAspirationsQuery, {
	IGetUserAspirationsQuery,
	IGetUserAspirationsQueryVariables,
} from "@graphql/query/myProfile/aspirations/getUserAspirations";
import getUserAspirationsConfigQuery, {
	IGetUserAspirationsConfigQuery,
	IGetUserAspirationsConfigQueryVariables,
} from "@graphql/query/myProfile/aspirations/getUserAspirationsConfig";
import updateProfileSectionStatusMutation, {
	IUpdateProfileSectionStatusMutation,
	IUpdateProfileSectionStatusMutationVariables,
} from "@graphql/query/myProfile/updateProfileSectionStatus";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const useAspirationsModel = () => {
	const id = useSelector((state: RootState) => state.user.user.id) || "";

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
		getUserAspirationsConfig,
		{ data: aspirationConfig, loading: aspirationConfigLoading },
	] = useLazyQuery<
		IGetUserAspirationsConfigQuery,
		IGetUserAspirationsConfigQueryVariables
	>(getUserAspirationsConfigQuery, {
		client,
		variables: { where: { user: id } },
		fetchPolicy: "no-cache",
	});

	const [
		updateUserProgramAspirations,
		{ loading: updateUserProgramAspirationsLoading },
	] = useMutation<
		IUpdateUserProgramAspirationsQuery,
		IUpdateUserProgramAspirationsQueryVariables
	>(updateUserProgramAspirationsQuery, {
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
				section: "aspiration",
				isCompleted: true,
			},
		},
	});

	return {
		getUserAspirations,
		aspiration,
		aspirationLoading,
		getUserAspirationsConfig,
		aspirationConfig,
		aspirationConfigLoading,

		updateUserProgramAspirations,
		updateUserProgramAspirationsLoading,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	};
};

export default useAspirationsModel;
