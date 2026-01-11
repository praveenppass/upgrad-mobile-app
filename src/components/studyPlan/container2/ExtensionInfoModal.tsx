import React from "react";
import { StyleSheet, View } from "react-native";

import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

/**
 * Modal component that displays information about course module extensions.
 * Shows details about extension policies and usage limits.
 *
 * @param visible - Controls the visibility of the modal
 * @param onClose - Callback function called when the modal is closed
 * @param totalExtensions - Total number of extensions allowed
 * @param usedExtensions - Number of extensions used by the user
 * @returns JSX element representing the extension information modal
 */

interface IExtensionInfoModal {
	visible: boolean;
	onClose: () => void;
	totalExtensions: number;
	usedExtensions: number;
}

const { semiBold, xlg, regular, sm } = commonStyles.text;
const { neutral } = colors;

const STRING_KEYS = {
	TITLE: "studyPlan.container2.extensionInfoModal.title",
	DESCRIPTION: "studyPlan.container2.extensionInfoModal.description",
} as const;

const ExtensionInfoModal = ({
	visible,
	onClose,
	totalExtensions,
	usedExtensions,
}: IExtensionInfoModal) => (
	<ConfirmationModal
		visible={visible}
		onClose={onClose}
		bgColor={colors.state.warning_light_yellow}
		icon={IMAGE_URLS.NOTES_ICON}
	>
		<View style={styles.container}>
			<RNText
				title={`${getString(STRING_KEYS.TITLE)}?`}
				style={styles.title}
			/>
			<RNText
				title={`${getString(STRING_KEYS.DESCRIPTION, {
					totalExtensions,
					usedExtensions,
				})}.`}
				style={styles.description}
			/>
		</View>
	</ConfirmationModal>
);

export default ExtensionInfoModal;

const styles = StyleSheet.create({
	container: {
		gap: verticalScale(24),
		marginBottom: verticalScale(24),
		paddingHorizontal: horizontalScale(12),
	},
	description: {
		...regular,
		...sm,
		color: neutral.black,
		lineHeight: verticalScale(19),
		textAlign: "center",
	},
	title: {
		...semiBold,
		...xlg,
		color: neutral.black,
		textAlign: "center",
	},
});
