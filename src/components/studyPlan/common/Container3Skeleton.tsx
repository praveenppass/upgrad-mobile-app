import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

const ItemSeparator = () => <View style={styles.separator} />;

const Container3SkeletonSessionItem = () => {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Skeleton style={styles.label} />
				<Skeleton style={styles.title} />
			</View>
			<Skeleton style={styles.icon} />
		</View>
	);
};

const Container3SkeletonAssetItem = () => (
	<Skeleton style={styles.assetContainer} />
);

interface IContainer3Skeleton {
	loading?: boolean;
}
const Container3Skeleton = ({ loading }: IContainer3Skeleton) => {
	const array = useMemo(
		() =>
			Array.from({ length: 10 }, () =>
				Math.random() < 0.5 ? "asset" : "session",
			),
		[],
	);
	if (!loading && loading !== undefined) return <></>;
	return (
		<FlatList
			data={array}
			renderItem={(item) =>
				item.item === "asset" ? (
					<Container3SkeletonAssetItem />
				) : (
					<Container3SkeletonSessionItem />
				)
			}
			keyExtractor={(_, index) => `skeleton-${index}`}
			showsVerticalScrollIndicator={false}
			scrollEnabled={false}
			ItemSeparatorComponent={ItemSeparator}
		/>
	);
};
export default Container3Skeleton;

const styles = StyleSheet.create({
	assetContainer: {
		borderRadius: horizontalScale(8),
		height: verticalScale(62),
	},
	container: {
		alignItems: "center",
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(8),
		borderWidth: 1,
		flexDirection: "row",
		height: verticalScale(72),
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(14),
		paddingVertical: verticalScale(18),
	},
	icon: {
		height: verticalScale(16),
		width: horizontalScale(16),
	},
	label: {
		height: verticalScale(14),
		width: horizontalScale(100),
	},
	separator: {
		height: verticalScale(20),
	},
	skeleton: {
		borderColor: neutral.grey_04,
		borderRadius: horizontalScale(8),
		borderWidth: 1,
		height: verticalScale(66),
	},
	textContainer: {
		gap: verticalScale(10),
	},
	title: {
		height: verticalScale(16),
		width: horizontalScale(175),
	},
});
