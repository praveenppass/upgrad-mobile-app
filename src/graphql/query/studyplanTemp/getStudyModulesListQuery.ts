import { gql } from "@apollo/client";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

const getStudyModulesListQuery = gql`
	query userProgramContainers($where: UserProgramContainerWhereInput!) {
		userProgramContainers(where: $where) {
			code
			level
			name
			label
			aliasName
			description
			duration
			isCurrent
			isOptional
			activity {
				isFromDeferral
				status
				totalSubmissions
				totalCompletedSubmissions
				progress
				enableLock
				startsAt
				endsAt
				duration
				completedDuration
				availableFrom
				availableTill
				dueAt
				realDueAt
				deadlineReferredFrom
				extensionRequests {
					requestedAt
				}
				totalCompletedGradableAssets
				totalGradableAssets
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
					extensionRequests {
						requestedAt
					}
					deadlineReferredFrom
					availableTill
				}
			}
		}
	}
`;
export default getStudyModulesListQuery;

export interface IStudyModulesListType {
	userProgramContainers: IStudyUserProgramContainer[];
}

export interface IStudyUserProgramContainer {
	code: string;
	level: number;
	name: string;
	label: null;
	aliasName: string | null;
	description: null;
	duration: number;
	isCurrent: boolean;
	isOptional: boolean;
	activity: IActivity;
	asset: Asset;
	totalCompletedGradableAssets: number;
	totalGradableAssets: number;
}

export interface IActivity {
	isFromDeferral: boolean;
	status: string;
	totalSubmissions: number;
	totalCompletedSubmissions: number;
	progress: number;
	enableLock: boolean;
	startsAt: string;
	endsAt: string;
	duration: number;
	completedDuration: number;
	availableFrom: string;
	availableTill: string;
	dueAt: string;
	deadlineReferredFrom: string;
	extensionRequests: ExtensionRequest[] | null;

	totalCompletedGradableAssets: number;
	totalGradableAssets: number;
}
interface Asset {
	id: string;
	code: string;
	name: string;
	duration: number;
	assetType: AssetType;
	activity: AssetActivity;
}

interface AssetActivity {
	status: IAssetStatusEnum;
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
	extensionRequests: ExtensionRequest[] | null;
	deadlineReferredFrom: string;
	availableTill: string;
	totalCompletedGradableAssets: number;
	totalGradableAssets: number;
}
export interface ExtensionRequest {
	requestedAt: string | null;
}
interface AssetType {
	type: IAssetType;
	name: string;
}
