import React from "react";
import { StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { Logout } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { lg, sm, semiBold, regular } = commonStyles.text;
const { neutral } = colors;

const STRINGS = createStringConstants({
	TITLE: "common.logoutModal.title",
	SUBTITLE: "common.logoutModal.subtitle",
	LOGOUT_BUTTON: "common.logoutModal.logoutButton",
	CANCEL_BUTTON: "common.logoutModal.cancelButton",
});

interface ILogoutModal {
	visible: boolean;
	onCancel: () => void;
	onLogout: () => void;
}

/**
 * LogoutModal component displays a confirmation modal for user logout
 *
 * @param {boolean} visible - Whether the modal is visible
 * @param {() => void} onCancel - Callback function to close the modal
 * @param {() => void} onLogout - Callback function to handle logout action
 * @returns {JSX.Element} The LogoutModal component
 */

const LogoutModal = ({ visible, onCancel, onLogout }: ILogoutModal) => (
	<ConfirmationModal
		visible={visible}
		bgColor={colors.state.warning_light_yellow}
		icon={Logout}
		iconStyle={styles.iconStyle}
		onClose={onCancel}
	>
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<RNText
					title={getString(STRINGS.TITLE)}
					style={styles.titleText}
				/>
				<RNText
					title={getString(STRINGS.SUBTITLE)}
					style={styles.subtitleText}
				/>
			</View>
			<View style={styles.btnContainer}>
				<CommonButton
					title={getString(STRINGS.LOGOUT_BUTTON)}
					variant={IButtonVariant.Tertiary}
					onPress={onLogout}
					style={styles.button}
				/>
				<CommonButton
					title={getString(STRINGS.CANCEL_BUTTON)}
					variant={IButtonVariant.Secondary}
					onPress={onCancel}
					style={styles.button}
				/>
			</View>
		</View>
	</ConfirmationModal>
);

export default LogoutModal;

const styles = StyleSheet.create({
	btnContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
	},
	button: {
		flex: 1,
	},
	container: {
		paddingBottom: verticalScale(20),
		width: "100%",
	},
	iconStyle: {
		height: verticalScale(150),
		marginBottom: verticalScale(24),
		marginTop: 0,
		width: horizontalScale(150),
	},
	subtitleText: {
		...sm,
		...regular,
		color: neutral.grey_07,
	},
	textContainer: {
		alignItems: "center",
		gap: verticalScale(20),
		marginBottom: verticalScale(32),
	},
	titleText: {
		...lg,
		...semiBold,
	},
});
