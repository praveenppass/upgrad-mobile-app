import { gql } from "@apollo/client";

export const getHomeLearnerCourses = gql`
	query learnerCourses(
		$limit: Int
		$skip: Int
		$sort: LearnerCourseSortInput
		$where: LearnerCourseWhereInput
	) {
		learnerCourses(limit: $limit, skip: $skip, sort: $sort, where: $where) {
			result {
				id
				variant
				progress
				progressStatus
				totalLearningDuration
				specializationsPurchasedCount
				relatedUserPrograms {
					id
					courseInfo {
						name
					}
				}
				program {
					id
					code
					name
					image
					universityPartner
				}
				courseInfo {
					name
				}
				course {
					id
					code
					name
					image
				}
				workshop {
					id
					code
				}
			}
			totalCount
		}
	}
`;
