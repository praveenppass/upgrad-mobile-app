import { gql } from "@apollo/client";

const UpdatePdfCourseStatusQuery = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
		}
	}
`;

export interface IUpdatePdfCourseStatusQueryVariables {
	data: {
		status: string;
	};
	where: {
		userCourse: string;
		asset: string;
	};
}

export interface IUpdatePdfCourseStatusQuery {
	updateAssetForUserCourse: {
		status: string;
	};
}

export default UpdatePdfCourseStatusQuery;
