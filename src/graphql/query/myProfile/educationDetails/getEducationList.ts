import { gql } from "@apollo/client";

const getEducationListQuery = gql`
	query getOnboardingOptions($where: onboardingOptionOptionsWhere!) {
		getOnboardingOptions(where: $where) {
			code
			name
		}
	}
`;

export interface IGetEducationListQuery {
	getOnboardingOptions: {
		name: string;
		code: string;
	}[];
}

export interface IGetEducationListQueryVariables {
	where: {
		field: "RECENT_EDUCATIONS";
	};
}

export default getEducationListQuery;
