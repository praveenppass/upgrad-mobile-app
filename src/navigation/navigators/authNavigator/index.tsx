import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import WebLogin from "@screens/Auth/WebLoginScreen";
import WelcomeScreen from "@screens/Auth/WelcomeScreen";

import { type IAuthStackNativeParamList } from "@navigation/navigators/authNavigator/authNavigator.interface";
import { AUTH_ROUTES } from "@navigation/routes";

const AuthStack = createNativeStackNavigator<IAuthStackNativeParamList>();

const AUTH_STACK_SCREEN_OPTIONS = {
	headerShown: false,
	gestureEnabled: false,
	animation: "slide_from_right" as const,
};

const AuthNavigator = () => (
	<AuthStack.Navigator
		initialRouteName={AUTH_ROUTES.WelcomeScreen}
		screenOptions={AUTH_STACK_SCREEN_OPTIONS}
	>
		<AuthStack.Screen
			name={AUTH_ROUTES.WelcomeScreen}
			component={WelcomeScreen}
		/>

		<AuthStack.Screen name={AUTH_ROUTES.WebLogin} component={WebLogin} />
	</AuthStack.Navigator>
);

export default AuthNavigator;
