import { gql } from "@apollo/client";

const extendProgramModuleDeadline = gql`
	mutation extendDueAtForUserProgramContainer(
		$where: ExtendDueAtForUserProgramContainerWhereInput!
	) {
		extendDueAtForUserProgramContainer(where: $where) {
			id
		}
	}
`;

export interface IExtensionQueryVariables {
	where: {
		userProgram: string;
		level1: string;
		level2: string;
	};
}

export interface IExtensionQuery {
	id: string;
}

export default extendProgramModuleDeadline;
