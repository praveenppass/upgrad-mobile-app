import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import measures from "@utils/measures";

import { C } from "@assets/constants";
import {
	AttendedIcon,
	CancelledIcon,
	LiveNowIcon,
	NotAttendedIcon,
	RescheduleIcon,
} from "@assets/icons";

import RNText from "./RNText";

const ICON_DIMENSIONS = {
	width: 14,
	height: 14,
};

const {
	strings,
	themes: {
		text: { drkOrange, darkBlue },
		bg: { lightOrange, chip, white, reschedule, lightGreen },
		snackbar,
		primary: { color4, error },
		border: { green, color1 },
	},
	commonStyles: {
		text: { sm, bold },
		align: { rowStart },
		spacing: { g6, p6, pl8, pr8 },
	},
} = C;

interface IStatusMappings {
	[key: string]: {
		backgroundColor?: string;
		title?: string;
		textStyles?: object[];
		icon?: JSX.Element | null;
	};
}

const statusMappings: IStatusMappings = {
	open: {
		title: strings.OPEN,
		backgroundColor: lightGreen,
		textStyles: [sm, bold, { color: green }],
		icon: <LiveNowIcon color={green} {...ICON_DIMENSIONS} />,
	},
	closed: {
		title: strings.CLOSED,
		backgroundColor: color1,
		textStyles: [sm, bold, { color: darkBlue }],
		icon: <LiveNowIcon color={darkBlue} {...ICON_DIMENSIONS} />,
	},
	"in-progress": {
		backgroundColor: lightOrange,
		title: strings.LIVE_NOW,
		textStyles: [sm, bold, { color: drkOrange }],
		icon: <LiveNowIcon color={lightOrange} {...ICON_DIMENSIONS} />,
	},
	missed: {
		backgroundColor: snackbar.error,
		title: strings.NOT_ATTENDED,
		textStyles: [sm, bold, { color: error }],
		icon: <NotAttendedIcon {...ICON_DIMENSIONS} />,
	},
	"yet-to-start": {
		title: strings.YETTOSTART,
		backgroundColor: color4,
		textStyles: [sm, bold, { color: reschedule }],
		icon: <LiveNowIcon color={reschedule} {...ICON_DIMENSIONS} />,
	},
	"not-attended": {
		backgroundColor: snackbar.error,
		title: strings.NOT_ATTENDED,
		textStyles: [sm, bold, { color: error }],
		icon: <NotAttendedIcon {...ICON_DIMENSIONS} />,
	},
	absent: {
		backgroundColor: snackbar.error,
		title: strings.ABSENT,
		textStyles: [sm, bold, { color: error }],
		icon: <NotAttendedIcon {...ICON_DIMENSIONS} />,
	},
	"request-to-rescheduled": {
		backgroundColor: color4,
		title: strings.RE_SCHEDULE_REQUIRED,
		textStyles: [sm, bold, { color: reschedule }],
		icon: <RescheduleIcon {...ICON_DIMENSIONS} />,
	},
	cancelled: {
		backgroundColor: chip,
		title: strings.CANCELLED,
		textStyles: [sm, bold, { color: darkBlue }],
		icon: <CancelledIcon color={darkBlue} {...ICON_DIMENSIONS} />,
	},
	attended: {
		backgroundColor: white,
		title: strings.ATTENDED,
		textStyles: [sm, bold, { color: snackbar.success }],
		icon: <AttendedIcon {...ICON_DIMENSIONS} />,
	},
	scheduled: {
		backgroundColor: color4,
		title: strings.SCHEDULED,
		textStyles: [sm, bold, { color: reschedule }],
		icon: <RescheduleIcon {...ICON_DIMENSIONS} />,
	},
	completed: {
		backgroundColor: white,
		title: strings.COMPLETED,
		textStyles: [sm, bold, { color: snackbar.success }],
		icon: <AttendedIcon {...ICON_DIMENSIONS} />,
	},
};

const StatusCard = ({ status }: { status: string }) => {
	const { backgroundColor, title, textStyles, icon } =
		statusMappings[status] || {};

	return (
		<View style={[styles.border, { backgroundColor }]}>
			{icon}
			<RNText title={title} style={textStyles} />
		</View>
	);
};

export default memo(StatusCard);

const styles = StyleSheet.create({
	border: {
		...p6,
		...g6,
		...pl8,
		...pr8,
		...rowStart,
		borderRadius: measures.BORDER.b6,
	},
});
