import type { RouteProp } from "@react-navigation/native";
import type {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { AUTH_ROUTES } from "@navigation/routes";

const { WelcomeScreen, WebLogin } = AUTH_ROUTES;

export type IAuthStackNativeParamList = {
	[WelcomeScreen]: undefined;
	[WebLogin]: undefined;
};

export type IAuthStackNativeNavigationProp =
	NativeStackNavigationProp<IAuthStackNativeParamList>;

export type IAuthStackNativeRoute<
	RouteName extends keyof IAuthStackNativeParamList,
> = RouteProp<IAuthStackNativeParamList, RouteName>;

export type IAuthStackNativeScreen<T extends keyof IAuthStackNativeParamList> =
	NativeStackScreenProps<IAuthStackNativeParamList, T>;
