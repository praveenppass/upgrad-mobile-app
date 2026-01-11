import moment from "moment-timezone";
import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";
import { formatDateByTime } from "@utils/timezoneHelper";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { InfoLxp } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;
const { semiBold, md, regular, sm } = commonStyles.text;

interface ITaskSubmissionHeaderProps {
	title: string;
	dueDate?: string | null;
	hardDeadlineDays?: number;
}

const ICON_DIMENSIONS = {
	width: horizontalScale(20),
	height: verticalScale(20),
};

const TaskSubmissionHeader: React.FC<ITaskSubmissionHeaderProps> = ({
	title,
	dueDate,
	hardDeadlineDays,
}) => {
	const { name: userTimezone } = useGetTimezone();

	const formattedDueDate = dueDate
		? `${formatDateByTime(`${dueDate}`, IDateFormat.dateWithTime)}`
		: "";

	const dueDateDeadline = moment(dueDate).tz(userTimezone);
	const hardDeadline = dueDateDeadline?.add(hardDeadlineDays || 0, "day");

	const getDeadlineStatus = () => {
		const nowDate = moment().tz(userTimezone);

		if (nowDate.isBefore(dueDate))
			return `${strings.SUBMIT_BEFORE} ${formattedDueDate} ${strings.TO_AVOID_PENALTY}`;
		else if (nowDate.isAfter(dueDate) && nowDate.isBefore(hardDeadline))
			return `${strings.SUBMITTING_AFTER} ${formattedDueDate} ${strings.MAY_INCUR_PENALTY}`;
		else return `${strings.SUBMISSION_CONSIDERED_ONLY_FOR_EVALUTAION}`;
	};

	return (
		<>
			<RNText style={styles.heading}>{title}</RNText>

			{dueDate ? (
				<View style={styles.penaltyContainer}>
					<InfoLxp
						{...ICON_DIMENSIONS}
						style={styles.aligned}
						color={highlight.text_brown}
					/>
					<RNText
						numberOfLines={2}
						title={getDeadlineStatus()}
						style={styles.penaltyText}
					/>
				</View>
			) : null}
		</>
	);
};

export default TaskSubmissionHeader;

const styles = StyleSheet.create({
	aligned: {
		alignSelf: "flex-start",
	},
	heading: {
		color: neutral.black,
		...semiBold,
		...md,
		lineHeight: verticalScale(14),
		marginTop: verticalScale(16),
	},
	penaltyContainer: {
		backgroundColor: highlight.bg_brown,
		borderRadius: horizontalScale(8),
		flexDirection: "row",
		marginHorizontal: horizontalScale(2),
		marginTop: verticalScale(16),
		padding: horizontalScale(10),
	},
	penaltyText: {
		color: highlight.text_brown,
		...sm,
		...regular,
		flex: 1,
		lineHeight: verticalScale(15),
		marginLeft: horizontalScale(4),
	},
});
