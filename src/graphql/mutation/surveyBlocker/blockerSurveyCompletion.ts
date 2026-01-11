import { gql } from "@apollo/client";

const blockerSurveyCompletionQuery = gql`
	mutation updateLearnerBlockerSurveys(
		$data: [updateBlockerSurveyInput!]!
		$where: BlockerSurveyWhereInput!
	) {
		updateLearnerBlockerSurveys(data: $data, where: $where) {
			message
			success
		}
	}
`;

export default blockerSurveyCompletionQuery;

export interface IBlockerSurveyCompletionQuery {
	updateLearnerBlockerSurveys: { message: string; success: boolean };
}

export interface IBlockerSurveyCompletionQueryVariables {
	data: { id: string; status: string }[];
	where: { program: string; workshop: string };
}
