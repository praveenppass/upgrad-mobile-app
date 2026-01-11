/**
 * @deprecated
 * This file/component is deprecated and may be removed in future releases.
 * Please avoid using it in new code and migrate to the recommended alternative if available.
 */
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { memo } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";

import CustomBadge from "@components/Reusable/CustomBadge/CustomBadge";
import RNText from "@components/Reusable/RNText";

import { useHelpSupportEvents } from "@hooks/useHelpSupportEvents";

import { horizontalScale, moderateScale } from "@utils/functions";
import measures from "@utils/measures";

import {
	HELP_AND_SUPPORT_DETAILS,
	HELP_SUPPORT_ENUM,
} from "@interface/helpSupport.interface";
import { type HelpSupportTabData } from "@interface/types/HelpSupportTabData";

import { C } from "@assets/constants";

const {
	themes: { text, bg },
	commonStyles: {
		text: { reg, bold, txtCenter, txtTransCapt },
		align: {
			justifyCenter,
			alignCenter,
			flex1,
			rowBetween,
			spaceAround,
			row,
		},
		spacing: { ml12, mv12, mh20, mr12, mt4 },
	},
} = C;

const {
	BORDER: { b8 },
} = measures;

const HelpSupportTopTabNavigation = ({ tabs }: HelpSupportTabData) => {
	const Tab = createMaterialTopTabNavigator();
	const { OnTabSwitch } = useHelpSupportEvents();
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: styles.tabBar,
				tabBarIndicatorStyle: styles.indicatorStyle,
				tabBarItemStyle: styles.itemStyle,
				lazy: false,
				tabBarPressColor: bg.transparent,
			}}
		>
			{tabs.map(({ name, component, params, badge }) => {
				const currentTab =
					name == HELP_SUPPORT_ENUM.open
						? HELP_AND_SUPPORT_DETAILS?.open_ticket
						: HELP_AND_SUPPORT_DETAILS?.closed_ticket;

				return (
					<Tab.Screen
						key={name}
						listeners={{
							//* Other Event my required later
							swipeEnd: (_e) => {
								// console.log("swipeEnd", e);
							},
							tabLongPress: (_e) => {
								// console.log("tabLongPress", e);
							},
							focus: (_e) => {
								//
							},
							swipeStart: (_e) => {
								// console.log("swipeStart", e);
							},
							state: (_e) => {
								// console.log("state", e);
							},
							beforeRemove: (_e) => {
								// console.log("beforeRemove", e);
							},
							blur: (_e) => {
								// console.log("blur", e);
							},
							tabPress: (_e) => {
								OnTabSwitch(currentTab);
							},
						}}
						name={name}
						component={component}
						initialParams={params}
						options={{
							tabBarLabel: ({ focused }) => {
								return (
									<View style={styles.label}>
										<RNText
											title={name}
											style={[
												styles.tabBarStyle,
												{
													color: focused
														? text.dark
														: text.darkBlue,
												},
											]}
										/>
										<View style={styles.badge}>
											<CustomBadge
												badge={badge ?? 0}
												focused={focused}
											/>
										</View>
									</View>
								);
							},
						}}
					/>
				);
			})}
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	badge: {
		...ml12,
		...justifyCenter,
		...alignCenter,
	},
	chipLoadingStyle: {
		borderRadius: b8,
		height: moderateScale(35),
		width: horizontalScale(140),
		...mr12,
		...mt4,
	},
	dropDownStyle: {
		...rowBetween,
		...mv12,
		...mh20,
	},
	indicatorStyle: {
		borderBottomColor: text.dark,
		borderBottomWidth: measures.BORDER.b4,
	},
	itemStyle: { width: horizontalScale(188) },
	label: {
		...row,
		...justifyCenter,
		...alignCenter,
		width: horizontalScale(100),
	},
	main: {
		...flex1,
		...spaceAround,
	},
	tabBar: { backgroundColor: bg.white },
	tabBarStyle: {
		...txtCenter,
		...reg,
		...bold,
		...txtTransCapt,
	},
});

export default memo(HelpSupportTopTabNavigation);
