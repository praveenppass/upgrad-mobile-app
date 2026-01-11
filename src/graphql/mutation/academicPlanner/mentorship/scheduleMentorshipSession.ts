import { gql } from "@apollo/client";

const scheduleMentorshipSessionQuery = gql`
	mutation createMentorshipSessionForWorkshop(
		$where: CreateMentorshipSessionForWorkshopWhereInput!
		$data: CreateMentorshipSessionForWorkshopInput!
	) {
		createMentorshipSessionForWorkshop(where: $where, data: $data) {
			id
			startsAt
			endsAt
		}
	}
`;

export default scheduleMentorshipSessionQuery;

export interface IScheduleMentorshipSessionQuery {
	createMentorshipSessionForWorkshop: {
		id: string;
		startsAt: string;
		endsAt: string;
	};
}

export interface IScheduleMentorshipSessionQueryVariables {
	data: {
		mentorSlot: string;
	};
	where: {
		workshop: string;
		event: string;
		mentorWindow: string;
	};
}
