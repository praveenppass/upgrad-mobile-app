import { type RouteProp } from "@react-navigation/native";
import { type StackNavigationProp } from "@react-navigation/stack";

type RootSessionDetailsParamList = {
	SelectDateScreen?: {
		id?: string;
	};
	SelectSlotScreen: {
		date: string;
	};
	SessionSuccessScreen: {
		date: string;
		time: string;
	};
};

type RootSessionDetailsParams =
	StackNavigationProp<RootSessionDetailsParamList>;

type RootSessionDetailStackRouteProps<
	RouteName extends keyof RootSessionDetailsParamList,
> = RouteProp<RootSessionDetailsParamList, RouteName>;

export {
	type RootSessionDetailsParams,
	type RootSessionDetailsParamList,
	type RootSessionDetailStackRouteProps,
};
