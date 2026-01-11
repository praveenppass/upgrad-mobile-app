import { useLazyQuery, useMutation } from "@apollo/client";

import updateZipDownloadCourseStatusQuery, {
	IUpdateZipDownloadCourseStatusQueryVariables,
} from "@graphql/mutation/asset/zipDownload/updateZipDownloadCourseStatus";
import updateZipDownloadProgramStatusQuery, {
	IUpdateZipDownloadProgramStatusQueryVariables,
} from "@graphql/mutation/asset/zipDownload/updateZipDownloadProgramStatus";
import getZipDownloadCourseDetailsQuery, {
	IGetZipDownloadCourseDetailsQuery,
	IGetZipDownloadCourseDetailsQueryVariables,
} from "@graphql/query/asset/zipDownload/getZipDownloadCourseDetails";
import getZipDownloadProgramDetailsQuery, {
	IGetZipDownloadProgramDetailsQuery,
	IGetZipDownloadProgramDetailsQueryVariables,
} from "@graphql/query/asset/zipDownload/getZipDownloadProgramDetails";

import { client } from "@config/apollo";

const useZipDownloadAssetModel = () => {
	const [
		getCourseZipDownload,
		{ data: courseZipDownloadData, loading: loadingCourseZipDownloadData },
	] = useLazyQuery<
		IGetZipDownloadCourseDetailsQuery,
		IGetZipDownloadCourseDetailsQueryVariables
	>(getZipDownloadCourseDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getProgramZipDownload,
		{
			data: programZipDownloadData,
			loading: loadingProgramZipDownloadData,
		},
	] = useLazyQuery<
		IGetZipDownloadProgramDetailsQuery,
		IGetZipDownloadProgramDetailsQueryVariables
	>(getZipDownloadProgramDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updateZipDownloadCourseStatus] = useMutation<
		null,
		IUpdateZipDownloadCourseStatusQueryVariables
	>(updateZipDownloadCourseStatusQuery, {
		client,
	});

	const [updateZipDownloadProgramStatus] = useMutation<
		null,
		IUpdateZipDownloadProgramStatusQueryVariables
	>(updateZipDownloadProgramStatusQuery, {
		client,
	});

	return {
		getCourseZipDownload,
		courseZipDownloadData,
		loadingCourseZipDownloadData,
		getProgramZipDownload,
		programZipDownloadData,
		loadingProgramZipDownloadData,
		updateZipDownloadCourseStatus,
		updateZipDownloadProgramStatus,
	};
};
export default useZipDownloadAssetModel;
