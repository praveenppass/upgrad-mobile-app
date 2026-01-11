import { useAssetTranslation } from "@contexts/AssetTranslationContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

import useHtmlContentAssetModel from "@components/asset/htmlContent/useHtmlContentModel";

import { IUpdateHtmlContentCourseStatusQueryVariables } from "@graphql/mutation/asset/htmlContent/updateHtmlContentCourseStatus";
import { IUpdateHtmlContentProgramStatusQueryVariables } from "@graphql/mutation/asset/htmlContent/updateHtmlContentProgramStatus";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";

interface IHtmlContentAssetControllerProps {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathId: string | null;
	learningPathType: LearningPathType;
}

const useHtmlContentAssetController = ({
	assetCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	learningPathId,
	learningPathType,
}: IHtmlContentAssetControllerProps) => {
	const isProgram = learningPathType === LearningPathType.PROGRAM;

	// Get translation language ID from context
	const { getTranslationLanguageId } = useAssetTranslation();

	const {
		courseHtmlContentData,
		getCourseHtmlContent,
		loadingCourseHtmlContentData,
		getProgramHtmlContent,
		programHtmlContentData,
		loadingProgramHtmlContentData,
		updateHtmlContentCourseStatus,
		updateHtmlContentProgramStatus,
	} = useHtmlContentAssetModel();

	const getHtmlContentAssetDetails = async () => {
		const whereVariables = {
			asset: assetCode ?? null,
			level1: courseId ?? null,
			level2: moduleId ?? null,
			level3: sessionId ?? null,
			level4: segmentId ?? null,
			// Add translation language if supported for this asset type
			translationLanguage: getTranslationLanguageId(),
		};
		if (isProgram)
			await getProgramHtmlContent({
				variables: {
					where: {
						...whereVariables,
						userProgram: learningPathId,
					},
				},
			});
		else
			await getCourseHtmlContent({
				variables: {
					where: {
						...whereVariables,
						userCourse: learningPathId,
					},
				},
			});
	};

	useFocusEffect(
		useCallback(() => {
			getHtmlContentAssetDetails();
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
		programHtmlContentData?.getAssetFromUserProgram ||
		courseHtmlContentData?.getAssetFromUserCourse;

	const asset = learningPath?.asset;
	const sourceCodeFilePath = asset?.sourceCodeFilePath ?? "";
	const sourceCodeDisplayText = asset?.sourceCodeDisplayText ?? "";

	const dynamicLinkItems = (asset?.dynamicLinks || []).map((link) => ({
		title: link.text,
		url: link.url,
	}));

	const sourceCodeLink =
		asset?.sourceCodeDisplayText && asset?.sourceCodeFilePath
			? {
					title: asset.sourceCodeDisplayText,
					url: asset.sourceCodeFilePath,
				}
			: null;

	const relatedLinks = [
		...dynamicLinkItems,
		...(sourceCodeLink ? [sourceCodeLink] : []),
	];

	const isCompleted = learningPath?.status === IAssetStatusEnum.completed;

	const htmlContent = asset?.onlineEditor.description;

	const loading =
		loadingProgramHtmlContentData || loadingCourseHtmlContentData;

	useEffect(() => {
		if (!htmlContent || isCompleted || !learningPathId) return;

		const variables = {
			where: {
				asset: assetCode,
				...(isProgram
					? { userProgram: learningPathId }
					: { userCourse: learningPathId }),
				...(courseId && { level1: courseId }),
				...(moduleId && { level2: moduleId }),
				...(sessionId && { level3: sessionId }),
				...(segmentId && { level4: segmentId }),
			},
			data: {
				status: IAssetStatusEnum.completed,
			},
		};

		if (isProgram)
			updateHtmlContentProgramStatus({
				variables:
					variables as IUpdateHtmlContentProgramStatusQueryVariables,
			});
		else
			updateHtmlContentCourseStatus({
				variables:
					variables as IUpdateHtmlContentCourseStatusQueryVariables,
			});
	}, [htmlContent, isCompleted, isProgram]);

	return {
		htmlContent,
		relatedLinks,
		loading,
		sourceCodeFilePath,
		sourceCodeDisplayText,
	};
};

export default useHtmlContentAssetController;
