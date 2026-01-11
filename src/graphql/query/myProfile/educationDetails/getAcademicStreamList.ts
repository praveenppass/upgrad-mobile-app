import { gql } from "@apollo/client";

const getAcademicStreamListQuery = gql`
	query getOnboardingOptions($where: onboardingOptionOptionsWhere!) {
		getOnboardingOptions(where: $where) {
			code
			name
		}
	}
`;

export interface IGetAcademicStreamListQuery {
	getOnboardingOptions: {
		name: string;
		code: string;
	}[];
}

export interface IGetAcademicStreamListQueryVariables {
	where: {
		field: "ACADEMIC_STREAM";
	};
}

export default getAcademicStreamListQuery;
