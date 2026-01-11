import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IEducationDetailsCardFieldConfig } from "@components/MyProfile/common/profile.interface";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { PlusIcon } from "@assets/icons";
import { DeleteIconProfile, EditIcon, HatIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { sm, regular, md, semiBold, lightBold } = commonStyles.text;

const { neutral, state, highlight } = colors;

const ICON_DIMENSIONS = {
	width: horizontalScale(18),
	height: verticalScale(18),
};
const EducationDetailsCard = ({
	isDisabled,
	isMandatory,
	label,
	actionText,
	onActionPress,
	onEditPress,
	onDeletePress,
	item,
	...rest
}: IEducationDetailsCardFieldConfig) => {
	const handleEdit = () => {
		if (onEditPress) onEditPress(rest.order);
	};
	const handleDelete = () => {
		if (onDeletePress) onDeletePress(rest.order);
	};

	return (
		<View style={styles.container}>
			{rest.order === 0 ? (
				<>
					{label && (
						<RNText style={styles.label}>
							{label}
							{isMandatory && (
								<RNText style={styles.redColor}> *</RNText>
							)}
						</RNText>
					)}

					<Pressable
						style={[styles.card, isDisabled && styles.cardDisabled]}
						onPress={onActionPress}
						disabled={isDisabled}
					>
						<View style={styles.iconContainer}>
							<PlusIcon
								width={horizontalScale(24)}
								height={verticalScale(24)}
								color={neutral.black}
							/>
						</View>
						<RNText
							style={styles.actionText}
							title={actionText || "Add"}
						/>
					</Pressable>
				</>
			) : (
				<View style={styles.itemCard}>
					<View style={styles.cardContent}>
						<View style={styles.avatarContainer}>
							<HatIcon
								width={horizontalScale(16)}
								height={verticalScale(16)}
								color={highlight.text_blue}
							/>
						</View>

						<View style={styles.content}>
							<RNText
								style={styles.designation}
								title={item?.educationType}
							/>
							<RNText
								style={styles.organization}
								title={item?.university}
							/>

							<RNText
								style={styles.duration}
								title={`${item?.graduatingYearFrom} to ${item?.graduatingYearTo}`}
							/>
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
							<EditIcon
								{...ICON_DIMENSIONS}
								color={neutral.grey_08}
							/>
						</Pressable>
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	actionText: {
		...sm,
		color: neutral.black,
		...lightBold,
		textAlign: "center",
	},
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
		alignItems: "center",
		backgroundColor: neutral.white,
		borderColor: neutral.grey_06,
		borderRadius: horizontalScale(6),
		borderStyle: "solid",
		borderWidth: 2,
		height: verticalScale(108),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(24),
		paddingVertical: verticalScale(24),
		width: horizontalScale(236),
	},
	cardContent: {
		alignItems: "flex-start",
		flexDirection: "row",
		gap: horizontalScale(12),
		height: verticalScale(65),
		justifyContent: "center",
	},
	cardDisabled: {
		opacity: 0.5,
	},
	container: {
		alignItems: "center",
		marginBottom: verticalScale(8),
		width: "100%",
	},
	content: {
		flex: 1,
		justifyContent: "center",
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
	iconContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: verticalScale(12),
	},
	itemCard: {
		alignSelf: "center",
		backgroundColor: highlight.bg_blue,
		borderColor: neutral.grey_06,
		borderRadius: horizontalScale(6),
		borderWidth: 1,
		height: verticalScale(120),
		paddingHorizontal: horizontalScale(10),
		paddingTop: verticalScale(12),
		width: horizontalScale(236),
	},
	label: {
		...semiBold,
		color: neutral.black,
		...md,
		marginBottom: verticalScale(12),
	},
	organization: {
		...sm,
		...regular,
		color: neutral.grey_07,
		marginTop: verticalScale(2),
	},
	redColor: {
		color: state.error_red,
	},
});
export default memo(EducationDetailsCard);
