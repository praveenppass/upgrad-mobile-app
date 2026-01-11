import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
	IMentorshipModalFormKeys,
	IMentorshipModalFormValues,
	IUseMentorshipScheduleMeetingModalController,
} from "@components/academicPlanner/cards/Mentorship/ScheduleMeetingModal/index.interface";
import { parseTimeSlotToRadioValue } from "@components/academicPlanner/cards/Mentorship/ScheduleMeetingModal/index.util";
import useMentorshipScheduleMeetingModalModel from "@components/academicPlanner/cards/Mentorship/ScheduleMeetingModal/useScheduleMeetingModalModel";

import useGetTimezone from "@hooks/useGetTimezone";

import { IDateFormat } from "@interface/app.interface";

import { CalendarIcon, UserLxpIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const useMentorshipScheduleMeetingModalController = ({
	mentor,
	mentorWindowId,
	workshopId,
	bookByDate,
	isReschedule,
	mentorshipId,
	mentorWindowEventId,
	onClose,
	onRefetchEvents,
}: IUseMentorshipScheduleMeetingModalController) => {
	const {
		getMentorshipAvailableSlots,
		mentorshipAvailSlotsLoading,
		mentorshipAvailableSlots,
		rescheduleMentorshipSession,
		scheduleMentorshipSession,
	} = useMentorshipScheduleMeetingModalModel();
	const { name: userTimezone } = useGetTimezone();

	const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

	const { ...methods } = useForm<IMentorshipModalFormValues>();

	const selectedDate = methods.watch(IMentorshipModalFormKeys.MEETING_DATE);
	const selectedTime = methods.watch(IMentorshipModalFormKeys.MEETING_TIME);
	const hasSelectedDate = !!selectedDate;

	useEffect(() => {
		if (!hasSelectedDate) return;

		const variables = {
			where: {
				mentorWindow: mentorWindowId || "",
				workshop: workshopId || "",
				endsAt: {
					_lte: moment(selectedDate)
						.tz(userTimezone)
						.endOf("day")
						.toISOString(),
				},
				startsAt: {
					_gte: moment(selectedDate)
						.tz(userTimezone)
						.startOf("day")
						.toISOString(),
				},
			},
		};

		getMentorshipAvailableSlots({ variables });
		methods.clearErrors(IMentorshipModalFormKeys.MEETING_TIME);
		methods.resetField(IMentorshipModalFormKeys.MEETING_TIME);
	}, [selectedDate]);

	const eventData = [
		{
			Icon: CalendarIcon,
			text: `Book by ${moment.tz(bookByDate, userTimezone).format(IDateFormat.weekDateTime)}`,
		},
		...(mentor
			? [
					{
						Icon: UserLxpIcon,
						text: `${mentor.firstName} ${mentor.lastName}`,
					},
				]
			: []),
	];

	const title = isReschedule
		? strings.RESCHEDULE_MEETING
		: strings.SCHEDULE_MEETING;

	const timeSlots =
		mentorshipAvailableSlots?.availableMentorSlots
			?.filter((slot) => {
				const currentTime = moment().tz(userTimezone).add(1, "hour");
				const slotStartTime = moment(slot.startsAt).tz(userTimezone);

				return slotStartTime.isAfter(currentTime);
			})
			.map((slot) =>
				parseTimeSlotToRadioValue({ ...slot, userTimezone }),
			) || [];

	const handleSubmit = ({ meetingTime }: IMentorshipModalFormValues) => {
		if (!meetingTime) return;

		const baseVariables = { data: { mentorSlot: meetingTime.value } };

		if (isReschedule)
			rescheduleMentorshipSession({
				variables: { ...baseVariables, where: { id: mentorshipId } },
			});
		else
			scheduleMentorshipSession({
				variables: {
					...baseVariables,
					where: {
						workshop: workshopId || "",
						event: mentorWindowEventId || "",
						mentorWindow: mentorWindowId || "",
					},
				},
			});

		onClose();
		setTimeout(() => {
			setSuccessModalVisible(true);
			setTimeout(() => {
				setSuccessModalVisible(false);
				onRefetchEvents();
			}, 3000);
		}, 500);
	};

	return {
		eventData,
		title,
		timeSlots,
		mentorshipAvailSlotsLoading,
		hasSelectedDate,
		methods,
		handleSubmit,

		isSuccessModalVisible,
		setSuccessModalVisible,

		selectedDate,
		selectedTime,
	};
};

export default useMentorshipScheduleMeetingModalController;
