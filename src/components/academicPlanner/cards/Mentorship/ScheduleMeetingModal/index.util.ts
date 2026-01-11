import moment from "moment-timezone";

import { IParseTimeSlotToRadioValue } from "@components/academicPlanner/cards/Mentorship/ScheduleMeetingModal/index.interface";

import { IDateFormat } from "@interface/app.interface";

const parseDate = (date: string, userTimezone: string) =>
	moment(date).tz(userTimezone).format(IDateFormat.time);

export const parseTimeSlotToRadioValue = ({
	id,
	startsAt,
	endsAt,
	userTimezone,
}: IParseTimeSlotToRadioValue) => ({
	value: id,
	label: `${parseDate(startsAt, userTimezone)} - ${parseDate(endsAt, userTimezone)}`,
});
