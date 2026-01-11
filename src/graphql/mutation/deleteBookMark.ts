import { gql } from "@apollo/client";

const deleteBookmark = gql`
	mutation deleteBookmark($where: BookmarkWhereInput!) {
		deleteBookmark(where: $where) {
			id
		}
	}
`;

export { deleteBookmark };
