import React, { memo } from "react";
import { StyleSheet } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img/index";
import { commonStyles } from "@assets/styles";

const { lg, bold, regular } = commonStyles.text;

const { state, neutral } = colors;

/**
 * SurveyBlockerSuccessModal - A confirmation modal that displays survey completion success
 *
 * This component shows a celebration modal when a user successfully completes a survey
 * that was blocking their learning progression. It provides positive feedback and allows
 * the user to continue with their learning journey.
 *
 * @component
 * @param {ISurveyBlockerModal} props - The component props
 * @param {boolean} props.showModal - Controls modal visibility state
 * @param {string} props.title - Optional custom title (defaults to localized survey complete message)
 * @param {string} props.description - Optional custom description (defaults to localized thank you message)
 * @param {Function} props.onClose - Callback executed when modal is closed
 *
 * @returns {JSX.Element} The SurveyBlockerSuccessModal component
 */
interface ISurveyBlockerModal {
	showModal: boolean;
	onClose: () => void;
}

const STRINGS = createStringConstants({
	title: "studyPlan.surveyBlockerSuccess.title",
	description: "studyPlan.surveyBlockerSuccess.description",
	done: "studyPlan.surveyBlockerSuccess.done",
});

const SurveyBlockerSuccessModal = ({
	showModal,
	onClose,
}: ISurveyBlockerModal) => (
	<ConfirmationModal
		visible={showModal}
		onClose={onClose}
		icon={{ uri: IMAGE_URLS.CELEBRATION_CALENDER }}
		bgColor={state.warning_light_yellow}
	>
		<RNText title={getString(STRINGS.title)} style={styles.heading} />

		<RNText
			title={getString(STRINGS.description)}
			style={styles.description}
		/>

		<CommonButton
			title={getString(STRINGS.done)}
			onPress={onClose}
			variant={IButtonVariant.Secondary}
			style={styles.button}
			testID="survey_blocker_success_modal_button"
		/>
	</ConfirmationModal>
);

export default memo(SurveyBlockerSuccessModal);

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
