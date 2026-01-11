import React from "react";
import { StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, state } = colors;
const { lg, sm, bold, regular } = commonStyles.text;

interface IDeleteAccountModal {
	isModalVisible: boolean;
	onCloseModal: () => void;
	handleDeleteAccount: () => void;
}

const DeleteAccountModal = ({
	isModalVisible,
	onCloseModal,
	handleDeleteAccount,
}: IDeleteAccountModal) => (
	<ConfirmationModal
		visible={isModalVisible}
		onClose={onCloseModal}
		bgColor={state.warning_light_yellow}
		icon={IMAGE_URLS.WARNING}
	>
		<RNText
			title={strings.DELETE_ACCOUNT_HEADING}
			style={styles.warningText}
		/>
		<RNText
			title={strings.DELETE_ACCOUNT_DESCRIPTION}
			style={styles.warningTxt}
		/>
		<View style={styles.btnContainer}>
			<CommonButton
				variant={IButtonVariant.Tertiary}
				onPress={handleDeleteAccount}
				title={strings.DELETE_ACCOUNT}
				style={styles.deleteButton}
			/>
			<CommonButton
				variant={IButtonVariant.Secondary}
				onPress={onCloseModal}
				title={strings.CANCEL}
				style={styles.cancelButton}
			/>
		</View>
	</ConfirmationModal>
);

export default DeleteAccountModal;

const styles = StyleSheet.create({
	btnContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
		marginTop: verticalScale(16),
	},
	cancelButton: {
		flex: 1,
	},
	deleteButton: {
		flex: 1,
	},
	warningText: {
		...bold,
		...lg,
		color: neutral.black,
		marginBottom: verticalScale(24),
		textAlign: "center",
	},
	warningTxt: {
		...regular,
		...sm,
		color: neutral.black,
		lineHeight: verticalScale(18),
		marginBottom: verticalScale(24),
		textAlign: "center",
	},
});
