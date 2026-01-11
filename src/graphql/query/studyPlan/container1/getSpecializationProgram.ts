import { gql } from "@apollo/client";

const getSpecializationProgramQuery = gql`
	query userProgram($where: UserProgramWhereUniqueInput!) {
		userProgram(where: $where) {
			id
			relatedUserPrograms {
				id
				progress
				startedAt
				totalLearningDuration
				courseInfo {
					name
				}
				workshop {
					id
					code
				}
				program {
					id
					code
				}
			}
		}
	}
`;

export default getSpecializationProgramQuery;

export interface ISpecializationProgramVariables {
	where: { id: string };
}

export interface IRelatedUserProgram {
	id: string;
	progress: number;
	startedAt: string;
	totalLearningDuration: number;
	courseInfo: {
		name: string;
	};
	workshop: {
		id: string;
		code: string;
	};
	program: {
		id: string;
		code: string;
	};
}

export interface ISpecializationProgramQuery {
	userProgram: {
		id: string;
		relatedUserPrograms: IRelatedUserProgram[];
	};
}
