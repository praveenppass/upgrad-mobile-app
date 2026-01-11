import { gql } from "@apollo/client";

const getUserPersonalDetailsResumeQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			id

			userProfileResume {
				resumes {
					fileName
					filePath
					uploadedAt
					_isDeleted
				}
			}
		}
	}
`;

export interface IGetUserPersonalDetailsResumeQueryVariables {
	where: {
		id: string;
	};
}
export interface IGetUserPersonalDetailsResumeQuery {
	user: {
		userProfileResume: {
			resumes: {
				fileName: string;
				filePath: string;
				uploadedAt: string;
				_isDeleted: boolean;
			}[];
		} | null;
	};
}

export default getUserPersonalDetailsResumeQuery;
