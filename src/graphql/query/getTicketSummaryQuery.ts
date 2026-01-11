import { gql } from "@apollo/client";

const getTicketSummaryQuery = gql`
	query ticketSummary {
		ticketSummary {
			open
			closed
		}
	}
`;

export { getTicketSummaryQuery };
