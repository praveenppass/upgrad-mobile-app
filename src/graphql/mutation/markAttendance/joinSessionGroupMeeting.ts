import { gql } from "@apollo/client";

const joinSessionGroupMeetingQuery = gql`
	mutation manageAttendanceForSessionGroupSession(
		$data: ManageAttendanceForSessionGroupSessionInput!
	) {
		manageAttendanceForSessionGroupSession(data: $data) {
			status
		}
	}
`;

export default joinSessionGroupMeetingQuery;

export interface IJoinSessionGroupMeetingQuery {
	manageAttendanceForSessionGroupSession: {
		status: string;
	};
}

export interface IJoinSessionGroupVariables {
	data: {
		sessionGroup: string;
		sessionGroupSession: string;
		user: string;
		status: string;
	};
}
