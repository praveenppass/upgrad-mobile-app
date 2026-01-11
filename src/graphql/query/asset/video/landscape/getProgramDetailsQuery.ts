import { gql } from "@apollo/client";

const getVideoProgramDetailsQuery = gql`
	query userEvent($where: UserEventWhereUniqueInput!) {
		userEvent(where: $where) {
			startsAt
			endsAt
			status
			userProgram {
				courseInfo {
					name
				}
			}
			workshopSession {
				name
				id
				status
				order
				startsAt
				endsAt
				attendance {
					status
				}
				virtualMeeting {
					uuid
					code
				}
				agenda {
					agenda
				}
			}
			session {
				agenda {
					agenda
				}
				virtualMeeting {
					id
					code
					uuid
				}
			}
		}
	}
`;

export default getVideoProgramDetailsQuery;

export interface IGetVideoProgramDetailsVariable {
	where: {
		id: string;
	};
}

export interface IVideoProgramDetailsUserEvent {
	userEvent: {
		startsAt: string;
		endsAt: string;
		status: string;
		userProgram: {
			courseInfo: {
				name: string;
			};
		};
		workshopSession: {
			name: string;
			id: string;
			status: string;
			order: number;
			startsAt: string;
			endsAt: string;
			attendance: {
				status: string;
			};
			virtualMeeting: {
				uuid: string;
				code: string;
			};
			agenda: {
				agenda: string;
			};
		};
		session: {
			agenda: {
				agenda: string;
			};
			virtualMeeting: {
				id: string;
				code: string;
				uuid: string;
			};
		};
	};
}
