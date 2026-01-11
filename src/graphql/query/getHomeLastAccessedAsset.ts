import { gql } from "@apollo/client";

export const getHomeLastAccessedAsset = gql`
	query lastAccessedAsset(
		$where: LastAccessedAssetWhereInput
		$sort: LastAccessedAssetSortInput
	) {
		lastAccessedAsset(where: $where, sort: $sort) {
			asset {
				id
				code
				name
				assetType {
					type
				}
			}
			userProgram {
				id
				workshop {
					id
					code
				}
				program {
					id
					code
					name
					variant
					universityPartner
				}
				courseInfo {
					name
				}
				progress
				progressStatus
			}
			activity {
				level1
				aliasName
				level2
				level3
				level4
				track
				trackGroup
				elective
				electiveGroup
				status
			}
		}
	}
`;
