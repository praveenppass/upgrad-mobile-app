import { Platform } from "react-native";

import {
	getReduxFlipperMiddlewareAndroid,
	initializeFlipperAndroid,
} from "@utils/flipper.android.util";

const isPlatformiOS = Platform.OS === "ios";

export const initializeFlipper = () => {
	if (!__DEV__ || isPlatformiOS) return;

	initializeFlipperAndroid();
};

export const getReduxFlipperMiddleware = () => {
	if (!__DEV__ || isPlatformiOS) return null;

	return getReduxFlipperMiddlewareAndroid();
};
