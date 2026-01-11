import { gql } from "@apollo/client";

const startRecallquizProgramDetails = gql`
	mutation startRecallQuizAttempt($params: StartRecallQuizAttemptInput!) {
		startRecallQuizAttempt(input: $params)
	}
`;
export interface IStartRecallquizProgramDetailsQuery {
	startRecallQuizAttempt: string | null;
}

export interface IStartRecallqueryProgramDetailsQueryVariables {
	params: {
		code: string | null;
	};
}
export default startRecallquizProgramDetails;
