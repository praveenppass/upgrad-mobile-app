import moment from "moment-timezone";

interface IIsCurrentDateBeforeGivenDate {
	givenDate: string | null;
	userTimezone: string;
}

export const isCurrentDateBeforeGivenDate = ({
	givenDate,
	userTimezone,
}: IIsCurrentDateBeforeGivenDate) => {
	if (!givenDate) return false;
	const currentDate = moment().tz(userTimezone);
	return currentDate.isBefore(moment(givenDate).tz(userTimezone));
};
