import { useLazyQuery } from "@apollo/client";

import getUserCourseNextAssetQuery, {
	IGetUserCourseNextAssetQuery,
	IGetUserCourseNextAssetQueryVariables,
} from "@graphql/query/studyPlan/common/getUserCourseNextAssetQuery";
import getUserProgramNextAssetQuery, {
	IGetUserProgramNextAssetQuery,
	IGetUserProgramNextAssetQueryVariables,
} from "@graphql/query/studyPlan/common/getUserProgramNextAssetQuery";

import { client } from "@config/apollo";

export const useResumeAssetStickyModel = () => {
	const [
		getUserProgramNextAsset,
		{ data: userProgramNextAsset, loading: userProgramNextAssetLoading },
	] = useLazyQuery<
		IGetUserProgramNextAssetQuery,
		IGetUserProgramNextAssetQueryVariables
	>(getUserProgramNextAssetQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getUserCourseNextAsset,
		{ data: userCourseNextAsset, loading: userCourseNextAssetLoading },
	] = useLazyQuery<
		IGetUserCourseNextAssetQuery,
		IGetUserCourseNextAssetQueryVariables
	>(getUserCourseNextAssetQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		getUserProgramNextAsset,
		userProgramNextAsset,
		getUserCourseNextAsset,
		userCourseNextAsset,
		userProgramNextAssetLoading,
		userCourseNextAssetLoading,
	};
};
