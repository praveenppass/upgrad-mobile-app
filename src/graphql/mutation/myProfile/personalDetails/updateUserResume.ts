import { gql } from "@apollo/client";

const updateUserResumeMutation = gql`
	mutation updateUserResume($data: UpdateUserResumeInput!) {
		updateUserResume(data: $data) {
			id
			userProfileResume {
				resumes {
					resumeId
					fileName
					filePath
					uploadedAt
					_isDeleted
					isDefault
				}
			}
		}
	}
`;

export interface IUpdateUserResumeInput {
	fileName: string;
	filePath: string;
}

export interface IUpdateUserResumeMutationVariables {
	data: IUpdateUserResumeInput;
}

export interface IUpdateUserResumeMutation {
	updateUserResume: {
		id: string;
		userProfileResume: {
			resumes: {
				resumeId: string;
				fileName: string;
				filePath: string;
				uploadedAt: string;
				_isDeleted: boolean;
				isDefault: boolean;
			}[];
		};
	};
}

export default updateUserResumeMutation;
