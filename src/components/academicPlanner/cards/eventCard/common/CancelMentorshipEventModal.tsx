import React from "react";
import { Image, View } from "react-native";

import styles from "@components/academicPlanner/cards/eventCard/common/mentorshipModal.style";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { ClockLxpIcon } from "@assets/icons";
import { CancelRedExcalmation } from "@assets/icons/img";
import { strings } from "@assets/strings";

const { cta } = colors;

interface ICancelMentorshipEventModal {
	date: string;
	timeSlot: string;
	isOpen: boolean;
	closeModal: () => void;
	handleButtonPress: () => void;
}

const CancelMentorshipEventModal = ({
	date,
	timeSlot,
	isOpen,
	closeModal,
	handleButtonPress,
}: ICancelMentorshipEventModal) => (
	<ActionModal
		isOpen={isOpen}
		style={styles.modal}
		closeModal={closeModal}
		onBackPress={closeModal}
	>
		<View style={styles.handle} />
		<View style={styles.statusContainer}>
			<Image
				source={CancelRedExcalmation}
				style={styles.statusImage}
				resizeMode="contain"
			/>

			<RNText title={strings.CANCEL_MEETING} style={styles.statusText} />
		</View>

		<View style={[styles.timeContainer, styles.cancelModalTimeBorder]}>
			<RNText
				title={strings.CONFIRM_MEETING_CANCELLATION}
				style={styles.sessionStartInfoText}
			/>
			<RNText title={date} style={styles.dateText} />
			<View style={styles.slotContainer}>
				<ClockLxpIcon
					color={styles.slotTextIcon.color}
					height={horizontalScale(12)}
					width={horizontalScale(12)}
				/>
				<RNText title={timeSlot} style={styles.slotText} />
			</View>
		</View>

		<CommonButton
			title={strings.CONFIRM}
			variant={IButtonVariant.Primary}
			onPress={handleButtonPress}
			style={styles.confirmButton}
		/>
	</ActionModal>
);

export default CancelMentorshipEventModal;
