import { gql } from "@apollo/client";

const getClassOpinionCourseDetailsQuery = gql`
	query getAssetFromUserCourse($where: UserCourseAssetWhereUniqueInput!) {
		getAssetFromUserCourse(where: $where) {
			status
			userCourse {
				id
				course {
					code
				}
				deliveryType {
					id
				}
			}
			asset {
				id
				code
			}
		}
	}
`;

export interface IGetClassOpinionCourseDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
		userCourse: string | null;
	};
}
export interface IGetClassOpinionCourseDetailsQuery {
	getAssetFromUserCourse: {
		status: string;
		userCourse: {
			id: string;
			course: {
				code: string;
			};
		};
		asset: {
			id: string;
			code: string;
		};
	};
}

export default getClassOpinionCourseDetailsQuery;
