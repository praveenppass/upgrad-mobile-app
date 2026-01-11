import { gql } from "@apollo/client";

const getNotesAssetCourseQuery = gql`
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
				updatedAt
				level1
				level2
				level3
				level4
				level
			}
		}
	}
`;

export default getNotesAssetCourseQuery;

export interface INotesAssetCourseType {
	notesForUserCourse: INotesForUserCourse[];
}

export interface INotesForUserCourse {
	code: string;
	label: string;
	name: string;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	totalNotes?: number;
	totalBookmarks?: string;
	asset: Asset;
	notes?: Note[] | null;
	description?: string;
}

export interface Asset {
	code: string;
	name: string;
	assetType: AssetType;
}

export interface AssetType {
	type: string;
	name: string;
}

export interface Note {
	id: string;
	content: string;
	createdAt: string;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	level: string;
}
