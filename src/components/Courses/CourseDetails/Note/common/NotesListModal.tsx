import React from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";

import { IAssetItem } from "@components/Courses/CourseDetails/Note/common/ModuleAndAssetInterface";
import RNText from "@components/Reusable/RNText";

import { INoteItems } from "@graphql/query/notes/getNotesListQuery";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { WhiteRightIcon } from "@assets/icons";
import { strings } from "@assets/strings";

import NoteListItemView from "./NoteListItemView";

const { neutral } = colors;
const {
	commonStyles: {
		text: { sm, md, w600 },
	},
} = C;

interface AddNotes {
	item: IAssetItem;
	navigateToAssetScreen: (item: IAssetItem) => void;
	handleAddNote: (item: INoteItems) => void;
	handleNoteModal: (val: boolean) => void;
}

const NotesAssetModal = ({
	item,
	navigateToAssetScreen,
	handleAddNote,
	handleNoteModal,
}: AddNotes) => {
	const { width } = useWindowDimensions();
	const title = item?.aliasName || item?.asset?.name;

	return (
		<View style={[styles.modalContainer, { width }]}>
			<View style={styles.modalHeaderIndicator} />

			<Pressable
				onPress={() => {
					handleNoteModal(false);
					navigateToAssetScreen(item);
				}}
				style={styles.saveButton}
			>
				<RNText
					style={styles.saveButtonText}
					title={title}
					numberOfLines={1}
					ellipsizeMode="tail"
				/>
				<WhiteRightIcon />
			</Pressable>

			<View style={styles.contentContainer}>
				<View style={styles.headerContainer}>
					<RNText
						style={styles.notesTitle}
						title={strings.NOTES + ` (${item?.notes?.length})`}
					/>
				</View>
				<FlatList
					data={item?.notes as []}
					renderItem={({ item: noteItem }: { item: INoteItems }) => (
						<NoteListItemView
							item={noteItem}
							handlEditNote={() => handleAddNote(noteItem)}
							isNotes={true}
						/>
					)}
					keyExtractor={(noteItem) => noteItem.id.toString()}
					windowSize={4}
					keyboardShouldPersistTaps="handled"
				/>
			</View>
		</View>
	);
};

export default NotesAssetModal;

const styles = StyleSheet.create({
	contentContainer: {
		padding: horizontalScale(10),
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
		marginLeft: horizontalScale(-15),
		paddingBottom: verticalScale(80),
	},
	modalHeaderIndicator: {
		alignSelf: "center",
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(8),
		height: verticalScale(3),
		marginBottom: verticalScale(20),
		marginVertical: verticalScale(4),
		width: horizontalScale(80),
	},
	notesTitle: {
		color: colors.neutral.black,
		...w600,
		...sm,
	},
	saveButton: {
		alignItems: "center",
		backgroundColor: neutral.black,
		flexDirection: "row",
		gap: horizontalScale(10),
		height: verticalScale(48),
		marginBottom: verticalScale(5),
		padding: horizontalScale(10),
	},
	saveButtonText: {
		color: neutral.white,
		...w600,
		...md,
		flex: 2,
	},
});
