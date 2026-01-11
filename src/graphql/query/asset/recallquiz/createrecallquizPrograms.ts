import { gql } from "@apollo/client";

const createRecallquizProgramDetails = gql`
	mutation createRecallQuizAttempt($input: CreateRecallQuizAttemptInput!) {
		createRecallQuizAttempt(input: $input) {
			url
		}
	}
`;
export interface ICreateRecallquizProgramDetailsQuery {
	createRecallQuizAttempt: ICreateRecallquizUserProgram;
}
export interface ICreateRecallquizUserProgram {
	url: string;
}

export interface ICreateRecallqueryProgramDetailsQueryVariables {
	input: {
		recallQuiz: string | null;
		meta: {
			asset: string | null;
			user: string | null;
			program?: string | null;
			userProgram?: string | null;
			workshop: string | null;
			learnerCourse: string | null;
			deliveryType: string | null;
			course?: string | null;
			userCourse?: string | null;
		};
	};
}
export default createRecallquizProgramDetails;
