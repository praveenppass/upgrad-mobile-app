import React from "react";
import { StyleSheet, View } from "react-native";

import { IEventInfo } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IViewedStatus } from "@interface/components/academicPlanner/events.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { xxSm, regular } = commonStyles.text;

const ICON_DIMENSIONS = {
	width: horizontalScale(12),
	height: verticalScale(12),
};

interface EventInfoProps {
	eventInfo?: IEventInfo;
}

const EventInfo: React.FC<EventInfoProps> = ({ eventInfo }) => {
	if (!eventInfo || !eventInfo.text) return <View />;

	const { Icon, text, textStyle } = eventInfo;

	const shouldShowIcon = text !== IViewedStatus.NOT_VIEWED;

	return (
		<View style={styles.row}>
			{shouldShowIcon && (
				<Icon color={colors.neutral.grey_07} {...ICON_DIMENSIONS} />
			)}
			<RNText title={text} style={[styles.textStyle, textStyle]} />
		</View>
	);
};

const styles = StyleSheet.create({
	attendanceIconStyle: {
		height: verticalScale(12),
		width: horizontalScale(12),
	},
	row: {
		alignItems: "center",
		flexDirection: "row",
		marginTop: verticalScale(3),
	},
	textStyle: {
		...xxSm,
		...regular,
		color: colors.content.text.default_black,
		lineHeight: verticalScale(12),
		marginLeft: horizontalScale(3),
	},
});

export default EventInfo;
