import { gql } from "@apollo/client";

const getNotesModuleAssetQuery = gql`
	query notesForUserProgram($where: NotesForUserProgramWhereInput!) {
		notesForUserProgram(where: $where) {
			code
			label
			name
			level1
			level2
			totalNotes
			aliasName
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

export default getNotesModuleAssetQuery;
export interface INotesAssetQuery {
	notesForUserProgram?: IAssetUserProgram[];
}

export interface IAssetUserProgram {
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
