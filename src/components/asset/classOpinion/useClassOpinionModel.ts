import { useLazyQuery, useMutation } from "@apollo/client";

import updateClassOpinionCourseStatusQuery, {
	IUpdateClassOpinionCourseStatusQueryVariables,
} from "@graphql/mutation/asset/classOpinion/updateClassOpinionCourseStatus";
import updateClassOpinionProgramStatusQuery, {
	IUpdateClassOpinionProgramStatusQueryVariables,
} from "@graphql/mutation/asset/classOpinion/updateClassOpinionProgramStatus";
import getClassOpinionCourseDetailsQuery, {
	IGetClassOpinionCourseDetailsQuery,
	IGetClassOpinionCourseDetailsQueryVariables,
} from "@graphql/query/asset/classOpinion/getClassOpinionCourseDetails";
import getClassOpinionProgramDetailsQuery, {
	IGetClassOpinionProgramQuery,
	IGetClassOpinionProgramQueryVariables,
} from "@graphql/query/asset/classOpinion/getClassOpinionProgramDetails";
import getClassOpinionResponsesQuery, {
	IGetClassOpinionResponsesQuery,
	IGetClassOpinionResponsesQueryVariables,
} from "@graphql/query/asset/classOpinion/getClassOpinionResponses";

import { client } from "@config/apollo";

export const useClassOpinionAssetModel = () => {
	const [
		getClassOpinionCourseDetails,
		{
			data: classOpinionCourseData,
			loading: loadingClassOpinionCourseData,
			refetch: refetchClassOpinionCourse,
		},
	] = useLazyQuery<
		IGetClassOpinionCourseDetailsQuery,
		IGetClassOpinionCourseDetailsQueryVariables
	>(getClassOpinionCourseDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getClassOpinionProgramDetails,
		{
			data: classOpinionProgramData,
			loading: loadingClassOpinionProgramData,
			refetch: refetchClassOpinionProgram,
		},
	] = useLazyQuery<
		IGetClassOpinionProgramQuery,
		IGetClassOpinionProgramQueryVariables
	>(getClassOpinionProgramDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getClassOpinionResponses,
		{
			data: classOpinionResponseData,
			loading: loadingClassOpinionResponseData,
			refetch: refetchClassOpinionResponseData,
		},
	] = useLazyQuery<
		IGetClassOpinionResponsesQuery,
		IGetClassOpinionResponsesQueryVariables
	>(getClassOpinionResponsesQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updateClassOpinionCourseStatus] = useMutation<
		null,
		IUpdateClassOpinionCourseStatusQueryVariables
	>(updateClassOpinionCourseStatusQuery, {
		client,
		fetchPolicy: "no-cache",
	});
	const [updateClassOpinionProgramStatus] = useMutation<
		null,
		IUpdateClassOpinionProgramStatusQueryVariables
	>(updateClassOpinionProgramStatusQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		getClassOpinionCourseDetails,
		classOpinionCourseData,
		loadingClassOpinionCourseData,
		getClassOpinionProgramDetails,
		classOpinionProgramData,
		loadingClassOpinionProgramData,
		getClassOpinionResponses,
		classOpinionResponseData,
		loadingClassOpinionResponseData,
		updateClassOpinionCourseStatus,
		updateClassOpinionProgramStatus,
		refetchClassOpinionCourse,
		refetchClassOpinionProgram,
		refetchClassOpinionResponseData,
	};
};
