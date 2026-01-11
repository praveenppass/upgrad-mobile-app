import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

const SkeletonProgress = () => {
	return (
		<View style={styles.containerSkeleton}>
			<Skeleton style={styles.iconSkeletonLeft} />
			<Skeleton style={styles.title} />
			<Skeleton style={styles.subTitle} />
			<Skeleton style={styles.iconSkeletonRight} />
		</View>
	);
};

export default SkeletonProgress;

const styles = StyleSheet.create({
	containerSkeleton: {
		height: verticalScale(63),
		marginTop: verticalScale(5),
		paddingHorizontal: horizontalScale(16),
	},
	iconSkeletonLeft: {
		borderRadius: horizontalScale(16),
		height: verticalScale(11),
		left: horizontalScale(16),
		marginVertical: verticalScale(24),
		position: "absolute",
		width: horizontalScale(10),
	},
	iconSkeletonRight: {
		borderRadius: horizontalScale(16),
		height: verticalScale(11),
		marginVertical: verticalScale(24),
		position: "absolute",
		right: horizontalScale(20),
		width: horizontalScale(16),
	},
	subTitle: {
		borderRadius: horizontalScale(8),
		height: verticalScale(4),
		left: horizontalScale(16),
		position: "absolute",
		right: horizontalScale(20),
		top: verticalScale(40),
		width: "100%",
	},
	title: {
		borderRadius: horizontalScale(15),
		height: verticalScale(11),
		left: horizontalScale(50),
		position: "absolute",
		top: verticalScale(8),
		width: horizontalScale(74),
	},
});
