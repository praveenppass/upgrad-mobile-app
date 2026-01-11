import React, { memo, useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { ILanguage } from "@interface/userProgram.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;
const { regular, sm, lg, semiBold } = commonStyles.text;

const STRINGS = createStringConstants({
	title: "asset.languageSelector.title",
	originalLanguage: "asset.languageSelector.originalLanguage",
	noLanguagesAvailable: "asset.languageSelector.noLanguagesAvailable",
});

interface IAssetLanguageSelector {
	isVisible: boolean;
	languages: ILanguage[];
	selectedLanguageId: string | null;
	defaultLanguageId: string | null;
	onSelectLanguage: (language: ILanguage) => void;
	onClose: () => void;
}

const AssetLanguageSelector = ({
	isVisible,
	languages,
	selectedLanguageId,
	defaultLanguageId,
	onSelectLanguage,
	onClose,
}: IAssetLanguageSelector) => {
	const renderLanguage = useCallback(
		(language: ILanguage) => {
			const isSelected = language.id === selectedLanguageId;
			const isDefault = language.id === defaultLanguageId;

			return (
				<Pressable
					key={language.id}
					style={[
						styles.itemContainer,
						isSelected && styles.itemSelected,
					]}
					onPress={() => onSelectLanguage(language)}
				>
					<RNText
						title={
							isDefault
								? `${language.name} (${getString(STRINGS.originalLanguage)})`
								: language.name
						}
						style={styles.itemText}
					/>
				</Pressable>
			);
		},
		[selectedLanguageId, defaultLanguageId, onSelectLanguage],
	);

	return (
		<ActionModal
			isOpen={isVisible}
			closeModal={onClose}
			onBackPress={onClose}
			style={styles.modalContainer}
			disableCloseOnSwipeDown
		>
			<View style={styles.dragHandle} />

			<RNText
				title={getString(STRINGS.title)}
				style={styles.modalTitle}
			/>

			<ScrollView
				style={styles.scrollList}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{languages.length > 0 ? (
					languages.map(renderLanguage)
				) : (
					<View style={styles.emptyContainer}>
						<RNText
							title={getString(STRINGS.noLanguagesAvailable)}
							style={styles.emptyText}
						/>
					</View>
				)}
			</ScrollView>
		</ActionModal>
	);
};

export default memo(AssetLanguageSelector);

const styles = StyleSheet.create({
	dragHandle: {
		alignSelf: "center",
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(2),
		height: verticalScale(4),
		marginBottom: verticalScale(16),
		width: horizontalScale(40),
	},

	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: verticalScale(40),
	},

	emptyText: {
		...regular,
		...sm,
		color: neutral.grey_06,
	},

	itemContainer: {
		alignItems: "center",
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(8),
		flexDirection: "row",
		marginBottom: verticalScale(12),
		padding: verticalScale(12),
	},

	itemSelected: {
		backgroundColor: highlight.bg_blue,
		borderColor: highlight.text_blue,
		borderWidth: horizontalScale(1),
	},

	itemText: {
		...regular,
		...sm,
		color: neutral.black,
		fontSize: horizontalScale(16),
	},

	modalContainer: {
		backgroundColor: neutral.white,
		borderTopLeftRadius: horizontalScale(16),
		borderTopRightRadius: horizontalScale(16),
		padding: horizontalScale(20),
		paddingTop: verticalScale(12),
	},

	modalTitle: {
		...lg,
		...semiBold,
		color: neutral.black,
		fontSize: horizontalScale(18),
		marginBottom: verticalScale(20),
		textAlign: "left",
	},

	scrollContent: {
		paddingBottom: verticalScale(20),
	},

	scrollList: {
		paddingBottom: verticalScale(20),
	},
});
