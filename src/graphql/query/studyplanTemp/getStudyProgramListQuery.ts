import { gql } from "@apollo/client";

const getStudyProgramListQuery = gql`
	query userProgramContainers($where: UserProgramContainerWhereInput!) {
		userProgramContainers(where: $where) {
			code
			level
			name
			label
			aliasName
			description
			duration
			totalAssessments
			isCurrent
			isOptional
			trackGroup
			electiveGroup
			children {
				code
				level
				name
				label
				description
				duration
				totalAssessments
				isCurrent
				isOptional
				trackGroup
				electiveGroup
				children {
					code
					level
					name
					label
					description
					duration
					totalAssessments
					isCurrent
					isOptional
					trackGroup
					electiveGroup
					activity {
						status
						progress
						enableLock
						startsAt
						endsAt
						gradableAssetProgress
						availableFrom
						availableTill
						dueAt
						deadlineReferredFrom
					}
				}
				activity {
					status
					progress
					enableLock
					startsAt
					endsAt
					gradableAssetProgress
					status
					availableFrom
					availableTill
					dueAt
					deadlineReferredFrom
					extensionRequests {
						requestedAt
					}
					isElective
					isElectiveGroup
					electiveChangeTill
					electiveAvailableTill
					electiveSelectionFrom
					electiveEnableChange
					isSelectedElective
				}
			}
			activity {
				status
				progress
				enableLock
				startsAt
				endsAt
				gradableAssetProgress
				availableFrom
				availableTill
				dueAt
				totalCompletedSubmissions
				totalSubmissions
				deadlineReferredFrom
				extensionRequests {
					requestedAt
				}
				trackChangeTill
				trackSelectionFrom
				trackEnableChange
				isTrackGroup
				isTrack
				trackAvailableTill
				isSelectedTrack
				isElective
				isElectiveGroup
				electiveChangeTill
				electiveAvailableTill
				electiveSelectionFrom
				electiveEnableChange
				isSelectedElective
			}
			activity {
				progress
				enableLock
				startsAt
				endsAt
				gradableAssetProgress
				status
			}
		}
	}
`;

export default getStudyProgramListQuery;

export interface IGetStudyCourseListType {
	userProgramContainers: IStudyCourseUserProgramContainer[];
}

export interface IStudyCourseUserProgramContainer {
	code: string;
	level: number;
	name: string;
	label: string;
	aliasName: string;
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
	extensionRequests: ExtensionRequest[] | null;
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
	extensionRequests: null;
}
