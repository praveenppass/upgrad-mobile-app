import { gql } from "@apollo/client";

const downloadGeneralNote = gql`
	query downloadProgramNotesCSV($where: userNotesWhereInput) {
		downloadProgramNotesCSV(where: $where) {
			file
		}
	}
`;

export default downloadGeneralNote;
export interface IDownloadGeneralNoteQueryVariable {
	where: {
		userProgram: string;
	};
}

export interface IdownloadGeneralNotes {
	downloadProgramNotesCSV: DownloadProgramNotesCsv;
}

export interface DownloadProgramNotesCsv {
	__typename: string;
	file: string;
}
