import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import updateUserMilestoneCertificateQuery, {
	IUpdateUserMilestoneCertificateMutation,
	IUpdateUserMilestoneCertificateVariables,
} from "@graphql/mutation/studyPlan/updateUserMilestoneCertificate";
import getCourseListDataQuery, {
	IGetCombinedCourseData,
	IGetCourseListDataVariables,
} from "@graphql/query/studyPlan/container2/getCourseListDataQuery";
import getProgramListDataQuery, {
	IGetCombinedProgramData,
	IGetProgramListDataVariables,
} from "@graphql/query/studyPlan/container2/getProgramListDataQuery";

import { client } from "@config/apollo";

interface ILoadProgramListData {
	learningPathId: string;
	learningPathCode: string;
	workshopId: string;
	userId: string;
}

interface ILoadCourseListData {
	learningPathId: string;
	learningPathCode: string;
	workshopId: string;
	userId: string;
}

const useContainer2ComponentModel = () => {
	const [
		loadProgramListData,
		{
			data: programListData,
			loading: programListDataLoading,
			refetch: refetchProgramListData,
		},
	] = useLazyQuery<IGetCombinedProgramData, IGetProgramListDataVariables>(
		getProgramListDataQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const getProgramListData = ({
		learningPathId,
		learningPathCode,
		workshopId,
		userId,
	}: ILoadProgramListData) => {
		const variables = {
			where: { id: learningPathId },
			userProgramWhere: { id: learningPathId },
			blockerSurveyWhere: {
				userId,
				workshop: workshopId,
				program: learningPathCode,
			},
			userProfileConfigurationWhere: {
				workshop: workshopId,
				program: learningPathCode,
			},
			userWhere: { id: userId },
			userCourseProfileResponsesWhere: {
				workshop: workshopId,
				userProgram: learningPathId,
			},
		};

		return loadProgramListData({ variables });
	};

	const [
		loadCourseListData,
		{
			data: courseListData,
			loading: courseListDataLoading,
			refetch: refetchCourseListData,
		},
	] = useLazyQuery<IGetCombinedCourseData, IGetCourseListDataVariables>(
		getCourseListDataQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const getCourseListData = ({
		learningPathId,
		learningPathCode,
		workshopId,
		userId,
	}: ILoadCourseListData) => {
		const variables = {
			where: { id: learningPathId },
			userCourseWhere: { id: learningPathId },
			blockerSurveyWhere: {
				userId,
				workshop: workshopId,
				course: learningPathCode,
			},
			userProfileConfigurationWhere: {
				workshop: workshopId,
				course: learningPathCode,
			},
			userWhere: { id: userId },
			userCourseProfileResponsesWhere: {
				workshop: workshopId,
				userCourse: learningPathId,
			},
		};

		return loadCourseListData({ variables });
	};

	const [updateUserMilestoneCertificate] = useMutation<
		IUpdateUserMilestoneCertificateMutation,
		IUpdateUserMilestoneCertificateVariables
	>(updateUserMilestoneCertificateQuery, {
		client,
	});

	return {
		getProgramListData,
		programListData,
		programListDataLoading,
		refetchCourseListData,
		getCourseListData,
		courseListData,
		courseListDataLoading,
		refetchProgramListData,
		updateUserMilestoneCertificate,
	};
};

export default useContainer2ComponentModel;
