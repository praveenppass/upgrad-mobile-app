import { gql } from "@apollo/client";

const getTicketCategory = gql`
	query getAllTicketCategoriesByVariant($where: TicketCategoryWhereInput) {
		allTicketCategories(where: $where) {
			id
			name
		}
	}
`;

export { getTicketCategory };
