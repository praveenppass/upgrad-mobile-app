import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

export const AspirationsSkeleton = () => (
	<View style={styles.listItemPersonalSkeleton}>
		<Skeleton style={styles.nameSkeleton} />
		<Skeleton style={styles.aspirationsSubSkeleton} />
	</View>
);

const styles = StyleSheet.create({
	aspirationsSubSkeleton: {
		height: verticalScale(10),
		width: horizontalScale(248),
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
});
