import { gql } from "@apollo/client";

const userProgramNextAsset = gql`
	query userProgramNextAsset($where: UserProgramWhereUniqueInput!) {
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
	}
`;
export { userProgramNextAsset };
