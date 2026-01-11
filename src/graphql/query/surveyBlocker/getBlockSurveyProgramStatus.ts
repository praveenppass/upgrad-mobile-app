import { gql } from "@apollo/client";

const getBlockerSurveyProgramStatusQuery = gql`
	query blockerSurveyForUser($where: BlockerSurveyForUserUniqueWhereInput) {
		blockerSurveyForUser(where: $where) {
			id
			formId
			deadlineDate
		}
	}
`;

export default getBlockerSurveyProgramStatusQuery;

export interface IBlockerSurveyProgramStatusQuery {
	blockerSurveyForUser: { id: string; formId: string; deadlineDate: string };
}

export interface IBlockerSurveysProgramStatusVariables {
	where: { workshop: string; program: string; userId: string };
}
