import { gql } from "@apollo/client";

const rejectRescheduleMentorshipSessionQuery = gql`
	mutation declineRescheduleRequestForMentorshipSession(
		$where: SessionWhereUniqueInput!
	) {
		declineRescheduleRequestForMentorshipSession(where: $where) {
			id
		}
	}
`;

export default rejectRescheduleMentorshipSessionQuery;

export interface IRejectRescheduleMentorshipSessionQuery {
	declineRescheduleRequestForMentorshipSession: {
		id: string;
	};
}

export interface IRejectRescheduleMentorshipSessionQueryVariables {
	where: {
		id: string;
	};
}
