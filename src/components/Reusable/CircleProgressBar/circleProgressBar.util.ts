import { Animated, Easing } from "react-native";

export const createStrokeDashoffsetInterpolation = (
	progressAnim: Animated.Value,
	circumference: number,
) => {
	return progressAnim.interpolate({
		inputRange: [0, 100],
		outputRange: [circumference, 0],
		extrapolate: "clamp",
	});
};

export const createPercentageTextInterpolation = (
	progressAnim: Animated.Value,
) => {
	return progressAnim.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 100],
	});
};

export const createProgressAnimation = (
	progressAnim: Animated.Value,
	progress: number,
	animationDuration: number,
) => {
	return Animated.timing(progressAnim, {
		toValue: progress,
		duration: animationDuration,
		easing: Easing.out(Easing.ease),
		useNativeDriver: false,
	});
};
