import { gql } from "@apollo/client";

const rescheduleMentorshipSessionQuery = gql`
	mutation rescheduleMentorshipSession(
		$where: SessionWhereUniqueInput!
		$data: RescheduleSessionDataInput!
	) {
		rescheduleMentorshipSession(where: $where, data: $data) {
			id
			startsAt
			endsAt
		}
	}
`;

export default rescheduleMentorshipSessionQuery;

export interface IRescheduleMentorshipSessionQuery {
	rescheduleMentorshipSession: {
		id: string;
		startsAt: string;
		endsAt: string;
	};
}

export interface IRescheduleMentorshipSessionQueryVariables {
	data: {
		mentorSlot: string;
	};
	where: {
		id: string;
	};
}
