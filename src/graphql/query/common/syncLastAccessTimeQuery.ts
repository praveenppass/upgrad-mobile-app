import { gql } from "@apollo/client";

const syncLastAccessTimeQuery = gql`
	query me {
		me {
			firstName
			lastName
			email
			timezone
			image
			totalCourses
			lastLogin {
				createdAt
			}
		}
	}
`;

export default syncLastAccessTimeQuery;

export interface ISyncLastAccessTimeQuery {
	me: {
		firstName: string | null;
		lastName: string | null;
		email: string | null;
		timezone: string | null;
		image: string | null;
		totalCourses: number | null;
		lastLogin: {
			createdAt: string | null;
		} | null;
	};
}
