import moment from "moment-timezone";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import MentorshipEventSuccessModal from "@components/academicPlanner/cards/eventCard/common/MentorshipEventSuccessModal";
import MentorshipModalDetails from "@components/academicPlanner/cards/Mentorship/ModalBasicDetails";
import {
	IMentorshipModalFormKeys,
	IMentorshipScheduleMeetingModal,
} from "@components/academicPlanner/cards/Mentorship/ScheduleMeetingModal/index.interface";
import useMentorshipScheduleMeetingModalController from "@components/academicPlanner/cards/Mentorship/ScheduleMeetingModal/useScheduleMeetingModalController";
import DateInput from "@components/Inputs/DateInput";
import RadioChipInput from "@components/Inputs/RadioChipInput";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { md, semiBold } = commonStyles.text;
const { neutral, primary } = colors;

const MentorshipScheduleMeetingModal: React.FC<
	IMentorshipScheduleMeetingModal
> = ({
	onClose,
	visible,
	eventStatus,
	eventTitle,
	isReschedule,
	bookByDate,
	mentor,
	mentorWindowId,
	workshopId,
	mentorshipId,
	mentorWindowEventId,
	onRefetchEvents,
}) => {
	const {
		eventData,
		hasSelectedDate,
		mentorshipAvailSlotsLoading,
		methods,
		timeSlots,
		title,
		handleSubmit,

		isSuccessModalVisible,
		setSuccessModalVisible,

		selectedDate,
		selectedTime,
	} = useMentorshipScheduleMeetingModalController({
		mentor,
		mentorWindowId,
		workshopId,
		bookByDate,
		isReschedule,
		mentorshipId,
		mentorWindowEventId,
		onClose,
		onRefetchEvents,
	});
	const { name: userTimezone } = useGetTimezone();

	return (
		<>
			<ActionModal
				isOpen={visible}
				closeModal={onClose}
				style={styles.modal}
				disableCloseOnSwipeDown
			>
				<View style={styles.container}>
					<View style={styles.indicatorStyle} />
					<RNText title={title} style={styles.heading} />

					<ScrollView contentContainerStyle={styles.scrollContainer}>
						<MentorshipModalDetails
							eventData={eventData}
							eventTitle={eventTitle}
							eventStatus={eventStatus}
						/>

						<FormProvider {...methods}>
							<View style={styles.formContainer}>
								<DateInput
									label={strings.CHOOSE_DATE}
									placeholder={strings.SELECT_PLACEHOLDER}
									name={IMentorshipModalFormKeys.MEETING_DATE}
									rules={{
										required:
											strings.THIS_FIELD_IS_REQUIRED,
									}}
									isMandatory
									disablePastDates
									maximumDate={bookByDate}
								/>

								{hasSelectedDate && (
									<RadioChipInput
										isMandatory
										label={strings.CHOOSE_TIME}
										name={
											IMentorshipModalFormKeys.MEETING_TIME
										}
										rules={{
											required:
												strings.THIS_FIELD_IS_REQUIRED,
										}}
										values={timeSlots}
										loading={mentorshipAvailSlotsLoading}
										noValuesPlaceholder={
											strings.NO_SLOTS_AVAIL
										}
									/>
								)}
							</View>

							<Pressable
								style={styles.button}
								onPress={methods.handleSubmit(handleSubmit)}
							>
								<RNText
									title={strings.CONFIRM}
									style={styles.buttonText}
								/>
							</Pressable>
						</FormProvider>
					</ScrollView>
				</View>
			</ActionModal>

			<MentorshipEventSuccessModal
				date={moment(selectedDate)
					.tz(userTimezone)
					.format(IDateFormat.date)}
				timeSlot={selectedTime?.label || ""}
				closeModal={() => setSuccessModalVisible(false)}
				isOpen={isSuccessModalVisible}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: primary.red_05,
		borderRadius: horizontalScale(6),
		marginTop: verticalScale(36),
		paddingVertical: verticalScale(14),
	},
	buttonText: {
		textAlign: "center",
		...semiBold,
		...md,
		color: neutral.white,
	},
	container: {
		maxHeight: verticalScale(600),
	},
	formContainer: {
		gap: verticalScale(16),
		marginVertical: verticalScale(16),
	},
	heading: {
		marginBottom: verticalScale(16),
		textAlign: "center",
		...md,
		...semiBold,
		color: neutral.black,
	},
	indicatorStyle: {
		alignSelf: "center",
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginBottom: verticalScale(24),
		width: horizontalScale(64),
	},
	modal: {
		paddingHorizontal: 0,
	},
	scrollContainer: {
		paddingHorizontal: horizontalScale(20),
	},
});

export default MentorshipScheduleMeetingModal;
