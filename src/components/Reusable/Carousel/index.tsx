import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, View, ViewToken } from "react-native";

import {
	getItemLayout,
	handleOnScroll,
} from "@components/Reusable/Carousel/carousel.util";
import CarouselIndicators from "@components/Reusable/Carousel/CarouselIndicators";
import WithItemSpacer from "@components/Reusable/Carousel/hoc/withItemSpacer";

import { verticalScale } from "@utils/functions";
import measures from "@utils/measures";

/**
 * Props for the Carousel component.
 *
 * @important
 * You MUST pass the carousel card width (less than the screen width) to the carousel via the `cardWidth` prop for correct layout and scrolling behavior.
 *
 * BEHAVIOR:
 * - If the data length is less than 2, the carousel will not auto-scroll.
 * - If the data length is greater than or equal to 2, the carousel will auto-scroll.
 * - The carousel will scroll in accordance with the user's swipe gesture.
 *
 * @template T
 * @typedef {Object} CarouselProps
 * @property {T[]} data - The data array to render in the carousel.
 * @property {FlatListProps<T>["renderItem"]} renderItem - Function to render each item.
 * @property {boolean} [autoscroll] - Whether the carousel should auto-scroll.
 * @property {number} [cardWidth] - Width of each carousel card.
 * @property {boolean} [showIndicators] - Whether to show pagination dots.
 * @property {number} [indicatorSize] - Size of the pagination dots.
 * @property {number} [gap] - Vertical gap between carousel and pagination dots.
 * @property {number} [autoscrollInterval] - Interval (ms) for auto-scroll.
 * @property {string} [indicatorColor] - Color of the pagination dots.
 * @property {boolean} [enableScrollOnIndicatorPress] - enable scroll on the press of pagination dots.
 */

interface CarouselProps<T> {
	data: T[];
	renderItem: (item: T) => React.ReactElement;
	autoscroll?: boolean;
	cardWidth: number;
	showIndicators?: boolean;
	indicatorSize?: number;
	gap?: number;
	autoscrollInterval?: number;
	indicatorColor?: string;
	enableScrollOnIndicatorPress?: boolean;
}

const { SCREEN_WIDTH } = measures;
const ITEM_VISIBLE_AT_PERCENT = 50;

const Carousel = <T,>({
	data,
	renderItem,
	autoscroll = false,
	cardWidth = SCREEN_WIDTH * 0.9,
	showIndicators = true,
	indicatorSize,
	gap = verticalScale(10),
	autoscrollInterval = 3000,
	indicatorColor,
	enableScrollOnIndicatorPress = false,
}: CarouselProps<T>) => {
	const spacerWidth = (SCREEN_WIDTH - cardWidth) / 2;
	const fullItemWidth = cardWidth + spacerWidth * 2;

	const [carouselIndex, setCarouselIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const flatListRef = useRef<FlatList<T>>(null);

	const scroller = (index: number) => {
		flatListRef.current?.scrollToOffset({
			offset: index * fullItemWidth,
			animated: true,
		});
	};

	const onScrollToIndexFailed = (index: number) => {
		setTimeout(() => scroller(index), 500);
	};

	// Autoscroll effect
	useEffect(() => {
		if (!autoscroll || data.length < 2) return;

		const interval = setInterval(() => {
			const nextIndex = (carouselIndex + 1) % data.length;
			scroller(nextIndex);
		}, autoscrollInterval);

		return () => clearInterval(interval);
	}, [carouselIndex, data.length]);

	interface IViewableItems {
		viewableItems: ViewToken[];
	}

	// Handle viewable items change
	const handleOnViewableItemsChanged = useRef(
		({ viewableItems }: IViewableItems) => {
			if (viewableItems.length > 0) {
				setCarouselIndex(viewableItems[0].index ?? 0);
			}
		},
	).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: ITEM_VISIBLE_AT_PERCENT,
	}).current;

	interface IItemWithSpacer {
		item: T;
	}

	const ItemWithSpacer = ({ item }: IItemWithSpacer) => (
		<WithItemSpacer
			Component={renderItem(item)}
			spacerWidth={spacerWidth}
		/>
	);

	if (!data.length) return null;

	return (
		<View style={{ gap }}>
			<FlatList
				ref={flatListRef}
				data={data}
				renderItem={ItemWithSpacer}
				keyExtractor={(_, index) => index.toString()}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={(event) => handleOnScroll(event, scrollX)}
				onViewableItemsChanged={handleOnViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				getItemLayout={(_, i) => getItemLayout(fullItemWidth, i)}
				snapToInterval={fullItemWidth}
				decelerationRate="fast"
				onScrollToIndexFailed={({ index }) =>
					onScrollToIndexFailed(index)
				}
			/>
			{showIndicators && (
				<CarouselIndicators
					carouselLength={data.length}
					scrollX={scrollX}
					indicatorSize={indicatorSize}
					indicatorColor={indicatorColor}
					onPress={scroller}
					enableScrollOnIndicatorPress={enableScrollOnIndicatorPress}
				/>
			)}
		</View>
	);
};

export default Carousel;
