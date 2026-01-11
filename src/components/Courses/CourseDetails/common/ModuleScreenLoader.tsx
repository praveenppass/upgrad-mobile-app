import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

import SkeletonDueDate from "./SkeletonDueDate";
import SkeletonHeaderText from "./SkeletonHeaderText";
import { SkeletonModuleItem } from "./SkeletonModuleItem";
import SkeletonProgress from "./SkeletonProgress";
import SkeletonTitle from "./SkeletonTitle";

const ModuleScreenLoader = () => {
	const renderItem = () => <SkeletonModuleItem />;
	const ItemSeparator = () => <View style={styles.separator} />;
	return (
		<View style={styles.container}>
			<SkeletonTitle />
			<SkeletonHeaderText />
			<SkeletonProgress />
			<SkeletonDueDate />
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
		</View>
	);
};

export default memo(ModuleScreenLoader);

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.bg.fill["bg-default"],
	},
	separator: {
		marginBottom: verticalScale(10),
	},
	title: {
		borderRadius: horizontalScale(13),
		height: verticalScale(12),
		width: horizontalScale(139),
	},
});
