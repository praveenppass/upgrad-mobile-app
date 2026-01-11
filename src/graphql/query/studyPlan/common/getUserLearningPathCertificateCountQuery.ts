import { gql } from "@apollo/client";

const getUserLearningPathCertificateCountQuery = gql`
	query userCourseCertificates(
		$where: UserCourseCertificateWhereInput
		$limit: Int
		$skip: Int
	) {
		userCourseCertificates(where: $where, limit: $limit, skip: $skip) {
			totalCount
		}
	}
`;

export default getUserLearningPathCertificateCountQuery;

export interface IUserLearningPathCertificateCountQuery {
	userCourseCertificates: {
		totalCount: number;
	};
}

interface IUserLearningPathCertificateCountWhereUserCourse {
	userCourse: string;
	user: string;
	userProgram?: never;
}

interface IUserLearningPathCertificateCountWhereUserProgram {
	userProgram: string;
	user: string;
	userCourse?: never;
}

export type IUserLearningPathCertificateCountQueryVariables = {
	where:
		| IUserLearningPathCertificateCountWhereUserCourse
		| IUserLearningPathCertificateCountWhereUserProgram;
	limit?: number;
	skip?: number;
};
