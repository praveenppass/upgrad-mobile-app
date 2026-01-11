import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { regular, semiBold, reg, sm } = commonStyles.text;

export interface ICourseHeader {
	label: string;
	title: string;
}

const CourseHeader = ({ label, title }: ICourseHeader) => (
	<View style={styles.courseHeaderContainer}>
		<RNText title={label} style={styles.label} numberOfLines={1} />
		<RNText title={title} style={styles.title} numberOfLines={2} />
	</View>
);

export default CourseHeader;

const styles = StyleSheet.create({
	courseHeaderContainer: {
		gap: verticalScale(4),
		marginBottom: verticalScale(16),
		marginTop: verticalScale(36),
	},
	label: {
		...sm,
		...regular,
	},
	title: {
		...reg,
		...semiBold,
		color: neutral.black,
	},
});
