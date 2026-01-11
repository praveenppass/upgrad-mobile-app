import { gql } from "@apollo/client";

const updateUserContactDetailsQuery = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
		}
	}
`;
export default updateUserContactDetailsQuery;

export interface IUpdateUserContactDetailsQueryVariables {
	where: {
		id: string;
	};
	data: {
		alternateEmail?: string;
		// isd?: string
		// mobile?: string;
		whatsAppIsd?: string | null;
		whatsAppMobile?: string | null;
		isProfileUpdate?: boolean;
	};
}

export interface IUpdateUserContactDetailsQuery {
	updateUser: {
		id: string;
	};
}
