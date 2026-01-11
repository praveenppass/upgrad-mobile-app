import { gql } from "@apollo/client";

export const getAllGeneralNotesProgram = gql`
	query notesForUserProgram($where: NotesForUserProgramWhereInput!) {
		notesForUserProgram(where: $where) {
			note {
				id
				content
				title
				type
				updatedAt
			}
		}
	}
`;

export const getAllGeneralNotesCourse = gql`
	query notesForUserCourse($where: NotesForUserCourseWhereInput!) {
		notesForUserCourse(where: $where) {
			note {
				id
				content
				title
				type
				updatedAt
			}
		}
	}
`;

export interface IGeneralNotesProgramType {
	notesForUserProgram: IGeneralNotesItems[];
}

export interface IGeneralNotesCourseType {
	notesForUserCourse: IGeneralNotesItems[];
}

export interface IGeneralNotesItems {
	note?: IGeneralNote;
}

export interface IGeneralNote {
	id: string;
	content: string;
	title?: string;
	type: string;
	updatedAt: string;
}
