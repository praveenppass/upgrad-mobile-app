import { gql } from "@apollo/client";

const updateCourseSectionDeadlineCancel = gql`
	mutation updateCourseSectionDeadlineCancel(
		$where: UserCourseWhereUniqueInput!
	) {
		updateSectionDeadlineCancelButtonForUserCourse(where: $where) {
			id
		}
	}
`;

const updateProgramSectionDeadlineCancel = gql`
	mutation updateProgramSectionDeadlineCancel(
		$where: UserProgramWhereUniqueInput!
	) {
		updateSectionDeadlineCancelButtonForUserProgram(where: $where) {
			id
		}
	}
`;

export {
	updateCourseSectionDeadlineCancel,
	updateProgramSectionDeadlineCancel,
};
