import { gql } from "@apollo/client";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

const getUserCourseNextAssetQuery = gql`
	query userCourseNextAsset(
		$where: UserCourseWhereUniqueInput!
		$userCourseWhere: UserCourseWhereUniqueInput!
	) {
		userCourseNextAsset(where: $where) {
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
				aliasName
			}
			activity {
				level
				level1
				level2
				level3
				level4
				status
				isUpgraded
				isBookMarked
				enableLock
				startsAt
				endsAt
			}
		}
		userCourse(where: $userCourseWhere) {
			workshop {
				id
				code
			}
			progress
		}
	}
`;

export default getUserCourseNextAssetQuery;

export interface IGetUserCourseNextAssetQuery {
	userCourseNextAsset: {
		asset: {
			code: string | null;
			name: string | null;
			assetType: { type: IAssetType };
		};
		parent: {
			name: string | null;
			label: string | null;
			aliasName: string | null;
		};
		activity: {
			level: number | null;
			level1: string | null;
			level2: string | null;
			level3: string | null;
			level4: string | null;
			status: IAssetStatusEnum;
			isUpgraded: boolean;
			isBookMarked: boolean;
			enableLock: boolean;
			startsAt: string | null;
			endsAt: string | null;
		};
	};
	userCourse: {
		workshop: {
			id: string;
			code: string;
		};
		progress: number;
	};
}

export interface IGetUserCourseNextAssetQueryVariables {
	where: {
		id: string;
	};
	userCourseWhere: {
		id: string;
	};
}
