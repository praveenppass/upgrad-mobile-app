import { gql } from "@apollo/client";

const cancelProgramModuleExtendedDeadlineQuery = gql`
	mutation cancelExtendDueAtForUserProgramContainer(
		$where: ExtendDueAtForUserProgramContainerWhereInput!
	) {
		cancelExtendDueAtForUserProgramContainer(where: $where) {
			id
		}
	}
`;

export interface ICancelExtensionQueryVariables {
	where: {
		userProgram: string;
		level1: string;
		level2: string;
	};
}

export interface ICancelExtensionQuery {
	id: string;
}

export default cancelProgramModuleExtendedDeadlineQuery;
