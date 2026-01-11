import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React from "react";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { fontFamily } from "@assets/fonts";
import {
	CalendarActiveIcon,
	CalendarIcon,
	CourseActiveIcon,
	CoursesIcon,
	ExploreActiveIcon,
	ExploreInactiveIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;

const { sm } = commonStyles.text;

const tabBarLabelStyle = {
	color: neutral.black,
	...sm,
	fontFamily: fontFamily.Medium,
};

interface ITabBarIcon {
	focused: boolean;
	IconComponent: React.FC<{ color: string }>;
	IconInactiveComponent: React.FC<{ color: string }>;
	iconDimensions: {
		width: number;
		height: number;
	};
}

const TabBarIcon = ({
	focused,
	IconComponent,
	IconInactiveComponent,
	iconDimensions,
}: ITabBarIcon) => {
	if (focused)
		return <IconComponent color={neutral.black} {...iconDimensions} />;

	return (
		<IconInactiveComponent color={neutral.grey_07} {...iconDimensions} />
	);
};

const tabs = [
	{
		key: "academicPlannerOptions",
		label: strings.PLANNER,
		IconComponent: CalendarActiveIcon,
		IconInactiveComponent: CalendarIcon,
		iconDimensions: {
			width: horizontalScale(20),
			height: verticalScale(20),
		},
	},
	{
		key: "myProgramsOptions",
		label: strings.MY_PROGRAMS,
		IconComponent: CourseActiveIcon,
		IconInactiveComponent: CoursesIcon,
		iconDimensions: {
			width: horizontalScale(22),
			height: verticalScale(24),
		},
	},
	{
		key: "exploreOptions",
		label: strings.EXPLORE,
		IconComponent: ExploreActiveIcon,
		IconInactiveComponent: ExploreInactiveIcon,
		iconDimensions: {
			width: horizontalScale(24),
			height: verticalScale(24),
		},
	},
];

type TabKey = "academicPlannerOptions" | "myProgramsOptions" | "exploreOptions";

const homeTabNavigatorOptions = tabs.reduce(
	(acc, tab) => {
		acc[tab.key as TabKey] = {
			tabBarLabel: tab.label,
			tabBarLabelStyle: tabBarLabelStyle,
			tabBarAllowFontScaling: false,
			tabBarIcon: ({ focused }) => (
				<TabBarIcon
					focused={focused}
					IconComponent={tab.IconComponent}
					IconInactiveComponent={tab.IconInactiveComponent}
					iconDimensions={tab.iconDimensions}
				/>
			),
		};
		return acc;
	},
	{} as Record<TabKey, BottomTabNavigationOptions>,
);

export { homeTabNavigatorOptions };
