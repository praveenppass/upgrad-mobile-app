import { gql } from "@apollo/client";

const getProfileCompletionPercentageQuery = gql`
	{
		userProfileCompletionStatus {
			completionPercentage
		}
	}
`;

export default getProfileCompletionPercentageQuery;

export interface IProfileCompletionPercentage {
	userProfileCompletionStatus: {
		completionPercentage: number;
	};
}
