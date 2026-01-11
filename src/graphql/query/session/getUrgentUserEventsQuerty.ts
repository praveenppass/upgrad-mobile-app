import { gql } from "@apollo/client";

const getUrgentUserEventQuery = gql`
	query urgentUserEvents($where: UrgentUserEventWhereInput) {
		urgentUserEvents(where: $where) {
			totalCount
			result {
				id
				type
				startsAt
				endsAt
				status

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
				}

				workshopSession {
					id
					name
					status
					startsAt
					endsAt
					order
					recordings {
						vimeo
						brightcove
					}
					virtualMeeting {
						joinUrl
						startUrl
						encryptedPassword
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
					endsAt
					level
					asset {
						id
						code
						name
						status
					}
					module {
						name
					}
				}

				userProfileSection
			}
		}
	}
`;

type FilterCondition = {
	_in: string[];
};

export interface ISessionUrgentQueryVariables {
	where: {
		userProgram: FilterCondition;
		user: string;
		status: FilterCondition;
		type: FilterCondition;
	};
}

export interface ISessionUrgentUserEvents {
	urgentUserEvents: ISessionEvents;
}

interface ISessionEvents {
	totalCount: number;
	result: {
		id: string;
		type: string;
		endsAt: string;
		status: string;
		userCourse: {
			id: string;
			totalProjects: number | null;
			progress: number | null;
			totalAssessments: string;
			totalLevel1Containers: number | null;
			totalLearningDuration: number | null;
			totalWorkshopSessions: number | null;
			course: {
				courseLevels: {
					name: string;
				};
				skills: {
					name: string;
				};
				name: string;
			};
			expiresAt: string;
			orderInfo: {
				paymentType: string;
				paymentLink: string;
				endsAt: string;
			};
		} | null;
		workshop: {
			id: string;
		};
		userProgram: {
			courseInfo: {
				name: string;
			};
			id: string;
			totalLevel1Containers: number;
			totalAssessments: number;
			totalProjects: number;
			progress: number;
			totalLearningDuration: number;
			totalWorkshopSessions: number;
			program: {
				level: {
					name: string;
				}[];
				name: string;
				code: string;
				skills: {
					name: string;
				}[];
				expiresAt: string | null;
				orderInfo: {
					paymentType: string;
					paymentLink: string | null;
					endsAt: string | null;
				};
			};
			mentorWindow: {
				id: string;
				name: string;
				startsAt: string;
				endsAt: string;
				mentors: [
					{
						id: string;
						firstName: string;
						lastName: string;
					},
				];
				event: {
					code: string;
					agenda: string;
				};
			};
			mentorLearner: {
				mentor: {
					id: string;
					firstName: string;
					lastName: string;
				};
			};
		};
	}[];
}

export default getUrgentUserEventQuery;
