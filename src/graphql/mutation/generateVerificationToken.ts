import { gql } from "@apollo/client";

const generateVerificationToken = gql`
	mutation generateVerificationToken($data: generateVerificationTokenInput!) {
		generateVerificationToken(data: $data)
	}
`;
export { generateVerificationToken };
