import type {
	BottomTabNavigationProp,
	BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import type { RouteProp } from "@react-navigation/native";

import { HOME_TAB_ROUTES } from "@navigation/routes";

const { MyPrograms, AcademicPlanner, WebExploreCourses } = HOME_TAB_ROUTES;

export type IHomeTabNavigatorParamList = {
	[MyPrograms]: { title: string } | undefined;
	[AcademicPlanner]: { title: string } | undefined;
	[WebExploreCourses]: { webLogout?: boolean } | undefined;
};

export type IHomeTabNavigationProp =
	BottomTabNavigationProp<IHomeTabNavigatorParamList>;

export type IHomeTabRoute<RouteName extends keyof IHomeTabNavigatorParamList> =
	RouteProp<IHomeTabNavigatorParamList, RouteName>;

export type IHomeTabScreen<T extends keyof IHomeTabNavigatorParamList> =
	BottomTabScreenProps<IHomeTabNavigatorParamList, T>;
