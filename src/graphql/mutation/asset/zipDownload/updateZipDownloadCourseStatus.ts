import { gql } from "@apollo/client";

const updateZipDownloadCourseStatusQuery = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
		}
	}
`;

export interface IUpdateZipDownloadCourseStatusQueryVariables {
	data: {
		status: string;
	};
	where: {
		userCourse: string;
		asset: string;
	};
}

export default updateZipDownloadCourseStatusQuery;
