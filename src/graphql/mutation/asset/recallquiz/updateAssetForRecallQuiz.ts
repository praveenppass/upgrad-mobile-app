import { gql } from "@apollo/client";

const updateAssetUserProgramAfterRecallQuizCompletion = gql`
	mutation updateAssetForUserProgram(
		$data: UpdateUserProgramAssetDataInput!
		$where: UserProgramAssetWhereInput!
	) {
		updateAssetForUserProgram(data: $data, where: $where) {
			status
		}
	}
`;

const updateAssetUserCourseAfterRecallQuizCompletion = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
			assetId
		}
	}
`;

export {
	updateAssetUserCourseAfterRecallQuizCompletion,
	updateAssetUserProgramAfterRecallQuizCompletion,
};

export interface IUpdateAssetForUserCourse {
	data: {
		updateAssetForUserCourse: {
			status: string;
			timeSpent: number;
			assetId: string | null;
			seekTime: number;
		};
	};
}
