import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo } from "react";

import { useResumeAssetStickyModel } from "@components/studyPlan/common/ResumeAssetSticky/useResumeAssetStickyModel";

import { IGetUserCourseNextAssetQuery } from "@graphql/query/studyPlan/common/getUserCourseNextAssetQuery";
import { IGetUserProgramNextAssetQuery } from "@graphql/query/studyPlan/common/getUserProgramNextAssetQuery";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

interface IResumeAssetStickyController {
	learningPathId: string;
	learningPathType: LearningPathType;
	learningPathName: string;
	learningPathCode: string;
	programData?: IGetUserProgramNextAssetQuery;
	courseData?: IGetUserCourseNextAssetQuery;
	loading?: boolean;
}

const useResumeAssetStickyController = ({
	learningPathId,
	learningPathCode,
	learningPathType,
	learningPathName,
	programData,
	courseData,
	loading,
}: IResumeAssetStickyController) => {
	const navigation = useAppNavigation();
	const {
		userCourseNextAsset,
		userProgramNextAsset,
		getUserCourseNextAsset,
		getUserProgramNextAsset,
		userCourseNextAssetLoading,
		userProgramNextAssetLoading,
	} = useResumeAssetStickyModel();

	const isProgram = learningPathType === LearningPathType.PROGRAM;

	const variables = useMemo(
		() => ({
			where: { id: learningPathId },
			userProgramWhere: { id: learningPathId },
			userCourseWhere: { id: learningPathId },
		}),
		[learningPathId],
	);

	const getAsset = isProgram
		? getUserProgramNextAsset
		: getUserCourseNextAsset;

	useFocusEffect(
		useCallback(() => {
			if (programData || courseData) return;
			getAsset({ variables });
		}, [variables]),
	);
	const resumeAssetLoading =
		userCourseNextAssetLoading || userProgramNextAssetLoading || loading;

	const assetDetails = isProgram
		? programData?.userProgramNextAsset ||
			userProgramNextAsset?.userProgramNextAsset
		: courseData?.userCourseNextAsset ||
			userCourseNextAsset?.userCourseNextAsset;

	const aliasName = isProgram
		? programData?.userProgramNextAsset?.aliasName ||
			userProgramNextAsset?.userProgramNextAsset?.aliasName
		: null;
	const programActivity =
		programData?.userProgramNextAsset?.activity ||
		userProgramNextAsset?.userProgramNextAsset?.activity;

	const { asset, activity } = assetDetails || {};

	const { level1, level2, level3, level4 } = activity || {};

	const { elective, electiveGroup, track, trackGroup } =
		programActivity || {};

	const programDetails = isProgram
		? programData?.userProgram || userProgramNextAsset?.userProgram
		: courseData?.userCourse || userCourseNextAsset?.userCourse;

	const subtitle = aliasName || asset?.name || "";
	const assetCode = asset?.code || "";
	const workshopId = programDetails?.workshop?.id;
	const workshopCode = programDetails?.workshop?.code;
	const userProgramId = programData?.userProgram?.program?.id ?? "";

	const isStarted = !!programDetails?.progress;

	const assetType = asset?.assetType?.type as IAssetType;

	const onPress = () => {
		navigation.navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.Container6Screen,
			params: {
				learningPathName,
				assetCode,
				learningPathType,
				learningPathId,
				learningPathCode,
				courseId: level1 ?? null,
				moduleId: level2 ?? null,
				sessionId: level3 ?? null,
				segmentId: level4 ?? null,
				elective: elective ?? "",
				electiveGroup: electiveGroup ?? "",
				track: track ?? "",
				trackGroup: trackGroup ?? "",
				workshopId: workshopId ?? "",
				workshopCode: workshopCode ?? "",
				userProgramId,
				assetType,
			},
		});
	};
	return {
		subtitle,
		onPress,
		assetCode,
		resumeAssetLoading,
		isStarted,
	};
};

export default useResumeAssetStickyController;
