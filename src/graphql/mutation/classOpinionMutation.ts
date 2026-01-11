import { gql } from "@apollo/client";

/**
 * @deprecated
 * Not in use - classOpinionMutation.ts is deprecated.
 */

const classOpinionMutation = gql`
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

const classOpinionMutationProgram = gql`
	mutation updateAssetForUserProgram(
		$data: UpdateUserProgramAssetDataInput!
		$where: UserProgramAssetWhereInput!
	) {
		updateAssetForUserProgram(data: $data, where: $where) {
			status
			timeSpent
			children {
				status
				asset {
					code
					assetType {
						type
					}
				}
			}
		}
	}
`;

export { classOpinionMutation, classOpinionMutationProgram };
