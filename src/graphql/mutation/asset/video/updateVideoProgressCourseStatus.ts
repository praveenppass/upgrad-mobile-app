import { gql } from "@apollo/client";

const updateVideoProgressCourseStatusQuery = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
		}
	}
`;

export interface IUpdateVideoProgressStatusQueryVariables {
	data: {
		status: string;
	};
	where: {
		userCourse: string;
		asset: string;
	};
}

export default updateVideoProgressCourseStatusQuery;
