import { gql } from "@apollo/client";

const joinSessionAttendanceQuery = gql`
	mutation createSessionAttendance($data: CreateSessionAttendanceInput!) {
		createSessionAttendance(data: $data) {
			status
		}
	}
`;

export default joinSessionAttendanceQuery;

export interface IJoinSessionAttendanceQuery {
	createSessionAttendance: {
		status: string;
	};
}

export interface IJoinSessionVariables {
	data: {
		session: string;
		user: string;
		status: string;
	};
}
