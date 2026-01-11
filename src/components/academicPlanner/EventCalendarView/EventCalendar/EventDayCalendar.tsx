import moment from "moment-timezone";
import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { sm, semiBold, xxSm, regular } = commonStyles.text;
interface IEventDayCalendar {
	currentDate: string;
}

const EventDayCalendar = ({ currentDate }: IEventDayCalendar) => {
	const { name: userTimezone, offset: userTimezoneOffset } = useGetTimezone();

	const formattedDate = moment(currentDate)
		.tz(userTimezone)
		.format(IDateFormat.dayAndDate);

	return (
		<View style={styles.container}>
			<View style={styles.offsetContainer}>
				<RNText title={`UTC`} style={styles.offsetText} />
				<RNText title={userTimezoneOffset} style={styles.offsetText} />
			</View>
			<View>
				<RNText title={formattedDate} style={styles.formattedDayName} />
			</View>
		</View>
	);
};

export default EventDayCalendar;
const styles = StyleSheet.create({
	container: {
		borderBottomWidth: horizontalScale(1),
		borderColor: neutral.grey_04,
		flexDirection: "row",
		gap: horizontalScale(10),
		paddingBottom: verticalScale(10),
		paddingHorizontal: horizontalScale(10),
		paddingTop: verticalScale(8),
	},
	formattedDayName: {
		color: neutral.black,
		...sm,
		...semiBold,
		lineHeight: verticalScale(18),
	},
	offsetContainer: {
		alignItems: "center",
	},
	offsetText: {
		color: neutral.grey_06,
		...xxSm,
		...regular,
		lineHeight: verticalScale(10),
	},
});
