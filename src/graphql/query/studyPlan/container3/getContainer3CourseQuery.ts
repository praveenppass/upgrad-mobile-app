import { gql } from "@apollo/client";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

const getContainer3CourseQuery = gql`
	query getContainer3CourseData(
		$where: UserCourseContainerWhereInput!
		$userCourseContainerWhere: UserCourseContainerWhereInput!
	) {
		userCourseContainers(where: $where) {
			code
			name
			label
			asset {
				code
			}
			activity {
				progress
				enableLock
				status
			}
			duration
			children {
				name
				asset {
					code
					name
					assetType {
						type
					}
					isOptional
					activity {
						status
						enableLock
						level1
						level2
						level3
						level4
						elective
						electiveGroup
						track
						trackGroup
					}
				}
			}
		}
		userCourse: userCourseContainers(where: $userCourseContainerWhere) {
			code
			name
			label
		}
	}
`;

export default getContainer3CourseQuery;

export interface IUserCourseContainerWhere {
	id: string;
	level1?: string;
}
export interface IGetContainer3CourseQueryVariables {
	where: IUserCourseContainerWhere;
	userCourseContainerWhere: IUserCourseContainerWhere;
}

export interface IGetContainer3CourseQueryData {
	userCourseContainers: IUserCourseContainer[];
	userCourse: IUserCourseContainerGroup[];
}

export interface IUserCourseContainerGroup {
	isOptional: boolean;
	name: string;
	code: string;
	label: string;
}

export interface IUserCourseContainer {
	code: string;
	name: string;
	label: string;
	asset: {
		code: string;
	};
	activity: {
		progress: number;
		enableLock: boolean;
		status: string;
	};
	duration: number;
	children: IUserCourseContainer3Child[];
}

export interface IUserCourseContainer3Child {
	name: string;
	aliasName: string;
	asset: {
		code: string;
		name: string;
		assetType: {
			type: IAssetType;
		};
		activity: {
			status: IAssetStatusEnum;
			enableLock: boolean;
			level1: string;
			level2: string;
			level3: string;
			level4: string;
			elective: string;
			electiveGroup: string;
			track: string;
			trackGroup: string;
		};
	};
	isOptional: boolean;
	code: string;
}
