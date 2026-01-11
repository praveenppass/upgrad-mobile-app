import { gql } from "@apollo/client";

const getProfileStatusCompletionQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			profileSectionCompletion {
				personalDetails
				education
				workExperience
				aspiration
				contactDetails
			}
		}
	}
`;

export default getProfileStatusCompletionQuery;

export interface IProfileCompletionStatus {
	user: {
		profileSectionCompletion: {
			personalDetails: boolean;
			education: boolean;
			workExperience: boolean;
			aspiration: boolean;
			contactDetails: boolean;
		};
	};
}
