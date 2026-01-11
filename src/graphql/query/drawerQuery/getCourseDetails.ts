import { gql } from "@apollo/client";

const getUserCourse = gql`
	query userCourse($where: UserCourseWhereUniqueInput!) {
		userCourse(where: $where) {
			id
			progress
			labType
			labPath
			lab {
				id
				slug
				status
				meta
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
			}
			totalLearningDuration
			totalAssessments
			totalAssignments
			totalProjects
			totalHandsOns
			totalWorkshopSessions
			mentoring {
				hours
			}
			sessionGroup {
				id
			}
			userProgram {
				id
				program {
					name
					websiteUrl
				}
				userCourses {
					id
					enableLock
					isSkipped
					course {
						id
						name
					}
				}
				accessDays
				expiresAt
				extendedDays
				trialInfo {
					completedAssets
				}
			}
			currentState {
				asset
				level1
				level2
			}
			accessType
			accessDays
			startedAt
			expiresAt
			extendedDays
			trialInfo {
				enableTriggerNotification
			}
			isUpgraded
			deliveryType {
				id
				type
				name
			}
			variant
			enableQuestionBank
			course {
				author
				id
				websiteUrl
				name
				description
				enableSkilledAssets
				status
				totalAssets
				totalAssessments
				totalProjects
				totalAssignments
				totalHandsOns
				totalLearningDuration
				learningPath
				skills {
					id
					name
				}
				courseLevels {
					name
				}
				upgradedSettings {
					enableMandatory
				}
				enablePracticeLab
				playgroundSettings {
					preFix
					port
					path
					postFix
				}
				labType
				playgroundTemplates {
					dockerImage
					name
					imageUrl
					dockerLabAsset
				}
				externalLab {
					code
					name
					imageUrl
				}
				website {
					enableFreeTrial
					enableFreeAccess
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
			}
			enableUpgrade
			userConsent
			practiceLabQuestionUrl
			orderInfo {
				paymentType
				paymentLink
				endsAt
				workshopCode
			}
			isShowSectionDeadlineCancelButton
		}
	}
`;

export { getUserCourse };
