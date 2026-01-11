import React from "react";
import { StyleSheet, View } from "react-native";

import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { ProgramUpgraded } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { semiBold, regular, reg, sm } = commonStyles.text;
const { neutral } = colors;

const STRINGS = createStringConstants({
	TITLE: "studyPlan.container2.programUpgradedModal.title",
	DESCRIPTION: "studyPlan.container2.programUpgradedModal.description",
});

interface IProgramUpgradedModal {
	visible: boolean;
	handleUpdateUserProgram: () => void;
}

/**
 * Modal component that displays when a program has been upgraded with new content and features.
 * Shows a confirmation dialog with an upgrade icon and informative message.
 *
 * @component
 * @param {IProgramUpgradedModal} props - The component props
 * @param {boolean} props.visible - Controls the visibility of the modal
 * @param {function} props.onClose - Callback function triggered when modal is closed
 *
 *
 * @returns {JSX.Element} A modal displaying program upgrade notification
 */
const ProgramUpgradedModal = ({
	visible,
	handleUpdateUserProgram,
}: IProgramUpgradedModal) => {
	return (
		<ConfirmationModal
			visible={visible}
			bgColor={colors.primitive.accent}
			icon={ProgramUpgraded}
			onClose={handleUpdateUserProgram}
		>
			<View style={styles.container}>
				<RNText
					title={`${getString(STRINGS.TITLE)}!`}
					style={styles.title}
				/>
				<RNText
					title={`${getString(STRINGS.DESCRIPTION)}.`}
					style={styles.description}
				/>
			</View>
		</ConfirmationModal>
	);
};

export default ProgramUpgradedModal;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		gap: verticalScale(12),
		marginBottom: verticalScale(36),
	},
	description: {
		...sm,
		...regular,
		color: neutral.black,
		lineHeight: verticalScale(18),
		textAlign: "center",
	},
	title: {
		...semiBold,
		...reg,
		color: neutral.black,
	},
});
