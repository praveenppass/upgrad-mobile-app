import { useLazyQuery, useMutation } from "@apollo/client";

import {
	IUpdateAssetForUserCourse,
	updateAssetUserCourseAfterRecallQuizCompletion,
	updateAssetUserProgramAfterRecallQuizCompletion,
} from "@graphql/mutation/asset/recallquiz/updateAssetForRecallQuiz";
import {
	ISubmitRecallQuizQuery,
	ISubmitRecallQuizVariables,
	submitRecallQuiz,
} from "@graphql/mutation/submitRecallQuiz";
import {
	IUpdateRecallAttemptQuery,
	IUpdateRecallAttemptVariables,
	updateRecallQuizAttemptQuestion,
} from "@graphql/mutation/updateRecallQuizAttemptQuestion";
import getPollQuestion, {
	GetPollQuestionAttemptCountInput,
	IGetPollQuestionAttemptCount,
} from "@graphql/query/asset/assessment/getPollQuestionAttemptCount";
import getattemptRecallquizProgramDetails, {
	IAttemptRecallqueryProgramDetailsQueryVariables,
	IAttemptRecallquizProgramDetailsQuery,
} from "@graphql/query/asset/recallquiz/getAttemptrecallquiz";

import { refetchQueries } from "@config/apollo";
import { client } from "@config/apollo";
import { customLinkClient } from "@config/apollo";

import { IUpdateAssetForUserProgramData } from "@interface/asset.interface";

const RecallquizModel = () => {
	const [
		getAttemptRecallquiz,
		{
			data: getattemptquizProgramData,
			loading: getattemptquizProgramLoader,
		},
	] = useMutation<
		IAttemptRecallquizProgramDetailsQuery,
		IAttemptRecallqueryProgramDetailsQueryVariables
	>(getattemptRecallquizProgramDetails, {
		client: customLinkClient,
	});

	const [updateRecallQuizAttempt, {}] = useMutation<
		IUpdateRecallAttemptQuery,
		IUpdateRecallAttemptVariables
	>(updateRecallQuizAttemptQuestion, {
		client: customLinkClient,
	});

	const [submitQuizAttempt, {}] = useMutation<
		ISubmitRecallQuizQuery,
		ISubmitRecallQuizVariables
	>(submitRecallQuiz, {
		client: customLinkClient,
	});

	const [getPollQuestionCount, { data: pollQuestionCount }] = useLazyQuery<
		IGetPollQuestionAttemptCount,
		GetPollQuestionAttemptCountInput
	>(getPollQuestion, {
		client: customLinkClient,
		fetchPolicy: "no-cache",
	});

	const [onUpdateAssetAfterRecallQuizCompletion, {}] =
		useMutation<IUpdateAssetForUserProgramData>(
			updateAssetUserProgramAfterRecallQuizCompletion,
			{
				client,
				refetchQueries,
			},
		);

	const [onUpdateCourseAssetAfterRecallQuizCompletion, {}] =
		useMutation<IUpdateAssetForUserCourse>(
			updateAssetUserCourseAfterRecallQuizCompletion,
			{
				client,
				refetchQueries,
			},
		);

	return {
		getAttemptRecallquiz,
		getattemptquizProgramData,
		getattemptquizProgramLoader,
		submitQuizAttempt,
		updateRecallQuizAttempt,
		getPollQuestionCount,
		pollQuestionCount,
		onUpdateAssetAfterRecallQuizCompletion,
		onUpdateCourseAssetAfterRecallQuizCompletion,
	};
};

export default RecallquizModel;
