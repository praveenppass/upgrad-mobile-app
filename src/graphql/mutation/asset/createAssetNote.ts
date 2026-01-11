import { gql } from "@apollo/client";

const createAssetNoteQuery = gql`
	mutation createNote($data: createNoteInput!) {
		createNote(data: $data) {
			id
		}
	}
`;

export interface ICreateAssetNoteQueryVariables {
	data: {
		asset: string;
		content: string;
		userCourse?: string;
		userProgram?: string;
	};
}

export interface ICreateAssetNoteQuery {
	id: string;
}

export default createAssetNoteQuery;
