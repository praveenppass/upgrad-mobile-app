import { useLazyQuery, useMutation } from "@apollo/client";

import UpdateWebViewCourseStatusQuery, {
	IUpdateWebViewCourseStatusQuery,
	IUpdateWebViewCourseStatusQueryVariables,
} from "@graphql/mutation/asset/webView/updateWebViewCourseStatus";
import UpdateWebViewProgramStatusQuery, {
	IUpdateWebViewProgramStatusQuery,
	IUpdateWebViewProgramStatusQueryVariables,
} from "@graphql/mutation/asset/webView/updateWebViewProgramStatus";
import getWebViewCourseDetailsQuery, {
	IGetWebViewCourseDetailsQuery,
	IGetWebViewCourseDetailsQueryVariables,
} from "@graphql/query/asset/webView/getWebViewCourseDetails";
import getWebViewProgramDetailsQuery, {
	IGetWebViewProgramDetailsQuery,
	IGetWebViewProgramDetailsQueryVariables,
} from "@graphql/query/asset/webView/getWebViewProgramDetails";

import { client } from "@config/apollo";

export const useAssetWebViewModel = () => {
	const [getCourseWebViewAsset, { data: assetWebViewCourseData }] =
		useLazyQuery<
			IGetWebViewCourseDetailsQuery,
			IGetWebViewCourseDetailsQueryVariables
		>(getWebViewCourseDetailsQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [getProgramWebViewAsset, { data: assetWebViewProgramData }] =
		useLazyQuery<
			IGetWebViewProgramDetailsQuery,
			IGetWebViewProgramDetailsQueryVariables
		>(getWebViewProgramDetailsQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [updateWebViewCourseStatus] = useMutation<
		IUpdateWebViewCourseStatusQuery,
		IUpdateWebViewCourseStatusQueryVariables
	>(UpdateWebViewCourseStatusQuery, {
		client,
	});

	const [updateWebViewProgramStatus] = useMutation<
		IUpdateWebViewProgramStatusQuery,
		IUpdateWebViewProgramStatusQueryVariables
	>(UpdateWebViewProgramStatusQuery, {
		client,
	});

	return {
		assetWebViewCourseData,
		assetWebViewProgramData,
		getCourseWebViewAsset,
		getProgramWebViewAsset,
		updateWebViewCourseStatus,
		updateWebViewProgramStatus,
	};
};
