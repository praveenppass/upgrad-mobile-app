import { gql } from "@apollo/client";

const getUserProgram = gql`
	query userProgram($where: UserProgramWhereUniqueInput!) {
		userProgram(where: $where) {
			id
			totalLevel1Containers
			totalAssets
			totalAssessments
			totalProjects
			totalAssignments
			totalHandsOns
			totalLearningDuration
			totalExtensionsTaken
			deliveryType {
				id
				name
				type
			}
			user {
				id
			}
			enterprise {
				id
			}
			workshop {
				id
				code
				userProfileDeadlines {
					personalDetails {
						dueByDays
						hasDeadline
					}
					about {
						dueByDays
						hasDeadline
					}
					education {
						dueByDays
						hasDeadline
					}
					workExperience {
						dueByDays
						hasDeadline
					}
					careerProfile {
						dueByDays
						hasDeadline
					}
					skills {
						dueByDays
						hasDeadline
					}
					areaOfInterest {
						dueByDays
						hasDeadline
					}
					programRequireAddProfileInfo {
						dueByDays
						hasDeadline
					}
					settings {
						dueByDays
						hasDeadline
					}
				}
				enableChatbot
			}
			courseInfo {
				name
			}
			enableQuestionBank
			program {
				enableContentFeedback
				id
				code
				name
				description
				image
				noOfDaysFromAssetPostDueDate
				learningPath
				enableAssetPenalty
				enableResponseVerification
				enableContentAgents
				totalExtensionsAllowed
				dueDateExtensionMode
				enableSkilledAssets
				totalExtensionsAllowed
				dueDateExtensionMode
				totalEnrolledLearners
				hardDeadlineDays
				level {
					name
				}
				labType
				playgroundTemplates {
					dockerImage
					name
					imageUrl
					dockerLabAsset
				}
				enablePracticeLab
				externalLab {
					code
					name
					imageUrl
				}
				websiteUrl
				tabsConfig {
					deliveryType
					config {
						type
						name
						containers
						childrenTabs {
							container
						}
					}
				}
				credlyBadgeImageUrl
				userProfileDeadlines {
					personalDetails {
						dueByDays
						hasDeadline
					}
					about {
						dueByDays
						hasDeadline
					}
					education {
						dueByDays
						hasDeadline
					}
					workExperience {
						dueByDays
						hasDeadline
					}
					careerProfile {
						dueByDays
						hasDeadline
					}
					skills {
						dueByDays
						hasDeadline
					}
					areaOfInterest {
						dueByDays
						hasDeadline
					}
					programRequireAddProfileInfo {
						dueByDays
						hasDeadline
					}
					settings {
						dueByDays
						hasDeadline
					}
				}
				hardDeadlineDays
			}
			remainingUnlockRequests
			progress
			variant
			startedAt
			totalLearningDuration
			totalWorkshopSessions
			isUpgraded
			deliveryType {
				type
			}
			startedAt
			expiresAt
			accessDays
			accessType
			extendedDays
			trialInfo {
				completedAssets
			}
			labType
			currentState {
				asset
				level1
				level2
				level3
				level4
			}
			mentoring {
				hours
			}
			sessionGroup {
				id
			}
			weekContainerConfig {
				enableStartsAt
				startsAt
				enableHighlightColorCode
			}
			orderInfo {
				paymentType
				paymentLink
				endsAt
			}
			enableAvailableAndDueDate
			isShowSectionDeadlineCancelButton
		}
	}
`;

export { getUserProgram };
