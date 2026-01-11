import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { CloseIconOutlineDynamic } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { sm, bold } = commonStyles.text;

const ICON_DIMENSIONS = {
	width: horizontalScale(14),
	height: horizontalScale(14),
};

interface IDeadlineExtensionDeadlineDate {
	deadlineDate: string;
}

const DeadlineExtensionDeadlineDate = ({
	deadlineDate,
}: IDeadlineExtensionDeadlineDate) => {
	if (!deadlineDate) return <></>;

	return (
		<View style={styles.dueDateContainer}>
			<CloseIconOutlineDynamic
				{...ICON_DIMENSIONS}
				color={neutral.black}
				style={styles.closeIcon}
			/>
			<RNText
				title={deadlineDate}
				numberOfLines={2}
				style={styles.dueDateText}
			/>
		</View>
	);
};

export default DeadlineExtensionDeadlineDate;

const styles = StyleSheet.create({
	closeIcon: {
		alignSelf: "center",
	},
	dueDateContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(8),
		marginBottom: verticalScale(6),
	},
	dueDateText: {
		color: neutral.black,
		flex: 1,
		...bold,
		...sm,
	},
});
