import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AppMaintenanceNoticeScreen from "@screens/AppMaintenanceNoticeScreen";
import AppUpdateScreen from "@screens/AppUpdateScreen";
import PostEnrollScreen from "@screens/Auth/PostEnroll";
import ImageViewScreen from "@screens/ImageView/ImageViewScreen";
import LegacyScreen from "@screens/LegacyScreen";
import NetworkErrorScreen from "@screens/NetworkErrorScreen";
import SplashScreen from "@screens/SplashScreen";
import WebPageViewScreen from "@screens/WebPageViewScreen";
import WebViewModal from "@screens/WebViewModal";

import AuthNavigator from "@navigation/navigators/authNavigator";
import HomeNavigator from "@navigation/navigators/homeNavigator";
import { type IRootStackNativeParamList } from "@navigation/navigators/rootNavigator/rootNavigator.interface";
import { ROOT_ROUTES } from "@navigation/routes";

const RootStack = createNativeStackNavigator<IRootStackNativeParamList>();

const ROOT_STACK_SCREEN_OPTIONS = {
	headerShown: false,
	animation: "slide_from_right" as const,
};

const RootNavigator = () => (
	<RootStack.Navigator
		initialRouteName={ROOT_ROUTES.SplashScreen}
		screenOptions={ROOT_STACK_SCREEN_OPTIONS}
	>
		<RootStack.Screen
			name={ROOT_ROUTES.AppUpdateScreen}
			component={AppUpdateScreen}
		/>

		<RootStack.Screen
			name={ROOT_ROUTES.AppMaintenanceNoticeScreen}
			component={AppMaintenanceNoticeScreen}
		/>

		<RootStack.Screen
			name={ROOT_ROUTES.SplashScreen}
			component={SplashScreen}
		/>

		{/* TODO: Add animation to the screens */}
		<RootStack.Screen
			name={ROOT_ROUTES.AuthStack}
			component={AuthNavigator}
		/>
		<RootStack.Screen
			name={ROOT_ROUTES.HomeStack}
			component={HomeNavigator}
		/>
		<RootStack.Screen
			name={ROOT_ROUTES.PostEnrollScreen}
			component={PostEnrollScreen}
		/>
		<RootStack.Screen
			name={ROOT_ROUTES.LegacyScreen}
			component={LegacyScreen}
		/>
		<RootStack.Screen
			name={ROOT_ROUTES.WebViewModal}
			component={WebViewModal}
		/>
		<RootStack.Screen
			name={ROOT_ROUTES.ImageViewScreen}
			component={ImageViewScreen}
		/>
		<RootStack.Screen
			name={ROOT_ROUTES.WebPageViewScreen}
			component={WebPageViewScreen}
		/>
		<RootStack.Screen
			name={ROOT_ROUTES.NetworkErrorScreen}
			component={NetworkErrorScreen}
		/>
	</RootStack.Navigator>
);

export default RootNavigator;
