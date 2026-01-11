import { gql } from "@apollo/client";

export const startRecallQuizAttempt = 
gql`mutation startRecallQuizAttempt($params: StartRecallQuizAttemptInput!) {
  startRecallQuizAttempt(input: $params)
}`;

