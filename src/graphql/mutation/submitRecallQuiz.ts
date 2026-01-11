import { gql } from "@apollo/client";

export const submitRecallQuiz = gql`
	mutation submitRecallQuizAttempt($params: SubmitRecallQuizAttemptInput!) {
		submitRecallQuizAttempt(input: $params)
	}
`;

export interface ISubmitRecallQuizQuery {
	submitRecallQuizAttempt: string;
}

export interface ISubmitRecallQuizVariables {
	params: {
		code: string | null
	}
}