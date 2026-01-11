import { gql } from "@apollo/client";

const createConversationForTicket = gql`
	mutation createConversationForTicket(
		$data: CreateConversationForTicketInput
		$where: TicketWhereUniqueInput!
	) {
		createConversationForTicket(data: $data, where: $where) {
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

export { createConversationForTicket };
