import { gql } from "@apollo/client";

const updateUserPersonalDetailsQuery = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
		}
	}
`;
export default updateUserPersonalDetailsQuery;

export interface IUpdateUserPersonalDetailsQueryVariables {
	where: {
		id: string;
	};
	data: {
		timezone?: string;
		linkedInUrl?: string;
		nationality?: string;
		country?: string;
		state?: string;
		city?: string;
		pinCode?: number;
		// aadhaar?: string;
		github?: string;
		address?: {
			flatNo?: string;
		};
		kaggleProfile?: string;
		stackOverflowUrl?: string;
		gender?: string;
		dateOfBirth?: string;
		lastName?: string;
		firstName?: string;
		profilePictureUrl?: string;
		telegramId?: string;
		stateId?: string;
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

export interface IUpdateUserPersonalDetailsQuery {
	updateUser: {
		id: string;
	};
}
