import { gql } from "@apollo/client";

const getModuleNameForProgramQuery = gql`
	query getModuleName($where: UserProgramContainerWhereInput!) {
		userProgramContainer(where: $where) {
			name
		}
	}
`;

export default getModuleNameForProgramQuery;

export interface IGetModuleNameForProgramQueryVariables {
	where: {
		id: string;
		level1: string;
		level2: string;
	};
}

export interface IGetModuleNameForProgramQueryData {
	userProgramContainer: {
		name: string;
	};
}
