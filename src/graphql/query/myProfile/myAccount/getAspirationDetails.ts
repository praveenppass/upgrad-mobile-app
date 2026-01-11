import { gql } from "@apollo/client";

const getAspirationDetails = gql`
	query getLearnerCoursesProfile(
		$skip: Int
		$limit: Int
		$sort: LearnerCourseSortInput
		$where: LearnerCourseWhereInput
	) {
		learnerCourses(limit: $limit, skip: $skip, sort: $sort, where: $where) {
			result {
				id
				courseDeliveryType {
					name
				}
				deliveryType {
					name
				}
				program {
					id
					code
					name
					level {
						name
					}
				}
				course {
					id
					code
					name
					courseLevels {
						name
					}
				}
				courseInfo {
					name
				}
				workshop {
					id
				}
			}
		}
	}
`;

export default getAspirationDetails;

export interface IAspirationDetails {
	learnerCourses: {
		result: IAspiration[];
	};
}

export interface IAspiration {
	id: string;
	courseDeliveryType?: {
		name: string;
	};
	deliveryType?: {
		name: string;
	};
	course?: {
		name: string;
		code: string;
		id: string;
		courseLevels: Array<{
			name: string;
		}>;
	};
	courseInfo?: {
		name: string;
	};
	program?: {
		name: string;
		code: string;
		id: string;
		level: Array<{
			name: string;
		}>;
	};
	workshop?: {
		id: string;
	};
}
