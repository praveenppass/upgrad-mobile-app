import { useLazyQuery } from "@apollo/client";

import { userProgramNextAsset } from "@graphql/query/drawerQuery/getUserProgramNextAsset";
import getUserCourseNextAssetQuery from "@graphql/query/studyPlan/common/getUserCourseNextAssetQuery";
import getSpecializationProgramQuery from "@graphql/query/studyPlan/container1/getSpecializationProgram";
import getStudyCourseModulesListQuery from "@graphql/query/studyplanTemp/getStudyCourseModulesListQuery";
import getStudyModulesListQuery, {
	IStudyModulesListType,
} from "@graphql/query/studyplanTemp/getStudyModulesListQuery";
import { IGetStudyCourseListType } from "@graphql/query/studyplanTemp/getStudyProgramListQuery";
import getStudyProgramListQuery from "@graphql/query/studyplanTemp/getStudyProgramListQuery";
import getStudyCourseContainerQuery, {
	IStudyCourseContainer,
} from "@graphql/query/studyplanTemp/getStudyUserCourseContainer";

import { sathiHttpClient } from "@utils/httpClientList";

import { client } from "@config/apollo";

export const useStudyPlanModel = () => {
	// resume Next Asset Api
	const [
		getNextAssetDetailsQuery,
		{ data: resumeAsset, loading: resumeAssetLoading },
	] = useLazyQuery(userProgramNextAsset, {
		client,
		fetchPolicy: "network-only",
	});

	// Module Card Api
	const [
		getModuleDetailsQuery,
		{
			data: modulesDetails,
			loading: moduleListLoading,
			refetch: getModuleRefresh,
		},
	] = useLazyQuery<IStudyModulesListType>(getStudyModulesListQuery, {
		client,
		fetchPolicy: "network-only",
	});
	// -------------------

	const [
		getProgramCourseDetails,
		{
			data: courseDetails,
			loading: courseDetailsLoading,
			refetch: getCourseDetailsRefresh,
		},
	] = useLazyQuery<IGetStudyCourseListType>(getStudyProgramListQuery, {
		client,
		fetchPolicy: "network-only",
	});

	//Course API -----------------------------------
	const [
		getCourseContainerDetails,
		{
			data: courseContainers,
			loading: courseContainerLoading,
			refetch: getCourseContainerRefresh,
		},
	] = useLazyQuery<IStudyCourseContainer>(getStudyCourseContainerQuery, {
		client,
		fetchPolicy: "network-only",
	});

	const [
		getCourseModulesDetailsQuery,
		{ data: courseModulesList, loading: courseModulesListLoading },
	] = useLazyQuery(getStudyCourseModulesListQuery, {
		client,
		fetchPolicy: "network-only",
	});

	const [
		getCourseNextAssetQuery,
		{ data: resumeCourseAsset, loading: resumeCourseAssetLoading },
	] = useLazyQuery(getUserCourseNextAssetQuery, {
		client,
		fetchPolicy: "network-only",
	});

	const fetchDoubtResolutionBotData = async (
		userId?: string,
		userProgramCode?: string,
	) => {
		const response = await sathiHttpClient.post(`/configuration/invoke`, {
			input: {
				user_id: userId,
				program_code: userProgramCode,
			},
		});
		const { data } = response;
		return data;
	};

	const [getSpecializationProgram, { data: specializationList }] =
		useLazyQuery(getSpecializationProgramQuery, {
			client,
			fetchPolicy: "network-only",
		});

	return {
		courseDetails,
		courseDetailsLoading,
		modulesDetails,
		moduleListLoading,
		resumeAssetLoading,
		resumeAsset,
		courseContainerLoading,
		courseModulesListLoading,
		courseContainers,
		courseModulesList,
		resumeCourseAsset,
		resumeCourseAssetLoading,
		specializationList,
		getModuleRefresh,
		getNextAssetDetailsQuery,
		getModuleDetailsQuery,
		getProgramCourseDetails,
		getCourseDetailsRefresh,
		fetchDoubtResolutionBotData,
		getCourseContainerDetails,
		getCourseModulesDetailsQuery,
		getCourseNextAssetQuery,
		getCourseContainerRefresh,
		getSpecializationProgram,
	};
};
