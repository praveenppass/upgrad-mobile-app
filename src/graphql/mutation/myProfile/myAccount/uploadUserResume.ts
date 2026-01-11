import { gql } from "@apollo/client";

const uploadUserResume = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			userProfileResume {
				resumes {
					fileName
					filePath
					uploadedAt
				}
			}
		}
	}
`;

export default uploadUserResume;

export interface IUploadUserResumeResponse {
	updateUser: {
		userProfileResume: {
			resumes: {
				fileName: string;
				filePath: string;
				uploadedAt: string;
			}[];
		};
	};
}
