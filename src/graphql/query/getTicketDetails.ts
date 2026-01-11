import { gql } from "@apollo/client";

export const getTicketDetails = gql`
	query getTicketDetails($where: TicketWhereUniqueInput!) {
		ticket(where: $where) {
			id
			qId
			category
			subject
			description
			status
			userCourse {
				id
				workshop {
					startsAt
					endsAt
				}
				deliveryType {
					id
					name
					type
				}
				course {
					id
					name
				}
			}
			userProgram {
				id
				workshop {
					startsAt
					endsAt
				}
				deliveryType {
					id
					name
					type
				}
				program {
					id
					name
				}
				courseInfo {
					name
				}
			}
			attachments
			createdBy {
				id
				firstName
				lastName
				freshdeskUserId
			}
			createdAt
		}
	}
`;
