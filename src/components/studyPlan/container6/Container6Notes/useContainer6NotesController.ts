import { useEffect, useState } from "react";

import { ToastType, useToast } from "@components/Reusable/Toast";
import { IContainer6Notes } from "@components/studyPlan/container6/Container6Notes";
import useContainer6NotesModel from "@components/studyPlan/container6/Container6Notes/useContainer6NotesModel";

import { ICreateNoteBodyVariables } from "@graphql/mutation/notes/createNotes";
import { INoteItems } from "@graphql/query/notes/getNotesListQuery";

import { strings } from "@assets/strings";

const emptyNotesItem = { id: "", content: "", asset: null, updatedAt: "" };

export enum INotesModalType {
	ListOfNotes = "listOfNotes",
	AddNotes = "addNotes",
}
interface ICreateNoteVariables {
	data?: {
		asset?: string;
		content?: string;
		userCourse?: string;
		userProgram?: string;
	};
}
const useContainer6NotesController = ({
	assetCode,
	learningPathId,
	level1,
	level2,
	level3,
	level4,
	isProgram,
	onClose,
}: IContainer6Notes) => {
	const {
		getNotesList,
		createNoteCall,
		deleteNoteCall,
		updateNoteCall,
		notesListData,
		createNoteLoading,
		deleteNoteLoading,
		updateNoteLoading,
	} = useContainer6NotesModel();

	const { showToast } = useToast();
	const [editNoteItem, setEditNoteItem] =
		useState<INoteItems>(emptyNotesItem);
	const [isConfirmationModalVisible, setConfirmationModal] = useState(false);
	const [modalType, setModalType] = useState<INotesModalType | null>(null);

	useEffect(() => {
		getNotes();
	}, []);

	const createNote = async (notes: string) => {
		const data = Object?.fromEntries(
			Object?.entries({
				asset: assetCode,
				...(isProgram
					? { userProgram: learningPathId }
					: { userCourse: learningPathId }),
				content: notes,
				level1: level1,
				level2: level2,
				level3: level3,
				level4: level4,
			}).filter(([, value]) => value != null),
		) as ICreateNoteBodyVariables["data"];

		const noteVariables: ICreateNoteVariables = { data };

		await createNoteCall({
			variables: noteVariables,
			onCompleted() {
				handleCloseModal();
				showToast({
					message: strings.NOTE_ADDED,
					type: ToastType.SUCCESS,
				});
			},
		});
	};

	const updateNote = async (notes: string) => {
		await updateNoteCall({
			variables: {
				data: { content: notes },
				where: { id: editNoteItem.id },
			},
			onCompleted: (data) => {
				if (data) {
					handleCloseModal();
					showToast({
						message: strings.NOTE_EDITED,
						type: ToastType.SUCCESS,
					});
				}
			},
		});
	};

	const handleAddNoteApiCall = (_: string, notes: string) => {
		const trimmed = notes?.trim();
		const loading = updateNoteLoading || createNoteLoading;

		if (!trimmed || loading) return;

		editNoteItem.id ? updateNote(trimmed) : createNote(trimmed);
	};

	const deleteNote = () => {
		if (deleteNoteLoading) return;
		deleteNoteCall({
			variables: { where: { id: editNoteItem?.id } },
			onCompleted: () => {
				handleCloseModal();
				onClose?.();
				showToast({
					message: strings.NOTE_DELETED,
					type: ToastType.SUCCESS,
				});
			},
		});
	};

	const handleCloseModal = () => {
		isConfirmationModalVisible && setConfirmationModal(false);
		editNoteItem.id && setEditNoteItem(emptyNotesItem);
		onClose?.();
		setModalType(null);
	};

	const getNotes = async () => {
		const variables = {
			where: {
				asset: assetCode,
				...(isProgram
					? { userProgram: learningPathId }
					: { userCourse: learningPathId }),
			},
		};
		await getNotesList({
			variables: variables,
			onCompleted: (response) => {
				if (response.notes.result.length > 0) {
					handleOpenModal(INotesModalType.ListOfNotes);
				} else {
					handleOpenModal(INotesModalType.AddNotes);
				}
			},
		});
	};

	const handleConfirmationModal = () => {
		setConfirmationModal(!isConfirmationModalVisible);
		setModalType(null);
	};

	const openAddNote = (item: INoteItems) => {
		setEditNoteItem(item);
		handleOpenModal(INotesModalType.AddNotes);
	};

	const handleOpenModal = (type: INotesModalType) => {
		setModalType(type);
	};

	return {
		notesListData,
		editNoteItem,
		isConfirmationModalVisible,
		modalType,
		openAddNote,
		deleteNote,
		handleCloseModal,
		handleAddNoteApiCall,
		handleConfirmationModal,
	};
};

export default useContainer6NotesController;
