import React, { memo, useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { moderateScale } from "@utils/functions";

import { C } from "@assets/constants";
import { DropDownIcon } from "@assets/icons";

const {
	themes: { primary },
} = C;
export interface IAccordionIconProps {
	isOpen?: boolean;
	iconColor?: string;
	svgSize?: ISvgSizeType;
	iconStyle?: StyleProp<ViewStyle>;
}
const ARROW_DIMENSION = {
	width: moderateScale(24),
	height: moderateScale(24),
};
interface ISvgSizeType {
	width: number;
	height: number;
}
const AccordionIcon = ({
	isOpen,
	iconColor,
	svgSize,
	iconStyle,
}: IAccordionIconProps) => {
	const animatedHeightValue = useSharedValue(0);
	const duration = 200;
	const toggleAnimationValue = (isLocalOpen: boolean) => {
		if (isLocalOpen) {
			animatedHeightValue.value = withTiming(1, {
				duration,
			});
		} else {
			animatedHeightValue.value = withTiming(0, {
				duration,
			});
		}
	};
	const animatedRotation = useAnimatedStyle(() => {
		const rotate = interpolate(
			animatedHeightValue.value,
			[0, 1],
			[180, 360],
		);
		return {
			transform: [{ rotate: `${rotate}deg` }],
		};
	});
	useEffect(() => {
		if (typeof isOpen === "boolean") {
			toggleAnimationValue(isOpen);
		}
	}, [isOpen]);
	return (
		<Animated.View style={animatedRotation}>
			<DropDownIcon
				style={iconStyle}
				{...ARROW_DIMENSION}
				{...svgSize}
				color={iconColor ?? primary.color2}
			/>
		</Animated.View>
	);
};
export default memo(AccordionIcon);
