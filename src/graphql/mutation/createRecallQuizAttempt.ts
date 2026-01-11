import { gql } from "@apollo/client";

export const createRecallQuizAttempt = gql`
	mutation createRecallQuizAttempt($input: CreateRecallQuizAttemptInput!) {
		createRecallQuizAttempt(input: $input) {
			url
		}
	}
`;
