import { gql } from "@apollo/client";

const downloadCourseNoteQuery = gql`
	query downloadNotesCSV($where: userNotesWhereInput) {
		downloadNotesCSV(where: $where) {
			file
		}
	}
`;

export default downloadCourseNoteQuery;

export interface IDownloadGeneralNoteQueryVariable {
	where: {
		userCourse: string;
	};
}

export interface IdownloadCourseNotes {
	downloadNotesCSV: {
		__typename: string;
		file: string;
	};
}
