import { gql } from "@apollo/client";

const requestRevaluationAssignmentAttemptQuery = gql`
	mutation requestReEvaluationForAssignmentAttempt(
		$where: AssignmentAttemptWhereUniqueInput!
		$data: RequestReEvaluationForAssignmentAttemptInput!
	) {
		requestReEvaluationForAssignmentAttempt(where: $where, data: $data) {
			id
		}
	}
`;

export interface IRequestRevaluationAssignmentAttemptQueryVariables {
	data: {
		reason: string;
	};
	where: {
		id: string;
	};
}

export interface IRequestRevaluationAssignmentAttemptQuery {
	id: string;
}

export default requestRevaluationAssignmentAttemptQuery;
