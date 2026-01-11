import { gql } from "@apollo/client";

const getCourseBookmarkCountQuery = gql`
	query learnerCourseBookmarksCount($where: learnerCourseBookmarkInput) {
		learnerCourseBookmarksCount(where: $where) {
			totalCount
		}
	}
`;

export default getCourseBookmarkCountQuery;
