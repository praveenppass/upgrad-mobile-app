import { gql } from "@apollo/client";

const getNationalityListQuery = gql`
	query nationalities($where: NationalityWhereInput) {
		nationalities(where: $where) {
			# totalCount
			result {
				id
				name
			}
		}
	}
`;

export interface IGetNationalityListQuery {
	nationalities: {
		// totalCount: number;
		result: {
			id: string;
			name: string;
		}[];
	};
}

export interface IGetNationalityListQueryVariables {
	where: {
		// TODO
	};
}

export default getNationalityListQuery;
