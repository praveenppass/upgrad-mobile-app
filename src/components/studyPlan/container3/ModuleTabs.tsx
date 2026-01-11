import React, { memo, useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import RNText from "@components/Reusable/RNText";
import { IContainer3Data } from "@components/studyPlan/container3/Container3Component/container3Component.interface";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { semiBold, sm, regular } = commonStyles.text;

// String constants
const STRINGS = createStringConstants({
	MODULE: "studyPlan.container3.moduleTabs.module",
});

/**
 * ModuleTabs - Horizontal Scrollable Module Navigation Component
 *
 * A React Native component that renders a horizontal list of module tabs with scrolling capabilities.
 * Provides an intuitive navigation interface for switching between different course modules with
 * visual feedback and smooth animations.
 *
 *
 * @param {number} selectedModule - Zero-based index of the currently selected module (0 to moduleCount-1)
 * @param {number} moduleCount - Total number of modules to display as tabs (must be positive integer)
 * @param {function} setSelectedModule - Callback function to update selected module state
 * @param {function} onModulePress - Callback function triggered when user taps a module tab
 *
 */

interface IModuleTabs {
	selectedModuleIndex: number;
	moduleList: IContainer3Data[];
	onModulePress: (module: number) => void;
	showOriginalNames?: boolean;
}

const ModuleTabs = ({
	selectedModuleIndex,
	moduleList,
	onModulePress,
	showOriginalNames = true,
}: IModuleTabs) => {
	const flatListRef = useRef<FlatList<IContainer3Data>>(null);

	const selectedModule = moduleList?.[selectedModuleIndex];

	useEffect(() => {
		if (selectedModuleIndex === -1) return;

		flatListRef.current?.scrollToIndex({
			index: selectedModuleIndex,
			viewOffset: horizontalScale(100),
		});
	}, [selectedModuleIndex]);

	const renderItem: ListRenderItem<IContainer3Data> = useCallback(
		({ item, index }) => {
			const isActive = selectedModule?.code === item.code;
			const moduleName =
				showOriginalNames && item.label
					? item.label
					: `${getString(STRINGS.MODULE)} ${index + 1}`;

			return (
				<View
					style={[
						styles.tab,
						isActive
							? style.activeContainer
							: style.inactiveContainer,
					]}
				>
					<RNText
						title={moduleName}
						style={isActive ? style.activeText : style.inactiveText}
						numberOfLines={1}
						ellipsizeMode="tail"
						onPress={() => onModulePress(index)}
						disabled={isActive}
						testID={`container3_module_tab_${index}`}
					/>
				</View>
			);
		},
		[selectedModule, style, onModulePress],
	);

	const handleScrollToIndexFailed = useCallback(
		({ index }: { index: number }) => {
			flatListRef.current?.scrollToOffset({
				offset: index * horizontalScale(100),
				animated: true,
			});
		},
		[onModulePress],
	);

	return (
		<View>
			<FlatList
				ref={flatListRef}
				data={moduleList}
				renderItem={renderItem}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}
				onScrollToIndexFailed={handleScrollToIndexFailed}
				style={styles.flatList}
				getItemLayout={(_, index) => ({
					length: horizontalScale(100),
					offset: index * horizontalScale(100),
					index,
				})}
			/>
		</View>
	);
};

export default memo(ModuleTabs);

const styles = StyleSheet.create({
	activeItemContainer: {
		borderBottomColor: neutral.black,
		borderBottomWidth: 2,
	},
	activeText: {
		color: neutral.black,
		...semiBold,
	},
	baseText: {
		...sm,
	},
	contentContainer: {
		alignItems: "center",
		backgroundColor: neutral.white,
		flexDirection: "row",
		gap: horizontalScale(24),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(16),
	},
	flatList: {
		borderBottomColor: neutral.grey_05,
		borderBottomWidth: 1,
	},
	inactiveText: {
		color: neutral.grey_05,
		...regular,
	},
	itemContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: verticalScale(4),
	},
	tab: {
		width: horizontalScale(75),
	},
});

const style = {
	activeContainer: [styles.itemContainer, styles.activeItemContainer],
	inactiveContainer: styles.itemContainer,
	activeText: [styles.baseText, styles.activeText],
	inactiveText: [styles.baseText, styles.inactiveText],
};
