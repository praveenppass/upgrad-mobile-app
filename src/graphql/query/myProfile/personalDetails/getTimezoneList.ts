import { gql } from "@apollo/client";

const getTimezoneListQuery = gql`
	query allTimezones($where: TimezoneWhereInput, $sort: TimezoneSortInput) {
		allTimezones(where: $where, sort: $sort) {
			id
			name
			offset
		}
	}
`;

export interface IGetTimezoneListQuery {
	allTimezones: {
		id: string;
		name: string;
		offset: string;
	}[];
}

export interface IGetTimezoneListQueryVariables {
	sort: {
		name: string;
	};
}

export default getTimezoneListQuery;
