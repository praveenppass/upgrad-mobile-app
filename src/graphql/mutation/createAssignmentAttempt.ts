import { gql } from "@apollo/client";

export const createAssignmentAttempt = gql`
	mutation createAssessmentAttempt($input: CreateAssessmentAttemptInput!) {
		createAssessmentAttempt(input: $input) {
		  url
		}
	}  
`;
