import { gql } from "@apollo/client";

const getProgramScoreCardQuery = gql`
	query downloadScoreCardReportForUserProgram(
		$where: UserProgramScoreCardReportWhereInput!
	) {
		downloadScoreCardReportForUserProgram(where: $where) {
			file
		}
	}
`;

export default getProgramScoreCardQuery;

export interface IGetProgramScoreCardQueryVariables {
	where: {
		userProgram: string;
		reportType: string;
	};
}

export interface IGetProgramScoreCardQuery {
	downloadScoreCardReportForUserProgram: {
		file: string;
	};
}
