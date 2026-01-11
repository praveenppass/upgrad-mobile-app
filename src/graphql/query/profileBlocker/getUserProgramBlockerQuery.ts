import { gql } from "@apollo/client";

const getUserProgramBlockerQuery = gql`
	query userProgram($where: UserProgramWhereUniqueInput!) {
		userProgram(where: $where) {
			id
			workshop {
				id
				contentStartsAt
				startsAt
			}
			program {
				id
				code
			}
			startedAt
		}
	}
`;

export default getUserProgramBlockerQuery;

export interface IUserProgramBlocker {
	userProgram: {
		id: string;
		startedAt: string;
		workshop: {
			id: string;
			startsAt: string;
			contentStartsAt: string;
		};
		program: {
			id: string;
			code: string;
		};
	};
}
