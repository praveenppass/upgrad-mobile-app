import { gql } from "@apollo/client";

export const getRecallQuizAttempt = gql`
mutation getRecallQuizAttempt($params: GetRecallQuizAttemptInput!) {
  getRecallQuizAttempt(input: $params) {
    attemptQuiz {
      id
      code
      recallQuizCode
      startedAt
      status
      submittedAt
      tenant
      meta {
        learnerCourse
        course
        user
        asset
        workshop
        deliveryType
        isOptional
        __typename
      }
      questions {
        questionId
        questionInfo {
          question
          questionType
          hint
          correctAnswerReason
          wrongAnswerReason
          explanationVideo
          mcq {
            correctAnswer
            isFeedbackEnable
            options {
              id
              text
              feedback
              __typename
            }
            __typename
          }
          msq {
            correctAnswer
            isFeedbackEnable
            options {
              id
              text
              feedback
              __typename
            }
            __typename
          }
          sequence {
            correctAnswer
            isFeedbackEnable
            options {
              id
              text
              feedback
              __typename
            }
            __typename
          }
          numerical {
            correctAnswer
            answerType
            inclusive
            __typename
          }
          match {
            correctAnswer {
              destination
              source
              __typename
            }
            destination {
              id
              value
              __typename
            }
            source {
              id
              value
              __typename
            }
            __typename
          }
          openResponse {
            correctAnswer
            maxWords
            minWords
            isRichTextEditorEnabled
            __typename
          }
          qId
          poll {
            options {
              text
              id
              samplePercentage
              __typename
            }
            __typename
          }
          version
          __typename
        }
        status
        answer
        __typename
      }
      attemptLeft
      currentQuestionId
      __typename
    }
    extraData {
      totalQuestions
      __typename
    }
    quiz {
      name
      instruction
      code
      generalSettings {
        attemptLimit
        __typename
      }
      __typename
    }
    __typename
  }
}


`;
