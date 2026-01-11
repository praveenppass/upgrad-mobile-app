import { gql } from "@apollo/client";

const getUserEducationDetailsQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			educations {
				university
				recentEducation {
					code
					name
				}
				matriculationBoard {
					code
					name
				}
				intermediateBoard {
					code
					name
				}
				academicStream {
					code
					name
				}
				degree {
					code
					name
				}
				field {
					code
					name
				}
				fromYear
				toYear
				percentage
			}
		}
	}
`;

export interface IGetUserEducationDetailsQueryVariables {
	where: {
		id: string;
	};
}
export interface IGetUserEducationDetailsQuery {
	user: {
		educations: {
			university: string;
			recentEducation: {
				code: string;
				name: string;
			} | null;
			matriculationBoard: {
				code: string;
				name: string;
			} | null;
			intermediateBoard: {
				code: string;
				name: string;
			} | null;
			academicStream: {
				code: string;
				name: string;
			} | null;
			degree: {
				code: string;
				name: string;
			} | null;
			field: {
				code: string;
				name: string;
			} | null;
			fromYear: number | null;
			toYear: number | null;
			percentage: number | null;
		}[];
	};
}

export default getUserEducationDetailsQuery;
