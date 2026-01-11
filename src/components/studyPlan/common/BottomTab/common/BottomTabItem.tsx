import React, { memo } from "react";
import { Pressable } from "react-native";

import RNText from "@components/Reusable/RNText";
import {
	IBottomTabItem,
	IBottomTabType,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import styles from "@components/studyPlan/common/BottomTab/bottomTab.styles";
import { getTabData } from "@components/studyPlan/common/BottomTab/bottomTab.utils";

interface IBottomTabItemProps {
	tab: IBottomTabItem;
	activeTab: IBottomTabType | null;
	onTabPress: (tab: IBottomTabItem) => void;
	testID?: string;
}

const BottomTabItem = ({
	tab,
	activeTab,
	onTabPress,
	testID,
}: IBottomTabItemProps) => {
	const isActive = activeTab === tab.id;
	const { icon, activeIcon, label } = getTabData(tab);
	return (
		<Pressable
			key={tab.id}
			style={styles.tabContainer}
			onPress={() => onTabPress(tab)}
			testID={testID}
		>
			{isActive ? activeIcon : icon}

			<RNText
				style={[styles.tabLabel, isActive && styles.activeTabLabel]}
			>
				{label}
			</RNText>
		</Pressable>
	);
};

export default memo(BottomTabItem);
