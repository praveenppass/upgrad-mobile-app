import React from "react";
import { StyleSheet, View } from "react-native";
import { TextStyle } from "react-native";

import { IItem } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

interface IEventDetailsProps {
	eventData: IItem[];
	textStyle?: TextStyle;
	isModal?: boolean;
}
const ICON_DIMENSIONS = {
	width: horizontalScale(12),
	height: verticalScale(12),
};
const MODAL_ICON_DIMENSIONS = {
	width: horizontalScale(16),
	height: verticalScale(16),
};
const EventDetails: React.FC<IEventDetailsProps> = ({
	eventData,
	textStyle,
	isModal,
}) => {
	return (
		<>
			{eventData.map(({ Icon, text }, index) => (
				<View key={index} style={styles.row}>
					<Icon
						color={colors.neutral.grey_07}
						{...(isModal ? MODAL_ICON_DIMENSIONS : ICON_DIMENSIONS)}
					/>
					<RNText style={textStyle} title={text} />
				</View>
			))}
		</>
	);
};

const styles = StyleSheet.create({
	row: {
		alignItems: "center",
		columnGap: horizontalScale(4),
		flexDirection: "row",
		rowGap: verticalScale(4),
	},
});

export default EventDetails;
