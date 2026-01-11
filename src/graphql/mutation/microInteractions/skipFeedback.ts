import { gql } from "@apollo/client";

export const skipPendingFeedback = gql`
	mutation skipPendingFeedback($where: SkipPendingFeedbackWhereInput!) {
		skipPendingFeedback(where: $where) {
			id
		}
	}
`;

export interface ISkipPendingFeedbackVariables {
	where: {
		id: string;
	};
}

export interface ISkipPendingFeedbackMutation {
	skipPendingFeedback: {
		id: string;
	};
}
