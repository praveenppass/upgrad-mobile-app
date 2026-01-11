import React, { memo } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import {
	getInputRange,
	getOutputRange,
} from "@components/Reusable/Carousel/carousel.util";

import { horizontalScale } from "@utils/functions";

interface IIndicator {
	idx: number;
	scrollX: Animated.Value;
	enableScrollOnIndicatorPress?: boolean;
	onPress?: (idx: number) => void;
	indicatorSize: number;
	indicatorColor: string;
	width: number;
}

const Indicator = ({
	idx,
	scrollX,
	enableScrollOnIndicatorPress,
	onPress,
	indicatorSize,
	indicatorColor,
	width,
}: IIndicator) => {
	const inputRange = getInputRange(idx, width);

	const dotWidth = scrollX.interpolate({
		inputRange,
		outputRange: getOutputRange(indicatorSize),
		extrapolate: "clamp",
	});

	const opacity = scrollX.interpolate({
		inputRange,
		outputRange: [0.3, 1, 0.3],
		extrapolate: "clamp",
	});

	return (
		<Pressable
			onPress={() => onPress?.(idx)}
			key={idx.toString()}
			disabled={!enableScrollOnIndicatorPress}
		>
			<Animated.View
				style={[
					styles.dot,
					{
						width: dotWidth,
						opacity,
						height: indicatorSize,
						backgroundColor: indicatorColor,
						borderRadius: indicatorSize / 2,
					},
				]}
			/>
		</Pressable>
	);
};

export default memo(Indicator);

const styles = StyleSheet.create({
	dot: {
		marginHorizontal: horizontalScale(4),
	},
});
