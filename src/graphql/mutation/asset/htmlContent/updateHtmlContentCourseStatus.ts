import { gql } from "@apollo/client";

const UpdateHtmlContentCourseStatusQuery = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
		}
	}
`;

export interface IUpdateHtmlContentCourseStatusQueryVariables {
	data: {
		status: string;
	};
	where: {
		userCourse: string;
		asset: string;
	};
}

export default UpdateHtmlContentCourseStatusQuery;
