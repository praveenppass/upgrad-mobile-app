import { gql } from "@apollo/client";

const getProgramGPTQuery = gql`
	query userProgram($where: UserProgramWhereUniqueInput!) {
		userProgram(where: $where) {
			id
			program {
				id
				code
				enableProductivityGPT
			}
			registeredAt
		}
	}
`;

export default getProgramGPTQuery;

export interface IGetProgramGPTType {
	userProgram: {
		id: string;
		program: {
			enableProductivityGPT: boolean;
		};
		workshop: {
			id: string;
			code: string;
		};
		registeredAt: string;
	};
}
