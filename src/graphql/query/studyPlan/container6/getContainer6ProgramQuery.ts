import { gql } from "@apollo/client";

const getContainer6ProgramQuery = gql`
	query getContainer3ProgramData(
		$where: UserProgramContainerWhereInput!
		$userProgramContainerWhere: UserProgramContainerWhereInput!
	) {
		userProgramContainers(where: $where) {
			code
			name
			label
			asset {
				code
			}
		}
		userProgramContainer(where: $userProgramContainerWhere) {
			name
			label
		}
	}
`;

export default getContainer6ProgramQuery;

interface IUserProgramContainerWhere {
	id: string;
	level1?: string;
}

export interface IGetContainer6ProgramQueryVariables {
	where: IUserProgramContainerWhere;
	userProgramContainerWhere: IUserProgramContainerWhere;
}

export interface IGetContainer6ProgramQueryData {
	userProgramContainers: IUserProgramContainer[];
	userProgramContainer: IUserProgramContainerHeader;
}

interface IUserProgramContainerHeader {
	name: string;
	label: string;
}

export interface IUserProgramContainer {
	code: string;
	name: string;
	label: string;
	asset: {
		code: string;
	};
}
