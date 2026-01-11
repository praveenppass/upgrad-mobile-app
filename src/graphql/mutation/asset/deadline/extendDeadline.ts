import { gql } from "@apollo/client";

const extendDeadline = gql`
	mutation extendDueAtForUserProgramContainer(
		$where: ExtendDueAtForUserProgramContainerWhereInput!
	) {
		extendDueAtForUserProgramContainer(where: $where) {
			asset {
				code
				name
			}
		}
	}
`;
export default extendDeadline;

export interface IExtensionQueryVariables {
	where: {
		asset: string | null;
		userProgram: string | null;
		level1: string | null;
		level2: string | null;
		level3: string | null;
		level4: string | null;
	};
}

export interface IExtensionQuery {
	asset: string | null;
}
