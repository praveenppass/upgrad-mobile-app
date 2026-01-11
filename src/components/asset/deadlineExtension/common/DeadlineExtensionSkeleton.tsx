import React from "react";
import { StyleSheet, View } from "react-native";
import { StyleProp, ViewStyle } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

export interface IDeadlineExtensionSkeleton {
	style?: StyleProp<ViewStyle>;
}

const DeadlineExtensionSkeleton = ({ style }: IDeadlineExtensionSkeleton) => (
	<View style={[styles.uploadContainer, style]}>
		<View style={styles.rowContainer}>
			<Skeleton style={styles.iconStyleOuter} />

			<Skeleton style={styles.text} />
			<Skeleton style={styles.text2} />
		</View>
		<Skeleton style={styles.rowSkeleton1} />
		<Skeleton style={styles.rowSkeleton2} />
		<Skeleton style={styles.rowSkeleton3} />
		<Skeleton style={styles.rowSkeleton4} />
	</View>
);

export default DeadlineExtensionSkeleton;

const styles = StyleSheet.create({
	iconStyleOuter: {
		borderRadius: horizontalScale(16),
		height: horizontalScale(16),
		width: horizontalScale(16),
	},
	rowContainer: {
		flexDirection: "row",
	},
	rowSkeleton1: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(11),
		width: horizontalScale(207),
	},
	rowSkeleton2: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(5),
		width: horizontalScale(157),
	},
	rowSkeleton3: {
		alignSelf: "center",
		borderRadius: horizontalScale(15),
		height: verticalScale(12),
		marginTop: verticalScale(10),
		width: horizontalScale(110),
	},
	rowSkeleton4: {
		borderRadius: horizontalScale(15),
		height: verticalScale(12),
		marginBottom: verticalScale(3),
		marginTop: verticalScale(26),
		width: horizontalScale(145),
	},
	text: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginLeft: horizontalScale(9),
		width: horizontalScale(32),
	},
	text2: {
		borderRadius: horizontalScale(30),
		height: verticalScale(10),
		marginLeft: horizontalScale(24),
		width: horizontalScale(111),
	},
	uploadContainer: {
		backgroundColor: colors.highlight.bg_brown,
		borderRadius: horizontalScale(4),
		padding: horizontalScale(16),
		paddingTop: verticalScale(20),
	},
});
