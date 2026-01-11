import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	commonStyles: {
		align: { row, flexStart, alignCenter, justifyBetween },
		spacing: { g8, g4 },
	},
	colors: { cta },
} = C;

const {
	BORDER: { b8 },
} = measures;

interface IHomeBannerSkeleton {
	cardWidth: number;
}

const HomeBannerSkeleton = ({ cardWidth }: IHomeBannerSkeleton) => {
	return (
		<View style={[styles.containerSkeleton, { width: cardWidth }]}>
			<View style={styles.innerContainer}>
				<View style={styles.courseContainer}>
					<Skeleton style={styles.iconSkeleton} />
					<Skeleton style={styles.liveTextSkeleton} />
				</View>
			</View>

			<View style={styles.assetInnerContainer}>
				<Skeleton style={styles.descSkeleton1} />
				<Skeleton style={styles.descSkeleton2} />
				<Skeleton style={styles.buttonSkeleton} />
			</View>
		</View>
	);
};

export default HomeBannerSkeleton;

const styles = StyleSheet.create({
	assetInnerContainer: {
		flexShrink: 1,
		...flexStart,
		...justifyBetween,
	},
	buttonSkeleton: {
		borderRadius: b8,
		height: verticalScale(40),
		marginTop: verticalScale(20),
		width: horizontalScale(140),
	},
	containerSkeleton: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: b8,
		gap: verticalScale(12),
		height: verticalScale(160),
		paddingHorizontal: horizontalScale(16),
		paddingVertical: horizontalScale(12),
	},

	courseContainer: {
		...row,
		...alignCenter,
		...g4,
	},
	descSkeleton1: {
		borderRadius: b8,
		height: verticalScale(18),
		width: horizontalScale(180),
	},
	descSkeleton2: {
		borderRadius: b8,
		height: verticalScale(18),
		marginTop: verticalScale(12),
		width: horizontalScale(150),
	},
	iconSkeleton: {
		borderRadius: b8,
		height: horizontalScale(18),
		width: horizontalScale(18),
	},
	innerContainer: {
		...row,
		...alignCenter,
		...g8,
	},
	liveTextSkeleton: {
		borderRadius: b8,
		height: verticalScale(14),
		width: horizontalScale(180),
	},
});
