import { gql } from "@apollo/client";

const getStudyCourseContainerQuery = gql`
	query userCourseContainers($where: UserCourseContainerWhereInput!) {
		userCourseContainers(where: $where) {
			code
			level
			name
			label
			description
			totalAssets
			totalAssessments
			totalProjects
			totalAssignments
			totalHandsOns
			duration
			isCurrent
			activity {
				progress
				enableLock
			}
		}
	}
`;

export default getStudyCourseContainerQuery;

export interface IStudyCourseContainer {
	userCourseContainers: IUserCourseContainer[];
}

export interface IUserCourseContainer {
	code: string;
	level: number;
	name: string;
	label: string;
	description: string;
	totalAssets: number;
	totalAssessments: number;
	totalProjects: number;
	totalAssignments: number;
	totalHandsOns: number;
	duration: string;
	isCurrent: boolean;
	activity: {
		progress: number;
		enableLock: string;
	};
}
