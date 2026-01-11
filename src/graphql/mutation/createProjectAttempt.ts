import { gql } from "@apollo/client";

const createProjectAttempt = gql`
	mutation createProjectAttempt($data: createProjectAttemptInput!) {
		createProjectAttempt(data: $data) {
			id
			marks
			attemptScore
			answerUrl
			status
			createdAt
			project {
				testCases {
					suiteName
					name
					subSkills {
						id
						name
						skill {
							id
							name
						}
					}
				}
				summary {
					attempt { 
                        id
                        answerUrl
                        status
                        createdAt
                        report {
                            score
                            percentage
                            attemptScore
                            proficiencyPercentage
                            classAvgProficiencyPercentage
                        }
                        testCases {
                            suiteName
                            name
                            marks
                            failureMessages
                            attemptScore
                            status
                            specifications
                        }
                    }
				}
			}
			testCases {
				suiteName
				name
				status
				marks
				attemptScore
				failureMessages
			}
		}
	}
`;

export { createProjectAttempt };
