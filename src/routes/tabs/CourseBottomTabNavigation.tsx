/**
 * @deprecated
 * This file/component is deprecated and may be removed in future releases.
 * Please avoid using it in new code and migrate to the recommended alternative if available.
 */
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { horizontalScale } from "@utils/functions";

import { C } from "@assets/constants";
import {
	ActiveBookMarkIcon,
	BookmarkActiveIcon,
	BookmarkIcon,
	BookmarkInactiveIcon,
	CalendarLxpActiveIcon,
	CalendarLxpIcon,
	InActiveBookMarkIcon,
	NotesLxpActiveIcon,
	NotesLxpIcon,
	PlusLxp,
	StudyPlanInactive,
	StyudyplanIcon,
} from "@assets/icons";

// Destructure colors from constants
const {
	colors: { neutral },
} = C;

// Define the ICON_DIMENSIONS
const ICON_DIMENSIONS = {
	height: horizontalScale(30),
	width: horizontalScale(30),
};

// Define the TabIcon component
interface TabIconProps {
	focused: boolean;
	IconComponent: React.FC<{ color: string; height: number; width: number }>;
	IconinactiveComponent: React.FC<{
		color: string;
		height: number;
		width: number;
	}>;
}

const TabIcon: React.FC<TabIconProps> = ({
	focused,
	IconComponent,
	IconinactiveComponent,
}) => (
	<View style={styles.tabItem}>
		{!focused ? (
			<IconinactiveComponent color={"#999999"} {...ICON_DIMENSIONS} />
		) : (
			<IconComponent color={neutral.black} {...ICON_DIMENSIONS} />
		)}
	</View>
);

// Define the CourseBottomTabNavigation props interface
interface CourseBottomTabNavigationProps {
	activeTab: string;
	pressactiveState: (tabKey: string) => void;
}

// Define the CourseBottomTabNavigation component
const CourseBottomTabNavigation: React.FC<CourseBottomTabNavigationProps> = ({
	activeTab,
	pressactiveState,
}) => {
	const screenOptions = (
		IconComponent: React.FC<{
			color: string;
			height: number;
			width: number;
		}>,
		focused: boolean,
		IconinactiveComponent: React.FC<{
			color: string;
			height: number;
			width: number;
		}>,
	) => (
		<TabIcon
			focused={focused}
			IconComponent={IconComponent}
			IconinactiveComponent={IconinactiveComponent}
		/>
	);

	const tabArray = [
		{
			activeIcon: StyudyplanIcon,
			inActiveIcon: StudyPlanInactive,
			key: "StudyPlan",
		},
		{
			activeIcon: CalendarLxpActiveIcon,
			inActiveIcon: CalendarLxpIcon,
			key: "Session",
		},
		{
			activeIcon: NotesLxpActiveIcon,
			inActiveIcon: NotesLxpIcon,
			key: "NotesScreen",
		},
		{
			activeIcon: InActiveBookMarkIcon,
			inActiveIcon: ActiveBookMarkIcon,
			key: "Bookmarks",
		},
	];

	const { bottom } = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingBottom: bottom + 10 }]}>
			{tabArray.map((item) => (
				<Pressable
					onPress={() => pressactiveState(item.key)}
					key={item.key}
				>
					{screenOptions(
						item.activeIcon,
						item.key === activeTab,
						item?.inActiveIcon,
					)}
				</Pressable>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		bottom: 0,
		elevation: 5,
		flexDirection: "row",
		justifyContent: "space-around",
		left: 0,
		paddingHorizontal: 10,
		paddingTop: 10,
		position: "absolute",
		width: "100%",
	},
	tabItem: {
		alignItems: "center",
		justifyContent: "center",
	},
});

export default memo(CourseBottomTabNavigation);
