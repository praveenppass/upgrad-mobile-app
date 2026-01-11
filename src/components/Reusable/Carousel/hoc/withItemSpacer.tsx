import React from "react";

import Spacer from "@components/Reusable/Carousel/Spacer";

/**
 * Higher-Order Component that wraps a component with spacers on both sides.
 * This is commonly used in carousels to provide proper spacing around items.
 *
 * @param Component - The component to wrap with spacers
 *
 * @returns A new component that renders the original component with spacers
 *
 * @example
 * ```tsx
 * const CardWithSpacer = withItemSpacer(MyCard);
 *
 * // Usage in FlatList
 * const renderItem = ({ item }) => (
 *   <CardWithSpacer item={item} spacerWidth={20} />
 * );
 *
 * // Usage in Carousel
 * const ItemComponent = ({ item }) => <Text>{item.title}</Text>;
 * const SpacedItem = withItemSpacer(ItemComponent);
 * ```
 */

interface IWithItemSpacer {
	Component: React.ReactElement;
	spacerWidth: number;
}

const WithItemSpacer = ({ Component, spacerWidth }: IWithItemSpacer) => {
	return (
		<>
			<Spacer width={spacerWidth} />
			{Component}
			<Spacer width={spacerWidth} />
		</>
	);
};

export default WithItemSpacer;
