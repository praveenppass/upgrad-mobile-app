import React from "react";
import { StyleSheet, View } from "react-native";

import AddNotesModal from "@components/Courses/CourseDetails/Note/common/AddNotesModal";
import ListOfNotesModal from "@components/Courses/CourseDetails/Note/common/ListOfNotesModal";
import { INotesModalType } from "@components/Courses/CourseDetails/Note/useNotesController";
import useContainer6NotesController from "@components/studyPlan/container6/Container6Notes/useContainer6NotesController";
import DeleteConfirmationModal from "@components/studyPlan/container6/DeleteConfirmationModal";

import { INotesList } from "@graphql/query/notes/getNotesListQuery";

import { verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

export interface IContainer6Notes {
	assetCode: string;
	learningPathId: string;
	level1?: string | null;
	level2?: string | null;
	level3?: string | null;
	level4?: string | null;
	isProgram: boolean;
	onClose?: () => void;
}

const STRINGS = createStringConstants({
	NOTES: "studyPlan.container6.note.notes",
});

const Container6Notes = ({
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
		notesListData,
		editNoteItem,
		modalType,
		isConfirmationModalVisible,
		deleteNote,
		handleCloseModal,
		openAddNote,
		handleAddNoteApiCall,
		handleConfirmationModal,
	} = useContainer6NotesController({
		assetCode,
		learningPathId,
		level1,
		level2,
		level3,
		level4,
		isProgram,
		onClose,
	});

	return (
		<View style={styles.container}>
			{INotesModalType.ListOfNotes === modalType ? (
				<ListOfNotesModal
					notesListData={notesListData as INotesList}
					handleAddNote={(item) => {
						openAddNote(item);
					}}
				/>
			) : null}

			{INotesModalType.AddNotes === modalType ? (
				<AddNotesModal
					noteType={getString(STRINGS.NOTES)}
					handleApiCall={(title, notes) => {
						handleAddNoteApiCall(title, notes);
					}}
					editNoteItem={editNoteItem}
					handleConfirmationModal={() => {
						handleConfirmationModal();
					}}
				/>
			) : null}

			<DeleteConfirmationModal
				isVisible={isConfirmationModalVisible}
				onClose={handleCloseModal}
				handleConfirmationModal={handleConfirmationModal}
				deleteNote={deleteNote}
			/>
		</View>
	);
};

export default Container6Notes;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		minHeight: verticalScale(300),
	},
});
