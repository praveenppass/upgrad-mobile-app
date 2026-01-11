import React, { memo, useEffect, useMemo, useRef } from "react";
import { ImageStyle, StyleProp, ViewProps, ViewStyle } from "react-native";
import { Animated, Easing, StyleSheet } from "react-native";

import { horizontalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral, cta } = colors;

interface SkeletonProps extends Omit<ViewProps, "style"> {
	style?: StyleProp<ImageStyle | ViewStyle>;
	dark?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ style, dark, ...props }) => {
	const animation = useRef(new Animated.Value(0)).current;

	const animationConfig = useMemo(
		() => ({
			duration: 800,
			easing: Easing.inOut(Easing.linear),
			useNativeDriver: false,
		}),
		[],
	);

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(animation, {
					toValue: 1,
					...animationConfig,
				}),
				Animated.timing(animation, {
					toValue: 0,
					...animationConfig,
				}),
			]),
		).start();
	}, [animation, animationConfig]);

	const bgColor = animation.interpolate({
		inputRange: [0, 1],
		outputRange: dark
			? [cta.fill.disable, neutral.grey_04]
			: [neutral.grey_05, neutral.grey_04],
	});

	return (
		<Animated.View
			style={[styles.skeleton, style, { backgroundColor: bgColor }]}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	skeleton: {
		borderRadius: horizontalScale(4),
	},
});

export default memo(Skeleton);
