import { gql } from "@apollo/client";

const reuploadAnswerFileForAssignmentQuery = gql`
	mutation reuploadAnswerFileForAssignmentAttempt(
		$data: updateAnswerFileAssignmentAttemptInput
		$where: AssignmentAttemptWhereUniqueInput!
	) {
		reuploadAnswerFileForAssignmentAttempt(data: $data, where: $where) {
			answerFiles {
				name
				url
			}
		}
	}
`;

export interface IAnswerFile {
	name: string;
	url?: string;
}

export interface IReuploadAnswerFileAssignmentAttemptVariables {
	where: {
		id: string;
	};
	data: {
		answerFiles: IAnswerFile[];
	};
}

export interface IReuploadAnswerFileAssignmentAttemptResponse {
	reuploadAnswerFileForAssignmentAttempt: {
		answerFiles: IAnswerFile[];
	};
}

export default reuploadAnswerFileForAssignmentQuery;
