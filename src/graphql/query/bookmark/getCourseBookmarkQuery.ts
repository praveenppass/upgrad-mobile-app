import { gql } from "@apollo/client";

const getBookmarkCourseQuery = gql`
	query bookmarksForUserProgram($where: BookmarksForUserProgramWhereInput!) {
		bookmarksForUserProgram(where: $where) {
			code
			label
			name
			level1
			level2
			level3
			level4
			totalBookmarks
			asset {
				level1
				level2
				level3
				level4
				code
				name
				assetType {
					type
					name
				}
			}
		}
	}
`;
export default getBookmarkCourseQuery;
export interface IBookmarkQueryVariable {
	where: {
		userProgram: string;
	};
}
export interface IBookmarkCourseType {
	bookmarksForUserProgram: BookmarksForUserProgram[];
}

export interface BookmarksForUserProgram {
	asset: IassetType | null;
	code: string;
	label: string;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	name: string;
	totalBookmarks: number;
	description: string;
}

interface IassetType {
	code: string;
	name: string;
}
