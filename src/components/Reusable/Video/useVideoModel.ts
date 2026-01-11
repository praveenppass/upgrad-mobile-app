import { useLazyQuery, useMutation } from "@apollo/client";
import { Buffer } from "buffer";
import { Platform } from "react-native";

import updateAssetSeekTimeForUserCourse, {
	IIUpdateAssetSeekTimeQueryForUserCourse,
	IUpdateAssetSeekTimeVariablesForUserCourse,
} from "@graphql/mutation/asset/video/updateAssetSeekTimeCourse";
import updateAssetSeekTimeForUserProgram, {
	IIUpdateAssetSeekTimeQueryForUserProgram,
	IUpdateAssetSeekTimeVariablesForUserProgram,
} from "@graphql/mutation/asset/video/updateAssetSeekTimeProgram";
import updateMediaplayerQuery, {
	IUpdateMediaplayerQuery,
	IUpdateMediaplayerQueryVariables,
} from "@graphql/mutation/asset/video/updatePlayBackProgress";
import {
	IupdateSubAssetForUserCourseQueryVariables,
	IupdateSubAssetForUserProgramQueryVariables,
} from "@graphql/mutation/asset/video/updateSubAssetStatus";
import updateVideoProgressCourseStatusQuery, {
	IUpdateVideoProgressStatusQueryVariables,
} from "@graphql/mutation/asset/video/updateVideoProgressCourseStatus";
import updateVideoProgressProgramStatusQuery, {
	IUpdateVideoProgressProgramStatusQueryVariables,
} from "@graphql/mutation/asset/video/updateVideoProgressProgramStatus";
import {
	updateSubAssetForUserCourse,
	updateSubAssetForUserProgram,
} from "@graphql/mutation/updateSubAssetMutation";
import getVideoCourseDetailsQuery, {
	IGetVideoCourseDetailsQuery,
	IGetVideoCourseDetailsQueryVariables,
} from "@graphql/query/asset/video/getVideoCourseDetails";
import getVideoDetailsQuery, {
	IGetVideoDetailsQuery,
	IGetVideoDetailsQueryVariables,
} from "@graphql/query/asset/video/getVideoDetails";
import getVideoProgramDetailsQuery, {
	IGetVideoProgramDetailsQuery,
	IGetVideoProgramDetailsQueryVariables,
} from "@graphql/query/asset/video/getVideoProgramDetails";
import getKeyMovementTranscriptDetailsQuery, {
	IGetKeyMovementTranscriptDetailsVariables,
	IKeyMovementTranscriptDetails,
} from "@graphql/query/asset/video/landscape/getKeyMovementTranscriptDetailsQuery";

import { httpClient } from "@utils/httpClientList";
import { brightcoveHttpClient } from "@utils/httpClientList";

import { client } from "@config/apollo";
import { ENV } from "@config/env";

export interface IVideoDrm {
	getLicense: (specString: string) => Promise<string>;
	certificateUrl: string;
	licenseServer: string;
}

interface ISource {
	key_systems: {
		[IKeySystem.IOS]?: {
			certificate_url: string;
			key_request_url: string;
		};
		[IKeySystem.ANDROID]?: {
			license_url: string;
		};
	};
	src: string;
}

enum IKeySystem {
	IOS = "com.apple.fps.1_0",
	ANDROID = "com.widevine.alpha",
}
enum IBrightCoveVideoType {
	ios = "application/x-mpegURL",
	android = "application/dash+xml",
}
const {
	brightcoveAccountId: brightCoveAccountId,
	brightcovePolicyKey: brightCovePolicyKey,
} = ENV;

const useVideoAssetModel = () => {
	const getVideoDrmData = async (brightCoveId: string) => {
		const response = await brightcoveHttpClient.get<{
			poster: string;
			sources: ISource[];
		}>(`/${brightCoveAccountId}/videos/${brightCoveId}`, {
			headers: {
				Accept: `application/json;pk=${brightCovePolicyKey}`,
			},
		});

		let licenseServer = "";
		let certificateUrl = "";
		const isPlatformIos = Platform.OS === "ios";
		const keySystem = isPlatformIos ? IKeySystem.IOS : IKeySystem.ANDROID;
		const source = response.data.sources.find(
			(el: any) =>
				el.type ===
				(Platform.OS === "android"
					? IBrightCoveVideoType.android
					: IBrightCoveVideoType.ios),
		);
		if (source?.key_systems) {
			if (isPlatformIos) {
				const iosKeySystem: {
					certificate_url: string;
					key_request_url: string;
				} = source?.key_systems[keySystem];
				certificateUrl = iosKeySystem?.certificate_url;
				licenseServer = iosKeySystem?.key_request_url;
			} else {
				const androidKeySystem = source?.key_systems[keySystem];
				licenseServer = androidKeySystem?.license_url;
			}
		}
		const drmData = {
			//type: isPlatformIos ? DRMType.FAIRPLAY : DRMType.WIDEVINE,
			getLicense: async (specString: string) => {
				const { data } = await httpClient.post(
					licenseServer,
					{ server_playback_context: specString },
					{ responseType: "arraybuffer" },
				);

				return Buffer.from(data, "binary").toString("base64");
			},
			certificateUrl,
			licenseServer,
		};
		return {
			uri: source?.src,
			drm: drmData,
			poster: response?.data?.poster,
		};
	};

	const [getuserMediaPrefrence, { data: userVideoPrefrences }] = useLazyQuery<
		IGetVideoDetailsQuery,
		IGetVideoDetailsQueryVariables
	>(getVideoDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getVideoAssetsFromProgram,
		{
			data: videoAssetsFromProgramData,
			loading: loadingVideoAssetsFromProgram,
		},
	] = useLazyQuery<
		IGetVideoProgramDetailsQuery,
		IGetVideoProgramDetailsQueryVariables
	>(getVideoProgramDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getVideoAssetsFromCourse,
		{
			data: videoAssetsFromCourseData,
			loading: loadingVideoAssetsFromCourse,
		},
	] = useLazyQuery<
		IGetVideoCourseDetailsQuery,
		IGetVideoCourseDetailsQueryVariables
	>(getVideoCourseDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updateMediaPlayerConfig] = useMutation<
		IUpdateMediaplayerQuery,
		IUpdateMediaplayerQueryVariables
	>(updateMediaplayerQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updateSeekTimeProgram] = useMutation<
		IIUpdateAssetSeekTimeQueryForUserProgram,
		IUpdateAssetSeekTimeVariablesForUserProgram
	>(updateAssetSeekTimeForUserProgram, {
		client,
		fetchPolicy: "no-cache",
	});
	const [updateSeekTimeCourse] = useMutation<
		IIUpdateAssetSeekTimeQueryForUserCourse,
		IUpdateAssetSeekTimeVariablesForUserCourse
	>(updateAssetSeekTimeForUserCourse, {
		client,
		fetchPolicy: "no-cache",
	});

	const [updateVideoProgressProgramStatus] =
		useMutation<IUpdateVideoProgressProgramStatusQueryVariables>(
			updateVideoProgressProgramStatusQuery,
			{
				client,
				fetchPolicy: "no-cache",
			},
		);

	const [updateVideoCourseStatus] =
		useMutation<IUpdateVideoProgressStatusQueryVariables>(
			updateVideoProgressCourseStatusQuery,
			{
				client,
				fetchPolicy: "no-cache",
			},
		);
	const [updateSubAssetprogramCodeStatus] =
		useMutation<IupdateSubAssetForUserProgramQueryVariables>(
			updateSubAssetForUserProgram,
			{
				client,
				fetchPolicy: "no-cache",
			},
		);
	const [updateSubAssetcourseCodeStatus] =
		useMutation<IupdateSubAssetForUserCourseQueryVariables>(
			updateSubAssetForUserCourse,
			{
				client,
				fetchPolicy: "no-cache",
			},
		);

	const [getKeyMovementTranscriptDetails, { data: transcriptsData }] =
		useLazyQuery<
			IKeyMovementTranscriptDetails,
			IGetKeyMovementTranscriptDetailsVariables
		>(getKeyMovementTranscriptDetailsQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	return {
		getVideoDrmData,
		getuserMediaPrefrence,
		userVideoPrefrences,
		updateMediaPlayerConfig,
		updateSeekTimeProgram,
		updateSeekTimeCourse,
		updateVideoProgressProgramStatus,
		updateVideoCourseStatus,
		getVideoAssetsFromProgram,
		videoAssetsFromProgramData,
		loadingVideoAssetsFromProgram,
		updateSubAssetprogramCodeStatus,
		updateSubAssetcourseCodeStatus,
		getVideoAssetsFromCourse,
		videoAssetsFromCourseData,
		loadingVideoAssetsFromCourse,
		transcriptsData,
		getKeyMovementTranscriptDetails,
	};
};
export default useVideoAssetModel;
