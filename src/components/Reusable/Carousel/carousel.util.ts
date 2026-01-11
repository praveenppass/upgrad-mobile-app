import {
	Animated,
	NativeScrollEvent,
	NativeSyntheticEvent,
} from "react-native";

export const handleOnScroll = (
	event: NativeSyntheticEvent<NativeScrollEvent>,
	scrollX: Animated.Value,
) => {
	Animated.event(
		[
			{
				nativeEvent: {
					contentOffset: {
						x: scrollX,
					},
				},
			},
		],
		{ useNativeDriver: false },
	)(event);
};

export const getItemLayout = (fullItemWidth: number, index: number) => ({
	length: fullItemWidth,
	offset: fullItemWidth * index,
	index,
});

export const getInputRange = (idx: number, width: number) => [
	(idx - 1) * width,
	idx * width,
	(idx + 1) * width,
];

export const getOutputRange = (indicatorSize: number) => [
	indicatorSize,
	2 * indicatorSize,
	indicatorSize,
];
