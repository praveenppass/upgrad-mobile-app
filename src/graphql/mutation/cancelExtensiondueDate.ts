import { gql } from "@apollo/client";

const cancelExtensionDueDate = gql`
	mutation cancelExtendDueAtForUserProgramContainer(
		$where: ExtendDueAtForUserProgramContainerWhereInput!
	) {
		cancelExtendDueAtForUserProgramContainer(where: $where) {
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
export { cancelExtensionDueDate };
