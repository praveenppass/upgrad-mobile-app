import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { useAssetWebViewModel } from "@components/asset/webView/useWebViewAssetModel";
import { IWebViewAssetProps } from "@components/asset/webView/WebViewAsset";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

export const useAssetWebViewController = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	assetType,
}: IWebViewAssetProps) => {
	const isProgramType = learningPathType === LearningPathType.PROGRAM;

	const {
		assetWebViewCourseData,
		assetWebViewProgramData,
		getCourseWebViewAsset,
		getProgramWebViewAsset,
		updateWebViewCourseStatus,
		updateWebViewProgramStatus,
	} = useAssetWebViewModel();

	const learningAssetData = isProgramType
		? assetWebViewProgramData?.getAssetFromUserProgram
		: assetWebViewCourseData?.getAssetFromUserCourse;

	const sourceCodeFilePath = learningAssetData?.asset?.sourceCodeFilePath;
	const sourceCodeDisplayText =
		learningAssetData?.asset?.sourceCodeDisplayText;

	const uri =
		assetType === IAssetType.HTML_ZIP
			? learningAssetData?.asset.htmlZip.filePath
			: learningAssetData?.asset?.scorm.filePath;

	useFocusEffect(
		useCallback(() => {
			getWebViewAssetDetails();
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

	const getWebViewAssetDetails = async () => {
		const whereVariables = {
			asset: assetCode ?? null,
			level1: courseId ?? null,
			level2: moduleId ?? null,
		};
		if (isProgramType) {
			await getProgramWebViewAsset({
				variables: {
					where: {
						...whereVariables,
						level3: sessionId ?? null,
						level4: segmentId ?? null,
						userProgram: learningPathId,
					},
				},
			});
		} else {
			await getCourseWebViewAsset({
				variables: {
					where: {
						...whereVariables,
						userCourse: learningPathId,
					},
				},
			});
		}
	};

	const handleWebviewLoad = () => {
		if (learningAssetData?.status !== "completed") {
			updateAssetStatus();
		}
	};

	const updateAssetStatus = () => {
		if (isProgramType) {
			const variables = {
				data: { status: IAssetStatusEnum.completed },
				where: {
					asset: assetCode,
					userProgram: learningPathId,
					...(courseId && { level1: courseId }),
					...(moduleId && { level2: moduleId }),
					...(sessionId && { level3: sessionId }),
					...(segmentId && { level4: segmentId }),
				},
			};

			updateWebViewProgramStatus({
				variables,
			});
		} else {
			const variables = {
				data: { status: IAssetStatusEnum.completed },
				where: {
					asset: assetCode,
					userCourse: learningPathId,
				},
			};

			updateWebViewCourseStatus({
				variables,
			});
		}
	};

	return {
		uri,
		handleWebviewLoad,
		sourceCodeFilePath,
		sourceCodeDisplayText,
	};
};
