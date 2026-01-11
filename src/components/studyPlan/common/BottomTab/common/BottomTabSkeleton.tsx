import React, { memo } from "react";
import { View } from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";
import { MAX_BOTTOM_TABS } from "@components/studyPlan/common/BottomTab/bottomTab.constants";
import styles from "@components/studyPlan/common/BottomTab/bottomTab.styles";

const BottomTabSkeleton = () => (
	<View style={[styles.container, styles.skeletonContainer]}>
		{new Array(MAX_BOTTOM_TABS).fill(1).map((_, index) => (
			<View key={index} style={styles.skeletonTab}>
				<Skeleton style={styles.skeletonIcon} />
				<Skeleton style={styles.skeletonLabel} />
			</View>
		))}
	</View>
);

export default memo(BottomTabSkeleton);
