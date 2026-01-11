import { gql } from "@apollo/client";

const createAssignmentAttemptQuery = gql`
	mutation createAssignmentAttempt($data: createAssignmentAttemptInput!) {
		createAssignmentAttempt(data: $data) {
			id
		}
	}
`;

export default createAssignmentAttemptQuery;

export interface ICreateAssignmentAttemptQueryVariables {
	data: {
		assignment: string;
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

export interface ICreateAssignmentAttemptQuery {
	id: string;
}
