import { useLazyQuery, useMutation } from "@apollo/client";

import cancelDeadlineExtension, {
	ICancelExtensionQuery,
	ICancelExtensionQueryVariables,
} from "@graphql/mutation/moduleExtension/cancelProgramModuleExtendedDeadlineQuery";
import extendDeadline, {
	IExtensionQuery,
	IExtensionQueryVariables,
} from "@graphql/mutation/moduleExtension/extendProgramModuleDeadline";
import getProgramModuleDetailsQuery, {
	IProgramModuleDetailsQuery,
	IProgramModuleDetailsQueryVariables,
} from "@graphql/query/moduleExtension/getProgramModuleDetailsQuery";

import { client } from "@config/apollo";

const useModuleExtensionModel = () => {
	const [onProgramModuleExtend] = useMutation<
		IExtensionQuery,
		IExtensionQueryVariables
	>(extendDeadline, {
		client,
		fetchPolicy: "no-cache",
	});

	const [onProgramModuleCancelExtension] = useMutation<
		ICancelExtensionQuery,
		ICancelExtensionQueryVariables
	>(cancelDeadlineExtension, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getProgramModuleDetails,
		{ data: programModulesDetails, loading: programModuleListLoading },
	] = useLazyQuery<
		IProgramModuleDetailsQuery,
		IProgramModuleDetailsQueryVariables
	>(getProgramModuleDetailsQuery, { client, fetchPolicy: "no-cache" });

	return {
		onProgramModuleExtend,
		onProgramModuleCancelExtension,
		getProgramModuleDetails,
		programModulesDetails,
		programModuleListLoading,
	};
};

export default useModuleExtensionModel;
