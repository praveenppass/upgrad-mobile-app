import { gql } from "@apollo/client";
const createNotesQuery = gql`fragment noteAssetFields on Asset {
  id
  name
  duration
  assetType {
    id
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
`

export default createNotesQuery;

export interface ICreateNoteBodyVariables {
	data: {
		asset: string;
		content: string;
		userProgram?: string;
		level1:string,
		level2:string,
	};
}