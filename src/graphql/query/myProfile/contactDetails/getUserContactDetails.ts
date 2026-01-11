import { gql } from "@apollo/client";

const getUserContactDetailsQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			isd
			email
			isMobileVerify
			alternateEmail
			whatsAppMobile
			whatsAppIsd
			mobile
		}
	}
`;

export interface IGetUserContactDetailsQueryVariables {
	where: {
		id: string;
	};
}
export interface IGetUserContactDetailsQuery {
	user: {
		isd: string | null;
		email: string | null;
		isMobileVerify: boolean;
		alternateEmail: string | null;
		whatsAppMobile: string | null;
		whatsAppIsd: string | null;
		mobile: string | null;
	};
}

export default getUserContactDetailsQuery;
