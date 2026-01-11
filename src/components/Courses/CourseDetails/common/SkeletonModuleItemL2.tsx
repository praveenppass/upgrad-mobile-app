import React, { memo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";

import { ModuleItemL3 } from "./ModuleItemL3";

const {
	BORDER: { b8 },
} = measures;
const SkeletonModuleItemL2 = memo(() => {
	const renderItem = () => <ModuleItemL3 />;
	const ItemSeparator = () => <View style={styles.separator} />;
	const [extend, setExtendView] = useState<boolean>(false);
	return (
		<View style={[styles.courseContainer, {}]}>
			<View style={styles.textContainer}>
				<View style={styles.rowCenter}>
					<Skeleton style={styles.iconStyle} />
					<Skeleton style={styles.sessionText} />
					<Skeleton style={styles.alignEnd} />
				</View>
				<Skeleton style={styles.title} />
				{extend ? (
					<FlatList
						data={Array.from({ length: 3 }, (_, i) => 1 + i)}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						keyExtractor={(_item, index) => index.toString()}
						ItemSeparatorComponent={ItemSeparator}
						style={styles.listStyle}
					/>
				) : null}
			</View>
		</View>
	);
});

export { SkeletonModuleItemL2 };

const styles = StyleSheet.create({
	alignEnd: {
		borderRadius: horizontalScale(11),
		height: verticalScale(11),
		marginLeft: "auto",
		width: horizontalScale(11),
	},
	courseContainer: {
		backgroundColor: colors.bg.fill["bg-disable"],
		borderRadius: b8,
	},
	desc: {
		borderRadius: measures.BORDER.b17,
		height: verticalScale(12),
		marginTop: verticalScale(3),
		width: horizontalScale(137),
	},
	iconStyle: {
		borderRadius: horizontalScale(16),
		height: verticalScale(16),
		width: horizontalScale(16),
	},
	listStyle: {
		backgroundColor: colors.bg.fill["bg-default"],
		borderRadius: b8,
		marginHorizontal: verticalScale(6),
	},
	rowCenter: {
		alignContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	separator: {
		marginBottom: verticalScale(10),
	},
	sessionText: {
		borderRadius: horizontalScale(15),
		height: verticalScale(11),
		marginLeft: horizontalScale(8),
		width: horizontalScale(160),
	},
	textContainer: {
		paddingHorizontal: verticalScale(4),
		paddingVertical: verticalScale(4),
	},
	title: {
		borderRadius: horizontalScale(15),
		height: verticalScale(12),
		marginTop: verticalScale(3),
		width: horizontalScale(137),
	},
});
