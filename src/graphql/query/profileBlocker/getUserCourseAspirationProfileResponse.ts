import { gql } from "@apollo/client";

const getUserCourseAspirationProfileResponseQuery = gql`
	query userCourseProfileResponses(
		$where: UserCourseProfileResponseWhereInput
	) {
		userCourseProfileResponses(where: $where) {
			isCompleted
			course
			program
			userCourse
			userProgram
			workshop
		}
	}
`;

export default getUserCourseAspirationProfileResponseQuery;

export interface IUserCourseAspirationProfileResponse {
	userCourseProfileResponses: [
		{
			isCompleted: boolean;
			course: string;
			program: string;
			userCourse: string;
			userProgram: string;
			workshop: string;
		},
	];
}
