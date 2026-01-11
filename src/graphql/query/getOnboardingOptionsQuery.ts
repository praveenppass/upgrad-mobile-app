import { gql } from "@apollo/client";

const getOnboardingOptionsQuery = gql`
	query getOnboardingOptions($where: onboardingOptionOptionsWhere!) {
		getOnboardingOptions(where: $where) {
			code
			name
		}
	}
`;

export { getOnboardingOptionsQuery };
