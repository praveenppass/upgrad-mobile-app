import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { getSessionTitleData } from "@components/academicPlanner/cards/eventCard/eventCard.util";
import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { IEventType } from "@interface/components/academicPlanner/events.interface";

import { commonStyles } from "@assets/styles";

const { xxSm, regular } = commonStyles.text;

interface IEventTypeProps {
	eventType: IEventType;
	style?: ViewStyle;
}

const EventType: React.FC<IEventTypeProps> = ({ eventType, style }) => {
	const { title, textcolor } = getSessionTitleData(eventType);

	return (
		<View key={eventType} style={style}>
			<RNText
				title={`| ${title.toUpperCase()} |`}
				style={[styles.titleTextStyle, { color: textcolor }]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	titleTextStyle: {
		...xxSm,
		...regular,
		lineHeight: verticalScale(12),
		marginVertical: verticalScale(2),
	},
});

export default EventType;
