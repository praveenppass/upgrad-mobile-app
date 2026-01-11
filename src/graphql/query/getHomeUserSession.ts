import { gql } from "@apollo/client";

export const getHomeUserSession = gql`
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
				userProgram {
					program {
						id
						name
					}
				}
				session {
					id
					name
					status
					startsAt
					endsAt
					virtualMeeting {
						code
						encryptedPassword
						joinUrl
					}
					virtualMeetingProvider {
						joinUrl
					}
				}
				workshopSession {
					id
					name
					status
					startsAt
					endsAt
					workshop {
						id
						code
					}
					virtualMeetingProvider {
						joinUrl
					}
					virtualMeeting {
						code
						encryptedPassword
						joinUrl
					}
				}
				sessionGroup {
					id
					title

					startsAt
					endsAt
				}
				sessionGroupSession {
					id
					name
					startsAt
					endsAt
					virtualMeetingProvider {
						joinUrl
					}
					virtualMeeting {
						code
						joinUrl
						encryptedPassword
					}
				}
				mentoringSession {
					id
					startsAt
					endsAt
					virtualMeeting {
						code
						joinUrl
						encryptedPassword
					}

					mentorUser {
						mentor {
							firstName
							lastName
						}
					}
				}
				buddySession {
					id
					startsAt
					endsAt
					virtualMeeting {
						code
						encryptedPassword
						joinUrl
					}

					buddy {
						firstName
						lastName
					}
				}
			}
		}
	}
`;
