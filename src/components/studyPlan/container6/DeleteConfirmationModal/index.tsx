import React from "react";
import { Image, Pressable, View } from "react-native";

import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";
import styles from "@components/studyPlan/container6/DeleteConfirmationModal/deleteConfirmationModal.styles";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";

const STRINGS = createStringConstants({
	RESTORE_WARNING: "studyPlan.container6.note.restoreWarning",
	NOTE_DELETE_WARNING: "studyPlan.container6.note.noteDeleteWarning",
	NO: "studyPlan.container6.note.no",
	YES: "studyPlan.container6.note.yes",
});

interface IDeleteModal {
	isVisible: boolean;
	onClose: () => void;
	handleConfirmationModal: () => void;
	deleteNote: () => void;
}

const DeleteConfirmationModal = ({
	isVisible,
	onClose,
	handleConfirmationModal,
	deleteNote,
}: IDeleteModal) => {
	return (
		<ConfirmationModal
			visible={isVisible}
			onClose={onClose}
			bgColor={colors.state.warning_light_yellow}
		>
			<Image
				source={{ uri: IMAGE_URLS.WARNING }}
				style={styles.image}
				resizeMode="contain"
			/>
			<RNText
				title={getString(STRINGS.NOTE_DELETE_WARNING)}
				style={styles.warningText}
			/>
			<RNText
				title={getString(STRINGS.RESTORE_WARNING)}
				style={styles.warningTxt}
			/>
			<View style={styles.btnContainer}>
				<Pressable
					onPress={handleConfirmationModal}
					style={[styles.button, styles.buttonNo]}
				>
					<RNText
						title={getString(STRINGS.NO)}
						style={styles.textNo}
					/>
				</Pressable>

				<Pressable
					onPress={deleteNote}
					style={[styles.button, styles.buttonYes]}
				>
					<RNText
						title={getString(STRINGS.YES)}
						style={styles.textYes}
					/>
				</Pressable>
			</View>
		</ConfirmationModal>
	);
};

export default DeleteConfirmationModal;
