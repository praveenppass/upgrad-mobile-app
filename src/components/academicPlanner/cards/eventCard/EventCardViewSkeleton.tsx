import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

const EventCardViewSkeleton = () => {
	return (
		<View style={styles.cardContainer}>
			<View style={styles.row}>
				<Skeleton style={styles.skeletonType} />
				<Skeleton style={styles.skeletonStatus} />
			</View>
			<Skeleton style={styles.skeletonTitle} />
			<Skeleton style={styles.skeletonDetails} />
			<Skeleton style={styles.skeletonDetails} />
			<View style={styles.infoStyle}>
				<Skeleton style={styles.skeletonInfo} />
				<Skeleton style={styles.skeletonButton} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: colors.bg.fill.bg_default,
		borderRadius: horizontalScale(8),
		marginHorizontal: horizontalScale(10),
		marginVertical: verticalScale(10),
		padding: horizontalScale(8),
	},
	infoStyle: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	row: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	skeletonButton: {
		borderRadius: horizontalScale(5),
		height: verticalScale(24),
		width: horizontalScale(71),
	},
	skeletonDetails: {
		borderRadius: horizontalScale(17),
		height: verticalScale(6),
		marginBottom: verticalScale(13),
		width: horizontalScale(108),
	},

	skeletonInfo: {
		borderRadius: horizontalScale(17),
		height: verticalScale(6),
		width: horizontalScale(71),
	},
	skeletonStatus: {
		borderRadius: horizontalScale(17),
		height: verticalScale(6),
		width: horizontalScale(71),
	},
	skeletonTitle: {
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(17),
		height: verticalScale(12),
		marginVertical: verticalScale(12),
	},
	skeletonType: {
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(17),
		height: verticalScale(6),
		width: horizontalScale(71),
	},
});

export default EventCardViewSkeleton;
