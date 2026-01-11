import moment from "moment-timezone";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import CancelMentorshipEventModal from "@components/academicPlanner/cards/eventCard/common/CancelMentorshipEventModal";
import EventCardModalMentorshipButtons from "@components/academicPlanner/cards/eventCard/common/EventCardModalMentorshipButtons";
import EventErrorToast from "@components/academicPlanner/cards/eventCard/common/EventErrorToast";
import RescheduleMentorshipRequest from "@components/academicPlanner/cards/eventCard/common/RescheduleMentorshipRequest";
import { IEventCardModalProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import EventAgenda from "@components/academicPlanner/common/EventAgenda";
import EventButton from "@components/academicPlanner/common/EventButton";
import EventDetails from "@components/academicPlanner/common/EventDetails";
import EventInstructors from "@components/academicPlanner/common/EventInstructors";
import EventMentors from "@components/academicPlanner/common/EventMentors";
import EventStatus from "@components/academicPlanner/common/EventStatus";
import EventTitle from "@components/academicPlanner/common/EventTitle";
import EventType from "@components/academicPlanner/common/EventType";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IDateFormat } from "@interface/app.interface";
import {
	IEventButtonTypes,
	IEventStatusType,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { sm, regular, md, semiBold } = commonStyles.text;
const { neutral, content } = colors;

const EventCardModal: React.FC<IEventCardModalProps> = ({
	onClose,
	visible,
	eventType,
	eventStatus,
	headerTitle,
	eventTitle,
	eventData,
	agenda,
	mentors,
	instructors,
	onModalCTAClick,
	ctaType,
	isBtnDisabled,
	style,
	onCancelMentorshipEvent,
	onRescheduleMentorshipEvent,
	startsAt,
	endsAt,
	rescheduleRequestDetails,
	onAcceptRescheduleMentorshipEvent,
	onRejectRescheduleMentorshipEvent,
	showButton,
	rescheduleRequestLimit,
	resourcesCount,
	onResourceCTAClick,
}) => {
	const showMentorshipButtons =
		eventType === IEventType.MENTORSHIP &&
		eventStatus === IEventStatusType.YET_TO_START;

	const [isCancelModalVisible, setCancelModalVisible] = useState(false);
	const [toastText, setToastText] = useState("");
	const [toastVisible, setToastVisible] = useState(false);

	const showToast = (title: string) => {
		setToastText(title);
		setToastVisible(true);

		setTimeout(() => {
			setToastVisible(false);
			setToastText("");
		}, 2000);
	};
	const { name: userTimezone } = useGetTimezone();

	const timeSlot = `${moment(startsAt).tz(userTimezone).format(IDateFormat.time)} - ${moment(endsAt).tz(userTimezone).format(IDateFormat.time)}`;

	const isLessThanOneHourLeft =
		moment(startsAt).tz(userTimezone).diff(moment(), "minutes") < 60;

	return (
		<>
			<ActionModal
				isOpen={visible}
				closeModal={onClose}
				onBackPress={onClose}
				style={styles.modal}
				disableCloseOnSwipeDown
			>
				<View style={[styles.indicatorStyle, style]} />
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<Pressable>
						<View style={styles.rowStyle}>
							<EventType eventType={eventType} />
							<EventStatus eventStatus={eventStatus} />
						</View>
						<RNText
							title={headerTitle}
							style={styles.moduleStyle}
						/>

						<EventTitle
							title={eventTitle}
							style={styles.titleStyle}
							isModal
						/>
						<EventDetails
							eventData={eventData}
							textStyle={styles.contentTextStyle}
						/>

						{rescheduleRequestDetails && (
							<RescheduleMentorshipRequest
								mentor={rescheduleRequestDetails.mentor}
								startsAt={rescheduleRequestDetails.startsAt}
								endsAt={rescheduleRequestDetails.endsAt}
								onAcceptReschedule={
									onAcceptRescheduleMentorshipEvent
								}
								onRejectReschedule={
									onRejectRescheduleMentorshipEvent
								}
							/>
						)}
						<EventAgenda
							agenda={agenda}
							style={styles.agendaStyle}
						/>
						<EventMentors
							mentors={mentors}
							style={styles.mentorsStyle}
						/>
						<EventInstructors
							instructors={instructors}
							style={styles.mentorsStyle}
						/>

						<View style={styles.buttonContainer}>
							{showMentorshipButtons && (
								<EventCardModalMentorshipButtons
									onReschedule={() => {
										if (rescheduleRequestLimit)
											showToast(
												strings.RESCHEDULE_LIMIT_REACHED,
											);
										else if (isLessThanOneHourLeft)
											showToast(strings.CANT_RESCHEUDLE);
										else onRescheduleMentorshipEvent();
									}}
									onCancel={() => {
										if (!isLessThanOneHourLeft) {
											onClose();
											setTimeout(
												() =>
													setCancelModalVisible(true),
												500,
											);
										} else
											showToast(
												strings.CANT_CANCEL_SESSION,
											);
									}}
								/>
							)}
							<View
								style={[
									styles.resourceRow,
									{
										width: resourcesCount
											? horizontalScale(170)
											: undefined,
									},
								]}
							>
								{!!resourcesCount && (
									<EventButton
										ctaType={
											IEventButtonTypes.VIEW_RESOURCES
										}
										onCTAClick={onResourceCTAClick}
										style={styles.ctaStyle}
										isBtnDisabled={isBtnDisabled}
										isModal
									/>
								)}
								{showButton && (
									<EventButton
										ctaType={ctaType}
										onCTAClick={onModalCTAClick}
										style={styles.ctaStyle}
										isBtnDisabled={isBtnDisabled}
										isModal
									/>
								)}
							</View>
						</View>
					</Pressable>
				</ScrollView>
				<EventErrorToast isVisible={toastVisible} text={toastText} />
			</ActionModal>

			<CancelMentorshipEventModal
				closeModal={() => setCancelModalVisible(false)}
				isOpen={isCancelModalVisible}
				handleButtonPress={() => {
					setCancelModalVisible(false);
					onCancelMentorshipEvent();
				}}
				date={moment(startsAt)
					.tz(userTimezone)
					.format(IDateFormat.date)}
				timeSlot={timeSlot}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	agendaStyle: {
		marginTop: verticalScale(16),
	},
	buttonContainer: {
		marginTop: verticalScale(40),
	},
	contentContainer: {
		paddingHorizontal: horizontalScale(16),
	},
	contentTextStyle: {
		...sm,
		...regular,
		color: content.text.body_grey_07,
		lineHeight: verticalScale(18),
	},
	ctaStyle: {
		marginTop: 0,
	},
	indicatorStyle: {
		alignSelf: "center",
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginHorizontal: horizontalScale(20),
		width: horizontalScale(64),
	},
	mentorsStyle: { marginTop: verticalScale(16) },
	modal: {
		maxHeight: verticalScale(600),
		paddingHorizontal: 0,
	},
	moduleStyle: {
		...sm,
		...regular,
		color: content.text.body_grey_07,
		lineHeight: verticalScale(18),
		marginTop: verticalScale(16),
	},
	resourceRow: {
		columnGap: horizontalScale(8),
		flexDirection: "row",
	},
	rowStyle: {
		columnGap: horizontalScale(8),
		flexDirection: "row",
		marginTop: verticalScale(36),
	},
	titleStyle: {
		marginVertical: verticalScale(6),
		...md,
		...semiBold,
		color: content.text.default_black,
		lineHeight: verticalScale(17),
	},
});

export default EventCardModal;
