import { gql } from "@apollo/client";

export const createFeedbackResponse = gql`
	mutation createFeedbackResponse($data: createFeedbackResponseInput!) {
		createFeedbackResponse(data: $data) {
			id
		}
	}
`;
