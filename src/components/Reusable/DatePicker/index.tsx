import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IDatePickerProps {
	show: boolean;
	setShow: (show: boolean) => void;
	onSubmit: (date: Date) => void;
	initialDate: Date;
	disableFutureDates?: boolean;
	disablePastDates?: boolean;
	maximumDate?: string;
}

const DatePicker: React.FC<IDatePickerProps> = ({
	initialDate,
	onSubmit,
	setShow,
	show,
	disableFutureDates,
	disablePastDates,
	maximumDate,
}) => {
	const hideDatePicker = () => setShow(false);

	const handleConfirm = (date: Date) => {
		hideDatePicker();
		onSubmit(date);
	};

	let computedMaximumDate: Date | undefined;

	if (disableFutureDates) computedMaximumDate = new Date();
	else if (maximumDate) computedMaximumDate = new Date(maximumDate);

	return (
		<DateTimePickerModal
			isVisible={show}
			mode="date"
			onConfirm={handleConfirm}
			onCancel={hideDatePicker}
			date={initialDate}
			maximumDate={computedMaximumDate}
			minimumDate={disablePastDates ? new Date() : new Date("1900-01-01")}
		/>
	);
};

export default DatePicker;
