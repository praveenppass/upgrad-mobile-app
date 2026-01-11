import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { conversationLoaderData } from "@utils/data/conversationLoaderData";
import { horizontalScale, verticalScale } from "@utils/functions";

import { ITicketLoaderData } from "@interface/app.interface";

import { C } from "@assets/constants";

const {
	commonStyles: {
		spacing: { pb100, pt6, m12, g6 },
	},
} = C;

const renderItem = ({ item }: { item: ITicketLoaderData }) => {
	const { cardStyle, directionStyle } = item;
	const skeltonStyle = StyleSheet.compose(styles.sFirst, cardStyle);
	const containerStyle = StyleSheet.compose(styles.innerCard, directionStyle);
	return (
		<View style={containerStyle}>
			<Skeleton style={skeltonStyle} />
			<Skeleton style={styles.sSecond} />
		</View>
	);
};

const TicketDetailsLoader = () => (
	<FlatList
		renderItem={renderItem}
		data={conversationLoaderData}
		keyExtractor={(item) => item?.id}
		showsVerticalScrollIndicator={false}
		contentContainerStyle={styles.listStyle}
	/>
);

export default memo(TicketDetailsLoader);

const styles = StyleSheet.create({
	innerCard: {
		...g6,
		...m12,
	},
	listStyle: {
		...pt6,
		...pb100,
	},
	sFirst: {
		borderRadius: horizontalScale(10),
	},
	sSecond: {
		borderRadius: horizontalScale(90),
		height: verticalScale(40),
		width: horizontalScale(40),
	},
});
