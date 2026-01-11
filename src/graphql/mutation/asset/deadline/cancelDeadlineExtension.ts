import { gql } from "@apollo/client";

const cancelDeadlineExtension = gql`
	mutation cancelExtendDueAtForUserProgramContainer(
		$where: ExtendDueAtForUserProgramContainerWhereInput!
	) {
		cancelExtendDueAtForUserProgramContainer(where: $where) {
			asset {
				code
				name
			}
		}
	}
`;
export default cancelDeadlineExtension;

export interface ICancelExtensionQueryVariables {
	where: {
		asset: string | null;
		userProgram: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
	};
}

export interface ICancelExtensionQuery {
	asset: string | null;
}
