import { gql } from "@apollo/client";

const updateAssetUserProgram = gql`
	mutation updateAssetForUserProgram(
		$data: UpdateUserProgramAssetDataInput!
		$where: UserProgramAssetWhereInput!
	) {
		updateAssetForUserProgram(data: $data, where: $where) {
			status
			timeSpent
		}
	}
`;

const updateAssetUserCourse = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
			timeSpent
			assetId
			seekTime
		}
	}
`;

export { updateAssetUserProgram, updateAssetUserCourse };
