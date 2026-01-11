import { gql } from "@apollo/client";

export const updateRecallQuizAttemptQuestion = gql`
	mutation updateRecallQuizAttemptQuestion($params: UpdateRecallQuizAttemptInput!) {
  updateRecallQuizAttemptQuestion(input: $params)
}
`;

export interface IUpdateRecallAttemptQuery {
  updateRecallQuizAttemptQuestion: string;
}

export interface IUpdateRecallAttemptVariables {
  params: {
    currentQuestionId: string | null,
    code: string | null,
    question: {
      questionId: string | null,
      answer: []
    }
  },
}