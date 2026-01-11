import { gql } from "@apollo/client";

const searchDropdownQuery = gql`
	query getOnboardingOptions($where: onboardingOptionOptionsWhere!) {
		getOnboardingOptions(where: $where) {
			code
			name
		}
	}
`;

export default searchDropdownQuery;

export interface ISearchQueryList {
	getOnboardingOptions: [
		{
			code: string;
			name: string;
		},
	];
}
