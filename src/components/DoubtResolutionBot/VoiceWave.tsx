import React, { useEffect, useMemo } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { cta } = colors;

const VoiceWave = () => {
	const bars = useMemo(
		() => Array.from({ length: 27 }, () => new Animated.Value(0)),
		[],
	);

	useEffect(() => {
		const animations = bars.map((bar, index) =>
			Animated.loop(
				Animated.sequence([
					Animated.timing(bar, {
						toValue: 1,
						duration: 400 + index * 25,
						easing: Easing.linear,
						useNativeDriver: true,
					}),
					Animated.timing(bar, {
						toValue: 0,
						duration: 300 + index * 20,
						easing: Easing.linear,
						useNativeDriver: true,
					}),
				]),
			),
		);

		animations.forEach((anim) => anim.start());

		return () => {
			animations.forEach((anim) => anim.stop());
		};
	}, []);

	return (
		<View style={waveStyles.container}>
			{bars.map((bar, i) => {
				const scaleY = bar.interpolate({
					inputRange: [0, 1],
					outputRange: [0.3, 1.5],
					extrapolate: "clamp",
				});

				return (
					<Animated.View
						key={i}
						style={[
							waveStyles.bar,
							{
								transform: [{ scaleY }],
							},
						]}
					/>
				);
			})}
		</View>
	);
};

export default React.memo(VoiceWave);

const waveStyles = StyleSheet.create({
	bar: {
		backgroundColor: cta.stroke.secondary_pressed,
		borderRadius: horizontalScale(2),
		height: verticalScale(20),
		marginHorizontal: horizontalScale(2),
		width: horizontalScale(4),
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
		height: verticalScale(30),
		justifyContent: "center",
		overflow: "hidden",
	},
});
