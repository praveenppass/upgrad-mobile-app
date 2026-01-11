import { useLazyQuery, useMutation } from "@apollo/client";

import createNotesQuery, {
	ICreateNoteBodyVariables,
} from "@graphql/mutation/notes/createNotes";
import deleteNotesQuery, {
	IDeleteNoteQueryVariables,
} from "@graphql/mutation/notes/deleteNotes";
import updateNotesQuery, {
	IUpdateNoteQueryVariables,
} from "@graphql/mutation/notes/updateNotes";
import getNotesListQuery, {
	INotesList,
} from "@graphql/query/notes/getNotesListQuery";

import { client } from "@config/apollo";

const useContainer6NotesModel = () => {
	const [getNotesList, { data: notesListData }] = useLazyQuery<INotesList>(
		getNotesListQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [createNoteCall, { loading: createNoteLoading }] =
		useMutation<ICreateNoteBodyVariables>(createNotesQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [deleteNoteCall, { loading: deleteNoteLoading }] =
		useMutation<IDeleteNoteQueryVariables>(deleteNotesQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [updateNoteCall, { loading: updateNoteLoading }] =
		useMutation<IUpdateNoteQueryVariables>(updateNotesQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	return {
		getNotesList,
		createNoteCall,
		deleteNoteCall,
		updateNoteCall,
		notesListData,
		createNoteLoading,
		deleteNoteLoading,
		updateNoteLoading,
	};
};
export default useContainer6NotesModel;
