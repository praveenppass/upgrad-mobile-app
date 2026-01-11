import ReadMore from "@fawazahmed/react-native-read-more";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { IGeneralNote } from "@graphql/query/generalNotes/getAllGeneralNotesQuery";
import { INoteItems } from "@graphql/query/notes/getNotesListQuery";

import { horizontalScale, verticalScale } from "@utils/functions";
import { formatDateByTime } from "@utils/timezoneHelper";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { EditIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		text: { md, sm, xSm, bold, regular },
	},
} = C;

interface IListProp {
	item: INoteItems | IGeneralNote;
	handlEditNote: () => void;
	isNotes?: boolean;
}

const NoteListItemView = ({ item, handlEditNote, isNotes }: IListProp) => {
	return (
		<Pressable
			style={[
				styles.noteCard,
				styles.shadow,
				{
					backgroundColor: isNotes
						? colors.bg.fill.bg_disable
						: colors.neutral.white,
				},
			]}
		>
			{!isNotes && (
				<RNText style={styles.noteTitle} title={item?.title} />
			)}
			<View style={styles.noteContent}>
				<ReadMore
					numberOfLines={3}
					wrapperStyle={styles.noteTextWrapper}
					style={styles.noteText}
					seeMoreText={strings.READ_MORE}
					seeLessText={strings.READ_LESS}
					seeMoreStyle={styles.seeMoreText}
					seeLessStyle={styles.seeMoreText}
					seeMoreContainerStyleSecondary={styles.readMorePosition}
					onPress={(event) => {
						event.stopPropagation();
					}}
				>
					{item?.content}
				</ReadMore>
				<Pressable
					style={styles.editIconContainer}
					onPress={handlEditNote}
				>
					<EditIcon
						height={verticalScale(18)}
						width={horizontalScale(18)}
						color={colors.neutral.black}
					/>
				</Pressable>
			</View>
			<RNText
				style={styles.noteDate}
				title={`${strings.LAST_UPDATE_ON} ${formatDateByTime(item?.updatedAt, IDateFormat.dateWithTime)}`}
			/>
		</Pressable>
	);
};

export default NoteListItemView;

const styles = StyleSheet.create({
	editIconContainer: {
		alignSelf: "center",
		height: verticalScale(20),
		marginLeft: horizontalScale(8),
		width: horizontalScale(20),
	},
	noteCard: {
		borderRadius: horizontalScale(8),
		marginBottom: verticalScale(10),
		padding: horizontalScale(10),
	},
	noteContent: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	noteDate: {
		color: colors.neutral.grey_07,
		marginTop: verticalScale(5),
		...regular,
		...xSm,
	},

	noteText: {
		color: colors.neutral.black,
		lineHeight: horizontalScale(19),
		...regular,
		...sm,
	},
	noteTextWrapper: {
		flex: 1,
	},
	noteTitle: {
		color: colors.neutral.black,
		lineHeight: 19,
		marginBottom: horizontalScale(5),
		...bold,
		...md,
	},

	readMorePosition: {
		position: "relative",
	},
	seeMoreText: {
		color: colors.neutral.black,
		...bold,
	},

	shadow: {
		elevation: horizontalScale(1),
		shadowColor: colors.neutral.black,
		shadowOffset: {
			width: horizontalScale(0),
			height: verticalScale(1),
		},
		shadowOpacity: verticalScale(0.2),
		shadowRadius: horizontalScale(1),
	},
});
