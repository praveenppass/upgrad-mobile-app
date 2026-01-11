import React, { memo } from "react";
import { Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IBottomTabItem } from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import { IBottomTabType } from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import styles from "@components/studyPlan/common/BottomTab/bottomTab.styles";
import BottomTabMoreItem from "@components/studyPlan/common/BottomTab/common/BottomTabMoreItem";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { CloseIcon } from "@assets/icons";

interface IBottomTabShowMoreModal {
	showMoreMenu: boolean;
	toggleShowMoreMenu: () => void;
	showMoreTabs: IBottomTabItem[];
	activeTab: IBottomTabType | null;
	onTabPress: (tab: IBottomTabItem) => void;
}

const { neutral } = colors;

const BottomTabShowMoreModal = ({
	showMoreMenu,
	toggleShowMoreMenu,
	showMoreTabs,
	activeTab,
	onTabPress,
}: IBottomTabShowMoreModal) => {
	const insets = useSafeAreaInsets();
	return (
		<Modal
			visible={showMoreMenu}
			statusBarTranslucent
			transparent
			animationType="fade"
			onRequestClose={toggleShowMoreMenu}
		>
			<Pressable style={styles.modalOverlay} onPress={toggleShowMoreMenu}>
				<View
					style={[
						styles.moreMenuContainer,
						{
							marginBottom: insets.bottom + verticalScale(11),
						},
					]}
				>
					{showMoreTabs.map((tab, index) => (
						<BottomTabMoreItem
							key={tab.id}
							tab={tab}
							activeTab={activeTab}
							onTabPress={() => {
								onTabPress(tab);
								toggleShowMoreMenu();
							}}
							testID={`bottom_tab_more_item_${index}`}
						/>
					))}
					<Pressable
						style={styles.moreMenuPressable}
						onPress={toggleShowMoreMenu}
						testID="bottom_tab_close_more"
					>
						<View style={styles.moreMenuItem}>
							<CloseIcon
								color={neutral.grey_06}
								height={verticalScale(16)}
								width={horizontalScale(16)}
							/>
						</View>
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
};

export default memo(BottomTabShowMoreModal);
