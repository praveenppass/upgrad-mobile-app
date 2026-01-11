import { gql } from "@apollo/client";
const updateNotesQuery = gql`
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

	mutation updateNote($data: updateNoteInput, $where: NoteWhereUniqueInput!) {
		updateNote(data: $data, where: $where) {
			id
			content
			screenShotUrl
			location
			asset {
				...noteAssetFields
			}
			createdAt
			updatedAt
			type
		}
	}
`;

export default updateNotesQuery;

export interface IUpdateNoteQueryVariables {
    where: {
        id: string;
    };
    data: {
        content: string;
    };
}
