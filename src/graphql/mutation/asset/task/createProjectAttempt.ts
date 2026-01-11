import { gql } from "@apollo/client";

const createProjectAttemptQuery = gql`
	mutation createProjectAttempt($data: createProjectAttemptInput!) {
		createProjectAttempt(data: $data) {
			id
		}
	}
`;

export interface ICreateProjectAttemptQueryVariables {
	data: {
		project: string;
		asset: string;
		userProgram: string;
		answerUrl: string;
		timeSpent: number;
		level1?: string;
		level2?: string;
		level3?: string;
		level4?: string;
		version?: number;
	};
}

export interface ICreateProjectAttemptQuery {
	id: string;
}

export default createProjectAttemptQuery;
