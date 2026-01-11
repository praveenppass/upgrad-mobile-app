import { gql } from "@apollo/client";

const getTicketCardQuery = gql`
	query tickets(
		$where: TicketWhereInput
		$limit: Int
		$skip: Int
		$sort: TicketSortInput
	) {
		tickets(where: $where, limit: $limit, skip: $skip, sort: $sort) {
			id
			subject
			description
			description_text
			category
			status
			priority
			attachments
			workshopId
			userId
			tags
			zendeskTicketId
			freshdeskInfo {
				id
			}
			createdAt
			updatedAt
			userCourse {
				course {
					name
				}
			}
			userProgram {
				program {
					name
				}
			}
		}
	}
`;

export { getTicketCardQuery };
