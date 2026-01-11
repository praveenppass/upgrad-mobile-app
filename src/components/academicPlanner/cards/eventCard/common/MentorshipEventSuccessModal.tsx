import React from "react";
import { Image, View } from "react-native";

import styles from "@components/academicPlanner/cards/eventCard/common/mentorshipModal.style";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale } from "@utils/functions";

import { ClockLxpIcon } from "@assets/icons";
import { SuccessGreenTickNoShadow } from "@assets/icons/img";
import { strings } from "@assets/strings";

interface IMentorshipEventSuccessModal {
	date: string;
	timeSlot: string;
	isOpen: boolean;
	closeModal: () => void;
}

const MentorshipEventSuccessModal = ({
	date,
	timeSlot,
	closeModal,
	isOpen,
}: IMentorshipEventSuccessModal) => (
	<ActionModal
		isOpen={isOpen}
		style={styles.modal}
		closeModal={closeModal}
		onBackPress={closeModal}
	>
		<View style={styles.handle} />

		<View style={styles.statusContainer}>
			<Image
				source={SuccessGreenTickNoShadow}
				style={styles.statusImage}
				resizeMode="contain"
			/>

			<RNText
				title={strings.SLOT_SUCCESSFULLY_BOOKED}
				style={styles.statusText}
			/>
			<RNText
				title={strings.MEETING_SCHEDULED_WITH_MENTOR}
				style={styles.statusSubText}
			/>
		</View>

		<View style={[styles.timeContainer, styles.successModalTimeBorder]}>
			<RNText title={date} style={styles.dateText} />
			<View style={styles.slotContainer}>
				<ClockLxpIcon
					color={styles.slotTextIcon.color}
					height={horizontalScale(12)}
					width={horizontalScale(12)}
				/>
				<RNText title={timeSlot} style={styles.slotText} />
			</View>

			<RNText
				title={strings.YOU_CAN_JOIN}
				style={styles.sessionStartInfoText}
			/>
		</View>
	</ActionModal>
);

export default MentorshipEventSuccessModal;
