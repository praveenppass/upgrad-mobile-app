import { useLazyQuery } from "@apollo/client";

import getMultilingualDataQuery, {
	IGetMultilingualDataQuery,
	IGetMultilingualDataQueryVariables,
} from "@graphql/query/asset/video/getMultilingualDataQuery";
import getVideoCourseDetailsQuery, {
	IGetVideoCourseDetailsQuery,
	IGetVideoCourseDetailsQueryVariables,
} from "@graphql/query/asset/video/getVideoCourseDetails";
import getVideoProgramDetailsQuery, {
	IGetVideoProgramDetailsQuery,
	IGetVideoProgramDetailsQueryVariables,
} from "@graphql/query/asset/video/getVideoProgramDetails";
import getKeyMovementTranscriptDetailsQuery, {
	IGetKeyMovementTranscriptDetailsVariables,
	IKeyMovementTranscriptDetails,
} from "@graphql/query/asset/video/landscape/getKeyMovementTranscriptDetailsQuery";

import { client } from "@config/apollo";

const useVideoAssetModel = () => {
	const [
		getCourseVideo,
		{ data: courseVideoData, loading: loadingCourseVideoData },
	] = useLazyQuery<
		IGetVideoCourseDetailsQuery,
		IGetVideoCourseDetailsQueryVariables
	>(getVideoCourseDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getProgramVideo,
		{ data: programVideoData, loading: loadingProgramVideoData },
	] = useLazyQuery<
		IGetVideoProgramDetailsQuery,
		IGetVideoProgramDetailsQueryVariables
	>(getVideoProgramDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getMultilingualVideoData, { data: multilingualVideoData }] =
		useLazyQuery<
			IGetMultilingualDataQuery,
			IGetMultilingualDataQueryVariables
		>(getMultilingualDataQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [getKeyMovementTranscriptDetails, { data: transcriptsData }] =
		useLazyQuery<
			IKeyMovementTranscriptDetails,
			IGetKeyMovementTranscriptDetailsVariables
		>(getKeyMovementTranscriptDetailsQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const loader = loadingCourseVideoData || loadingProgramVideoData;
	return {
		getCourseVideo,
		courseVideoData,
		loadingCourseVideoData,
		getProgramVideo,
		programVideoData,
		loadingProgramVideoData,
		loader,
		multilingualVideoData,
		getMultilingualVideoData,
		getKeyMovementTranscriptDetails,
		transcriptsData,
	};
};
export default useVideoAssetModel;
