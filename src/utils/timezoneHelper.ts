import moment from "moment-timezone";

import { getTimezoneFromStore } from "@utils/store.util";

import { IDateFormat } from "@interface/app.interface";

const formatDateByTime = (
	timestamp: string,
	format = IDateFormat.date,
): string => {
	const { name: userTimezone } = getTimezoneFromStore();
	const myDate = moment(timestamp).tz(userTimezone);
	const formattedDate = myDate.format(format);
	return formattedDate;
};

const formatWithTimeZone = (inputDate1: string) => {
	if (inputDate1) {
		const { name: userTimezone } = getTimezoneFromStore();
		const myDate = moment(inputDate1).tz(userTimezone);
		const formattedDate = myDate.format(IDateFormat.time);
		return formattedDate;
	}
	return "";
};

const getDateWithAddedHardDeadlineFormatted = (
	timestamp: string,
	hardDeadline: number,
): string => {
	const { name: userTimezone } = getTimezoneFromStore();
	const myDate = moment(timestamp).tz(userTimezone);
	const addedDate = myDate.add(hardDeadline, "days"); // Add hardDeadline days
	const formattedDate = addedDate.format(IDateFormat.time); // Format in specified timezone
	return formattedDate;
};

const getDateTwoDaysPriorFormatted = (
	timestamp: string,
	hardDeadline: number,
): string => {
	const { name: userTimezone } = getTimezoneFromStore();
	const myDate = moment(timestamp).tz(userTimezone);
	const priorDate = myDate.subtract(hardDeadline, "days");
	const formattedDate = priorDate.format(IDateFormat.time);
	return formattedDate;
};

const formatResponseTime = (date: string | Date): string => {
	const { name: userTimezone } = getTimezoneFromStore();
	const now = moment().tz(userTimezone);
	const givenDate = moment(date).tz(userTimezone);
	const diffSeconds = now.diff(givenDate, "seconds");
	const diffMinutes = now.diff(givenDate, "minutes");
	const diffHours = now.diff(givenDate, "hours");

	return diffSeconds < 10
		? "Just now"
		: diffSeconds < 60
			? `${diffSeconds} sec${diffSeconds > 1 ? "s" : ""} ago`
			: diffMinutes < 60
				? `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`
				: diffHours < 24
					? `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`
					: `on ${givenDate.tz(userTimezone).format(IDateFormat.date)}`;
};

export {
	formatWithTimeZone,
	formatDateByTime,
	getDateTwoDaysPriorFormatted,
	getDateWithAddedHardDeadlineFormatted,
	formatResponseTime,
};
