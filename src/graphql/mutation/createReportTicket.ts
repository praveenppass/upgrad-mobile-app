import { gql } from "@apollo/client";

export const createReportTicket = gql`
	mutation createReportTicket($data: CreateTicketInput!) {
		createTicket(data: $data) {
			id
			status
			subject
			category
			createdAt
			description
		}
	}
`;
