import { gql } from "@apollo/client";

const getTicketConversations = gql`
	query ticketConversations(
		$where: TicketWhereUniqueInput!
		$limit: Int
		$skip: Int
	) {
		ticketConversations(where: $where, limit: $limit, skip: $skip) {
			description
			attachments
			createdBy {
				... on User {
					id
					firstName
					lastName
					freshdeskUserId
					image
				}
				... on TicketAgent {
					userId
					name
				}
			}
			createdAt
		}
	}
`;

export { getTicketConversations };
