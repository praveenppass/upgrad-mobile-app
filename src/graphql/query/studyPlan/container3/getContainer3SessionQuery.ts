import { gql } from "@apollo/client";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

const getContainer3SessionQuery = gql`
	query userProgramContainers($where: UserProgramContainerWhereInput!) {
		userProgramContainers(where: $where) {
			code
			label
			name
			isOptional
			aliasName
			activity {
				progress
				enableLock
				status
			}
			asset {
				code
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
				id
				code
				name
				assetType {
					type
				}
			}
			children {
				label
				isOptional
				aliasName
				activity {
					status
					enableLock
				}
				asset {
					name
					code
					assetType {
						type
					}
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
	}
`;

export default getContainer3SessionQuery;

export interface IGetContainer3SessionQueryVariables {
	where: {
		id: string;
		level1: string;
		level2: string;
		level3: string;
	};
}

export interface IGetContainer3SessionQueryData {
	userProgramContainers: IUserProgramContainer[];
}

export interface IUserProgramContainer {
	code: string;
	label: string;
	name: string;
	isOptional: boolean;
	aliasName: string;
	activity: {
		progress: number;
		enableLock: boolean;
		status: IAssetStatusEnum;
	};
	asset: {
		id: string;
		code: string;
		name: string;
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
		assetType: {
			type: IAssetType;
		};
	};
	children: {
		label: string;
		isOptional: boolean;
		aliasName: string;
		activity: {
			status: IAssetStatusEnum;
			enableLock: boolean;
		};
		asset: {
			name: string;
			code: string;
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
	}[];
}
