import { gql } from "@apollo/client";

const getUserCourseNextAsset = gql`
	query userCourseNextAsset($where: UserCourseWhereUniqueInput!) {
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
	}
`;

export default getUserCourseNextAsset;
