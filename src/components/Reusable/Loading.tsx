import React, { memo } from "react";
import {
	Animated,
	Easing,
	Image,
	ImageStyle,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { LoadingIcon } from "@assets/icons/img";

interface ILoading {
	imageStyle?: StyleProp<ImageStyle>;
	style?: StyleProp<ViewStyle>;
}

const Loading: React.FC<ILoading> = ({ imageStyle, style }) => {
	const spinValue = new Animated.Value(0);

	Animated.loop(
		Animated.timing(spinValue, {
			toValue: 1,
			duration: 1000,
			easing: Easing.linear,
			useNativeDriver: true,
		}),
	).start();

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	return (
		<View style={[styles.container, style]}>
			<Animated.View style={{ transform: [{ rotate: spin }] }}>
				<Image
					source={LoadingIcon}
					style={[styles.icon, imageStyle]}
					resizeMode="contain"
				/>
			</Animated.View>
		</View>
	);
};

export default memo(Loading);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		height: verticalScale(16),
		width: horizontalScale(16),
	},
});
