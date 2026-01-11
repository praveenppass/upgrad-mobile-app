import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { IRangeSelectionType } from "@components/academicPlanner/common/EventDateSelector/index.interface";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { ArrowDownIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

interface IRangeTypeSelector {
	rangeSelectionType: IRangeSelectionType;
	onRangeSelectionPress: () => void;
}

const { neutral } = colors;
const { semiBold } = commonStyles.text;

const getDateSelectorLabel = (rangeSelectionType: IRangeSelectionType) => {
	switch (rangeSelectionType) {
		case IRangeSelectionType.Day:
			return "Day";
		case IRangeSelectionType.Week:
			return "Week";
		case IRangeSelectionType.Month:
			return "Month";
		case IRangeSelectionType.CustomDates:
			return "Custom";
	}
};

const RangeTypeSelector = ({
	rangeSelectionType,
	onRangeSelectionPress,
}: IRangeTypeSelector) => (
	<Pressable style={styles.typeContainer} onPress={onRangeSelectionPress}>
		<RNText
			title={getDateSelectorLabel(rangeSelectionType)}
			style={styles.typeText}
		/>

		<ArrowDownIcon color={neutral.white} />
	</Pressable>
);

export default RangeTypeSelector;

const styles = StyleSheet.create({
	typeContainer: {
		alignItems: "center",
		borderColor: neutral.grey_03,
		borderRadius: horizontalScale(4),
		borderWidth: horizontalScale(1),
		columnGap: horizontalScale(12),
		flexDirection: "row",
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(4),
	},
	typeText: {
		color: neutral.white,
		...semiBold,
	},
});
