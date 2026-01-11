import { gql } from "@apollo/client";

export const createFeedbackResponse = gql`
	mutation createFeedbackResponse($data: createFeedbackResponseInput!) {
		createFeedbackResponse(data: $data) {
			id
		}
	}
`;

export interface ICreateFeedbackResponseVariables {
	data: {
		userProgram: string;
		feedback: string;
		response: IFeedbackResponseItem[];
		feedbackFrom: string;
		level1: string;
		level2?: string;
	};
}

export interface IFeedbackResponseItem {
	question: string;
	answer: string;
}

export interface ICreateFeedbackResponseMutation {
	createFeedbackResponse: {
		id: string;
	};
}
