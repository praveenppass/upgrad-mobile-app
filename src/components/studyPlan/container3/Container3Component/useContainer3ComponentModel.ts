import { useLazyQuery } from "@apollo/client";

import getUserCourseNextAssetQuery, {
	IGetUserCourseNextAssetQuery,
	IGetUserCourseNextAssetQueryVariables,
} from "@graphql/query/studyPlan/common/getUserCourseNextAssetQuery";
import getUserProgramNextAssetQuery, {
	IGetUserProgramNextAssetQuery,
	IGetUserProgramNextAssetQueryVariables,
} from "@graphql/query/studyPlan/common/getUserProgramNextAssetQuery";
import getContainer3CourseQuery, {
	IGetContainer3CourseQueryData,
	IGetContainer3CourseQueryVariables,
} from "@graphql/query/studyPlan/container3/getContainer3CourseQuery";
import getContainer3ProgramCardListQuery, {
	IGetContainer3ProgramCardListQueryData,
	IGetContainer3ProgramCardListQueryVariables,
} from "@graphql/query/studyPlan/container3/getContainer3ProgramCardListQuery";
import getContainer3ProgramQuery, {
	IGetContainer3ProgramQueryData,
	IGetContainer3ProgramQueryVariables,
} from "@graphql/query/studyPlan/container3/getContainer3ProgramQuery";
import getContainer3SessionQuery, {
	IGetContainer3SessionQueryData,
	IGetContainer3SessionQueryVariables,
} from "@graphql/query/studyPlan/container3/getContainer3SessionQuery";

import { client } from "@config/apollo";

const useContainer3ComponentModel = () => {
	const [
		getContainer3CourseQueryData,
		{
			data: container3CourseData,
			loading: container3CourseDataLoading,
			refetch: refetchContainer3CourseQueryData,
		},
	] = useLazyQuery<
		IGetContainer3CourseQueryData,
		IGetContainer3CourseQueryVariables
	>(getContainer3CourseQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getContainer3ProgramQueryData,
		{
			data: container3ProgramData,
			loading: container3ProgramDataLoading,
			refetch: refetchContainer3ProgramQueryData,
		},
	] = useLazyQuery<
		IGetContainer3ProgramQueryData,
		IGetContainer3ProgramQueryVariables
	>(getContainer3ProgramQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getContainer3ProgramCardListData,
		{
			data: container3ProgramCardListData,
			loading: container3ProgramCardListDataLoading,
		},
	] = useLazyQuery<
		IGetContainer3ProgramCardListQueryData,
		IGetContainer3ProgramCardListQueryVariables
	>(getContainer3ProgramCardListQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getContainer3SessionData,
		{ data: container3SessionData, loading: container3SessionDataLoading },
	] = useLazyQuery<
		IGetContainer3SessionQueryData,
		IGetContainer3SessionQueryVariables
	>(getContainer3SessionQuery, {
		client,
		fetchPolicy: "no-cache",
	});

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
		getContainer3CourseQueryData,
		container3CourseData,
		container3CourseDataLoading,
		getContainer3ProgramQueryData,
		container3ProgramData,
		container3ProgramDataLoading,
		getContainer3ProgramCardListData,
		container3ProgramCardListData,
		container3ProgramCardListDataLoading,
		getContainer3SessionData,
		container3SessionData,
		container3SessionDataLoading,
		refetchContainer3CourseQueryData,
		refetchContainer3ProgramQueryData,
		getUserProgramNextAsset,
		userProgramNextAsset,
		userProgramNextAssetLoading,
		getUserCourseNextAsset,
		userCourseNextAsset,
		userCourseNextAssetLoading,
	};
};

export default useContainer3ComponentModel;
