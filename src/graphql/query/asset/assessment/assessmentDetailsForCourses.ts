import { gql } from "@apollo/client";

const getAssessmentDetailsQueryForCourses = gql`
	query getAssetFromUserCourse($where: UserCourseAssetWhereUniqueInput!) {
		getAssetFromUserCourse(where: $where) {
			timeSpent
			startsAt
			endsAt
			status
			isBookMarked
			timeSpent
			userCourse {
				id
				user {
					id
				}
				userProgram {
					program {
						enableAvailableAndDueDate
						code
					}
				}
				deliveryType {
					type
					name
					id
				}
				course {
					id
					name
					description
				}
			}
			asset {
				version
				assignment {
					summary {
						attempt {
							createdAt
						}
					}
				}
				project {
					summary {
						attempt {
							createdAt
						}
					}
				}
			}
			attempt {
				url
			}
		}
	}
`;

export interface IGetAssessmentDetailsQueryForCoursesQueryVariables {
	where: {
		asset: string;
		userProgram: string;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
	};
}

export interface IGetAssessmentDetailsQueryForCourses {
	getAssetFromUserCourse: {
		timeSpent: number;
		startsAt: string;
		endsAt: string;
		status: string;
		isBookMarked: boolean;
		userCourse: {
			id: string;
			user: {
				id: string;
			};
			userProgram: {
				program: {
					enableAvailableAndDueDate: boolean;
					code: string;
				};
			};
			deliveryType: {
				type: string;
				name: string;
				id: string;
			};
			course: {
				id: string;
				name: string;
				description: string;
			};
		};
		asset: {
			version: number;
			assignment?: {
				summary: {
					attempt: {
						createdAt: string; // ISO date string
					};
				};
			};
			project?: {
				summary: {
					attempt: {
						createdAt: string; // ISO date string
					};
				};
			};
		};
		attempt?: {
			url: string;
		};
	};
}

export interface ICourse {
	code: string;
}

export default getAssessmentDetailsQueryForCourses;
