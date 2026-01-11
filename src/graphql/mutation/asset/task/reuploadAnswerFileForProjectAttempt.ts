import { gql } from "@apollo/client";

const reuploadAnswerFileForProjectAttemptQuery = gql`
	mutation reuploadAnswerFileForProjectAttempt(
		$data: updateAnswerFileProjectAttemptInput
		$where: ProjectAttemptWhereInput!
	) {
		reuploadAnswerFileForProjectAttempt(data: $data, where: $where) {
			answerFiles {
				name
				url
			}
		}
	}
`;

export interface IAnswerFile {
	name: string;
	url: string;
}

export interface IReuploadAnswerFileProjectAttemptVariables {
	where: {
		id: string;
	};
	data: {
		answerFiles: IAnswerFile[];
	};
}

export interface IReuploadAnswerFileProjectAttemptResponse {
	reuploadAnswerFileForProjectAttempt: {
		answerFiles: IAnswerFile[];
	};
}

export default reuploadAnswerFileForProjectAttemptQuery;
