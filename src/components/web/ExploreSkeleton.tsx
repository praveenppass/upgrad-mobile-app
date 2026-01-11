import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

const ButtonRowSkeleton = () => {
	const buttonRow = Array.from({ length: 3 });
	return (
		<View style={styles.buttonRow}>
			{buttonRow.map((_, index) => (
				<Skeleton key={index} style={styles.goalButton} />
			))}
		</View>
	);
};

const PartnersRowSkeleton = () => {
	const partnersRow = Array.from({ length: 3 });
	return (
		<View style={styles.partnersRow}>
			{partnersRow.map((_, index) => (
				<Skeleton key={index} style={styles.partnerLogo} />
			))}
		</View>
	);
};

const WebExploreSkeleton = () => {
	return (
		<View style={styles.container}>
			<Skeleton style={styles.banner} />

			<View style={styles.headingContainer}>
				<Skeleton style={styles.mainHeading} />
				<Skeleton style={styles.subHeading} />
			</View>

			<Skeleton style={styles.searchBox} />

			<Skeleton style={styles.goalHeading} />

			<View style={styles.goalSection}>
				<ButtonRowSkeleton />
				<ButtonRowSkeleton />
			</View>

			<Skeleton style={styles.communityText} />

			<Skeleton style={styles.partnersHeading} />
			<PartnersRowSkeleton />
		</View>
	);
};

export default WebExploreSkeleton;

const styles = StyleSheet.create({
	banner: {
		borderRadius: horizontalScale(8),
		height: verticalScale(200),
		marginBottom: verticalScale(20),
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	communitySection: {
		marginBottom: verticalScale(20),
	},
	communityText: {
		borderRadius: horizontalScale(4),
		height: verticalScale(16),
		marginBottom: verticalScale(20),
		width: horizontalScale(280),
	},
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(20),
	},
	goalButton: {
		borderRadius: horizontalScale(8),
		height: verticalScale(24),
		width: "30%",
	},
	goalHeading: {
		borderRadius: horizontalScale(4),
		height: verticalScale(14),
		marginBottom: verticalScale(10),
		width: horizontalScale(280),
	},
	goalSection: {
		gap: horizontalScale(10),
		marginBottom: verticalScale(20),
	},
	headingContainer: {
		alignItems: "center",
		gap: verticalScale(10),
		marginBottom: verticalScale(14),
	},
	mainHeading: {
		borderRadius: horizontalScale(8),
		height: verticalScale(24),
		width: horizontalScale(280),
	},
	partnerLogo: {
		borderRadius: horizontalScale(8),
		height: verticalScale(50),
		width: "30%",
	},
	partnersHeading: {
		alignSelf: "center",
		borderRadius: horizontalScale(4),
		height: verticalScale(16),
		marginBottom: verticalScale(20),
		width: horizontalScale(280),
	},
	partnersRow: {
		flexDirection: "row",
		gap: horizontalScale(14),
		justifyContent: "center",
	},
	partnersSection: {
		alignItems: "center",
		marginBottom: verticalScale(40),
	},
	searchBox: {
		borderRadius: horizontalScale(8),
		height: verticalScale(40),
		marginBottom: verticalScale(14),
	},
	subHeading: {
		borderRadius: horizontalScale(6),
		height: verticalScale(20),
		width: horizontalScale(280),
	},
});
