import { gql } from "@apollo/client";

const getUserCoursesCountQuery = gql`
	query me {
		me {
			totalCourses
			id
			lastLogin {
				createdAt
			}
		}
	}
`;

export default getUserCoursesCountQuery;

export interface IGetUserCoursesCount {
	me: {
		totalCourses: number | null;
		id: string | null;
		lastLogin: {
			createdAt: string | null;
		} | null;
		dateOfBirth: string | null;
	};
}
