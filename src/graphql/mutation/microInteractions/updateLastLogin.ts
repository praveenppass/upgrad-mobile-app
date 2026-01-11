import { gql } from "@apollo/client";

export const updateLastLogin = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
		}
	}
`;
export interface IUpdateLastLoginUserDetailsQueryVariables {
	data: {
		lastLogin: {
			createdAt: string;
		};
	};
	where: {
		id: string;
	};
}

export interface IUpdateLastLoginUserDetailsQuery {
	updateUser: {
		id: string;
	};
}
