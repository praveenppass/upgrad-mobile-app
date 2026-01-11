import { gql } from "@apollo/client";

const getCityListByStateQuery = gql`
	query getAllCities($where: CityWhereInput, $sort: CitySortInput) {
		allCities(where: $where, sort: $sort) {
			id
			name
		}
	}
`;

export interface IGetCityListByStateQuery {
	allCities: {
		id: string;
		name: string;
	}[];
}

export interface IGetCityListByStateQueryVariables {
	where: {
		state: string;
	};
}

export default getCityListByStateQuery;
