import { useLazyQuery, useMutation } from "@apollo/client";

import {
	createFeedbackResponse,
	ICreateFeedbackResponseMutation,
	ICreateFeedbackResponseVariables,
} from "@graphql/mutation/microInteractions/createFeedbackResponse";
import {
	ISkipPendingFeedbackMutation,
	ISkipPendingFeedbackVariables,
	skipPendingFeedback,
} from "@graphql/mutation/microInteractions/skipFeedback";
import {
	IGetModuleNameForProgramQueryData,
	IGetModuleNameForProgramQueryVariables,
} from "@graphql/query/microInteractions/getModuleNameForProgramQuery";
import getModuleNameForProgramQuery from "@graphql/query/microInteractions/getModuleNameForProgramQuery";
import {
	IPendingFeedbackQuery,
	IPendingFeedbackQueryVariables,
	pendingFeedbackQuery,
} from "@graphql/query/microInteractions/pendingFeedbackQuery";

import { client } from "@config/apollo";

const useModuleFeedbackModalModel = () => {
	const [
		getPendingFeedback,
		{ data: pendingFeedbackData, loading: pendingFeedbackLoading },
	] = useLazyQuery<IPendingFeedbackQuery, IPendingFeedbackQueryVariables>(
		pendingFeedbackQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [skipPendingFeedbackMutation] = useMutation<
		ISkipPendingFeedbackMutation,
		ISkipPendingFeedbackVariables
	>(skipPendingFeedback, {
		client,
	});

	const [createFeedbackResponseMutation] = useMutation<
		ICreateFeedbackResponseMutation,
		ICreateFeedbackResponseVariables
	>(createFeedbackResponse, {
		client,
	});
	const [getModuleNameForProgram, { data: moduleNameForProgramData }] =
		useLazyQuery<
			IGetModuleNameForProgramQueryData,
			IGetModuleNameForProgramQueryVariables
		>(getModuleNameForProgramQuery, {
			client,
		});

	return {
		getPendingFeedback,
		pendingFeedbackData,
		pendingFeedbackLoading,
		skipPendingFeedbackMutation,
		createFeedbackResponseMutation,
		getModuleNameForProgram,
		moduleNameForProgramData,
	};
};

export default useModuleFeedbackModalModel;
