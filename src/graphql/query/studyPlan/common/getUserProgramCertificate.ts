import { gql } from "@apollo/client";

const getUserProgramCertificateQuery = gql`
	query userCourseCertificates(
		$where: UserCourseCertificateWhereInput
		$limit: Int
		$skip: Int
	) {
		userCourseCertificates(where: $where, limit: $limit, skip: $skip) {
			totalCount
			result {
				id
				userProgram {
					program {
						name
					}
					courseInfo {
						name
					}
				}
				courseCertificateTemplate {
					displayName
					linkedInShareText
					xShareText
				}
				imageUrl
			}
		}
	}
`;

export default getUserProgramCertificateQuery;

export interface IUserProgramCertificate {
	id: string;
	userProgram: {
		program: {
			name: string;
		};
		courseInfo: {
			name: string;
		};
	};
	courseCertificateTemplate: {
		displayName: string;
		linkedInShareText: string;
		xShareText: string;
	};
	imageUrl: string;
}

export interface IUserProgramCertificateQuery {
	userCourseCertificates: {
		totalCount: number;
		result: IUserProgramCertificate[];
	};
}

export interface IUserProgramCertificateQueryVariables {
	where: {
		userProgram: string;
		user: string;
	};
	limit?: number;
	skip?: number;
}
