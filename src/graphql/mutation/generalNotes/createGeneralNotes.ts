import { gql } from "@apollo/client";

const createGeneralNoteQuery = gql`
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

	mutation createNote($data: createNoteInput!) {
		createNote(data: $data) {
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

export default createGeneralNoteQuery;
export interface ICreateGeneralNoteQueryBodyVariables {
	data: {
		content: string;
		title: string;
		type: string;
		userProgram: string;
	};
}
