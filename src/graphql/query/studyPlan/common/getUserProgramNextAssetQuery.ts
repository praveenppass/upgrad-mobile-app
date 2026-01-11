import { gql } from "@apollo/client";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

const getUserProgramNextAssetQuery = gql`
	query userProgramNextAsset(
		$where: UserProgramWhereUniqueInput!
		$userProgramWhere: UserProgramWhereUniqueInput!
	) {
		userProgramNextAsset(where: $where) {
			aliasName
			asset {
				code
				name
				assetType {
					type
				}
			}
			parent {
				name
				label
			}
			activity {
				level
				level1
				level2
				level3
				level4
				track
				trackGroup
				elective
				electiveGroup
				status
				isUpgraded
				enableLock
				startsAt
				endsAt
				availableTill
			}
		}
		userProgram(where: $userProgramWhere) {
			id
			program {
				id
			}
			workshop {
				id
				code
			}
			progress
		}
	}
`;
export default getUserProgramNextAssetQuery;

export interface IGetUserProgramNextAssetQuery {
	userProgramNextAsset: {
		aliasName: string | null;
		asset: {
			code: string | null;
			name: string | null;
			assetType: { type: IAssetType };
		};
		parent: {
			name: string | null;
			label: string | null;
		};
		activity: {
			level: number | null;
			level1: string | null;
			level2: string | null;
			level3: string | null;
			level4: string | null;
			track: string | null;
			trackGroup: string | null;
			elective: string | null;
			electiveGroup: string | null;
			status: IAssetStatusEnum;
			isUpgraded: boolean;
			enableLock: boolean;
			startsAt: string | null;
			endsAt: string | null;
			availableTill: string | null;
		};
	};

	userProgram: {
		id: string;
		program: {
			id: string;
		};
		workshop: {
			id: string;
			code: string;
		};
		progress: number;
	};
}

export interface IGetUserProgramNextAssetQueryVariables {
	where: {
		id: string;
	};
	userProgramWhere: {
		id: string;
	};
}
