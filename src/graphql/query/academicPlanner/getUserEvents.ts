import { gql } from "@apollo/client";

import { IUserEvent } from "@graphql/query/academicPlanner/interfaces";

const getUserEventsQuery = gql`
	query userEvents(
		$where: UserEventWhereInput
		$sort: UserEventSortInput = { endsAt: asc }
		$skip: Int
		$limit: Int
	) {
		userEvents(where: $where, sort: $sort, skip: $skip, limit: $limit) {
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

				workshopSession {
					id
					name
					status
					startsAt
					endsAt
					order
					recordingVisibility
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

					attendance {
						status
					}
					resources {
						id
					}
				}

				sessionGroup {
					id
					title
				}

				mentoringSession {
					id
					startsAt
					endsAt
					status
					suggestedAt
					mentorUser {
						mentor {
							firstName
							lastName
						}
					}
					userCourse {
						course {
							name
						}
					}
					userProgram {
						program {
							name
						}
					}
					learnerAttendance {
						status
						joinsAt
					}
					virtualMeeting {
						code
						type
						status
						joinUrl
						startUrl
						uuid
						uploadedFiles {
							vimeoId
							brightcoveId
						}
						encryptedPassword
					}
				}

				buddySession {
					id
					startsAt
					endsAt
					status
					buddy {
						firstName
						lastName
					}
					learnerAttendance {
						status
						joinsAt
					}
					virtualMeeting {
						code
						type
						status
						joinUrl
						startUrl
						uuid
						uploadedFiles {
							vimeoId
							brightcoveId
						}
						encryptedPassword
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

				session {
					id
					name
					status
					startsAt
					endsAt
					recordingVisibility
					requestedReschedule
					rescheduledLearnerCount
					recordings {
						vimeo
						brightcove
					}
					instructors {
						id
						firstName
						lastName
					}
					event {
						agenda
						agendaDoc {
							filePath
						}
					}
					agenda {
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
					resources {
						id
					}
				}

				mentorWindow {
					id
					name
					startsAt
					endsAt
					mentors {
						id
						firstName
						lastName
					}
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

				sessionActivities {
					id
					maxWatchTime
					totalWatchTime
					brightcoveId
				}
			}
		}
	}
`;

export default getUserEventsQuery;

type FilterCondition = {
	_in: string[];
};

export interface IUserEventStatusType {
	_in?: string[];
	_nin?: string[];
}

export interface IUserEventQueryVariables {
	skip: number;
	limit: number;
	sort?: {
		endsAt?: string;
	};
	where: {
		status?: IUserEventStatusType;
		endsAt?: {
			_lt?: string;
			_gte?: string;
		};
		type: {
			_in: string[];
		};

		user?: string;
		userProgram: FilterCondition;
		level1: FilterCondition;
		viewType: string;
	};
}

export interface IUserEventsResponse {
	userEvents: {
		totalCount: number;
		result: IUserEvent[];
	};
}
