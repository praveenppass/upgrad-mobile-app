import { gql } from "@apollo/client";

const createAssetBookmarkQuery = gql`
	mutation createBookmark($where: createBookmarkInput!) {
		createBookmark(data: $where) {
			id
		}
	}
`;

export interface ICreateAssetBookmarkQueryVariables {
	where: {
		asset: string;
		userCourse?: string;
		userProgram?: string;
	};
}

export interface ICreateAssetBookmarkQuery {
	id: string;
}

export default createAssetBookmarkQuery;
