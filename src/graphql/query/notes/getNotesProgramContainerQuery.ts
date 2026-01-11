import { gql } from "@apollo/client";

const getNotesProgramCourseQuery = gql`
	query notesForUserProgram($where: NotesForUserProgramWhereInput!) {
		notesForUserProgram(where: $where) {
			code
			label
			name
			level1
			level2
			totalNotes
			asset {
				code
				name
				assetType {
					type
					name
				}
			}
		}
	}
`;

export default getNotesProgramCourseQuery;

export interface INotesCourseType {
	notesForUserProgram: INotesForUserProgram[];
}

export interface INotesForUserProgram {
	code: string;
	label: string;
	name: string;
	level1: string;
	level2: string;
	totalNotes: number;
	asset: string;
	description: string;
}
