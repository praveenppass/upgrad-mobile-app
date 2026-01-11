import { get } from "lodash";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { bold, semiBold, md, sm, lg } = commonStyles.text;

interface IVoiceValidationModal {
	visible: boolean;
	onClose: () => void;
}

const STRINGS = createStringConstants({
	OK: "studyPlan.container6.drBot.ok",
	DID_NOT_CATCH_THAT: "studyPlan.container6.drBot.didNotCatchThat",
});

const VoiceValidationModal: React.FC<IVoiceValidationModal> = ({
	visible,
	onClose,
}) => {
	return (
		<ActionModal
			isOpen={visible}
			closeModal={onClose}
			onBackPress={onClose}
			style={styles.modalContainer}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.indicator} />
				</View>

				<View style={styles.content}>
					<RNText style={styles.title}>
						{getString(STRINGS.DID_NOT_CATCH_THAT)}
					</RNText>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.cancelButton}
						onPress={onClose}
					>
						<RNText style={styles.cancelButtonText}>
							{getString(STRINGS.OK)}
						</RNText>
					</TouchableOpacity>
				</View>
			</View>
		</ActionModal>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
		paddingBottom: verticalScale(20),
		paddingTop: verticalScale(16),
	},
	cancelButton: {
		alignItems: "center",
		backgroundColor: neutral.black,
		borderColor: neutral.black,
		borderRadius: horizontalScale(12),
		borderWidth: 1,
		flex: 1,
		justifyContent: "center",
		paddingVertical: verticalScale(16),
	},
	cancelButtonText: {
		...semiBold,
		...sm,
		color: neutral.white,
	},
	container: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(16),
		overflow: "hidden",
	},
	content: {
		alignItems: "center",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(16),
	},
	header: {
		alignItems: "center",
		alignSelf: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: verticalScale(8),
	},
	indicator: {
		backgroundColor: neutral.grey_03,
		borderRadius: horizontalScale(2),
		height: verticalScale(4),
		width: horizontalScale(64),
	},
	modalContainer: {
		paddingHorizontal: horizontalScale(20),
	},
	title: {
		...bold,
		...md,
		color: neutral.black,
		...lg,
		lineHeight: verticalScale(24),
		marginBottom: verticalScale(12),
		textAlign: "center",
	},
});

export default VoiceValidationModal;
