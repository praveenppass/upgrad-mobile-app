import { gql } from "@apollo/client";

const getAccountCertificatesQuery = gql`
	query userCourseCertificates(
		$where: UserCourseCertificateWhereInput
		$limit: Int
		$skip: Int
	) {
		userCourseCertificates(where: $where, limit: $limit, skip: $skip) {
			result {
				id
				uid
				userCourse {
					course {
						name
					}
				}
				userProgram {
					program {
						name
					}
				}
				courseCertificateTemplate {
					displayName
				}
				imageUrl
				name
				certificateCredential {
					certificateNumber
					certificateUrl
				}
			}
		}
	}
`;

export default getAccountCertificatesQuery;

export interface IGetAccountCeriticates {
	id: string;
	uid: string;
	userCourseCertificates?: {
		result: Array<{
			id: string;
			imageUrl: string;
			userCourse: {
				course?: {
					name: string;
				};
			};
			userProgram: {
				program?: {
					name: string;
				};
			};
			courseCertificateTemplate: {
				displayName: string;
			};
			certificateCredential: {
				certificateNumber: string;
				certificateUrl: string;
			};
		}>;
	};
}
