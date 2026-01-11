import { gql } from "@apollo/client";

const omsLoginQuery = gql`
	mutation omsLogin($data: OMSLoginInput!) {
		omsLogin(data: $data) {
			accessToken
			refreshToken
		}
	}
`;

export interface IOmsLoginQueryVariables {
	data: {
		authToken: string;
	};
}

export interface IOmsLoginQueryTokens {
	accessToken: string;
	refreshToken: string;
}

export interface IOmsLoginQuery {
	omsLogin: IOmsLoginQueryTokens;
}

export default omsLoginQuery;
