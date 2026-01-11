import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { IPdfAsset } from "@components/asset/pdf/Pdf";
import { useAssetPdfViewModel } from "@components/asset/pdf/usePdfModel";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum } from "@interface/asset.interface";

export const useAssetPdfViewController = ({
	assetCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	learningPathType,
	learningPathId,
}: IPdfAsset) => {
	const {
		assetCoursePdfData,
		assetProgramPdfData,
		getCoursePdfAsset,
		getProgramPdfAsset,
		updatePdfCourseStatus,
		updatePdfProgramStatus,
	} = useAssetPdfViewModel();

	const isProgram = learningPathType === LearningPathType.PROGRAM;
	const [currentPage, setCurrentPage] = useState<number>(1);

	const learningPath = isProgram
		? assetProgramPdfData?.getAssetFromUserProgram
		: assetCoursePdfData?.getAssetFromUserCourse;

	const assetUri = learningPath?.asset.pdf.filePath ?? "";
	const completed = learningPath?.status;
	const sourceCodeFilePath = learningPath?.asset.sourceCodeFilePath ?? "";
	const sourceCodeDisplayText =
		learningPath?.asset.sourceCodeDisplayText ?? "";

	useFocusEffect(
		useCallback(() => {
			getPdfAssetDetails();
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

	const getPdfAssetDetails = async () => {
		const whereVariables = {
			asset: assetCode ?? null,
			level1: courseId ?? null,
			level2: moduleId ?? null,
		};
		if (isProgram) {
			await getProgramPdfAsset({
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
			await getCoursePdfAsset({
				variables: {
					where: {
						...whereVariables,
						userCourse: learningPathId,
					},
				},
			});
		}
	};

	const updatePdfAsset = () => {
		const baseWhere = {
			asset: assetCode,
			...(courseId && { level1: courseId }),
			...(moduleId && { level2: moduleId }),
			...(sessionId && { level3: sessionId }),
			...(segmentId && { level4: segmentId }),
		};
		if (isProgram) {
			const variables = {
				where: {
					...baseWhere,
					userProgram: learningPathId,
				},
				data: { status: IAssetStatusEnum.completed },
			};

			updatePdfProgramStatus({
				variables,
			});
		} else {
			const variables = {
				where: {
					...baseWhere,
					userCourse: learningPathId,
				},
				data: { status: IAssetStatusEnum.completed },
			};

			updatePdfCourseStatus({
				variables,
			});
		}
	};

	const handlePage = (page: number) => {
		setCurrentPage(page);
	};

	const handlePageChange = (page: number, numberOfPages: number) => {
		const isLastPage = page === numberOfPages || page === numberOfPages - 1;
		const isSinglePage = numberOfPages === 1;

		if ((isSinglePage || isLastPage) && completed !== "completed") {
			updatePdfAsset();
		}
	};
	return {
		assetUri,
		currentPage,
		updatePdfAsset,
		handlePage,
		handlePageChange,
		sourceCodeFilePath,
		sourceCodeDisplayText,
	};
};
