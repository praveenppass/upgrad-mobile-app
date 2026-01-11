import { gql } from "@apollo/client";

const getBlockerSurveyCourseStatusQuery = gql`
	query blockerSurveyForUser($where: BlockerSurveyForUserUniqueWhereInput) {
		blockerSurveyForUser(where: $where) {
			id
			formId
			deadlineDate
		}
	}
`;

export default getBlockerSurveyCourseStatusQuery;

export interface IBlockerSurveyCourseStatusQuery {
	blockerSurveyForUser: { id: string; formId: string; deadlineDate: string };
}

export interface IBlockerSurveysCourseStatusVariables {
	where: { workshop: string; course: string; userId: string };
}
