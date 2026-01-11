import { useLazyQuery, useMutation } from "@apollo/client";

import UpdateHtmlContentCourseStatusQuery, {
	IUpdateHtmlContentCourseStatusQueryVariables,
} from "@graphql/mutation/asset/htmlContent/updateHtmlContentCourseStatus";
import UpdateHtmlContentProgramStatusQuery, {
	IUpdateHtmlContentProgramStatusQueryVariables,
} from "@graphql/mutation/asset/htmlContent/updateHtmlContentProgramStatus";
import getHtmlContentCourseDetailsQuery, {
	IGetHtmlContentCourseDetailsQuery,
	IGetHtmlContentCourseDetailsQueryVariables,
} from "@graphql/query/asset/htmlContent/getHtmlContentCourseDetails";
import getHtmlContentProgramDetailsQuery, {
	IGetHtmlContentProgramDetailsQuery,
	IGetHtmlContentProgramDetailsQueryVariables,
} from "@graphql/query/asset/htmlContent/getHtmlContentProgramDetails";

import { client } from "@config/apollo";

const useHtmlContentAssetModel = () => {
	const [
		getCourseHtmlContent,
		{ data: courseHtmlContentData, loading: loadingCourseHtmlContentData },
	] = useLazyQuery<
		IGetHtmlContentCourseDetailsQuery,
		IGetHtmlContentCourseDetailsQueryVariables
	>(getHtmlContentCourseDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getProgramHtmlContent,
		{
			data: programHtmlContentData,
			loading: loadingProgramHtmlContentData,
		},
	] = useLazyQuery<
		IGetHtmlContentProgramDetailsQuery,
		IGetHtmlContentProgramDetailsQueryVariables
	>(getHtmlContentProgramDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updateHtmlContentCourseStatus] = useMutation<
		null,
		IUpdateHtmlContentCourseStatusQueryVariables
	>(UpdateHtmlContentCourseStatusQuery, {
		client,
	});

	const [updateHtmlContentProgramStatus] = useMutation<
		null,
		IUpdateHtmlContentProgramStatusQueryVariables
	>(UpdateHtmlContentProgramStatusQuery, {
		client,
	});

	return {
		getCourseHtmlContent,
		courseHtmlContentData,
		loadingCourseHtmlContentData,
		getProgramHtmlContent,
		programHtmlContentData,
		loadingProgramHtmlContentData,
		updateHtmlContentCourseStatus,
		updateHtmlContentProgramStatus,
	};
};
export default useHtmlContentAssetModel;
