import { gql } from "@apollo/client";

const getCourseBookmarkCourseQuery = gql`
	query bookmarksForUserCourse($where: BookmarksForUserCourseWhereInput!) {
		bookmarksForUserCourse(where: $where) {
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

export default getCourseBookmarkCourseQuery;
