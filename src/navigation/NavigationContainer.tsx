import {
	createNavigationContainerRef,
	NavigationContainer as RNNavigationContainer,
} from "@react-navigation/native";
import React from "react";

import RootNavigator from "@navigation/navigators/rootNavigator";
import { IRootStackNativeParamList } from "@navigation/navigators/rootNavigator/rootNavigator.interface";
import { ROOT_ROUTES } from "@navigation/routes";

import { ENV } from "@config/env";

export const appNavigationRef =
	createNavigationContainerRef<IRootStackNativeParamList>();

const linking = {
	prefixes: [ENV.PREFIXES_URL] as string[],
	config: {
		screens: {
			[ROOT_ROUTES.SplashScreen]: ROOT_ROUTES.SplashScreen,
		},
	},
};

interface NavigationContainerProps {
	children?: React.ReactNode;
}

const NavigationContainer = ({ children }: NavigationContainerProps) => (
	<RNNavigationContainer ref={appNavigationRef} linking={linking}>
		<RootNavigator />
		{children}
	</RNNavigationContainer>
);

export default NavigationContainer;
