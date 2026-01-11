import React, { memo, useMemo } from "react";
import {
	Animated,
	FlatList,
	StyleSheet,
	useWindowDimensions,
} from "react-native";

import Indicator from "@components/Reusable/Carousel/Indicator";

import { horizontalScale } from "@utils/functions";

import { colors } from "@assets/colors";

/**
 * Renders animated indicator dots for a horizontal carousel.
 * The active indicator expands and fades in as the carousel scrolls.
 *
 * @param {ICarouselIndicators} props - The props for the indicator component.
 * @property {number} carouselLength - The total number of items in the carousel.
 * @property {Animated.Value} scrollX - The animated value tracking the horizontal scroll position.
 * @property {number} [indicatorSize] - The diameter of each indicator dot (default: 4 scaled units).
 * @property {string} [indicatorColor] - The color of the active indicator dot (default: black).
 * @property {(idx: number) => void} [onPress] - The function to call when an indicator is pressed.
 * @property {boolean} [enableScrollOnIndicatorPress] - Whether to enable scrolling when an indicator is pressed.
 * @returns {JSX.Element} The rendered indicator dots.
 *
 
 */

interface ICarouselIndicators {
	carouselLength: number;
	scrollX: Animated.Value;
	indicatorSize?: number;
	indicatorColor?: string;
	onPress?: (idx: number) => void;
	enableScrollOnIndicatorPress?: boolean;
}

const CarouselIndicators = ({
	carouselLength,
	scrollX,
	indicatorSize = horizontalScale(4),
	indicatorColor = colors.neutral.black,
	onPress,
	enableScrollOnIndicatorPress,
}: ICarouselIndicators) => {
	const { width } = useWindowDimensions();
	const array = useMemo(
		() => Array.from({ length: carouselLength }, (_, idx: number) => idx),
		[carouselLength],
	);

	return (
		<FlatList
			data={array}
			renderItem={({ item }) => (
				<Indicator
					key={item.toString()}
					idx={item}
					scrollX={scrollX}
					enableScrollOnIndicatorPress={enableScrollOnIndicatorPress}
					onPress={onPress}
					indicatorSize={indicatorSize}
					indicatorColor={indicatorColor}
					width={width}
				/>
			)}
			horizontal
			showsHorizontalScrollIndicator={false}
			scrollEnabled={false}
			style={styles.container}
		/>
	);
};

export default memo(CarouselIndicators);

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
	},
});
