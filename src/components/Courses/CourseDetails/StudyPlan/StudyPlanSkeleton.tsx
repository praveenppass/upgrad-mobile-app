import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	colors: { neutral },
	commonStyles: {
		spacing: { m10, mt10, ph24, ml40, pt10, mb10, ph26 },
		align: {
			alignCenter,
			alignContentCenter,
			rowEvenly,
			selfCenter,
			justifyBetween,
			row,
		},
	},
} = C;

const {
	BORDER: { b8, b18 },
} = measures;

const StudyPlanSkeleton = () => {
	const { bottom } = useSafeAreaInsets();
	return (
		<>
			<Skeleton style={styles.selectCourseText} dark />
			<View style={styles.coursesSlider}>
				<View style={styles.courseSelectorView}>
					{new Array(6)
						.fill(1)
						?.map((_item, i: number) => (
							<Skeleton key={i} style={styles.courseSlidertext} />
						))}
				</View>
				<View style={styles.courseSelectorInnerView}>
					{new Array(6)
						.fill(1)
						?.map((_item, i: number) => (
							<Skeleton key={i} style={styles.courseSlidertick} />
						))}
				</View>
			</View>
			<Skeleton style={styles.courseTitle} />
			<Skeleton style={styles.courseTitle2} />
			<Skeleton style={styles.courseTitle4} />

			<View style={styles.levelView}>
				{new Array(3).fill(1)?.map((_item) => (
					<View key={_item}>
						<Skeleton style={styles.level1} />
						<Skeleton style={styles.level2} dark />
						<View style={styles.rowContainer}>
							<Skeleton style={styles.level3} dark />
							<Skeleton style={styles.level4} dark />
						</View>
						<View style={styles.rowContainer}>
							<View style={row}>
								<Skeleton style={styles.level5View} dark />
								<Skeleton style={styles.level5} dark />
							</View>
							<Skeleton style={styles.level6} dark />
						</View>
						<Skeleton style={styles.progressBar} dark />
						<Skeleton style={styles.extension} dark />
					</View>
				))}
			</View>

			<View
				style={[
					styles.assetName,
					{
						bottom: bottom + verticalScale(60),
						...selfCenter,
					},
				]}
			>
				<View style={rowEvenly}>
					<View style={styles.resumeAssetView} />
					<View style={styles.assetView1}>
						<View style={styles.assetView2} />
						<View style={styles.assetView3} />
						<View style={styles.assetView4} />
					</View>
					<View style={styles.assetView5} />
				</View>
			</View>
		</>
	);
};
export default StudyPlanSkeleton;

const styles = StyleSheet.create({
	assetName: {
		backgroundColor: neutral.grey_04,
		borderRadius: b8,
		height: verticalScale(75),
		marginTop: verticalScale(120),
		width: horizontalScale(350),
	},
	assetView1: {
		...selfCenter,
		marginTop: verticalScale(12),
		...alignContentCenter,
	},
	assetView2: {
		backgroundColor: neutral.white,
		height: verticalScale(10),
		marginBottom: verticalScale(6),
		width: horizontalScale(130),
		...ml40,
		borderRadius: verticalScale(18),
	},
	assetView3: {
		backgroundColor: neutral.white,
		borderRadius: verticalScale(10),
		height: verticalScale(8),
		marginVertical: verticalScale(9),
		width: horizontalScale(200),
		...ml40,
	},
	assetView4: {
		backgroundColor: neutral.white,
		height: verticalScale(8),
		width: horizontalScale(130),
		...ml40,
		borderRadius: verticalScale(18),
	},
	assetView5: {
		backgroundColor: neutral.white,
		borderRadius: verticalScale(18),
		height: verticalScale(20),
		width: verticalScale(20),
		...selfCenter,
		...mt10,
	},
	courseNumber: {
		backgroundColor: neutral.white,
		borderRadius: b18,
		height: verticalScale(10),
		left: horizontalScale(20),
		top: verticalScale(50),
		width: horizontalScale(36),
	},
	courseSelectorInnerView: {
		...row,
		...alignCenter,
		...justifyBetween,
		...ph26,
		...pt10,
		...m10,
	},
	courseSelectorView: {
		...row,
		...alignCenter,
		...justifyBetween,
		...ph24,
		...pt10,
		...m10,
	},
	courseSlidertext: {
		borderRadius: verticalScale(18),
		height: verticalScale(14),
		width: horizontalScale(20),
	},
	courseSlidertick: {
		borderRadius: verticalScale(18),
		height: verticalScale(10),
		width: verticalScale(10),
	},
	courseTitle: {
		borderRadius: verticalScale(10),
		height: verticalScale(14),
		left: horizontalScale(20),
		top: verticalScale(20),
		width: horizontalScale(100),
	},
	courseTitle2: {
		borderRadius: verticalScale(10),
		height: verticalScale(12),
		left: horizontalScale(20),
		top: verticalScale(30),
		width: horizontalScale(150),
	},
	courseTitle3: {
		borderRadius: verticalScale(10),
		height: verticalScale(12),
		left: horizontalScale(20),
		top: verticalScale(10),
		width: horizontalScale(205),
	},
	courseTitle4: {
		borderRadius: verticalScale(10),
		height: verticalScale(12),
		left: horizontalScale(20),
		top: verticalScale(40),
		width: horizontalScale(310),
	},
	coursesSlider: {
		backgroundColor: neutral.white,
		borderRadius: b18,
		height: verticalScale(80),
		width: horizontalScale(340),
		...selfCenter,
		marginTop: verticalScale(30),
	},

	extension: {
		borderRadius: b8,
		height: verticalScale(10),
		left: horizontalScale(50),
		marginTop: verticalScale(8),
		width: horizontalScale(125),
	},
	level1: {
		borderRadius: b18,
		height: verticalScale(20),
		left: horizontalScale(20),
		top: verticalScale(40),
		width: verticalScale(20),
	},
	level2: {
		borderRadius: b18,
		height: verticalScale(11),
		width: horizontalScale(60),
		...mb10,
		left: horizontalScale(50),
	},
	level3: {
		borderRadius: b18,
		height: verticalScale(11),
		left: horizontalScale(50),
		width: horizontalScale(125),
	},

	level4: {
		borderRadius: b18,
		height: verticalScale(11),
		right: horizontalScale(50),
		width: horizontalScale(13),
	},

	level5: {
		borderRadius: b18,
		height: verticalScale(11),
		left: horizontalScale(60),
		marginTop: verticalScale(12),
		width: horizontalScale(60),
	},
	level5View: {
		borderRadius: b18,
		height: horizontalScale(10),
		left: horizontalScale(50),
		marginTop: verticalScale(12),
		width: horizontalScale(10),
	},
	level6: {
		borderRadius: b18,
		height: verticalScale(11),
		marginTop: verticalScale(12),
		right: horizontalScale(16),
		width: horizontalScale(25),
	},
	levelView: {
		backgroundColor: neutral.white,
		borderRadius: verticalScale(10),
		height: verticalScale(320),
		left: horizontalScale(20),
		top: verticalScale(50),
		width: horizontalScale(330),
	},
	progressBar: {
		borderRadius: b8,
		height: verticalScale(2),
		left: horizontalScale(50),
		marginTop: verticalScale(8),
		width: horizontalScale(280),
	},
	resumeAssetView: {
		backgroundColor: neutral.white,
		borderRadius: verticalScale(18),
		bottom: verticalScale(16),
		height: verticalScale(16),
		marginTop: verticalScale(20),
		width: verticalScale(16),
	},
	rowContainer: { ...row, ...justifyBetween },
	selectCourseText: {
		borderRadius: b8,
		height: verticalScale(12),
		left: horizontalScale(15),
		top: verticalScale(10),
		width: horizontalScale(100),
	},
});
