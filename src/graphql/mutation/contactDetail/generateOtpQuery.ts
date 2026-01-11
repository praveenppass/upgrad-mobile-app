import { gql } from "@apollo/client";

const generateOtpQuery = gql`
	mutation generateVerificationToken($data: generateVerificationTokenInput!) {
		generateVerificationToken(data: $data)
	}
`;

export default generateOtpQuery;

export interface IGenerateMobileOtpVariable {
	data: {
		isd: string;
		mobile: string;
		verificationType: string;
	};
}
