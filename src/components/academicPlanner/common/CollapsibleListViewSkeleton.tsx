import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import EventCardViewSkeleton from "@components/academicPlanner/cards/eventCard/EventCardViewSkeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

const CollapsibleListViewSkeleton = () => {
	return (
		<View style={styles.skeletonContainer}>
			<View style={styles.headerSkeleton}>
				<View style={styles.urgentTitleSkeletonStyle} />
				<View style={styles.dropDownIconSkeletonStyle} />
			</View>
			<FlatList
				data={[1, 2]}
				renderItem={() => <EventCardViewSkeleton />}
				keyExtractor={(_, index) => index.toString()}
				contentContainerStyle={styles.contentContainer}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		flexGrow: 1,
	},
	dropDownIconSkeletonStyle: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(3),
		height: verticalScale(17),
		width: horizontalScale(17),
	},
	headerSkeleton: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: horizontalScale(20),
		paddingTop: verticalScale(10),
	},
	skeletonContainer: {
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(5),
		marginHorizontal: horizontalScale(16),
		marginTop: verticalScale(10),
		paddingBottom: verticalScale(10),
	},
	urgentTitleSkeletonStyle: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(15),
		height: verticalScale(11),
		width: horizontalScale(92),
	},
});

export default CollapsibleListViewSkeleton;
