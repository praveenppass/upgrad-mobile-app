import { gql } from "@apollo/client";

const getattemptRecallquizProgramDetails = gql`
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
						}
						msq {
							correctAnswer
							isFeedbackEnable
							options {
								id
								text
								feedback
							}
						}
						sequence {
							correctAnswer
							isFeedbackEnable
							options {
								id
								text
								feedback
							}
						}
						numerical {
							correctAnswer
							answerType
							inclusive
						}
						match {
							correctAnswer {
								destination
								source
							}
							destination {
								id
								value
							}
							source {
								id
								value
							}
						}
						openResponse {
							correctAnswer
							maxWords
							minWords
							isRichTextEditorEnabled
						}
						qId
						poll {
							options {
								text
								id
								samplePercentage
							}
						}
						version
					}
					status
					answer
				}
				attemptLeft
				currentQuestionId
			}
			extraData {
				totalQuestions
			}
			quiz {
				name
				instruction
				code
				generalSettings {
					attemptLimit
				}
			}
		}
	}
`;
export interface IAttemptRecallquizProgramDetailsQuery {
	getRecallQuizAttempt: IAttemptRecallquizUserProgram;
}
export interface IAttemptRecallquizUserProgram {
	attemptQuiz: {
		attemptLeft: number | null;
		status: string | null;
		code: string | null;
		questions: [];
		currentQuestionId?: string;
	};
	extraData: object | null;
	quiz: object | any;
	__typename: string | null;
}

export interface IAttemptRecallqueryProgramDetailsQueryVariables {
	params: {
		attempt: string | null;
		code: string | null;
	};
}
export default getattemptRecallquizProgramDetails;
