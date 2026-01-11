import { gql } from "@apollo/client";

import { ISessionScheduledType } from "@components/Courses/CourseDetails/Session/index.interface";

import { IUserEvent } from "@graphql/query/academicPlanner/interfaces";

const getUrgentUserEventsQuery = gql`
	query urgentUserEvents($where: UrgentUserEventWhereInput) {
		urgentUserEvents(where: $where) {
			totalCount
			result {
				id
				type
				startsAt
				endsAt
				status
				userProfileSection

				userCourse {
					id
					totalProjects
					progress
					totalAssessments
					totalLevel1Containers
					totalLearningDuration
					totalWorkshopSessions
					expiresAt
					orderInfo {
						paymentType
						paymentLink
						endsAt
					}
					course {
						name
						courseLevels {
							name
						}
						skills {
							name
						}
					}
				}

				userProgram {
					id
					progress
					totalProjects
					totalAssessments
					totalLevel1Containers
					totalLearningDuration
					totalWorkshopSessions
					expiresAt
					orderInfo {
						paymentType
						paymentLink
						endsAt
					}
					courseInfo {
						name
					}
					program {
						id
						name
						code
						level {
							name
						}
					}
					skills {
						name
					}
				}

				workshop {
					id
					code
				}

				session {
					id
					name
					status
					startsAt
					endsAt
					recordingVisibility
					requestedReschedule
					rescheduledLearnerCount
					instructors {
						id
						firstName
						lastName
					}
					event {
						agenda
					}
					virtualMeeting {
						id
						code
						startUrl
						joinUrl
						uploadedFiles {
							vimeoId
							brightcoveId
						}
						encryptedPassword
					}
					virtualMeetingProvider {
						virtualMeetingProvider
						startUrl
						joinUrl
					}
					attendance {
						status
					}
					requestedRescheduleTimeSlot {
						id
						startsAt
						endsAt
						mentor {
							firstName
							lastName
						}
					}
				}

				workshopSession {
					id
					name
					status
					startsAt
					endsAt
					order
					instructors {
						id
						firstName
						lastName
					}
					recordings {
						vimeo
						brightcove
					}
					virtualMeeting {
						joinUrl
						startUrl
						encryptedPassword
						uploadedFiles {
							vimeoId
							brightcoveId
						}
					}
					virtualMeetingProvider {
						virtualMeetingProvider
						joinUrl
						configuration
					}
					agenda {
						agenda
					}
					instructors {
						id
						firstName
						lastName
					}
					agenda {
						agenda
					}
				}

				mentorWindow {
					id
					name
					startsAt
					endsAt
					event {
						code
						agenda
						agendaDoc {
							filePath
						}
					}
				}

				mentorLearner {
					mentor {
						id
						firstName
						lastName
					}
				}

				contentDetails {
					startsAt
					aliasName
					endsAt
					level1
					level2
					level3
					level4
					asset {
						id
						code
						name
						status
						assetType {
							type
							name
						}
					}
					module {
						name
					}
					track {
						name
					}
					elective {
						name
					}
				}

				userProfileSection
			}
		}
	}
`;

export default getUrgentUserEventsQuery;

type FilterCondition = {
	_in: string[];
};

export interface ISessionUrgentQueryVariables {
	where: {
		userProgram: FilterCondition;
		user: string;
		status: {
			_in: ISessionScheduledType[];
		};
		type: {
			_in: ISessionScheduledType[];
		};
	};
}

export interface IUrgentUserEventsResponse {
	urgentUserEvents: {
		totalCount: number;
		result: IUserEvent[];
	};
}
