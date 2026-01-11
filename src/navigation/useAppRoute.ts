import { useRoute } from "@react-navigation/native";

import { IAuthStackNativeParamList } from "@navigation/navigators/authNavigator/authNavigator.interface";
import { IHomeStackNativeParamList } from "@navigation/navigators/homeNavigator/homeNavigator.interface";
import { IHomeTabNavigatorParamList } from "@navigation/navigators/homeTabNavigator/homeTabNavigator.interface";
import {
	type IRootStackNativeParamList,
	type IRootStackNativeRoute,
} from "@navigation/navigators/rootNavigator/rootNavigator.interface";
import {
	AUTH_ROUTES,
	HOME_ROUTES,
	HOME_TAB_ROUTES,
	ROOT_ROUTES,
} from "@navigation/routes";

// Unified route constants - combines all route constants from different navigators
const APP_ROUTES = {
	...ROOT_ROUTES,
	...AUTH_ROUTES,
	...HOME_ROUTES,
	...HOME_TAB_ROUTES,
} as const;

// Create a unified param list that combines all navigation param lists
type AllRouteParamLists = IRootStackNativeParamList &
	IAuthStackNativeParamList &
	IHomeStackNativeParamList &
	IHomeTabNavigatorParamList;

// Create the route prop type for any route
type AppRouteProps<RouteName extends keyof AllRouteParamLists> = {
	key: string;
	name: RouteName;
	params: AllRouteParamLists[RouteName];
	path?: string;
};

// Main hook - can be used with route constants instead of string literals
export const useAppRoute = <T extends keyof typeof APP_ROUTES>() => {
	const route = useRoute<AppRouteProps<T>>();
	return route;
};

// Legacy support for root-level routes (maintains backwards compatibility)
export const useRootRoute = <T extends keyof IRootStackNativeParamList>() =>
	useRoute<IRootStackNativeRoute<T>>();

export default useAppRoute;
