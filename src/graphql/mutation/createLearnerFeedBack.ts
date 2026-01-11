import { gql } from "@apollo/client";

const createLearnerFeedBackMutation = gql`
	mutation createPendingFeedback($data: CreatePendingFeedbackInput!) {
		createPendingFeedback(data: $data) {
			userCourse {
				id
				course {
					name
				}
			}
			userProgram {
				id
				program {
					name
				}
			}
			workshop {
				id
				code
				course {
					name
				}
				program {
					name
				}
			}
			workshopSession {
				id
				order
				startsAt
				endsAt
				instructors {
					id
					firstName
					lastName
					image
				}
			}
			deliveryType {
				id
				type
				name
			}
			isSubmitted
			feedback {
				id
				name
				type
				children {
					category {
						name
						description
						questions {
							id
							question
							ratingTags {
								rating
								tag
							}
							type
							max
							criteria
							options {
								option
								tagGroupLabel
								tags
							}
							isChild
							childrenQuestions
							preferredAnswer
						}
					}
					question {
						id
						question
						ratingTags {
							rating
							tag
						}
						type
						max
						criteria
						options {
							option
							tagGroupLabel
							tags
						}
					}
				}
			}
		}
	}
`;

const submitLearnerFeedBackMutation = gql`
	mutation createFeedbackResponse($data: createFeedbackResponseInput!) {
		createFeedbackResponse(data: $data) {
			id
		}
	}
`;

export { createLearnerFeedBackMutation, submitLearnerFeedBackMutation };
