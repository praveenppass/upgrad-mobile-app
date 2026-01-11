import { gql } from "@apollo/client";

export const createAssessmentAttempt = gql`
	mutation createAssessmentAttempt($input: CreateAssessmentAttemptInput!) {
		createAssessmentAttempt(input: $input) {
			url
		}
	}
`;
