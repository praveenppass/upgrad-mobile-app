import { gql } from "@apollo/client";

const getUserDetails = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			id
			skills {
				skill {
					id
					name
				}
				experience {
					year
					month
				}
			}
		}
	}
`;

export { getUserDetails };
