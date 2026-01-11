import { useMutation } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
	updateAssetUserCourse,
	updateAssetUserProgram,
} from "@graphql/mutation/updateAssetCompletion";

import { assessmentHttpClient } from "@utils/httpClientList";

import { client, refetchQueries } from "@config/apollo";

import {
	IUpdateAssetForUserProgramData,
	IUpdateAssetVariables,
} from "@interface/asset.interface";
import {
	RootHomeStackList,
	RootHomeStackRouteProps,
} from "@interface/types/rootHomeStack.type";

const PostsubmissionModel = ({
	assetCode,
	learningPathId,
	isProgram,
	timeTaken,
	courseId,
	moduleId,
	sessionId,
	segmentId,
}) => {
	const navigation = useNavigation<RootHomeStackList>();
	const route = useRoute<RootHomeStackRouteProps<"Container6Screen">>();
	const retakeAssessments = async (attemptId: string) => {
		try {
			const response = await assessmentHttpClient.post(
				`/api/assessment-attempt/${attemptId}/retake`,
			);
		} catch (err) {
			console.log(err);
		} finally {
			// navigation.setParams({
			//  ispostSubmission: false,
			// });
			navigation.pop(1); // remove current AssetScreen
			navigation.replace("Container6Screen", {
				...route?.params,
				ispostSubmission: false,
			});
		}
	};

	const variables: IUpdateAssetVariables = {
		data: { timeSpent: timeTaken, status: "completed" },
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
	};

	const [onUpdateAsset, { data: graphQLData }] =
		useMutation<IUpdateAssetForUserProgramData>(updateAssetUserProgram, {
			variables,
			client,
			refetchQueries,
		});

	const [onUpdateAssetCourse, { data: courseGraphQLData }] =
		useMutation<IUpdateAssetForUserProgramData>(updateAssetUserCourse, {
			variables,
			client,
			refetchQueries,
		});

	return {
		retakeAssessments,
		onUpdateAsset,
		onUpdateAssetCourse,
	};
};
export default PostsubmissionModel;
