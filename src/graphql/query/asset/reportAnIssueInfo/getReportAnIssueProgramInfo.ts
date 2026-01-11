import { gql } from "@apollo/client";

const getReportAnIssueProgramInfoQuery = gql`
	query userProgramContainers($where: UserProgramContainerWhereInput!) {
		userProgramContainers(where: $where) {
			name
			code
		}
	}
`;

export default getReportAnIssueProgramInfoQuery;

export interface IReportAnIssueProgramInfo {
	userProgramContainers: {
		name: string;
		code: string;
	}[];
}

export interface IReportAnIssueProgramInfoVariables {
	where: {
		id: string;
		level1?: string;
		level2?: string;
		level3?: string;
		level4?: string;
	};
}
