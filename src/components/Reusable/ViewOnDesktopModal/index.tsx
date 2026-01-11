import React from "react";
import { StyleSheet } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img/index";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { lg, bold, regular } = commonStyles.text;

const { state, neutral } = colors;

interface IViewOnDesktopModal {
	showModal: boolean;
	title?: string;
	description?: string;
	setShowModal: (val: boolean) => void;
	testID?: string;
}
const ViewOnDesktopModal = ({
	showModal,
	title,
	description,
	setShowModal,
	testID,
}: IViewOnDesktopModal) => (
	<ConfirmationModal
		visible={showModal}
		onClose={() => setShowModal(false)}
		icon={IMAGE_URLS.DESKTOP_ICON}
		bgColor={state.warning_light_yellow}
	>
		<RNText
			title={title || strings.VIEW_ON_DESKTOP}
			style={styles.heading}
		/>

		<RNText
			title={description || strings.VIEW_ON_DESKTOP_DESCRIPTION}
			style={styles.description}
		/>

		<CommonButton
			title={strings.OKAY}
			onPress={() => setShowModal(false)}
			variant={IButtonVariant.Secondary}
			style={styles.button}
			testID={testID || "view_on_desktop_modal_button"}
		/>
	</ConfirmationModal>
);

export default ViewOnDesktopModal;

const styles = StyleSheet.create({
	button: {
		marginBottom: verticalScale(10),
		marginTop: verticalScale(24),
		width: "100%",
	},
	description: {
		color: neutral.grey_07,
		...regular,
		lineHeight: verticalScale(20),
		marginTop: verticalScale(12),
		textAlign: "center",
	},
	heading: {
		color: neutral.black,
		marginTop: verticalScale(20),
		...bold,
		...lg,
	},
});
