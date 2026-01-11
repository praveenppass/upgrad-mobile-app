import { gql } from "@apollo/client";

const updateUserAssetDueDate = gql`
	mutation extendDueAtForUserProgramContainer(
		$where: ExtendDueAtForUserProgramContainerWhereInput!
	) {
		extendDueAtForUserProgramContainer(where: $where) {
			level1
			level2
			level3
			level4
			asset {
				code
				name
			}
		}
	}
`;
export { updateUserAssetDueDate };
