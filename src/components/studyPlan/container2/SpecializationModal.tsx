import React from "react";
import { StyleSheet } from "react-native";

import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { sm, lg, bold, regular } = commonStyles.text;
const { neutral, state } = colors;

const STRINGS = createStringConstants({
	TITLE: "studyPlan.container2.specializationModal.title",
	DESCRIPTION: "studyPlan.container2.specializationModal.description",
});

interface IContainer1Modal {
	isVisible: boolean;
	onClose: () => void;
	specializationCount: number;
}

const SpecializationModal = ({
	isVisible,
	onClose,
	specializationCount,
}: IContainer1Modal) => (
	<ConfirmationModal
		visible={isVisible}
		onClose={onClose}
		bgColor={state.warning_light_yellow}
		icon={IMAGE_URLS.DESKTOP_SPECIALIZATION_ICON}
	>
		<RNText title={getString(STRINGS.TITLE)} style={styles.titleTxt} />
		<RNText
			title={`${getString(STRINGS.DESCRIPTION, specializationCount)}.`}
			style={styles.disc}
		/>
	</ConfirmationModal>
);

export default SpecializationModal;

const styles = StyleSheet.create({
	disc: {
		color: neutral.black,
		...sm,
		...regular,
		lineHeight: verticalScale(18),
		marginVertical: verticalScale(16),
		textAlign: "center",
	},
	titleTxt: {
		color: neutral.black,
		...bold,
		textAlign: "justify",
		...lg,
	},
});
