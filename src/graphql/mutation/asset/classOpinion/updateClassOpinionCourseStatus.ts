import { gql } from "@apollo/client";

const updateClassOpinionCourseStatusQuery = gql`
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

export interface IUpdateClassOpinionCourseStatusQueryVariables {
	data: {
		status: string;
	};
	where: {
		userCourse: string;
		asset: string;
	};
}

export default updateClassOpinionCourseStatusQuery;
