import React from "react";
import ProfileInput, {
	IInputProps,
} from "@components/Reusable/TextInput/ProfileInput";
import { DatePickerModal } from "react-native-paper-dates";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { C } from "@assets/constants";

const {
	themes: { text },
} = C;

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: text.dark,
	},
};

interface IDatePickerInputProps extends IInputProps {
	onConfirm: (date: string) => void;
	saveLabel?: string;
	startDate?: string;
	endDate?: string;
	allowFurtherDates?: boolean;
}

export const DatePickerInput = (props: IDatePickerInputProps) => {
	const { onConfirm, saveLabel, disabled, startDate, endDate, allowFurtherDates } = props;
	const [date, setDate] = React.useState(undefined);
	const [open, setOpen] = React.useState(false);
	const [resolvePromise, setResolvePromise] = React.useState(null);

	const onDismiss = React.useCallback(() => {
		setOpen(false);
		if (resolvePromise) {
			resolvePromise(null);
		}
	}, [setOpen, resolvePromise]);

	const onConfirmM = React.useCallback(
		(params) => {
			setOpen(false);
			setDate(params.date);
			if (resolvePromise) {
				onConfirm(params.date);
				resolvePromise(params.date);
			}
		},
		[setOpen, setDate, resolvePromise],
	);

	const showDatePicker = () => {
		if (disabled) {
			return;
		}
		setOpen(true);
		return new Promise((resolve) => {
			setResolvePromise(() => resolve);
		});
	};

	return (
		<>
			<ProfileInput
				editable={false}
				onInputClick={showDatePicker}
				{...props}
			/>
			<PaperProvider theme={theme}>
				<DatePickerModal
					saveLabel={saveLabel}
					label={saveLabel}
					moreLabel={saveLabel}
					validRange={{startDate,endDate: allowFurtherDates ? null : endDate || new Date()}}
					locale="en"
					mode="single"
					visible={open}
					onDismiss={onDismiss}
					date={date}
					onConfirm={onConfirmM}
				/>
			</PaperProvider>
		</>
	);
};
