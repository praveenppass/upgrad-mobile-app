import { gql } from "@apollo/client";

const getPollQuestion = gql`
	query getPollQuestionAttemptCount(
		$params: GetPollQuestionAttemptCountInput!
	) {
		getPollQuestionAttemptCount(input: $params) {
			attemptCount {
				options {
					optionCount
					option
					__typename
				}
				__typename
			}
			__typename
		}
	}
`;

export interface GetPollQuestionAttemptCountInput {
	questionId: string;
	recallQuizCode: string;
	version: number;
}

interface IOption {
	optionCount: number;
	option: string;
}

interface IAttemptCount {
	options: IOption[];
}

export interface IGetPollQuestionAttemptCount {
	getPollQuestionAttemptCount: {
		attemptCount: IAttemptCount;
	};
}

export default getPollQuestion;
