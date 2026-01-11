import type {
	NavigatorScreenParams,
	RouteProp,
} from "@react-navigation/native";
import type {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { ErrorType } from "@screens/NetworkErrorScreen";

import { IAuthStackNativeParamList } from "@navigation/navigators/authNavigator/authNavigator.interface";
import { IHomeStackNativeParamList } from "@navigation/navigators/homeNavigator/homeNavigator.interface";
import { ROOT_ROUTES } from "@navigation/routes";

import { IAppUpdateState } from "@interface/appUpdate.interface";

const {
	AuthStack,
	HomeStack,
	SplashScreen,
	AppUpdateScreen,
	AppMaintenanceNoticeScreen,
	PostEnrollScreen,
	LegacyScreen,
	WebViewModal,
	ImageViewScreen,
	WebPageViewScreen,
	NetworkErrorScreen,
} = ROOT_ROUTES;

export type IRootStackNativeParamList = {
	[AuthStack]: NavigatorScreenParams<IAuthStackNativeParamList>;
	[HomeStack]: NavigatorScreenParams<IHomeStackNativeParamList>;
	[SplashScreen]: undefined;
	[AppUpdateScreen]: { appUpdateState: IAppUpdateState };
	[AppMaintenanceNoticeScreen]: undefined;
	[PostEnrollScreen]: undefined;
	[LegacyScreen]: undefined;
	[WebViewModal]: {
		name: string | null;
		url: string | null;
	};
	[ImageViewScreen]: {
		file: {
			fileUrl: string;
			contentType?: string;
		};
		headerText?: string;
	};
	[WebPageViewScreen]: {
		path: string;
		name: string | null;
	};
	[NetworkErrorScreen]: {
		errorType: ErrorType;
		errorDetails?: unknown;
	};
};

export type IRootStackNativeNavigationProp =
	NativeStackNavigationProp<IRootStackNativeParamList>;

export type IRootStackNativeRoute<
	RouteName extends keyof IRootStackNativeParamList,
> = RouteProp<IRootStackNativeParamList, RouteName>;

export type IRootStackNativeScreen<T extends keyof IRootStackNativeParamList> =
	NativeStackScreenProps<IRootStackNativeParamList, T>;
