import { gql } from "@apollo/client";

const getUserCourseBlockerQuery = gql`
	query userCourse($where: UserCourseWhereUniqueInput!) {
		userCourse(where: $where) {
			id
			workshop {
				id
				startsAt
				contentStartsAt
			}
			course {
				id
				code
			}
			startedAt
		}
	}
`;

export default getUserCourseBlockerQuery;

export interface IUserCourseBlocker {
	userCourse: {
		id: string;
		startedAt: string;
		workshop: {
			id: string;
			startsAt: string;
			contentStartsAt: string;
		};
		course: {
			id: string;
			code: string;
		};
	};
}
