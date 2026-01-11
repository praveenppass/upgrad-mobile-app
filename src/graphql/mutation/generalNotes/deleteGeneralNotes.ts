import { gql } from "@apollo/client";

const deleteGeneralNoteQuery = gql`
	mutation deleteNote($where: NoteWhereUniqueInput!) {
		deleteNote(where: $where) {
			id
		}
	}
`;

export default deleteGeneralNoteQuery;
export interface IDeleteGeneralNoteQueryVariables {
	where: {
		id:string,
	};
}