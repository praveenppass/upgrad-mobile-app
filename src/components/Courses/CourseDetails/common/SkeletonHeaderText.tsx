import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const SkeletonHeaderText = () => {
	return (
		<View style={styles.containerSkeleton}>
			<Skeleton style={styles.iconSkeletonLeft} />
			<View style={styles.titleContainer}>
				<Skeleton style={styles.title} />
				<Skeleton style={styles.subTitle} />
			</View>
			<Skeleton style={styles.iconSkeletonRight} />
		</View>
	);
};

export default SkeletonHeaderText;

const styles = StyleSheet.create({
	containerSkeleton: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_06,
		flexDirection: "row",
		height: verticalScale(63),
		justifyContent: "space-around",
		marginTop: verticalScale(5),
	},
	iconSkeletonLeft: {
		borderRadius: horizontalScale(16),
		height: verticalScale(16),
		marginVertical: verticalScale(24),
		width: horizontalScale(10),
	},
	iconSkeletonRight: {
		borderRadius: horizontalScale(16),
		height: verticalScale(16),
		marginVertical: verticalScale(24),
		width: horizontalScale(10),
	},
	subTitle: {
		borderRadius: horizontalScale(17),
		height: verticalScale(16),
		width: horizontalScale(150),
	},
	title: {
		borderRadius: horizontalScale(17),
		height: verticalScale(12),
		width: horizontalScale(150),
	},
	titleContainer: {
		alignItems: "center",
		gap: verticalScale(10),
	},
});
