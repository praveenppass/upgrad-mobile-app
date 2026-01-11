import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { DropDownLxpIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { sm, xbold } = commonStyles.text;
const { content, bg } = colors;

interface CollapsibleListViewProps {
	title: string;
	data: IEventCardProps[];
	renderItem: ({ item }: { item: IEventCardProps }) => JSX.Element;
}

const CollapsibleListView = ({
	title,
	data,
	renderItem,
}: CollapsibleListViewProps) => {
	const [isExpanded, setIsExpanded] = useState(true);
	const toggleExpand = () => setIsExpanded((prev) => !prev);
	const itemSeparator = () => <View style={styles.itemSeparatorStyle} />;
	const iconStyle = isExpanded ? styles.collapsedIcon : styles.expandedIcon;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<RNText title={title} style={styles.urgentTitleStyle} />
				{data?.length > 0 && (
					<Pressable
						style={styles.iconContainer}
						onPress={toggleExpand}
					>
						<DropDownLxpIcon style={iconStyle} />
					</Pressable>
				)}
			</View>
			{isExpanded ? (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(_, index) => index.toString()}
					contentContainerStyle={styles.contentContainer}
					ItemSeparatorComponent={itemSeparator}
				/>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	collapsedIcon: {
		transform: [{ rotate: "0deg" }],
	},
	container: {
		backgroundColor: bg.fill.expired,
		borderRadius: horizontalScale(5),
		marginHorizontal: horizontalScale(16),
		marginTop: verticalScale(10),
		paddingBottom: verticalScale(10),
	},
	contentContainer: {
		flexGrow: 1,
	},
	expandedIcon: {
		transform: [{ rotate: "180deg" }],
	},
	header: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(10),
	},
	iconContainer: {
		justifyContent: "center",
		paddingHorizontal: horizontalScale(7),
		paddingVertical: verticalScale(9),
	},
	itemSeparatorStyle: { height: verticalScale(10) },
	urgentTitleStyle: {
		...sm,
		...xbold,
		color: content.text.default_red_primary,
		lineHeight: verticalScale(15),
		paddingVertical: verticalScale(4),
	},
});

export default CollapsibleListView;
