import { gql } from "@apollo/client";

const getStudyCourseModulesListQuery = gql`
	query userCourseContainers($where: UserCourseContainerWhereInput!) {
		userCourseContainers(where: $where) {
			code
			level
			name
			aliasName
			label
			description
			totalAssets
			totalHandsOns
			duration
			isCurrent
			totalAssessments
			totalProjects
			totalAssignments
			activity {
				progress
				enableLock
				status
			}
			asset {
				code
				name
				duration
				assetType {
					name
					type
				}
				activity {
					status
					timeSpent
					isUpgraded
					isBookMarked
					startsAt
					endsAt
					isUnlockRequested
					enableLock
					level1
					level2
				}
			}
			children {
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
				asset {
					code
					name
					duration
					assetType {
						name
						type
					}
					activity {
						status
						timeSpent
						isUpgraded
						isBookMarked
						startsAt
						endsAt
						isUnlockRequested
						enableLock
						level1
						level2
					}
				}
				children {
					isCurrent
					asset {
						code
						name
						duration
						assetType {
							name
							type
						}
						activity {
							status
							timeSpent
							isUpgraded
							isBookMarked
							startsAt
							endsAt
							isUnlockRequested
							enableLock
							level1
							level2
						}
					}
				}
			}
		}
	}
`;

export default getStudyCourseModulesListQuery;

export interface IGetStudyCourseListType {
	userCourseContainers: IStudyCourseUserProgramContainer[];
}

export interface IStudyCourseUserProgramContainer {
	code: string;
	level: number;
	name: string;
	label: string;
	aliasName: string | null;
	description: string;
	duration: number;
	totalAssessments: number;
	isCurrent: boolean;
	isOptional: boolean;
	activity: Activity;
	children: IChildren[];
	trackGroup?: string;
	track?: string;
	elective?: string;
	electiveGroup?: string;
}

interface Activity {
	status: string;
	progress: number;
	enableLock: boolean;
	startsAt: string;
	endsAt: string;
	gradableAssetProgress: number;
	availableFrom: string;
	availableTill: string;
	dueAt: string;
	totalCompletedSubmissions: number;
	totalSubmissions: number;
	deadlineReferredFrom: string;
	trackChangeTill: string;
	trackSelectionFrom: string;
	trackEnableChange: boolean;
	isTrackGroup: boolean;
	isTrack: boolean;
	trackAvailableTill: string;
	isSelectedTrack: boolean;
	isElective: boolean;
	isElectiveGroup: boolean;
	electiveChangeTill: string;
	electiveAvailableTill: string;
	electiveSelectionFrom: string;
	electiveEnableChange: boolean;
	isSelectedElective: boolean;
}

export interface ExtensionRequest {
	requestedAt: string | null;
}

export interface IChildren {
	code: string;
	level: number;
	name: string;
	label: string;
	description: string | null;
	duration: number;
	totalAssessments: number;
	isCurrent: boolean;
	isOptional: boolean;
	trackGroup?: string;
	electiveGroup?: string;
	activity?: IChildrenActivity;
	children?: IChildren[];
	track?: string;
	elective?: string;
}

interface IChildrenActivity {
	status: string;
	progress: number;
	enableLock: boolean;
	startsAt: string;
	endsAt: string;
	gradableAssetProgress: number;
	availableFrom: string;
	availableTill: string;
	dueAt: string;
}
