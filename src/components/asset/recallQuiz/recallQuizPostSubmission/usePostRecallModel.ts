import { useMutation } from "@apollo/client";

import { getRecallQuizResult } from "@graphql/mutation/asset/recallquiz/getRecallQuizAttemptOptimized";
import type {
	getRecallQuizAttemptResultsQuery,
	IGetRecallQuizAttemptResultsQueryVariables,
} from "@graphql/mutation/asset/recallquiz/getRecallQuizAttemptOptimized";

import { customLinkClient } from "@config/apollo";

const usePostRecallModel = () => {
	const [getRecallQuizResults, { data: recallQuizAttemptData }] = useMutation<
		getRecallQuizAttemptResultsQuery,
		IGetRecallQuizAttemptResultsQueryVariables
	>(getRecallQuizResult, {
		client: customLinkClient,
		fetchPolicy: "no-cache",
	});

	return {
		recallQuizAttemptData,
		getRecallQuizResults,
	};
};

export default usePostRecallModel;
