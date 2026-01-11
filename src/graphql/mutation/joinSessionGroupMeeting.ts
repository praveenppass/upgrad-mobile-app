import { gql } from "@apollo/client";

export const joinSessionGroupMeeting = gql`
	mutation manageAttendanceForSessionGroupSession(
		$data: ManageAttendanceForSessionGroupSessionInput!
	) {
		manageAttendanceForSessionGroupSession(data: $data) {
			status
		}
	}
`;
