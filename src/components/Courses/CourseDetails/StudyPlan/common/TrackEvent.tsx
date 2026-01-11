import moment from "moment-timezone";
import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { IStudyCourseUserProgramContainer } from "@graphql/query/studyplanTemp/getStudyProgramListQuery";
import { IUserCourseContainer } from "@graphql/query/studyplanTemp/getStudyUserCourseContainer";

import useGetTimezone from "@hooks/useGetTimezone";

import { horizontalScale, verticalScale } from "@utils/functions";
import { formatDateByTime } from "@utils/timezoneHelper";

import { IDateFormat } from "@interface/app.interface";

import { C } from "@assets/constants";
import { NotFoundAssetIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	colors: { neutral },
	commonStyles: {
		text: { sm, regular, semiBold, xlg },
	},
} = C;

interface ITrackProps {
	data: IStudyCourseUserProgramContainer | IUserCourseContainer;
}

const TrackEvent = ({ data }: ITrackProps) => {
	const { name: userTimezone } = useGetTimezone();
	const ICON_DIMENSIONS = {
		height: verticalScale(155),
		width: horizontalScale(145),
	};

	const {
		isTrackGroup,
		trackSelectionFrom,
		electiveSelectionFrom,
		trackAvailableTill,
		electiveAvailableTill,
	} = data?.activity || {};

	const isDatePassed = (date: string) => {
		const today = moment().tz(userTimezone).startOf("day");
		const trackDate = moment(date).tz(userTimezone).startOf("day");
		return trackDate.isBefore(today) || trackDate.isSame(today);
	};

	const selectionFromDatePassed = isDatePassed(
		isTrackGroup ? trackSelectionFrom : electiveSelectionFrom,
	);
	const availableTillDatePassed = isDatePassed(
		isTrackGroup ? trackAvailableTill : electiveAvailableTill,
	);

	const getTrackMessage = (isAboveMessage: boolean) => {
		if (availableTillDatePassed) {
			return isTrackGroup
				? strings.THIS_TRACK_WILL_BE_AVAILABLE_FROM
				: strings.THIS_ELECTIVE_WILL_BE_AVAILABLE_FROM;
		}

		if (!selectionFromDatePassed) {
			return isAboveMessage
				? isTrackGroup
					? strings.THIS_COURSE_IS_PART_OF_TRACK_FROM
					: strings.THIS_COURSE_IS_PART_OF_ELECTIVE_FROM
				: isTrackGroup
					? strings.PLEASE_VISIT_US_ON_DESKTOP_SEE_TRACK
					: strings.PLEASE_VISIT_US_ON_DESKTOP_TO_SEE_CURRICULUM_ELECTIVE;
		}

		return isAboveMessage
			? isTrackGroup
				? strings.THIS_COURSE_IS_PART_OF_TRACK_WHICH_IS_AVAILABLE_NOW
				: strings.THIS_COURSE_IS_PART_OF_ELECTIVE_NOW_WHICH_IS_AVAILABLE_NOW
			: isTrackGroup
				? strings.PLEASE_SELECT_TRACK_ON_DESKTOP
				: strings.PLEASE_SELECT_ELECTIVE_ON_DESKTOP;
	};

	const getFormateDate = () => {
		const date = availableTillDatePassed
			? isTrackGroup
				? trackAvailableTill
				: electiveAvailableTill
			: isTrackGroup
				? trackSelectionFrom
				: electiveSelectionFrom;

		return `${formatDateByTime(`${date}`, IDateFormat.date)}`;
	};

	return (
		<View style={styles.container}>
			<NotFoundAssetIcon {...ICON_DIMENSIONS} />

			<RNText style={styles.titleText} title={strings.VIEW_ON_DESKTOP} />

			<RNText style={styles.descTxt} title={getTrackMessage(true)}>
				{!selectionFromDatePassed || availableTillDatePassed ? (
					<RNText style={styles.dateTxt} title={getFormateDate()} />
				) : null}
			</RNText>

			{!availableTillDatePassed ? (
				<RNText style={styles.descTxt} title={getTrackMessage(false)} />
			) : null}
		</View>
	);
};

export default TrackEvent;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		marginBottom: verticalScale(200),
		paddingHorizontal: horizontalScale(16),
	},
	dateTxt: {
		...semiBold,
		...sm,
		color: neutral.black,
	},
	descTxt: {
		color: neutral.grey_07,
		marginTop: verticalScale(5),
		paddingHorizontal: horizontalScale(16),
		textAlign: "center",
		...regular,
		...sm,
	},
	titleText: {
		color: neutral.black,
		marginBottom: verticalScale(16),
		...semiBold,
		...xlg,
	},
});
