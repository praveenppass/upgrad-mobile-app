import React from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { LoadingChips } from "@components/Reusable/CustomChip";
import Skeleton from "@components/Skeleton/Skeleton";

import { loaderData } from "@utils/data/loaderData";
import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

const {
	commonStyles: {
		spacing: { g12, p10, mh12, mt4 },
		align: { selfCenter, row, spaceAround },
	},
} = C;

const {
	BORDER: { b8 },
	SCREEN_WIDTH,
} = measures;

interface ILoadingPropsType {
	listItemStyle?: StyleProp<ViewStyle>;
}

const LoadingListItem = ({ listItemStyle }: ILoadingPropsType) => (
	<Skeleton style={[styles.moduleSection, listItemStyle]} />
);

const TicketLoadingScreen = ({
	loaderStyle,
}: {
	loaderStyle?: StyleProp<ViewStyle>;
}) => {
	const renderItem = () => {
		return (
			<View style={loaderStyle}>
				<LoadingListItem />
			</View>
		);
	};

	return (
		<>
			<View style={styles.loaderStyle}>
				<LoadingChips customStyle={styles.chipLoadingStyle} />
				<LoadingChips customStyle={styles.chipLoadingStyle} />
			</View>
			<FlatList
				initialNumToRender={4}
				contentContainerStyle={[p10, g12]}
				data={loaderData}
				showsVerticalScrollIndicator={false}
				renderItem={renderItem}
			/>
		</>
	);
};

export { TicketLoadingScreen, LoadingListItem };

const styles = StyleSheet.create({
	chipLoadingStyle: {
		borderRadius: b8,
		height: verticalScale(35),
		width: horizontalScale(150),
		...mh12,
		...mt4,
	},
	loaderStyle: {
		...row,
		...p10,
		...spaceAround,
	},
	moduleSection: {
		alignSelf: "center",
		borderRadius: horizontalScale(8),
		height: verticalScale(150),
		width: SCREEN_WIDTH / 1.1,
	},
});
