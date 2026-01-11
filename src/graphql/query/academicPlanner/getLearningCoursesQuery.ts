import { gql } from "@apollo/client";

const getLearningCoursesQuery = gql`
	query learnerCourses(
		$limit: Int
		$skip: Int
		$sort: LearnerCourseSortInput
		$where: LearnerCourseWhereInput
	) {
		learnerCourses(limit: $limit, skip: $skip, sort: $sort, where: $where) {
			result {
				id
				courseInfo {
					name
				}
			}
			totalCount
		}
	}
`;

export interface ILearningCourses {
	learnerCourses: ILearningCourse;
}

type ISort = {
	updatedAt: string;
};
export interface ILearningCourseVariables {
	skip: number;
	sort: ISort;
}

type CourseInfo = {
	name: string;
};

export interface ILearningCourse {
	result: {
		id: string;
		courseInfo: CourseInfo;
	}[];
	totalCount: number | null;
}

export default getLearningCoursesQuery;
