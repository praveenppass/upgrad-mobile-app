import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

const SkeletonTitle = () => {
	return (
		<View style={styles.container}>
			<Skeleton style={styles.title} />
			<Skeleton style={styles.rightIcon} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		height: verticalScale(45),
		justifyContent: "space-between",
	},
	rightIcon: {
		borderRadius: horizontalScale(8),
		height: verticalScale(12),
		marginRight: horizontalScale(10),
		width: horizontalScale(14),
	},

	title: {
		borderRadius: horizontalScale(8),
		height: verticalScale(12),
		left: horizontalScale(16),
		width: horizontalScale(175),
	},
});

export default memo(SkeletonTitle);
