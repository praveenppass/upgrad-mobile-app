import { gql } from "@apollo/client";

const getDegreeListQuery = gql`
	query getOnboardingOptions($where: onboardingOptionOptionsWhere!) {
		getOnboardingOptions(where: $where) {
			code
			name
		}
	}
`;

export interface IGetDegreeListQuery {
	getOnboardingOptions: {
		name: string;
		code: string;
	}[];
}

export interface IGetDegreeListQueryVariables {
	where: {
		field: "DEGREES";
	};
}

export default getDegreeListQuery;
