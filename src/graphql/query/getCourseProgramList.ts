import { gql } from "@apollo/client";

const getCourseProgramList = gql`
	query allLearnerCourses($where: LearnerCourseWhereInput) {
		allLearnerCourses(where: $where) {
			... on UserCourse {
				id
				course {
					code
					name
				}
				courseInfo {
					name
				}
				deliveryType {
					id
					name
				}
			}
			... on UserProgram {
				id
				program {
					code
					name
				}
				deliveryType {
					id
					name
				}
				workshop {
					disableRaiseRequest
				}
				courseInfo {
					name
				}
			}
		}
	}
`;

export interface ILearnerCourse {
	id: string;
	course?: {
		code: string;
		name: string;
	};
	program?: {
		code: string;
		name: string;
	};
	deliveryType?: {
		id: string;
		name: string;
	};
	courseInfo?: {
		name: string;
	};
	workshop?: {
		disableRaiseRequest: boolean | null;
	};
}

export interface IGetCourseProgramListResponse {
	allLearnerCourses: ILearnerCourse[];
}

export interface IUserCourseListInputVariables {
	where: {
		user: string;
	};
}

export { getCourseProgramList };
