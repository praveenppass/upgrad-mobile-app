import { useAssetTranslation } from "@contexts/AssetTranslationContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

import useVideoAssetModel from "@components/asset/video/useVideoModel";

import { LearningPathType } from "@interface/app.interface";

interface ISourceCodeFile {
	displayName: string;
	fileName: string;
}

interface IVideoAssetControllerProps {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathId: string | null;
	learningPathType: LearningPathType;
}

interface IDownloadSourceFileProps {
	fileName: string;
	displayName: string;
}

const mapSourceCodeFiles = (
	files: IDownloadSourceFileProps[],
): ISourceCodeFile[] => {
	if (!files || files.length === 0) return [];

	return files.map((file) => ({
		displayName: file.displayName,
		fileName: file.fileName,
	}));
};

const useVideoAssetController = ({
	assetCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	learningPathId,
	learningPathType,
}: IVideoAssetControllerProps) => {
	const isProgram = learningPathType === LearningPathType.PROGRAM;

	// Get translation language ID from context
	const { getTranslationLanguageId } = useAssetTranslation();

	const {
		loader,
		courseVideoData,
		getCourseVideo,
		getProgramVideo,
		programVideoData,
		multilingualVideoData,
		getMultilingualVideoData,
		getKeyMovementTranscriptDetails,
		transcriptsData,
	} = useVideoAssetModel();

	const videoData = programVideoData?.getAssetFromUserProgram
		? programVideoData?.getAssetFromUserProgram
		: courseVideoData?.getAssetFromUserCourse;
	const seekTime = videoData?.seekTime;
	const completed = videoData?.status || videoData?.children?.status;
	const isOptional = videoData?.isOptional || false;
	const preText = videoData?.asset?.preText;
	const postText = videoData?.asset?.postText;

	const { beforeVideo, afterVideo, afterPostText } =
		videoData?.asset?.sourceCodeFiles ?? {};

	const beforeVideoFiles = mapSourceCodeFiles(beforeVideo);
	const afterVideoFiles = mapSourceCodeFiles(afterVideo);
	const afterPostTextFiles = mapSourceCodeFiles(afterPostText);

	const getHtmlContentAssetDetails = async () => {
		const whereVariables = {
			asset: assetCode ?? null,
			level1: courseId ?? null,
			level2: moduleId ?? null,
			...(isProgram && {
				level3: sessionId ?? null,
				level4: segmentId ?? null,
			}),
			// Add translation language if supported for this asset type
			translationLanguage: getTranslationLanguageId(),
		};
		if (isProgram)
			await getProgramVideo({
				variables: {
					where: {
						...whereVariables,
						userProgram: learningPathId,
					},
				},
			});
		else
			await getCourseVideo({
				variables: {
					where: {
						...whereVariables,
						userCourse: learningPathId,
					},
				},
			});
	};

	const fetchMultilingualData = async () => {
		const variables = {
			asset: assetCode ?? "",
			level1: courseId ?? "",
			level2: moduleId ?? "",
			level3: sessionId ?? "",
			level4: segmentId ?? "",
			userProgram: learningPathId ?? "",
		};
		await getMultilingualVideoData({
			variables: {
				where: variables,
			},
		});
	};

	useFocusEffect(
		useCallback(() => {
			getHtmlContentAssetDetails();
			if (isProgram) fetchMultilingualData();
		}, [
			assetCode,
			courseId,
			moduleId,
			sessionId,
			segmentId,
			learningPathType,
			learningPathId,
		]),
	);

	const learningPath =
		programVideoData?.getAssetFromUserProgram ||
		courseVideoData?.getAssetFromUserCourse;

	const asset = learningPath?.asset;

	const brightCoveId = asset?.video?.brightcoveId;
	const vimeoId = asset?.video?.vimeo;

	useEffect(() => {
		fetchKeyMovementTranscriptsDetails();
	}, [brightCoveId]);
	const fetchKeyMovementTranscriptsDetails = async () => {
		await getKeyMovementTranscriptDetails({
			variables: {
				where: {
					brightcove: brightCoveId || "",
				},
			},
		});
	};
	return {
		loader,
		brightCoveId,
		seekTime,
		completed,
		isProgram,
		isOptional,
		postText,
		preText,
		vimeoId,
		beforeVideoFiles,
		afterVideoFiles,
		afterPostTextFiles,
		multilingualVideoData,
		transcriptsData,
	};
};

export default useVideoAssetController;
