import { gql } from "@apollo/client";

const getMentorshipAvailableSlotsQuery = gql`
	query availableMentorSlots($where: MentorSlotsWhereInput!) {
		availableMentorSlots(where: $where) {
			id
			startsAt
			endsAt
		}
	}
`;

export default getMentorshipAvailableSlotsQuery;

export interface IGetMentorshipAvailableSlotsQuery {
	availableMentorSlots: {
		id: string;
		startsAt: string;
		endsAt: string;
	}[];
}

export interface IGetMentorshipAvailableSlotsQueryVariables {
	where: {
		mentorWindow: string;
		workshop: string;
		endsAt: {
			_lte: string;
		};
		startsAt: {
			_gte: string;
		};
	};
}
