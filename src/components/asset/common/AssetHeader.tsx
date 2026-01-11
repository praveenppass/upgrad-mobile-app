import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { BookMarkedIcon, BookmarkIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { semiBold, md } = commonStyles.text;

interface IAssetHeader {
	title: string;
	isBookmarked: boolean;
	onBookmarkPress: () => void;
	loading?: boolean;
}

const AssetHeader = ({
	title,
	isBookmarked,
	onBookmarkPress,
	loading,
}: IAssetHeader) => {
	if (loading) {
		return (
			<View style={[styles.container, styles.skeletonContainer]}>
				<Skeleton style={styles.titleSkeleton} />
				<Skeleton style={styles.bookmarkSkeleton} />
			</View>
		);
	}

	if (!title) return <></>;

	const iconDimensions = {
		height: horizontalScale(14),
		width: horizontalScale(14),
	};

	return (
		<View style={styles.container}>
			<RNText style={styles.title} title={title} />
			<Pressable
				style={styles.bookmarkContainer}
				onPress={onBookmarkPress}
				testID="bookmarkPressable"
			>
				{isBookmarked ? (
					<BookMarkedIcon {...iconDimensions} />
				) : (
					<BookmarkIcon {...iconDimensions} />
				)}
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	bookmarkContainer: {
		alignItems: "center",
		marginRight: horizontalScale(4),
		marginTop: verticalScale(6),
	},
	bookmarkSkeleton: {
		height: verticalScale(24),
		width: horizontalScale(16),
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(8),
		paddingHorizontal: horizontalScale(20),
	},
	skeletonContainer: {
		alignItems: "flex-end",
		flexDirection: "row",
		gap: verticalScale(8),
	},
	title: {
		...semiBold,
		...md,
		color: colors.neutral.black,
		flex: 0.92,
		lineHeight: horizontalScale(24),
	},
	titleSkeleton: {
		height: verticalScale(16),
		width: horizontalScale(160),
	},
});

export default AssetHeader;
