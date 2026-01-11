import { gql } from "@apollo/client";

const getCountryListQuery = gql`
	query getAllCountries($sort: CountrySortInput) {
		allCountries(sort: $sort) {
			id
			name
		}
	}
`;

export interface IGetCountryListQuery {
	allCountries: {
		id: string;
		name: string;
	}[];
}

export interface IGetCountryListQueryVariables {
	sort: {
		name: string;
	};
}

export default getCountryListQuery;
