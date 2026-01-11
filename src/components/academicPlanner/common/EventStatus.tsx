import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { getEventStatusData } from "@components/academicPlanner/cards/eventCard/eventCard.util";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IEventStatusType } from "@interface/components/academicPlanner/events.interface";

import { commonStyles } from "@assets/styles";

const { xxSm, regular } = commonStyles.text;

interface IEventStatusProps {
	eventStatus: IEventStatusType;
	style?: ViewStyle;
}

const EventStatus: React.FC<IEventStatusProps> = ({ eventStatus, style }) => {
	const { title, textColor, bgColor } = getEventStatusData(eventStatus);

	return (
		<View style={[styles.container, style, { backgroundColor: bgColor }]}>
			<View style={[styles.dotStyle, { backgroundColor: textColor }]} />
			<RNText
				title={title}
				style={[styles.titleTextStyle, { color: textColor }]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		borderRadius: horizontalScale(4),
		columnGap: horizontalScale(4),
		flexDirection: "row",
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(2),
	},
	dotStyle: {
		borderRadius: horizontalScale(2.5),
		height: verticalScale(5),
		width: horizontalScale(5),
	},
	titleTextStyle: {
		...xxSm,
		...regular,
		lineHeight: verticalScale(12),
	},
});

export default EventStatus;
