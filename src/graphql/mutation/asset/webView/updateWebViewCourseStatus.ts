import { gql } from "@apollo/client";

const UpdateWebViewCourseStatusQuery = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
		}
	}
`;

export interface IUpdateWebViewCourseStatusQueryVariables {
	data: {
		status: string;
	};
	where: {
		asset: string;
		userCourse: string;
	};
}

export interface IUpdateWebViewCourseStatusQuery {
	updateAssetForUserCourse: {
		status: string;
	};
}
export default UpdateWebViewCourseStatusQuery;
