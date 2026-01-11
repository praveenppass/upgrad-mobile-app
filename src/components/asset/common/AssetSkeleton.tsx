import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

const AssetSkeleton = () => {
	return (
		<View style={styles.container}>
			<Skeleton style={styles.htmlSkelton} dark />
			<Skeleton style={styles.htmlSkelton} dark />
			<Skeleton style={[styles.htmlSkelton, styles.htmlSkelton50]} dark />
			<Skeleton style={styles.videoSkelton} dark />
			<Skeleton style={styles.htmlSkelton} dark />
			<Skeleton style={[styles.htmlSkelton, styles.htmlSkelton50]} dark />
			<Skeleton style={styles.htmlSkelton} dark />
		</View>
	);
};

export default AssetSkeleton;

const styles = StyleSheet.create({
	container: {
		//paddingHorizontal: horizontalScale(20),
	},
	htmlSkelton: {
		height: moderateScale(20),
		marginTop: verticalScale(10),
		width: "100%",
	},
	htmlSkelton50: {
		width: "50%",
	},
	videoSkelton: {
		height: moderateScale(180),
		marginTop: verticalScale(10),
		// paddingHorizontal: horizontalScale(20),
		width: "100%",
	},
});
