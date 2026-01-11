import { gql } from "@apollo/client";

const updateSubAssetForUserCourse = gql`
	mutation updateSubAssetForUserCourse(
		$where: UserCourseSubAssetWhereUniqueInput!
		$data: UpdateUserCourseSubAssetInput
	) {
		updateSubAssetForUserCourse(where: $where, data: $data)
	}
`;

const updateSubAssetForUserProgram = gql`
	mutation updateSubAssetForUserProgram(
		$where: UserProgramSubAssetWhereUniqueInput!
		$data: UpdateUserProgramSubAssetInput
	) {
		updateSubAssetForUserProgram(where: $where, data: $data)
	}
`;

export { updateSubAssetForUserCourse, updateSubAssetForUserProgram };
