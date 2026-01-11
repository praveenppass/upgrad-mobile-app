import { gql } from "@apollo/client";

const updateUserPersonalDetailsResumeQuery = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
		}
	}
`;
export default updateUserPersonalDetailsResumeQuery;

export interface IUpdateUserPersonalDetailsResumeQueryVariables {
	where: {
		id: string;
	};
	data: {
		userProfileResume?: {
			resumes: {
				fileName: string;
				filePath: string;
				uploadedAt: string;
			}[];
		};
		isProfileUpdate?: boolean;
	};
}

export interface IUpdateUserPersonalDetailsResumeQuery {
	updateUser: {
		id: string;
	};
}
