import React, { memo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { SkeletonModuleItemL2 } from "./SkeletonModuleItemL2";

const SkeletonModuleItem = memo(() => {
	const renderItem = () => <SkeletonModuleItemL2 />;
	const [extend, setExtendView] = useState<boolean>(false);

	const ItemSeparator = () => <View style={styles.separator} />;
	return (
		<View style={styles.courseContainer}>
			<View style={styles.textConatiner}>
				<View style={styles.rowCenter}>
					<Skeleton style={styles.successIcon} />
					<Skeleton style={styles.sessionText} />

					<Skeleton style={styles.alignEnd} />
				</View>
				<Skeleton style={styles.title} />
				{!extend && <Skeleton style={styles.desc} />}

				{extend ? (
					<FlatList
						data={Array.from({ length: 5 }, (_, i) => 1 + i)}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						keyExtractor={(_item, index) => index.toString()}
						ItemSeparatorComponent={ItemSeparator}
						style={{
							marginHorizontal: verticalScale(10),
						}}
					/>
				) : null}
			</View>
		</View>
	);
});

export { SkeletonModuleItem };

const styles = StyleSheet.create({
	alignEnd: {
		borderRadius: horizontalScale(11),
		height: verticalScale(11),
		marginLeft: "auto",
		width: horizontalScale(11),
	},
	courseContainer: {
		borderRadius: horizontalScale(8),
	},
	desc: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginTop: verticalScale(3),
		width: horizontalScale(272),
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
		height: verticalScale(14),
		width: horizontalScale(180),
	},
	successIcon: {
		borderRadius: horizontalScale(16),
		height: verticalScale(16),
		marginRight: horizontalScale(8),
		width: horizontalScale(16),
	},
	textConatiner: {
		paddingHorizontal: verticalScale(10),
		paddingVertical: verticalScale(16),
	},
	title: {
		borderRadius: horizontalScale(20),
		height: verticalScale(14),
		marginTop: verticalScale(3),
		width: horizontalScale(222),
	},
});
