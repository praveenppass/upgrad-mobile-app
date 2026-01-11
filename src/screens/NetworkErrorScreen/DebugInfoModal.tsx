import Clipboard from "@react-native-clipboard/clipboard";
import React, { memo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { CopyFeedbackIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { regular, sm, bold, reg } = commonStyles.text;

const STRINGS = createStringConstants({
	ERROR_DETAILS: "common.networkErrorScreen.debugInfoModal.errorDetails",
	NO_ERROR_DETAILS: "common.networkErrorScreen.debugInfoModal.noErrorDetails",
	COPY: "common.copy",
	CLOSE: "common.close",
});

/**
 * Icon component for the copy button in the debug modal
 * @returns {JSX.Element} Copy feedback icon with white color
 */
const CopyIcon = () => {
	return (
		<CopyFeedbackIcon height={20} width={20} color={colors.neutral.white} />
	);
};

/**
 * Handles copying text to the device clipboard
 * @param {string} string - The text to copy to clipboard
 */
const handleCopy = (string: string) => {
	Clipboard.setString(string);
};

/**
 * Props interface for the DebugInfoModal component
 * @interface IDebugInfoModal
 */
interface IDebugInfoModal {
	/** Whether the modal is currently visible */
	isOpen: boolean;
	/** Callback function to close the modal */
	onClose: () => void;
	/** Complete error details object to display */
	errorDetails?: unknown;
}

/**
 * Modal component for displaying debug information with copy functionality
 *
 * @component
 * @param {IDebugInfoModal} props - The component props
 * @param {boolean} props.isOpen - Whether the modal is currently visible
 * @param {() => void} props.onClose - Callback function to close the modal
 * @param {string} [props.debugInfo] - Optional debug information to display
 *
 * @returns {JSX.Element} A modal displaying debug information with copy and close buttons
 *
 *
 */

const DebugInfoModal = ({ isOpen, onClose, errorDetails }: IDebugInfoModal) => {
	const formattedErrorDetails = errorDetails
		? JSON.stringify(errorDetails, null, 2)
		: getString(STRINGS.NO_ERROR_DETAILS);

	return (
		<ActionModal
			isOpen={isOpen}
			closeModal={onClose}
			onBackPress={onClose}
			style={styles.modalContainer}
			disableCloseOnSwipeDown
		>
			<RNText
				title={getString(STRINGS.ERROR_DETAILS)}
				style={styles.title}
			/>

			<ScrollView
				style={styles.scrollContainer}
				showsVerticalScrollIndicator={true}
				nestedScrollEnabled
			>
				<Pressable style={styles.debugContainer}>
					<RNText
						title={formattedErrorDetails}
						style={styles.debugText}
					/>
				</Pressable>
			</ScrollView>

			<View style={styles.buttonContainer}>
				<CommonButton
					title={getString(STRINGS.COPY)}
					variant={IButtonVariant.Secondary}
					onPress={() => handleCopy(formattedErrorDetails)}
					icon={CopyIcon}
					style={styles.button}
				/>
				<CommonButton
					title={getString(STRINGS.CLOSE)}
					variant={IButtonVariant.Tertiary}
					onPress={onClose}
					style={styles.button}
				/>
			</View>
		</ActionModal>
	);
};

const styles = StyleSheet.create({
	button: {
		flex: 1,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
		paddingBottom: verticalScale(8),
	},
	debugContainer: {
		backgroundColor: colors.neutral.grey_02,
		borderRadius: horizontalScale(12),
		padding: horizontalScale(16),
	},
	debugText: {
		...sm,
		...regular,
		color: colors.neutral.grey_07,
		lineHeight: verticalScale(18),
	},
	modalContainer: {
		maxHeight: verticalScale(600),
		paddingHorizontal: horizontalScale(16),
	},
	scrollContainer: {
		marginVertical: verticalScale(16),
		maxHeight: verticalScale(400),
	},
	title: {
		...bold,
		...reg,
		color: colors.neutral.black,
		lineHeight: verticalScale(18),
		marginBottom: verticalScale(16),
		marginTop: verticalScale(16),
	},
});

export default memo(DebugInfoModal);
