/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

const ClassOpinionSkeleton = () => {
	return (
		<View style={styles.container}>
			<Skeleton style={styles.skeletonQuestion} />
			<Skeleton style={styles.skeletonQuestion} />
			<Skeleton style={styles.skeletonQuestion} />
			<Skeleton style={styles.skeletonQuestion} />
			<Skeleton style={styles.skeletonQuestion} />
			<Skeleton style={styles.skeletonQuestion} />

			<View style={styles.responseContainer}>
				<Skeleton style={styles.responseSkeleton} />
				<Skeleton style={styles.responseDetailsSkeleton} />
			</View>

			<View>
				<View style={styles.cardContainer}>
					<View style={styles.cardItem}>
						<View style={styles.cardTextContainer}>
							<Skeleton style={styles.skeletonIcon} />
							<Skeleton style={styles.skeletonText} />
							<Skeleton style={styles.skeletonSmallText} />
						</View>
						<View>
							<Skeleton style={styles.skeletonExtraText} />
						</View>
					</View>
					<Skeleton style={styles.skeletonLarge} />
					<Skeleton style={styles.skeletonWide} />
				</View>

				<View style={styles.cardContainer}>
					<View style={styles.cardItem}>
						<View style={styles.cardTextContainer}>
							<Skeleton style={styles.skeletonIcon} />
							<Skeleton style={styles.skeletonText} />
							<Skeleton style={styles.skeletonSmallText} />
						</View>
						<View>
							<Skeleton style={styles.skeletonExtraText} />
						</View>
					</View>
					<Skeleton style={styles.skeletonLarge} />
					<Skeleton style={styles.skeletonWide} />
				</View>
			</View>
		</View>
	);
};

export default ClassOpinionSkeleton;

const styles = StyleSheet.create({
	responseSkeleton: {
		borderRadius: moderateScale(10),
		height: verticalScale(16),
		marginRight: horizontalScale(5),
		width: horizontalScale(120),
	},
	responseDetailsSkeleton: {
		borderRadius: moderateScale(7),
		height: verticalScale(20),
		width: horizontalScale(15),
	},
	container: {
		paddingHorizontal: horizontalScale(20),
	},
	cardItem: {
		alignItems: "center",
		flexDirection: "row",
		height: verticalScale(20),
		justifyContent: "space-between",
	},
	skeletonIcon: {
		borderRadius: moderateScale(8),
		height: verticalScale(16),
		marginRight: horizontalScale(5),
		width: horizontalScale(16),
	},
	skeletonText: {
		borderRadius: moderateScale(10),
		height: verticalScale(15),
		marginRight: horizontalScale(10),
		width: horizontalScale(80),
	},
	skeletonSmallText: {
		borderRadius: moderateScale(10),
		height: verticalScale(15),
		width: horizontalScale(50),
	},
	skeletonExtraText: {
		borderRadius: moderateScale(10),
		height: verticalScale(15),
		width: horizontalScale(10),
	},
	skeletonLarge: {
		borderRadius: verticalScale(18),
		height: verticalScale(14),
		marginTop: moderateScale(5),
		marginVertical: verticalScale(5),
	},
	skeletonWide: {
		borderRadius: verticalScale(18),
		height: verticalScale(14),
		marginTop: moderateScale(5),
		width: horizontalScale(280),
	},
	skeletonQuestion: {
		borderRadius: verticalScale(18),
		height: verticalScale(14),
		marginTop: moderateScale(5),
	},
	responseContainer: {
		alignItems: "center",
		flexDirection: "row",
		height: verticalScale(20),
		marginTop: verticalScale(15),
		width: "100%",
	},
	cardContainer: {
		borderColor: neutral.grey_02,
		borderRadius: moderateScale(10),
		borderWidth: 1,
		marginTop: verticalScale(15),
		padding: moderateScale(10),
	},
	cardTextContainer: {
		flexDirection: "row",
	},
});
