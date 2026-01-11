//TODO @A - NAMING
import { useLazyQuery } from "@apollo/client";
import { useCallback } from "react";

import getCourseAssetBasicDetailsQuery, {
	IGetCourseAssetBasicDetailsQuery,
	IGetCourseAssetBasicDetailsQueryVariables,
} from "@graphql/query/asset/basicDetails/getCourseAssetBasicDetails";
import getProgramAssetBasicDetailsQuery, {
	IGetProgramAssetBasicDetailsQuery,
	IGetProgramAssetBasicDetailsQueryVariables,
} from "@graphql/query/asset/basicDetails/getProgramAssetBasicDetails";

import { client } from "@config/apollo";

interface IGetAssetBasicDetails {
	learningPathId: string;
	learningPathCode: string;
	workshopId: string;
	userId: string;
	assetCode: string;
	sessionId?: string | null;
	segmentId?: string | null;
	courseId: string | null;
	moduleId: string | null;
}

const useContainer6Model = () => {
	const [
		loadCourseAssetBasicDetails,
		{ loading: courseAssetLoading, refetch: courseAssetRefetch },
	] = useLazyQuery<
		IGetCourseAssetBasicDetailsQuery,
		IGetCourseAssetBasicDetailsQueryVariables
	>(getCourseAssetBasicDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const getCourseAssetBasicDetails = useCallback(
		({
			learningPathId,
			learningPathCode,
			workshopId,
			userId,
			assetCode,
			courseId,
			moduleId,
		}: IGetAssetBasicDetails) => {
			const variables = {
				where: {
					asset: assetCode,
					userCourse: learningPathId,
					...(courseId && { level1: courseId }),
					...(moduleId && { level2: moduleId }),
				},
				level2: moduleId,
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
				userCourseWhere: { id: learningPathId },
			};

			return loadCourseAssetBasicDetails({ variables });
		},
		[loadCourseAssetBasicDetails],
	);

	const [
		loadProgramAssetBasicDetails,
		{ loading: programAssetLoading, refetch: programAssetRefetch },
	] = useLazyQuery<
		IGetProgramAssetBasicDetailsQuery,
		IGetProgramAssetBasicDetailsQueryVariables
	>(getProgramAssetBasicDetailsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const getProgramAssetBasicDetails = useCallback(
		({
			learningPathId,
			learningPathCode,
			workshopId,
			userId,
			assetCode,
			courseId,
			moduleId,
			segmentId,
			sessionId,
		}: IGetAssetBasicDetails) => {
			const variables = {
				where: {
					asset: assetCode,
					userProgram: learningPathId,
					...(courseId && { level1: courseId }),
					...(moduleId && { level2: moduleId }),
					...(sessionId && { level3: sessionId }),
					...(segmentId && { level4: segmentId }),
				},
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
				pendingFeedbackWhere: {
					feedbackFrom: "learner",
					level1: courseId || "",
					level2: moduleId || "",
					type: "module-completion",
					userProgram: learningPathId,
				},
				userProgramWhere: { id: learningPathId },
			};
			return loadProgramAssetBasicDetails({ variables });
		},
		[loadProgramAssetBasicDetails],
	);

	return {
		getCourseAssetBasicDetails,
		courseAssetLoading,
		courseAssetRefetch,
		getProgramAssetBasicDetails,
		programAssetLoading,
		programAssetRefetch,
	};
};

export default useContainer6Model;
