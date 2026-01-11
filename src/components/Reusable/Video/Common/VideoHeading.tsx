import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { IVideoProgramDetailsUserEvent } from "@graphql/query/asset/video/landscape/getProgramDetailsQuery";

import { horizontalScale, verticalScale } from "@utils/functions";
import { formatDateByTime, formatWithTimeZone } from "@utils/timezoneHelper";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { CalendarIconGray, ChatIcon, SuccessIconLxp } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, content } = colors;
const {
	text: { semiBold, md, xxSm, regular, lineHeight19 },
} = commonStyles;

type IVideoHeadingProps = {
	data?: IVideoProgramDetailsUserEvent;
	toggleChatVisibility: () => void;
};
const VideoHeading = ({ data, toggleChatVisibility }: IVideoHeadingProps) => {
	const startsAt = data?.userEvent?.startsAt ?? "";
	const endsAt = data?.userEvent?.endsAt ?? "";

	const date = useMemo(() => {
		return `${formatDateByTime(startsAt, IDateFormat.date)}, ${formatWithTimeZone(startsAt)} - ${formatWithTimeZone(endsAt)}`;
	}, [startsAt, endsAt]);

	const userEvent = data?.userEvent;
	const courseName = userEvent?.userProgram?.courseInfo?.name;
	const workshopSession = userEvent?.workshopSession;
	const attendanceStatus = workshopSession?.attendance?.status;

	if (!data?.userEvent) return null;

	return (
		<>
			<View style={styles.headerRow}>
				<RNText title={strings.LECTURE_} style={styles.lectureTxt} />
				{workshopSession ? (
					<View style={styles.attendedRow}>
						<SuccessIconLxp />
						<RNText
							title={attendanceStatus}
							style={styles.headingTxt}
						/>
					</View>
				) : null}
			</View>

			<View style={styles.titleRow}>
				<RNText title={courseName} style={styles.titleText} />
				<Pressable
					onPress={toggleChatVisibility}
					style={styles.chatView}
				>
					<ChatIcon />
				</Pressable>
			</View>

			<View style={styles.calendarRow}>
				<CalendarIconGray />
				<RNText title={date} style={styles.headingTxt} />
			</View>
		</>
	);
};

export default VideoHeading;

const styles = StyleSheet.create({
	attendedRow: {
		alignItems: "center",
		columnGap: horizontalScale(5),
		flexDirection: "row",
		marginLeft: horizontalScale(5),
	},

	calendarRow: {
		alignItems: "center",
		columnGap: horizontalScale(10),
		flexDirection: "row",
		marginBottom: verticalScale(12),
	},

	chatView: {
		padding: horizontalScale(5),
	},
	headerRow: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: verticalScale(15),
	},
	headingTxt: {
		color: neutral.grey_07,
		...xxSm,
		...regular,
	},
	lectureTxt: {
		color: content.text.lecture,
		...xxSm,
		...regular,
	},
	titleRow: {
		columnGap: horizontalScale(10),
		flexDirection: "row",
		justifyContent: "space-between",
	},

	titleText: {
		...md,
		...semiBold,
		...lineHeight19,
		color: neutral.black,
		letterSpacing: horizontalScale(0.5),
		marginBottom: verticalScale(10),
		width: "85%",
	},
});
