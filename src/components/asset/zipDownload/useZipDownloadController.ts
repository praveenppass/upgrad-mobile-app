import { useAssetTranslation } from "@contexts/AssetTranslationContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import useZipDownloadAssetModel from "@components/asset/zipDownload/useZipDownloadModel";
import { ToastType, useToast } from "@components/Reusable/Toast";

import downloadDocument from "@services/downloadDocument";

import { IFileTypeEnum, LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";

import { strings } from "@assets/strings";

interface IZipDownloadAssetControllerProps {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathId: string | null;
	learningPathType: LearningPathType;
}

const useZipDownloadAssetController = ({
	assetCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	learningPathId,
	learningPathType,
}: IZipDownloadAssetControllerProps) => {
	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const [buttonDisabled, setButtonDisabled] = useState(false);

	// Get translation language ID from context
	const { getTranslationLanguageId } = useAssetTranslation();

	const {
		courseZipDownloadData,
		getCourseZipDownload,
		getProgramZipDownload,
		loadingCourseZipDownloadData,
		loadingProgramZipDownloadData,
		programZipDownloadData,
		updateZipDownloadCourseStatus,
		updateZipDownloadProgramStatus,
	} = useZipDownloadAssetModel();

	const { showToast } = useToast();

	const getZipDownloadAssetDetails = async () => {
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
			await getProgramZipDownload({
				variables: {
					where: {
						...whereVariables,
						userProgram: learningPathId,
					},
				},
			});
		else
			await getCourseZipDownload({
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
			getZipDownloadAssetDetails();
		}, [
			assetCode,
			courseId,
			moduleId,
			sessionId,
			segmentId,
			learningPathType,
			learningPathId,
			getTranslationLanguageId,
		]),
	);

	const learningPath =
		programZipDownloadData?.getAssetFromUserProgram ||
		courseZipDownloadData?.getAssetFromUserCourse;

	const asset = learningPath?.asset;
	const preText = learningPath?.asset?.preText;
	const postText = learningPath?.asset?.postText;
	const sourceCodeDisplayText =
		learningPath?.asset?.sourceCodeDisplayText || null;
	const sourceCodeFilePath = learningPath?.asset?.sourceCodeFilePath || null;
	const isCompleted = learningPath?.status === IAssetStatusEnum.completed;
	const zipFilePath = asset?.codeZip?.filePath;
	const assetName = asset?.name;

	const loading =
		loadingProgramZipDownloadData || loadingCourseZipDownloadData;

	const updateZipDownloadStatus = useCallback(() => {
		if (!zipFilePath || isCompleted || !learningPathId) return;

		const baseVariables = {
			where: {
				asset: assetCode,
				...(courseId && { level1: courseId }),
				...(moduleId && { level2: moduleId }),
				...(sessionId && { level3: sessionId }),
				...(segmentId && { level4: segmentId }),
			},
			data: { status: IAssetStatusEnum.completed },
		};

		if (isProgram)
			updateZipDownloadProgramStatus({
				variables: {
					...baseVariables,
					where: {
						...baseVariables.where,
						userProgram: learningPathId,
					},
				},
			});
		else
			updateZipDownloadCourseStatus({
				variables: {
					...baseVariables,
					where: {
						...baseVariables.where,
						userCourse: learningPathId,
					},
				},
			});
	}, [
		zipFilePath,
		isCompleted,
		learningPathId,
		assetCode,
		isProgram,
		updateZipDownloadProgramStatus,
		updateZipDownloadCourseStatus,
		courseId,
		moduleId,
		sessionId,
		segmentId,
	]);

	const handleDownloadZip = () => {
		if (!zipFilePath || !assetName) return;

		setButtonDisabled(true);

		downloadDocument({
			fileUrl: zipFilePath,
			fileName: assetName,
			fileExtension: IFileTypeEnum.Zip,
			successCallback: () => {
				showToast({
					message: strings.DOWNLOAD_ZIP_SUCCESS,
					type: ToastType.SUCCESS,
				});
				updateZipDownloadStatus();
				setButtonDisabled(false);
			},
			errorCallback: () => {
				showToast({
					message: strings.DOWNLOAD_ZIP_FAIL,
					type: ToastType.ERROR,
				});

				setButtonDisabled(false);
			},
		});
	};

	return {
		loading,
		handleDownloadZip,
		buttonDisabled,
		preText,
		postText,
		sourceCodeDisplayText,
		sourceCodeFilePath,
	};
};

export default useZipDownloadAssetController;
