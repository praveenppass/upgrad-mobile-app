import { gql } from "@apollo/client";

export const updateUserCourse = gql`
	mutation updateUserCourse(
		$where: UserCourseWhereUniqueInput!
		$data: updateUserCourseInput
	) {
		updateUserCourse(where: $where, data: $data) {
			id
		}
	}
`;
