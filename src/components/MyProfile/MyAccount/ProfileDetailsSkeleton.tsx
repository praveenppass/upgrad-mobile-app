import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";

const { neutral } = colors;
const { BORDER } = measures;

export const ProfileDetailsSkeleton = () => (
	<View style={styles.containerView}>
		<View style={styles.profileDetailsSkeleton}>
			<Skeleton style={styles.profileImageSkeleton} />
			<View style={styles.detailsViewSkeleton}>
				<Skeleton style={styles.nameSkeleton} />
				<View style={styles.emailView}>
					<Skeleton style={styles.emailSkeleton} />
					{/* Progress bar commented : Hakuna Matata */}
					{/* <Skeleton style={styles.percentSkeleton} /> */}
				</View>
				{/* <Skeleton style={styles.progressSkeleton} /> */}
			</View>
		</View>

		<Skeleton dark style={styles.uploadResumeSkeleton} />
	</View>
);

const styles = StyleSheet.create({
	containerView: {
		alignItems: "flex-start",
		backgroundColor: neutral.white,
		borderRadius: BORDER.b10,
		flex: 1,
		marginBottom: verticalScale(15),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: horizontalScale(13),
	},
	detailsViewSkeleton: {
		flex: 1,
		gap: horizontalScale(10),
		marginTop: verticalScale(5),
	},
	emailSkeleton: {
		height: verticalScale(10),
		width: horizontalScale(120),
	},
	emailView: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	nameSkeleton: {
		height: verticalScale(10),
		width: horizontalScale(146),
	},
	percentSkeleton: {
		height: verticalScale(8),
		width: horizontalScale(23),
	},
	profileDetailsSkeleton: {
		flexDirection: "row",
		gap: horizontalScale(15),
		marginBottom: verticalScale(10),
	},
	profileImageSkeleton: {
		borderRadius: horizontalScale(25),
		height: verticalScale(52),
		width: horizontalScale(52),
	},
	progressSkeleton: {
		height: verticalScale(4),
		width: horizontalScale(227),
	},
	uploadResumeSkeleton: {
		borderRadius: horizontalScale(10),
		height: verticalScale(37),
		width: horizontalScale(132),
	},
});
