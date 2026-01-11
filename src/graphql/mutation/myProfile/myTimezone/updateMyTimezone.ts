import { gql } from "@apollo/client";

const updateMyTimezoneQuery = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
		}
	}
`;
export default updateMyTimezoneQuery;

export interface IUpdateMyTimezoneQueryVariables {
	where: {
		id: string;
	};
	data: {
		timezone?: string;
	};
}

export interface IUpdateMyTimezoneQuery {
	updateUser: {
		id: string;
	};
}
