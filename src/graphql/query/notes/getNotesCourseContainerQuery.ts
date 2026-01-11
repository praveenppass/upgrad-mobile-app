import { gql } from "@apollo/client";

const getNotesCourseContainerQuery = gql`
	query notesForUserCourse($where: NotesForUserCourseWhereInput!) {
		notesForUserCourse(where: $where) {
			code
			label
			name
			totalNotes
			asset {
				code
				name
				assetType {
					type
					name
				}
			}
			notes {
				id
				content
				createdAt
				level1
				level2
				level3
				level4
				level
			}
		}
	}
`;

export default getNotesCourseContainerQuery;

export interface INotesCourseContainerType {
	notesForUserCourse: INotesForUserProgram[];
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
