import { gql } from "@apollo/client";

const refetchHomeDetails = gql`
	query refetchHomeDetails($id: ID!, $skip: Int!, $limit: Int!) {
		userProfileCompletionStatus {
			completionPercentage
		}
		gamificationProfile(where: { user: $id }) {
			dayStreak {
				completedDays
			}
			points
			last30daysPoints
			rank
			noOfBadgesAccomplished
			totalBadges
			challenges {
				level
				status
			}
			levelBadge {
				id
				imageUrl
			}
		}
		learnerCourses(skip: $skip, limit: $limit, sort: { updatedAt: desc }) {
			result {
				id
				status
				progress
				progressStatus
				startedAt
				expiresAt
				accessDays
				accessType
				programDeliveryType
				totalLearningDuration
				totalLevel1Containers
				trialInfo {
					enableTriggerNotification
				}
				courseDeliveryType {
					id
					name
				}
				course {
					id
					name
					image
				}
				program {
					id
					name
					image
				}
				deliveryType {
					id
					type
					name
				}
				variant
			}
			totalCount
		}
	}
`;

export { refetchHomeDetails };
