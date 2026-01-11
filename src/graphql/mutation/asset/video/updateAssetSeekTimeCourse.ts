import { gql } from "@apollo/client";

const updateAssetSeekTimeForUserCourse = gql`
	mutation updateAssetForUserCourse(
		$data: updateUserCourseAssetInput!
		$where: UserCourseAssetWhereUniqueInput!
	) {
		updateAssetForUserCourse(data: $data, where: $where) {
			status
			timeSpent
		}
	}
`;

export interface IUpdateAssetSeekTimeVariablesForUserCourse {
	data: {
		seekTime: number;
	};
	where: {
		asset: string;
		userCourse: string;
		superAssetCode?: string | undefined;
	};
}

export interface IIUpdateAssetSeekTimeQueryForUserCourse {
	status: string;
	timeSpent: number;
}
export default updateAssetSeekTimeForUserCourse;
