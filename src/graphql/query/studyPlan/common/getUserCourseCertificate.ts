import { gql } from "@apollo/client";

const getUserCourseCertificateQuery = gql`
	query userCourseCertificates(
		$where: UserCourseCertificateWhereInput
		$limit: Int
		$skip: Int
	) {
		userCourseCertificates(where: $where, limit: $limit, skip: $skip) {
			totalCount
			result {
				id
				userCourse {
					course {
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

export default getUserCourseCertificateQuery;

export interface IUserCourseCertificate {
	id: string;
	userCourse: {
		course: {
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
export interface IUserCourseCertificateQuery {
	userCourseCertificates: {
		totalCount: number;
		result: IUserCourseCertificate[];
	};
}

export interface IUserCourseCertificateQueryVariables {
	where: {
		userCourse: string;
		user: string;
	};
	limit?: number;
	skip?: number;
}
