import { gql } from "@apollo/client";

import {
	IEventStatusType,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";

const getUserEventQuery = gql`
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
				userCourse {
					id
					totalProjects
					progress
					totalAssessments
					totalLevel1Containers
					totalLearningDuration
					totalWorkshopSessions
					course {
						courseLevels {
							name
						}
						skills {
							name
						}
						name
					}
					expiresAt
					orderInfo {
						paymentType
						paymentLink
						endsAt
					}
				}
				userProgram {
					courseInfo {
						name
					}
					id
					totalLevel1Containers
					totalAssessments
					totalProjects
					progress
					totalLearningDuration
					totalWorkshopSessions
					program {
						level {
							name
						}
						name
						code
					}
					skills {
						name
					}
					expiresAt
					orderInfo {
						paymentType
						paymentLink
						endsAt
					}
				}
				workshopSession {
					name
					id
					status
					order
					startsAt
					endsAt
					recordingVisibility
					workshop {
						id
						noOfSessions
						course {
							name
						}
						program {
							name
						}
					}
					deliveryType {
						type
						name
					}
					attendance {
						status
					}
					resources {
						id
					}
					virtualMeeting {
						uuid
						joinUrl
						startUrl
						code
						uploadedFiles {
							vimeoId
							brightcoveId
						}
						encryptedPassword
					}
					virtualMeetingProvider {
						virtualMeetingProvider
						joinUrl
						configuration
					}
				}
				sessionGroup {
					id
					title
				}
				sessionGroupSession {
					id
					name
					status
					startsAt
					endsAt
					order
					isOpenDoubtForm
					enableDoubtForm
					isShowAskQuestion
					recordingVisibility
					sessionGroup {
						id
						title
						workshops {
							id
						}
						instructors {
							id
							firstName
							lastName
						}
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
					instructors {
						id
						firstName
						lastName
					}
					event {
						agenda
					}
					virtualMeeting {
						uuid
						joinUrl
						startUrl
						code
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
					resources {
						id
					}
				}
			}
		}
	}
`;

export interface IUserEvents {
	userEvents: IEvents;
}

type FilterCondition = {
	_in: {
		[k: string]: string;
	}[];
};

export interface IUserEventQueryVariables {
	skip: number;
	limit: number;
	sort: {
		endsAt: string;
	};
	where: {
		endsAt: {
			_lt: string;
			_gte: string;
		};
		type: FilterCondition;

		user: string;
		userProgram: FilterCondition;
	};
}

interface IResource {
	id: string;
}

interface IEvents {
	totalCount: number;
	result: {
		id: string;
		type: IEventType;
		startsAt: string;
		endsAt: string;
		status: IEventStatusType;
		userCourse: {
			id: string;
			totalProjects: number;
			progress: number;
			totalAssessments: number;
			totalLevel1Containers: number;
			totalLearningDuration: number;
			totalWorkshopSessions: number;
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
			};
			skills: {
				name: string;
			}[];
			expiresAt: string | null;
			orderInfo: {
				paymentType: string | null;
				paymentLink: string | null;
				endsAt: string | null;
			};
		};
		workshopSession: {
			name: string;
			id: string;
			status: string;
			order: number;
			startsAt: string;
			endsAt: string;
			recordingVisibility: boolean;
			workshop: {
				id: string;
				noOfSessions: number;
				course: {
					name: string;
				};
				program: {
					name: string;
				};
			};
			deliveryType: {
				type: string;
				name: string;
			};
			attendance: {
				status: string;
			};
			resources: IResource[];
			virtualMeeting: {
				uuid: string;
				joinUrl: string;
				startUrl: string;
				code: string;
				uploadedFiles: {
					vimeoId: string;
					brightcoveId: string;
				};
				encryptedPassword: string;
			};
			virtualMeetingProvider: {
				virtualMeetingProvider: string;
				joinUrl: string;
				configuration: string;
			};
		};
		sessionGroup: {
			id: string;
			title: string;
		};
		sessionGroupSession: {
			id: string;
			name: string;
			status: string;
			startsAt: string;
			endsAt: string;
			order: number;
			isOpenDoubtForm: boolean;
			enableDoubtForm: boolean;
			isShowAskQuestion: boolean;
			recordingVisibility: boolean;
			sessionGroup: {
				id: string;
				title: string;
				workshops: {
					id: string;
				}[];
				instructors: {
					id: string;
					firstName: string;
					lastName: string;
				}[];
			};
		};
		session: {
			id: string;
			name: string;
			status: string;
			startsAt: string;
			endsAt: string;
			recordingVisibility: boolean;
			requestedReschedule: boolean;
			rescheduledLearnerCount: number;
			instructors: {
				id: string;
				firstName: string;
				lastName: string;
			}[];
			event: {
				agenda: string;
			};
			virtualMeeting: {
				uuid: string;
				joinUrl: string;
				startUrl: string;
				code: string;
				uploadedFiles: {
					vimeoId: string;
					brightcoveId: string;
				};
				encryptedPassword: string;
			};
			virtualMeetingProvider: {
				virtualMeetingProvider: string;
				startUrl: string;
				joinUrl: string;
			};
			attendance: {
				status: string;
			};
			resources: IResource[];
		};
	}[];
}

export default getUserEventQuery;
