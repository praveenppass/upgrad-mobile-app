import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

export const TopSectionSkeleton = () => {
	return (
		<View style={styles.topSectionSkeleton}>
			<Skeleton style={styles.leftIconSkeleton} />
			<Skeleton style={styles.headingSkeleton} />
			<Skeleton style={styles.editIconSkeleton} />
		</View>
	);
};

export default TopSectionSkeleton;

const styles = StyleSheet.create({
	editIconSkeleton: {
		borderRadius: horizontalScale(5),
		height: verticalScale(13),
		marginLeft: horizontalScale(100),
		width: horizontalScale(13),
	},
	headingSkeleton: {
		borderRadius: horizontalScale(5),
		height: verticalScale(16),
		marginLeft: horizontalScale(10),
		width: horizontalScale(146),
	},
	leftIconSkeleton: {
		borderRadius: horizontalScale(15),
		height: verticalScale(24),
		width: horizontalScale(24),
	},
	topSectionSkeleton: {
		alignItems: "center",
		flexDirection: "row",
		height: verticalScale(24),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(12),
		width: horizontalScale(320),
	},
});
