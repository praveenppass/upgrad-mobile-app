import React from "react";
import { StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { md, regular, lg, semiBold } = commonStyles.text;
const { neutral } = colors;

const STRINGS = createStringConstants({
	title: "studyPlan.manualProfileFlow.overdueWarningModal.title",
	message: "studyPlan.manualProfileFlow.overdueWarningModal.message",
	completeNow: "studyPlan.manualProfileFlow.overdueWarningModal.completeNow",
});

interface IOverdueWarningModalProps {
	visible: boolean;
	onClose: () => void;
	onCompleteNow: () => void;
}

const OverdueWarningModal = ({
	visible,
	onClose,
	onCompleteNow,
}: IOverdueWarningModalProps) => {
	return (
		<ConfirmationModal visible={visible} onClose={onClose}>
			<View style={styles.container}>
				<RNText title={getString(STRINGS.title)} style={styles.title} />
				<RNText
					title={getString(STRINGS.message)}
					style={styles.message}
				/>

				<View style={styles.buttonContainer}>
					<CommonButton
						title={getString(STRINGS.completeNow)}
						variant={IButtonVariant.Primary}
						onPress={onCompleteNow}
						style={styles.completeButton}
					/>
				</View>
			</View>
		</ConfirmationModal>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: verticalScale(8),
	},
	completeButton: {
		width: "100%",
	},
	container: {
		gap: verticalScale(16),
		padding: horizontalScale(20),
	},
	message: {
		...md,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(22),
		textAlign: "center",
	},
	title: {
		...lg,
		...semiBold,
		color: neutral.black,
		textAlign: "center",
	},
});

export default OverdueWarningModal;
