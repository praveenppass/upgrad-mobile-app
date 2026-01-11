import { gql } from "@apollo/client";

const downloadProgramNotesCSV = gql`
	query downloadProgramNotesCSV($where: userNotesWhereInput) {
		downloadProgramNotesCSV(where: $where) {
			file
		}
	}
`;
const downloadCourseNotesCSV = gql`
	query downloadNotesCSV($where: userNotesWhereInput) {
		downloadNotesCSV(where: $where) {
			file
		}
	}
`;

export { downloadProgramNotesCSV ,downloadCourseNotesCSV};
