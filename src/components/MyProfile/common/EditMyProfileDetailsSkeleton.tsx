import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const EditMyProfileDetailsSkeleton = () => {
	return (
		<>
			<ScrollView style={styles.container}>
				{Array.from({ length: 8 }).map((_, index) => (
					<View key={index} style={styles.viewContainer}>
						<Skeleton style={styles.courseTitle} />
						<Skeleton style={styles.inputField} />
					</View>
				))}
			</ScrollView>
			<View style={styles.button} />
		</>
	);
};

export default EditMyProfileDetailsSkeleton;

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.neutral.grey_04,
		borderRadius: horizontalScale(6),
		height: verticalScale(48),
		marginHorizontal: horizontalScale(24),
		marginVertical: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
		width: horizontalScale(330),
	},
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(20),
	},
	courseTitle: {
		borderRadius: verticalScale(6),
		height: verticalScale(15),
		width: horizontalScale(78),
	},
	inputField: {
		borderRadius: verticalScale(6),
		height: verticalScale(33),
		marginTop: verticalScale(4),
		width: horizontalScale(330),
	},
	textField: {
		borderRadius: verticalScale(10),
		height: verticalScale(20),
		marginTop: verticalScale(20),
	},
	viewContainer: {
		marginBottom: verticalScale(24),
	},
});
