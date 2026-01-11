import { useLazyQuery, useMutation } from "@apollo/client";

import UpdatePdfCourseStatusQuery, {
	IUpdatePdfCourseStatusQuery,
	IUpdatePdfCourseStatusQueryVariables,
} from "@graphql/mutation/asset/pdf/updatePdfCourseStatus";
import UpdatePdfProgramStatusQuery, {
	IUpdatePdfProgramStatusQuery,
	IUpdatePdfProgramStatusQueryVariables,
} from "@graphql/mutation/asset/pdf/updatePdfProgramStatus";
import getPdfCourseDetailsQuery, {
	IGetPdfCourseDetailsQuery,
	IGetPdfCourseDetailsQueryVariables,
} from "@graphql/query/asset/pdf/getPdfCourseDetails";
import getPdfProgramDetailsQuery, {
	IGetPdfProgramDetailsQuery,
	IGetPdfProgramDetailsQueryVariables,
} from "@graphql/query/asset/pdf/getPdfProgramDetails";

import { client } from "@config/apollo";

export const useAssetPdfViewModel = () => {
	const [getCoursePdfAsset, { data: assetCoursePdfData }] = useLazyQuery<
		IGetPdfCourseDetailsQuery,
		IGetPdfCourseDetailsQueryVariables
	>(getPdfCourseDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getProgramPdfAsset, { data: assetProgramPdfData }] = useLazyQuery<
		IGetPdfProgramDetailsQuery,
		IGetPdfProgramDetailsQueryVariables
	>(getPdfProgramDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updatePdfCourseStatus] = useMutation<
		IUpdatePdfCourseStatusQuery,
		IUpdatePdfCourseStatusQueryVariables
	>(UpdatePdfCourseStatusQuery, {
		client,
	});

	const [updatePdfProgramStatus] = useMutation<
		IUpdatePdfProgramStatusQuery,
		IUpdatePdfProgramStatusQueryVariables
	>(UpdatePdfProgramStatusQuery, {
		client,
	});

	return {
		assetCoursePdfData,
		assetProgramPdfData,
		getCoursePdfAsset,
		getProgramPdfAsset,
		updatePdfCourseStatus,
		updatePdfProgramStatus,
	};
};
