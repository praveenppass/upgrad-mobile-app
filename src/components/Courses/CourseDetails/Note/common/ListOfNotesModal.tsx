import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { INoteItems, INotesList } from "@graphql/query/notes/getNotesListQuery";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { strings } from "@assets/strings";

import NoteListItemView from "./NoteListItemView";

const { neutral } = colors;
const {
	commonStyles: {
		text: { sm, md, w600 },
	},
} = C;

interface AddNotes {
	notesListData: INotesList;
	handleAddNote: (item: INoteItems) => void;
}

const emptyNote = {
	id: "",
	content: "",
	asset: null,
	updatedAt: "",
};

const ListOfNotesModal = ({ notesListData, handleAddNote }: AddNotes) => {
	return (
		<View style={styles.modalContainer}>
			<View style={styles.headerContainer}>
				<RNText style={styles.notesTitle} title={strings.NOTES} />
			</View>
			<Pressable style={styles.saveButton}>
				<Pressable onPress={() => handleAddNote(emptyNote)}>
					<RNText
						style={styles.saveButtonText}
						title={strings.ADD_NOTE}
					/>
				</Pressable>
			</Pressable>
			<FlatList
				data={notesListData?.notes?.result}
				renderItem={({ item }) => {
					return (
						<NoteListItemView
							item={item}
							handlEditNote={() => handleAddNote(item)}
							isNotes={true}
						/>
					);
				}}
				keyExtractor={(item) => item.id}
				windowSize={4}
				keyboardShouldPersistTaps="handled"
			/>
		</View>
	);
};

export default ListOfNotesModal;

const styles = StyleSheet.create({
	editIconContainer: {
		marginLeft: horizontalScale(8),
	},
	headerContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(15),
	},
	modalContainer: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(10),
		height: moderateScale(400),
		marginBottom: horizontalScale(10),
	},

	noteCard: {
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(8),
		marginBottom: verticalScale(10),
		padding: horizontalScale(10),
	},

	noteContent: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},

	noteDate: {
		color: neutral.grey_07,
		...sm,
		marginTop: verticalScale(5),
	},

	noteText: {
		color: neutral.black,
		flex: 1,
		...md,
	},

	notesContainer: {
		paddingVertical: verticalScale(10),
	},

	notesTitle: {
		color: colors.neutral.black,
		...w600,
		...sm,
	},

	readMore: {
		color: neutral.black,
		fontWeight: "bold",
	},

	saveButton: {
		alignSelf: "flex-end",
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(6),
		marginBottom: verticalScale(15),
		padding: horizontalScale(10),
	},

	saveButtonText: {
		color: neutral.white,
		...w600,
		...md,
	},
});
