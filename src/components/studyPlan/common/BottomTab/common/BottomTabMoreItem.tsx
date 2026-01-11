import React, { memo } from "react";
import { Pressable, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import {
	IBottomTabItem,
	IBottomTabType,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import styles from "@components/studyPlan/common/BottomTab/bottomTab.styles";
import { getTabData } from "@components/studyPlan/common/BottomTab/bottomTab.utils";

interface IBottomTabMoreItem {
	tab: IBottomTabItem;
	activeTab: IBottomTabType | null;
	onTabPress: (tab: IBottomTabItem) => void;
	testID?: string;
}

const BottomTabMoreItem = ({
	tab,
	activeTab,
	onTabPress,
	testID,
}: IBottomTabMoreItem) => {
	const isActive = activeTab === tab.id;

	const { icon, activeIcon, label } = getTabData(tab);
	return (
		<Pressable
			style={styles.moreMenuPressable}
			key={tab.id}
			onPress={() => onTabPress(tab)}
			testID={testID}
		>
			<View style={styles.moreMenuItem}>
				{isActive ? activeIcon : icon}
			</View>

			<RNText style={[styles.tabLabel, styles.moreTabLabel]}>
				{label}
			</RNText>
		</Pressable>
	);
};

export default memo(BottomTabMoreItem);
