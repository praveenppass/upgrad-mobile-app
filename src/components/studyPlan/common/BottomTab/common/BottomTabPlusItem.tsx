import React, { memo } from "react";
import { Pressable } from "react-native";

import styles from "@components/studyPlan/common/BottomTab/bottomTab.styles";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { PlusIcon } from "@assets/icons";

const { neutral } = colors;

interface IBottomMoreTab {
	onPress: () => void;
	isMoreTabActive: boolean;
}

const BottomTabPlusItem = ({ onPress, isMoreTabActive }: IBottomMoreTab) => (
	<Pressable
		style={[styles.tabContainer, styles.tabContainerPlus]}
		onPress={onPress}
		testID="bottom_tab_plus_item"
	>
		<PlusIcon
			color={isMoreTabActive ? neutral.black : neutral.grey_06}
			height={verticalScale(22)}
			width={horizontalScale(22)}
		/>
	</Pressable>
);

export default memo(BottomTabPlusItem);
