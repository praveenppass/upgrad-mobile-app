import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import EventCardViewSkeleton from "@components/academicPlanner/cards/eventCard/EventCardViewSkeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

const EventListSkeleton = () => {
	return (
		<View style={styles.skeletonContainer}>
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
		paddingBottom: verticalScale(20),
	},
	skeletonContainer: {
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(5),
		marginHorizontal: horizontalScale(16),
		marginTop: verticalScale(10),
		paddingBottom: verticalScale(10),
	},
});

export default EventListSkeleton;
