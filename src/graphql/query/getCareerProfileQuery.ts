import { gql } from "@apollo/client";

const getCareerProfileQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			id
			career {
				experience
				currentCtc
				expectedCtc
				workMode
				jobLocations {
					id
					name
					country {
						id
						name
					}
				}
				noticePeriod
			}
			dreamRole {
				code
				name
			}
			dreamCompany {
				code
				name
			}
		}
	}
`;

export { getCareerProfileQuery };
