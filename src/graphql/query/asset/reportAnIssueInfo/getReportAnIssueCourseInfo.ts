import { gql } from "@apollo/client";

const getReportAnIssueCourseInfoQuery = gql`
	query userCourseContainers($where: UserCourseContainerWhereInput!) {
		userCourseContainers(where: $where) {
			name
			code
		}
	}
`;

export default getReportAnIssueCourseInfoQuery;

export interface IReportAnIssueCourseInfo {
	userCourseContainers: {
		name: string;
		code: string;
	}[];
}

export interface IReportAnIssueCourseInfoVariables {
	where: {
		id: string;
		level1?: string;
		level2?: string;
	};
}
