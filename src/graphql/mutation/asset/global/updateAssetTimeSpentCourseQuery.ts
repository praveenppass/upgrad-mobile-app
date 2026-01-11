import { gql } from "@apollo/client";

const updateAssetTimeSpentCourseQuery = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
			timeSpent
		}
	}
`;

export interface IUpdateAssetTimeSpentCourseVariables {
	data: {
		timeSpent: number;
	};
	where: {
		asset: string;
		userCourse: string;
	};
}

export interface IUpdateAssetTimeSpentCourseQuery {
	status: string;
	timeSpent: number;
}

export default updateAssetTimeSpentCourseQuery;
