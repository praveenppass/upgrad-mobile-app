import { gql } from "@apollo/client";

const getStateListByCountryQuery = gql`
	query getStates($where: StateWhereInput!) {
		states(where: $where) {
			result {
				id
				name
			}
		}
	}
`;

export interface IGetStateListByCountryQuery {
	states: {
		result: {
			id: string;
			name: string;
		}[];
	};
}

export interface IGetStateListByCountryQueryVariables {
	where: {
		country: string;
	};
}

export default getStateListByCountryQuery;
