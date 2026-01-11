import { gql } from "@apollo/client";
const deleteNotesQuery = gql`mutation deleteNote($where: NoteWhereUniqueInput!) {
  deleteNote(where: $where) {
    id
  }
}
`

export default deleteNotesQuery;
export interface IDeleteNoteQueryVariables {
	where: {
		id:string,
	};
}
