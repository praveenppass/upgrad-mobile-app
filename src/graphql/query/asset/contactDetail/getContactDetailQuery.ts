import { gql } from "@apollo/client";

const getContactDetailQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			id
			mobile
			isMobileVerify
			isWhatsAppVerify
			email
			createdAt
			alternateEmail
			whatsAppMobile
			whatsAppIsd
		}
	}
`;
export default getContactDetailQuery;

export interface IContactDetail {
	user: {
		alternateEmail: string;
		createdAt: string;
		email: string;
		id: string;
		isMobileVerify: boolean;
		isWhatsAppVerify: boolean;
		mobile: string;
		whatsAppIsd: string;
		whatsAppMobile: string;
	};
}
