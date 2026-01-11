import { gql } from "@apollo/client";

const getNotesListQuery = gql`
	fragment noteAssetFields on Asset {
		id
		name
		duration
		assetType {
			id
			type
			name
		}
	}

	query notes($where: NoteWhereInput, $limit: Int) {
		notes(where: $where, limit: $limit) {
			result {
				id
				content
				asset {
					...noteAssetFields
				}
				updatedAt
			}
		}
	}
`;

export default getNotesListQuery;
export interface INotesList {
	notes: Notes;
}

export interface Notes {
	result: INoteItems[];
}

export interface INoteItems {
	id: string;
	content: string;
	asset: null;
	updatedAt: string;
	title?: string;
}
