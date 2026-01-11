import { initializeMMKVFlipper } from "react-native-mmkv-flipper-plugin";
import reduxFlipper from "redux-flipper";

import { storage } from "@config/mmkvStorage";

export const initializeFlipperAndroid = () => {
	import("react-native-flipper");
	initializeMMKVFlipper({ default: storage });
};

export const getReduxFlipperMiddlewareAndroid = () => {
	return reduxFlipper();
};
