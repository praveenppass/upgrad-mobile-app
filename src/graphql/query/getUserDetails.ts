import { gql } from "@apollo/client";

const getUserDetails = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			id
			learningPartnerUserId
			firstName
			lastName
			image
			isd
			mobile
			isMobileVerify
			isWhatsAppVerify
			email
			createdAt
			# aadhaar
			pincode
			kaggle
			passwordHistory {
				createdAt
			}
			companyName
			designation
			shortBio
			address
			gender
			nationality {
				id
				name
			}
			educations {
				university
				recentEducation {
					code
					name
				}
				matriculationBoard {
					code
					name
				}
				intermediateBoard {
					code
					name
				}
				academicStream {
					code
					name
				}
				degree {
					code
					name
				}
				field {
					code
					name
				}
				fromYear
				toYear
				percentage
			}
			workExperiences {
				isWorking
				designation {
					code
					name
				}
				organization {
					code
					name
				}
				industry {
					code
					name
				}
				workDomain {
					code
					name
				}
				startsAt
				endsAt
				hasReimbursementPolicy
				hasProgramFeeReimbursement
				noticePeriod
				package
			}
			employmentStatus
			professionType
			dreamRole {
				code
				name
			}
			dreamCompany {
				code
				name
			}
			career {
				experience
				currentCtc
				expectedCtc
				workMode
				jobLocations {
					id
					name
					country {
						id
						name
					}
				}
				noticePeriod
			}
			interestAreas {
				technicalCourses {
					code
					name
				}
				certificationCourses {
					code
					name
				}
			}
			alternateMobile
			alternateEmail
			whatsAppMobile
			whatsAppIsd
			telegram
			resume
			videoResume
			codingRequired
			dateOfBirth
			timezone
			country {
				id
				name
				isd
			}
			stateRef {
				id
				name
				slug
			}
			city {
				id
				name
				wsmInfo {
					id
				}
			}
			experience {
				year
				month
			}
			linkedIn
			github
			stackOverflow
			isProductIntroduced
			isProductTourAccessed
			isSkipProductIntroduced
			isGetStartedCompleted
			isOnboardingCompleted
			onboarding {
				isCompleted
			}
			isProfileUpdate
			isSkipJobProfilePopUp
			gamificationProfile {
				id
			}
			basicPlanCourses
			bootcampCourses
			jobProfileCourses
			enterprise {
				id
				name
				identityClient
				branding {
					logoWithTexturl
					emailTemplateLogoUrl
					logoWithWhiteBackgroundUrl
					logoWithBlackBackgroundUrl
					playerLogoUrl
				}
			}
			jobAssistanceResume {
				isRecentTicket
				details {
					roles
					location
					resume
					linkedIn
				}
			}
			userProfileResume {
				resumes {
					fileName
					filePath
					uploadedAt
					resumeId
					_isDeleted
				}
				videoResume {
					fileName
					filePath
					uploadedAt
					resumeId
					_isDeleted
				}
			}
			job {
				subscribeJobCourseTicketId
				isPurchaseJobCourse
			}
			profileSectionCompletion {
				personalDetails
				education
				workExperience
				aspiration
				contactDetails
			}
			isShowSectionDeadline
			showCareerCentrePopup
		}
	}
`;

export { getUserDetails };
