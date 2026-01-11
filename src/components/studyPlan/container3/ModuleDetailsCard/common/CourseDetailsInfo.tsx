import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

import Icon, { InfoType } from "./Icon";

const { xxSm, regular } = commonStyles.text;
const { neutral } = colors;

// Interfaces
interface ICourseDetailsInfo {
	type: InfoType;
	text: string;
	isDueDatePassed?: boolean;
}

const CourseDetailsInfo = ({
	type,
	text,
	isDueDatePassed,
}: ICourseDetailsInfo) => (
	<View style={styles.infoRow}>
		<Icon type={type} isDueDatePassed={isDueDatePassed} />
		<RNText
			title={text}
			style={[
				styles.infoText,
				isDueDatePassed && styles.dueDatePassedText,
			]}
		/>
	</View>
);

const styles = StyleSheet.create({
	infoRow: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(5),
	},

	infoText: {
		color: neutral.grey_06,
		...xxSm,
		...regular,
		lineHeight: verticalScale(16),
	},

	dueDatePassedText: {
		color: colors.state.error_red,
	},
});

export default memo(CourseDetailsInfo);
