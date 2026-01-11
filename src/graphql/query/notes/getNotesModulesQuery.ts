import { gql } from "@apollo/client";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

const getNotesAndBookModuleListQuery = gql`
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
			activity {
				status
				progress
				enableLock
				startsAt
				endsAt
				duration
				completedDuration
			}
			asset {
				id
				code
				name
				duration
				assetType {
					type
					name
				}
				activity {
					status
					isBookMarked
					timeSpent
					expiresAt
					isUpgraded
					startsAt
					endsAt
					isUnlockRequested
					enableLock
					isBookMarked
					level1
					level2
					level3
					level4
					availableTill
				}
			}
		}
	}
`;

``;
export default getNotesAndBookModuleListQuery;

export interface INoteBookModuleType {
	userProgramContainers: IUserProgramContainer[];
}

export interface IUserProgramContainer {
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
	asset: IAsset;
}

export interface Activity {
	status: string;
	progress: number;
	enableLock: boolean;
	startsAt: string;
	endsAt: string;
	duration: number;
	completedDuration: number;
}

export interface IAsset {
	id?: string;
	code?: string;
	name?: string;
	duration?: number;
	assetType?: AssetType;
	activity: Activity2;
	index?: number;
}

export interface AssetActivity {
	status?: IAssetStatusEnum;
	timeSpent?: number;
	expiresAt?: string;
	isUpgraded?: boolean;
	startsAt?: string;
	endsAt?: string;
	isUnlockRequested?: boolean;
	enableLock?: boolean | null;
	isBookMarked?: boolean;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	deadlineReferredFrom?: string;
	availableTill?: string;
}
export interface ExtensionRequest {
	requestedAt?: null;
}
export interface AssetType {
	type?: IAssetType;
	name?: string;
}

export interface Activity2 {
	status: string;
	isBookMarked: boolean;
	timeSpent: number;
	expiresAt: string;
	isUpgraded: boolean;
	startsAt: string;
	endsAt: string;
	isUnlockRequested: boolean;
	enableLock: boolean;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	availableTill: string;
}
