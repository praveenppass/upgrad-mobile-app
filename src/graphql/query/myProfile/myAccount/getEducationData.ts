import { gql } from "@apollo/client";

const getEducationDetails = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			educations {
				university
				recentEducation {
					name
				}
				matriculationBoard {
					name
				}
				intermediateBoard {
					name
				}
				academicStream {
					name
				}
				degree {
					name
				}
				field {
					name
				}
				fromYear
				toYear
			}
		}
	}
`;

export default getEducationDetails;

export interface IEducationQueryResponse {
	user: {
		educations: IEducation[] | null;
	};
}

export interface IEducation {
	university: string;
	recentEducation: {
		name: string;
	};
	matriculationBoard: {
		name: string;
	};
	intermediateBoard: {
		name: string;
	};
	academicStream: {
		name: string;
	};
	degree: {
		name: string;
	};
	field: {
		name: string;
	};
	fromYear: number;
	toYear: number;
}
