import { gql } from "@apollo/client";

const verifyOtpQuery = gql`
	mutation tokenVerification($data: TokenVerificationDataInput!) {
		tokenVerification(data: $data) {
			mobile
			isd
			verificationType
		}
	}
`;

export default verifyOtpQuery;

export interface IVerifyOtpVariable {
	data: {
		token: string;
		isd: string;
		mobile: string;
		verificationType: string;
	};
}
