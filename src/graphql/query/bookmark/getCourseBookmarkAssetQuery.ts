import { gql } from "@apollo/client";

const getCourseBookmarkAssetQuery = gql`
	query bookmarksForUserCourse($where: BookmarksForUserCourseWhereInput!) {
		bookmarksForUserCourse(where: $where) {
			code
			label
			aliasName
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

export default getCourseBookmarkAssetQuery;
