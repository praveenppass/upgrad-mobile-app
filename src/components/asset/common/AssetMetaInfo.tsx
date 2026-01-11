import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { isAssetTypeTranslatable } from "@config/assetTranslation.config";

import { IAssetType } from "@interface/asset.interface";
import { ILanguage } from "@interface/userProgram.interface";

import { colors } from "@assets/colors";
import { ArrowDownSmIcon, SwitchLanguageIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { regular, sm } = commonStyles.text;

interface IAssetMetaInfo {
	showLanguageSwitcher: boolean;
	selectedLanguage: ILanguage | null;
	defaultLanguage: ILanguage | null;
	onLanguageSwitcherPress: () => void;
	currentAssetType: IAssetType | null;
}

const AssetMetaInfo = ({
	showLanguageSwitcher,
	selectedLanguage,
	defaultLanguage: _defaultLanguage,
	onLanguageSwitcherPress,
	currentAssetType,
}: IAssetMetaInfo) => {
	const isTranslatable = isAssetTypeTranslatable(
		currentAssetType ?? undefined,
	);

	const displayText = selectedLanguage?.name || "Select Language";

	const shouldShowLanguageSwitcher = showLanguageSwitcher && isTranslatable;

	if (!shouldShowLanguageSwitcher) {
		return null;
	}

	return (
		<View style={styles.container}>
			{shouldShowLanguageSwitcher && (
				<View style={styles.languageSwitcherWrapper}>
					<Pressable
						onPress={onLanguageSwitcherPress}
						style={styles.languageButton}
					>
						<SwitchLanguageIcon
							height={horizontalScale(15)}
							width={horizontalScale(15)}
							color={neutral.grey_06}
						/>
						<RNText
							title={displayText}
							style={styles.languageText}
						/>
						<ArrowDownSmIcon
							height={horizontalScale(12)}
							width={horizontalScale(12)}
							color={neutral.grey_06}
						/>
					</Pressable>
				</View>
			)}
		</View>
	);
};

export default AssetMetaInfo;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: horizontalScale(8),
		marginBottom: verticalScale(16),
		paddingHorizontal: horizontalScale(20),
	},
	divider: {
		backgroundColor: neutral.grey_04,
		height: verticalScale(16),
		marginRight: horizontalScale(8),
		width: horizontalScale(1),
	},
	languageButton: {
		alignItems: "center",
		flexDirection: "row",
		flexShrink: 1,
		gap: horizontalScale(6),
	},
	languageSwitcherWrapper: {
		alignItems: "center",
		flexDirection: "row",
		flexShrink: 1,
	},
	languageText: {
		...regular,
		...sm,
		color: neutral.grey_06,
		flexShrink: 1,
		fontSize: horizontalScale(14),
	},
	optionalBadge: {
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(4),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(4),
	},
	optionalText: {
		...sm,
		...regular,
		color: neutral.grey_06,
		lineHeight: verticalScale(16),
	},
});
