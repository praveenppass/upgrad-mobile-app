import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

const ProfileScreenSkeleton = () => {
	const buttonList = new Array(4).fill(1);

	return (
		<View>
			<View style={styles.header}>
				<Skeleton style={styles.image} />

				<View style={styles.headerContent}>
					<Skeleton style={styles.name} />
					<View style={styles.progressBarInfoContainer}>
						<Skeleton style={styles.email} />
						{/* Progress bar commented : Hakuna Matata */}
						{/* <Skeleton style={styles.progressPercentage} /> */}
					</View>
					{/* <Skeleton style={styles.progressBar} /> */}
				</View>
			</View>

			<View style={styles.buttonListContainer}>
				{buttonList.map((_, i) => {
					const isLastButton = i === buttonList.length - 1;
					return (
						<View key={i}>
							<View
								style={[
									styles.buttonRow,
									isLastButton && styles.profileBtnEnd,
								]}
							>
								<Skeleton style={styles.iconSkeleton} />
								<Skeleton style={styles.buttonTextSkeleton} />
							</View>
							{!isLastButton && <View style={styles.divider} />}
						</View>
					);
				})}

				<View style={styles.versionView}>
					<Skeleton style={styles.versionSkeleton} />
				</View>
			</View>
		</View>
	);
};

export default ProfileScreenSkeleton;

const styles = StyleSheet.create({
	buttonListContainer: {
		backgroundColor: neutral.grey_02,
		borderBottomEndRadius: horizontalScale(8),
		borderBottomStartRadius: horizontalScale(8),
		paddingBottom: verticalScale(8),
	},
	buttonRow: {
		alignItems: "center",
		backgroundColor: neutral.white,
		flexDirection: "row",
		gap: horizontalScale(8),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(12),
	},
	buttonTextSkeleton: {
		borderRadius: horizontalScale(4),
		height: verticalScale(16),
		width: horizontalScale(200),
	},
	divider: {
		backgroundColor: neutral.grey_04,
		height: verticalScale(1),
		marginLeft: horizontalScale(20),
	},
	email: {
		height: verticalScale(12),
		marginTop: verticalScale(4),
		width: horizontalScale(120),
	},
	extraTextSkeleton: {
		borderRadius: horizontalScale(4),
		height: verticalScale(12),
		width: horizontalScale(60),
	},
	header: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderTopEndRadius: horizontalScale(8),
		borderTopStartRadius: horizontalScale(8),
		flexDirection: "row",
		gap: horizontalScale(8),
		paddingLeft: horizontalScale(13),
		paddingRight: horizontalScale(20),
		paddingVertical: verticalScale(12),
	},
	headerContent: {
		flex: 1,
		gap: verticalScale(4),
	},
	iconSkeleton: {
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(12),
		height: horizontalScale(24),
		width: horizontalScale(24),
	},
	image: {
		borderRadius: horizontalScale(26),
		height: verticalScale(52),
		width: horizontalScale(52),
	},
	name: {
		height: verticalScale(16),
		width: horizontalScale(150),
	},
	profileBtnEnd: {
		borderBottomEndRadius: horizontalScale(8),
		borderBottomStartRadius: horizontalScale(8),
	},
	progressBar: {
		height: verticalScale(5),
		width: "100%",
	},
	progressBarInfoContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(8),
		justifyContent: "space-between",
		marginBottom: verticalScale(2),
	},
	progressPercentage: {
		height: verticalScale(12),
		width: horizontalScale(20),
	},
	versionSkeleton: {
		borderRadius: horizontalScale(4),
		height: verticalScale(12),
		width: horizontalScale(80),
	},
	versionView: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: verticalScale(14),
	},
});
