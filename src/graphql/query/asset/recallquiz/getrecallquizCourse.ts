import { gql } from "@apollo/client";

const getRecallquizCourseDetails = gql`
	query getAssetFromUserCourse($where: UserCourseAssetWhereUniqueInput!) {
		getAssetFromUserCourse(where: $where) {
			asset {
				recallQuiz
			}
			userCourse {
				id
				user {
					id
				}
				deliveryType {
					id
					name
					type
				}
				workshop {
					id
				}
				course {
					id
					code
					name
				}
			}
		}
	}
`;
export interface IGetRecallquizCourseDetailsQuery {
	getAssetFromUserCourse: IGetAssetFromUserCourse;
}
export interface IGetAssetFromUserCourse {
	status: string;
	userCourse: ICourseDetailsUserCourse;
	asset: ICourseAsset;
}
export interface ICourseDetailsUserCourse {
	id?: string;
	workshop: {
		id: string | null;
	};
	user: {
		id: string;
	};
	deliveryType: {
		id: string | null;
		name: string | null;
		type: string | null;
	};
	course: ICourse;
}
export interface ICourse {
	id: string;
	name: string;
	code: string;
}
export interface ICourseSkill {
	id: string;
	name: string;
}
export interface ICourseSubSkill {
	id: string;
	name: string;
}
export interface ICourseAsset {
	id: string;
	code: string;
	recallQuiz: string;
}
export interface IGetRecallqueryCourseDetailsQueryVariables {
	where: {
		asset: string | null;
		level1: string | null;
		level2: string | null;
		level3?: string | null;
		level4?: string | null;
		userCourse: string | null;
	};
}
export default getRecallquizCourseDetails;
