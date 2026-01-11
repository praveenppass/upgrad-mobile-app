import { gql } from "@apollo/client";

export const getRecallQuizResult = gql`
	mutation getRecallQuizResult($params: GetRecallQuizAttemptInput!) {
		getRecallQuizAttempt(input: $params) {
			attemptQuiz {
				questions {
					isCorrect
				}
			}
			extraData {
				totalQuestions
			}
		}
	}
`;

export interface IGetRecallQuizAttemptResultsQueryVariables {
	params: {
		code: string;
		attempt: string;
	};
}

export interface IQuestion {
	isCorrect: boolean;
}

export interface IAttemptQuiz {
	questions: IQuestion[];
}

export interface IExtraData {
	totalQuestions: number;
}

export interface getRecallQuizAttemptResultsQuery {
	getRecallQuizAttempt: {
		attemptQuiz: IAttemptQuiz;
		extraData: IExtraData;
	};
}
