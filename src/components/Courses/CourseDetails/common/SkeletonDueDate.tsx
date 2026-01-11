import React from "react";
import { StyleSheet } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

const SkeletonDueDate = () => <Skeleton style={styles.title} />;

export default SkeletonDueDate;

const styles = StyleSheet.create({
	title: {
		borderRadius: horizontalScale(13),
		height: verticalScale(12),
		marginHorizontal: horizontalScale(16),
		marginVertical: verticalScale(10),
		width: horizontalScale(139),
	},
});
