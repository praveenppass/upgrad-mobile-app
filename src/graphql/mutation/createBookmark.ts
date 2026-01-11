import { gql } from "@apollo/client";

export const createBookmark = gql`
	mutation createBookmark($data: createBookmarkInput!) {
		createBookmark(data: $data) {
			id
		}
	}
`;
