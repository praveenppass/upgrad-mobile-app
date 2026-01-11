import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

export const CertificateSkeleton = () => (
	<View style={styles.certificateContainerSkeletonView}>
		<View style={styles.certificateBottomSection}>
			<Skeleton style={styles.certImgSkeleton} />
			<View style={styles.certificateBottomRightSkeleton}>
				<Skeleton style={styles.nameSkeleton} />
				<Skeleton style={styles.emailSkeleton} />
				<Skeleton style={styles.downloadIconSkeleton} />
			</View>
		</View>
	</View>
);

const styles = StyleSheet.create({
	certImgSkeleton: {
		borderRadius: horizontalScale(4),
		height: verticalScale(65),
		width: horizontalScale(92),
	},
	certificateBottomRightSkeleton: {
		flex: 1,
		gap: horizontalScale(10),
	},
	certificateBottomSection: {
		flexDirection: "row",
		gap: horizontalScale(15),
		paddingVertical: verticalScale(12),
	},
	certificateContainerSkeletonView: {
		alignItems: "flex-start",
		borderRadius: verticalScale(10),
		flex: 1,
		gap: verticalScale(10),
		paddingHorizontal: horizontalScale(20),
	},
	downloadIconSkeleton: {
		borderRadius: verticalScale(3),
		height: verticalScale(20),
		width: horizontalScale(20),
	},
	emailSkeleton: {
		height: verticalScale(10),
		width: horizontalScale(120),
	},
	nameSkeleton: {
		height: verticalScale(10),
		width: horizontalScale(146),
	},
});
