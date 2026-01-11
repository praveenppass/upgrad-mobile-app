import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AcademicPlanner from "@screens/Home/HomeTab/AcademicPlanner";
import UgAcademicPlanner from "@screens/Home/HomeTab/AcademicPlanner/UgAcademicPlanner";
import MyPrograms from "@screens/Home/HomeTab/MyPrograms";
import UgMyPrograms from "@screens/Home/HomeTab/MyPrograms/UgMyPrograms";
import WebExploreCourses from "@screens/Home/HomeTab/WebExploreCoursesScreen";

import useGetUserType from "@hooks/useGetUserType";
import useKeyboard from "@hooks/useKeyboard";

import { type IHomeTabNavigatorParamList } from "@navigation/navigators/homeTabNavigator/homeTabNavigator.interface";
import { homeTabNavigatorOptions } from "@navigation/navigators/homeTabNavigator/homeTabNavigator.utils";
import { HOME_TAB_ROUTES } from "@navigation/routes";

import { verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { academicPlannerOptions, exploreOptions, myProgramsOptions } =
	homeTabNavigatorOptions;

const Tab = createBottomTabNavigator<IHomeTabNavigatorParamList>();

const TAB_BAR_BASE_HEIGHT = verticalScale(55);
const TAB_BAR_MIN_BOTTOM_PADDING = verticalScale(15);

const HomeTabNavigator = () => {
	const { isLoggedIn, isLearnUser } = useGetUserType();
	const { isKeyboardVisible } = useKeyboard();

	const { bottom } = useSafeAreaInsets();
	const isAndroid = Platform.OS === "android";
	const isLoggedInLearnUser = isLoggedIn && isLearnUser;

	return (
		<View style={styles.safeView}>
			<Tab.Navigator
				initialRouteName={HOME_TAB_ROUTES.WebExploreCourses}
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						height:
							TAB_BAR_BASE_HEIGHT +
							Math.max(bottom, TAB_BAR_MIN_BOTTOM_PADDING),
						paddingTop: verticalScale(5),
						...(isAndroid &&
							isKeyboardVisible && {
								display: "none",
							}),
					},
				}}
				backBehavior="none"
			>
				<Tab.Screen
					name={HOME_TAB_ROUTES.WebExploreCourses}
					component={WebExploreCourses}
					options={exploreOptions}
				/>
				{isLoggedInLearnUser ? (
					<>
						<Tab.Screen
							name={HOME_TAB_ROUTES.MyPrograms}
							options={myProgramsOptions}
							component={MyPrograms}
						/>
						<Tab.Screen
							name={HOME_TAB_ROUTES.AcademicPlanner}
							options={academicPlannerOptions}
							component={AcademicPlanner}
						/>
					</>
				) : (
					<>
						<Tab.Screen
							name={HOME_TAB_ROUTES.MyPrograms}
							options={myProgramsOptions}
							component={UgMyPrograms}
						/>
						<Tab.Screen
							name={HOME_TAB_ROUTES.AcademicPlanner}
							options={academicPlannerOptions}
							component={UgAcademicPlanner}
						/>
					</>
				)}
			</Tab.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	safeView: {
		backgroundColor: colors.neutral.white,
		flex: 1,
	},
});

export default HomeTabNavigator;
