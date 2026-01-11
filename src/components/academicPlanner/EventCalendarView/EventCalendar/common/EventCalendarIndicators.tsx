import React from "react";
import { StyleSheet, View } from "react-native";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IEventType } from "@interface/components/academicPlanner/events.interface";

import { colors } from "@assets/colors";

const { content } = colors;

interface IEventCalendarIndicators {
	events: IEventCardProps[];
}

const EventCalendarIndicators = ({ events }: IEventCalendarIndicators) => (
	<View style={styles.indicatorContainer}>
		{events.slice(0, 3).map((event) => (
			<View
				key={event.eventTitle}
				style={[
					styles.indicator,
					{
						borderColor: getColorBasedOnEventType(event.eventType),
					},
				]}
			/>
		))}
	</View>
);

const getColorBasedOnEventType = (type: IEventType): string => {
	switch (type) {
		case IEventType.CONTENT:
		case IEventType.LIVE_SESSION:
			return content.text.mentorship;
		case IEventType.PROFILE:
			return content.text.profile;
		case IEventType.MENTORSHIP:
			return content.text.mentorship;
		case IEventType.PERSONALISED_INDUSTRY:
			return content.text.industry;
		case IEventType.DOUBT_RESOLUTION_SESSION:
		case IEventType.CAREER_COUNSELLING:
		case IEventType.DAILY_DOUBT_RESOLUTION:
		case IEventType.BUDDY_SESSION:
		case IEventType.OTHERS:
			return content.text.career_counselling;
		case IEventType.TA_CALL:
		case IEventType.LECTURE:
			return content.text.lecture;
	}
};

const styles = StyleSheet.create({
	indicator: {
		alignItems: "center",
		borderRadius: horizontalScale(3),
		borderWidth: horizontalScale(1.2),
		height: horizontalScale(4.2),
		justifyContent: "center",
		width: horizontalScale(4.2),
	},
	indicatorContainer: {
		flexDirection: "row",
		gap: horizontalScale(2),
		height: verticalScale(6),
	},
});

export default EventCalendarIndicators;
