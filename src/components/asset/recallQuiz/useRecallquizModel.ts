import { useLazyQuery, useMutation } from "@apollo/client";

import createRecallquizProgramDetails, {
	ICreateRecallqueryProgramDetailsQueryVariables,
	ICreateRecallquizProgramDetailsQuery,
} from "@graphql/query/asset/recallquiz/createrecallquizPrograms";
import getattemptRecallquizProgramDetails, {
	IAttemptRecallqueryProgramDetailsQueryVariables,
	IAttemptRecallquizProgramDetailsQuery,
} from "@graphql/query/asset/recallquiz/getAttemptrecallquiz";
import getRecallquizCourseDetails, {
	IGetRecallqueryCourseDetailsQueryVariables,
	IGetRecallquizCourseDetailsQuery,
} from "@graphql/query/asset/recallquiz/getrecallquizCourse";
import getRecallquizProgramDetails, {
	IGetRecallqueryProgramDetailsQueryVariables,
	IGetRecallquizProgramDetailsQuery,
} from "@graphql/query/asset/recallquiz/getrecallquizPrograms";
import startRecallquizProgramDetails, {
	IStartRecallqueryProgramDetailsQueryVariables,
	IStartRecallquizProgramDetailsQuery,
} from "@graphql/query/asset/recallquiz/startRecallQuizmutation";

import { client, customLinkClient } from "@config/apollo";

const Recallquizmodel = () => {
	const [
		getRecallquizforprogram,
		{ data: recallquizProgramData, loading: recallquizProgramLoader },
	] = useLazyQuery<
		IGetRecallquizProgramDetailsQuery,
		IGetRecallqueryProgramDetailsQueryVariables
	>(getRecallquizProgramDetails, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getRecallquizforcourse,
		{ data: recallquizCourseData, loading: recallquizCourseLoader },
	] = useLazyQuery<
		IGetRecallquizCourseDetailsQuery,
		IGetRecallqueryCourseDetailsQueryVariables
	>(getRecallquizCourseDetails, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		createRecallquizprogram,
		{
			data: createrecallquizProgramData,
			loading: createrecallquizProgramLoader,
		},
	] = useMutation<
		ICreateRecallquizProgramDetailsQuery,
		ICreateRecallqueryProgramDetailsQueryVariables
	>(createRecallquizProgramDetails, {
		client: customLinkClient,
	});
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

	const [startRecallQuizmutation, { data: startRecallquiz }] = useMutation<
		IStartRecallquizProgramDetailsQuery,
		IStartRecallqueryProgramDetailsQueryVariables
	>(startRecallquizProgramDetails, {
		client: customLinkClient,
	});

	const pageLoader =
		recallquizProgramLoader ||
		createrecallquizProgramLoader ||
		getattemptquizProgramLoader ||
		recallquizCourseLoader;
	return {
		recallquizProgramData,
		recallquizCourseData,
		pageLoader,
		getRecallquizforprogram,
		createrecallquizProgramData,
		createRecallquizprogram,
		getattemptquizProgramData,
		getAttemptRecallquiz,
		startRecallquiz,
		startRecallQuizmutation,
		getRecallquizforcourse,
	};
};

export default Recallquizmodel;
