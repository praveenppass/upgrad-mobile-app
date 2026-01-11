import { gql } from "@apollo/client";

export const updateUserProgram = gql`
	mutation updateUserProgram(
		$where: UserProgramWhereUniqueInput!
		$data: updateUserProgramInput
	) {
		updateUserProgram(where: $where, data: $data) {
			id
		}
	}
`;

export interface IUpdateUserProgramVariables {
	data: {
		isUpgraded: boolean;
	};
	where: {
		id: string;
	};
}

export interface IUpdateUserProgramMutation {
	id: string;
}
