import { gql } from "@apollo/client";

const requestRevaluationProjectAttemptQuery = gql`
	mutation requestReEvaluationForProjectAttempt(
		$where: ProjectAttemptWhereUniqueInput!
		$data: RequestReEvaluationForProjectAttemptInput!
	) {
		requestReEvaluationForProjectAttempt(where: $where, data: $data) {
			id
		}
	}
`;

export interface IRequestRevaluationProjectQueryVariables {
	data: {
		reason: string;
	};
	where: {
		id: string;
	};
}

export interface IRequestRevaluationProjectQuery {
	id: string;
}

export default requestRevaluationProjectAttemptQuery;
