import { gql } from "@apollo/client";

const getBookmarkModuleAssetQuery = gql`
	query bookmarksForUserProgram($where: BookmarksForUserProgramWhereInput!) {
		bookmarksForUserProgram(where: $where) {
			code
			label
			aliasName
			name
			level1
			level2
			level3
			level4
			totalBookmarks
			asset {
				level1
				level2
				level3
				level4
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

export default getBookmarkModuleAssetQuery;
export interface IBookmarkAssetQueryVariable {
	where: { userProgram: string; level1: string };
}

export interface IBookmarkModuleAssetType {
	bookmarksForUserProgram: IAssetBookmarksForUserProgram[];
}

export interface IAssetBookmarksForUserProgram {
	code: string;
	label: string;
	aliasName?: string | null;
	name: string;
	level1: string;
	level2: string;
	level3?: string;
	level4?: string;
	totalNotes?: number;
	totalBookmarks?: string;
	asset?: Asset;
	notes?: Note[] | null; // is optional to use remove error
	description?: string;
}
export interface Asset {
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	code: string;
	name: string;
	assetType: AssetType;
}

export interface AssetType {
	type: string;
	name: string;
}

interface Note {
	id: string;
	content: string;
	createdAt: string;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	level: string;
}
