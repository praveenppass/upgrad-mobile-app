import { gql } from "@apollo/client";

const updateMyAccountDetails = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
			image
			firstName
			lastName
			mobile
			dateOfBirth
			email
			isProfileUpdate
			address
		}
	}
`;
export default updateMyAccountDetails;

export interface IUpdateUserResponse {
	updateUser: {
		id: string;
		image: string;
		firstName: string;
		lastName: string;
		mobile: string;
		email: string;
		dateOfBirth: string;
		isProfileUpdate: boolean;
		address: string;
	};
}
