import React, { memo, useState } from "react";
import { View } from "react-native";

import {
	IBottomTabItem,
	IBottomTabType,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import styles from "@components/studyPlan/common/BottomTab/bottomTab.styles";
import { getBottomTabs } from "@components/studyPlan/common/BottomTab/bottomTab.utils";
import BottomTabItem from "@components/studyPlan/common/BottomTab/common/BottomTabItem";
import BottomTabPlusItem from "@components/studyPlan/common/BottomTab/common/BottomTabPlusItem";
import BottomTabShowMoreModal from "@components/studyPlan/common/BottomTab/common/BottomTabShowMoreModal";
import BottomTabSkeleton from "@components/studyPlan/common/BottomTab/common/BottomTabSkeleton";

interface IBottomTabInner {
	activeTab: IBottomTabType | null;
	tabs: IBottomTabItem[];
	onTabPress: (tab: IBottomTabItem) => void;
	loading: boolean;
}

const BottomTabInner = ({
	activeTab,
	tabs,
	onTabPress,
	loading,
}: IBottomTabInner) => {
	const [showMoreMenu, setShowMoreMenu] = useState(false);

	const { bottomTabs, showMoreTabs } = getBottomTabs(tabs);
	const hasMoreTabs = showMoreTabs.length > 0;

	const isMoreTabActive = !!showMoreTabs.find((tab) => tab.id === activeTab);

	const toggleShowMoreMenu = () => setShowMoreMenu(!showMoreMenu);

	if (loading) return <BottomTabSkeleton />;

	return (
		<View style={styles.container}>
			{bottomTabs.map((tab, index) => (
				<BottomTabItem
					key={tab.id}
					tab={tab}
					activeTab={activeTab}
					onTabPress={onTabPress}
					testID={`bottom_tab_item_${index}`}
				/>
			))}

			{hasMoreTabs ? (
				<BottomTabPlusItem
					onPress={toggleShowMoreMenu}
					isMoreTabActive={isMoreTabActive}
				/>
			) : null}

			<BottomTabShowMoreModal
				showMoreMenu={showMoreMenu}
				toggleShowMoreMenu={toggleShowMoreMenu}
				showMoreTabs={showMoreTabs}
				activeTab={activeTab}
				onTabPress={onTabPress}
			/>
		</View>
	);
};

export default memo(BottomTabInner);
