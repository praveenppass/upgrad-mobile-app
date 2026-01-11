import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

export const WorkExperienceAndEducationDetailsSkeleton = () => (
	<View style={styles.listItemPersonalSkeleton}>
		<Skeleton style={styles.nameSkeleton} />
		<Skeleton style={styles.subTextSkeleton} />
		<Skeleton style={styles.emailSkeleton} />
	</View>
);

const styles = StyleSheet.create({
	emailSkeleton: {
		height: verticalScale(10),
		width: horizontalScale(120),
	},
	listItemPersonalSkeleton: {
		flex: 1,
		gap: verticalScale(5),
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(13),
	},
	nameSkeleton: {
		height: verticalScale(10),
		width: horizontalScale(146),
	},
	subTextSkeleton: {
		height: verticalScale(10),
		width: horizontalScale(210),
	},
});
