import { gql } from "@apollo/client";

const getLiveSessionCoursesQuery = gql`
	query liveSessionCourses($where: UserProgramWhereUniqueInput!) {
		liveSessionCourses(where: $where) {
			result {
				programCode
				deliveryTypeId
				level1
				name
				label
				trackGroup {
					programCode
					deliveryTypeId
					trackGroup
					track
					electiveGroup
					elective
				}
				track {
					programCode
					deliveryTypeId
					trackGroup
					track
					electiveGroup
					elective
				}
				electiveGroup {
					programCode
					deliveryTypeId
					trackGroup
					track
					electiveGroup
					elective
				}
				elective {
					programCode
					deliveryTypeId
					trackGroup
					track
					electiveGroup
					elective
				}
			}
			totalCount
		}
	}
`;

export interface ILiveSessionCourseResult {
	programCode: string;
	deliveryTypeId: string;
	level1: string;
	name: string;
	label: string;
	trackGroup?: {
		programCode: string;
		deliveryTypeId: string;
		trackGroup: string;
		track: string;
		electiveGroup: string;
		elective: string;
	};
	track?: {
		programCode: string;
		deliveryTypeId: string;
		trackGroup: string;
		track: string;
		electiveGroup: string;
		elective: string;
	};
	electiveGroup?: {
		programCode: string;
		deliveryTypeId: string;
		trackGroup: string;
		track: string;
		electiveGroup: string;
		elective: string;
	};
	elective?: {
		programCode: string;
		deliveryTypeId: string;
		trackGroup: string;
		track: string;
		electiveGroup: string;
		elective: string;
	};
}

export interface ILiveSessionCoursesResponse {
	liveSessionCourses: {
		result: ILiveSessionCourseResult[];
		totalCount: number;
	};
}

export interface ILiveSessionCoursesVariables {
	where: {
		id: string;
	};
}

export default getLiveSessionCoursesQuery;
