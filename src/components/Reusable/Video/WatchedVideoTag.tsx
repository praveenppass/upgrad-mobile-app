import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { state, neutral, transparent } = colors;
const { xxSm, regular } = commonStyles.text;

const WatchedVideoTag = () => {
	const width = horizontalScale(66);
	const height = verticalScale(18);
	const skewWidth = horizontalScale(5);
	const trapezoidWidth = width - skewWidth;

	return (
		<View style={styles.absoluteWrapper}>
			<View style={[styles.trapezoidWrapper, { width }]}>
				<View
					style={[
						styles.trapezoid,
						{
							borderBottomColor: state.success_green,
							borderBottomWidth: height,
							borderRightWidth: skewWidth,
							width: trapezoidWidth,
						},
					]}
				/>
				<RNText title={strings.WATCHED} style={styles.text} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	absoluteWrapper: {
		left: 0,
		position: "absolute",
		top: Platform.OS === "ios" ? verticalScale(40) : verticalScale(12),
		zIndex: 10,
	},
	iosWrapper: {
		left: 0,
		position: "absolute",
		top: verticalScale(12),
		zIndex: 10,
	},
	text: {
		color: neutral.white,
		...xxSm,
		...regular,
		bottom: verticalScale(3),
		flex: 1,
		includeFontPadding: false,
		left: horizontalScale(5),
		position: "absolute",
		right: horizontalScale(16),
		textAlignVertical: "center",
		top: verticalScale(3),
	},
	trapezoid: {
		borderLeftColor: transparent,
		borderLeftWidth: 0,
		borderRightColor: transparent,
		borderStyle: "solid",
		height: 0,
		left: 0,
		position: "absolute",
		top: 0,
	},
	trapezoidWrapper: {
		height: verticalScale(18),
		position: "relative",
	},
});

export default WatchedVideoTag;
