import { gql } from "@apollo/client";

const updateGeneralNote = gql`
	fragment NoteAssetFields on Asset {
		id
		name
		duration
		assetType {
			id
			type
			name
		}
	}

	mutation UpdateNote(
		$data: updateNoteInput,
		$where: NoteWhereUniqueInput!
	) {
		updateNote(data: $data, where: $where) {
			id
			content
			screenShotUrl
			location
			asset {
				...NoteAssetFields
			}
			createdAt
			updatedAt
			type
		}
	}
`;

export default updateGeneralNote;
export interface IUpdateGeneralNoteQueryVariables {
	where: {
		id:string,
	},
	data: {
		content: string,
		title: string,
	},
}
export interface IUpdateGeneralNoteQueryBodyVariables {
	data: {
		content: string,
		title: string,
	},
}

