import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { DeleteIconProfile, EditIcon, WorkExperience } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { sm, semiBold, regular } = commonStyles.text;
const { neutral, highlight } = colors;

export interface IWorkExperienceItem {
	id: string;
	designation?: string;
	organization?: string;
	industry?: string;
	duration?: string;
	ctc?: string;
}

interface IWorkExperienceCardProps {
	item: IWorkExperienceItem;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}

const ICON_DIMENSIONS = {
	width: horizontalScale(20),
	height: verticalScale(20),
};

const WorkExperienceCard: React.FC<IWorkExperienceCardProps> = ({
	item,
	onEdit,
	onDelete,
}) => {
	const handleEdit = () => {
		if (onEdit) onEdit(item.id);
	};

	const handleDelete = () => {
		if (onDelete) onDelete(item.id);
	};

	return (
		<View style={styles.card}>
			<View style={styles.cardContent}>
				<View style={styles.avatarContainer}>
					<WorkExperience
						width={horizontalScale(16)}
						height={verticalScale(16)}
					/>
				</View>

				<View style={styles.content}>
					{item.designation && (
						<RNText
							style={styles.designation}
							title={item.designation}
						/>
					)}
					{item.organization && (
						<RNText
							style={styles.organization}
							title={item.organization}
						/>
					)}
					{item.duration && (
						<RNText style={styles.duration} title={item.duration} />
					)}
				</View>
			</View>

			<View style={styles.divider} />

			<View style={styles.actionsContainer}>
				<Pressable
					style={styles.deleteButton}
					onPress={handleDelete}
					hitSlop={10}
				>
					<DeleteIconProfile {...ICON_DIMENSIONS} />
				</Pressable>
				<Pressable
					style={styles.editButton}
					onPress={handleEdit}
					hitSlop={10}
				>
					<EditIcon {...ICON_DIMENSIONS} color={neutral.grey_08} />
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	actionsContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	avatarContainer: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(24),
		height: verticalScale(24),
		justifyContent: "center",
		width: horizontalScale(24),
	},
	card: {
		alignSelf: "center",
		backgroundColor: highlight.bg_blue,
		borderColor: neutral.grey_06,
		borderRadius: horizontalScale(12),
		borderWidth: 1,
		height: verticalScale(120),
		marginBottom: verticalScale(24),
		paddingHorizontal: horizontalScale(10),
		paddingTop: verticalScale(12),
		width: horizontalScale(236),
	},
	cardContent: {
		alignItems: "flex-start",
		flexDirection: "row",
		gap: horizontalScale(12),
		justifyContent: "center",
	},
	content: {
		flex: 1,
		height: verticalScale(65),
		width: "100%",
	},
	deleteButton: {
		alignItems: "center",
		justifyContent: "center",
	},
	designation: {
		...sm,
		...semiBold,
		color: neutral.black,
	},
	divider: {
		backgroundColor: neutral.grey_05,
		height: 1,
		marginVertical: verticalScale(6),
	},
	duration: {
		...sm,
		...regular,
		color: neutral.grey_07,
		marginTop: verticalScale(2),
	},
	editButton: {
		alignItems: "center",
		justifyContent: "center",
	},
	organization: {
		...sm,
		...regular,
		color: neutral.grey_07,
		marginTop: verticalScale(2),
	},
});

export default memo(WorkExperienceCard);
