import { gql } from "@apollo/client";

const getTimezoneDetailsQuery = gql`
	query allTimezones($where: TimezoneWhereInput) {
		allTimezones(where: $where) {
			id
			timezone
			offset
		}
	}
`;

export default getTimezoneDetailsQuery;

export interface IGetUserTimezoneQuery {
	allTimezones: {
		id: string;
		timezone: string;
		offset: string;
	}[];
}

export interface IGetUserTimezoneQueryVariables {
	where: {
		name: {
			_regex: string;
		};
	};
}
