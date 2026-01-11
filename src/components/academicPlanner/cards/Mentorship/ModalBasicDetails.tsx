import React from "react";
import { StyleSheet, View } from "react-native";

import { IItem } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import EventDetails from "@components/academicPlanner/common/EventDetails";
import EventStatus from "@components/academicPlanner/common/EventStatus";
import EventTitle from "@components/academicPlanner/common/EventTitle";
import EventType from "@components/academicPlanner/common/EventType";

import { horizontalScale, verticalScale } from "@utils/functions";

import {
	IEventStatusType,
	IEventType,
} from "@interface/components/academicPlanner/events.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { sm, regular, md, semiBold } = commonStyles.text;
const { content } = colors;

interface IMentorshipModalDetails {
	eventTitle: string;
	eventData: IItem[];
	eventStatus: IEventStatusType;
}

const MentorshipModalDetails = ({
	eventData,
	eventTitle,
	eventStatus,
}: IMentorshipModalDetails) => (
	<>
		<View style={styles.row}>
			<EventType eventType={IEventType.MENTORSHIP} />
			<EventStatus eventStatus={eventStatus} />
		</View>

		<EventTitle title={eventTitle} style={styles.title} />
		<EventDetails eventData={eventData} textStyle={styles.contentText} />
	</>
);

export default MentorshipModalDetails;

const styles = StyleSheet.create({
	contentText: {
		...sm,
		...regular,
		color: content.text.body_grey_07,
		lineHeight: verticalScale(18),
	},
	row: {
		columnGap: horizontalScale(8),
		flexDirection: "row",
		marginBottom: verticalScale(16),
	},
	title: {
		marginVertical: verticalScale(6),
		...md,
		...semiBold,
		color: content.text.default_black,
		lineHeight: verticalScale(17),
	},
});
