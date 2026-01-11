import { gql } from "@apollo/client";

const deleteAssetBookmarkQuery = gql`
	mutation deleteBookmark($where: BookmarkWhereInput!) {
		deleteBookmark(where: $where) {
			id
		}
	}
`;

export interface IDeleteAssetBookmarkQueryVariables {
	where: {
		asset: string;
		userCourse?: string;
		userProgram?: string;
	};
}

export interface IDeleteAssetBookmarkQuery {
	id: string;
}

export default deleteAssetBookmarkQuery;
