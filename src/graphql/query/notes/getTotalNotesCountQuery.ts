import { gql } from "@apollo/client";

const getTotalNotesCount = gql`
	query learnerCourseNotesCount($where: notesCountWhereInput) {
		learnerCourseNotesCount(where: $where) {
			totalCount
		}
	}
`;

export default getTotalNotesCount;

export interface ITotalNotesCount {
	learnerCourseNotesCount: {
		totalCount: number;
	};
}
