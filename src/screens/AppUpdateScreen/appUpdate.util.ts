import { Platform } from "react-native";
import { Linking } from "react-native";

import { Toast, ToastType } from "@components/Reusable/Toast";

import { ANDROID_PLAY_STORE_LINK, IOS_APP_STORE_LINK } from "@utils/constants";

import { storage } from "@config/mmkvStorage";

import { appSlice } from "@redux/slices/app.slice";
import { store } from "@redux/store/store";

import StorageKeys from "@constants/storage.constants";

import { strings } from "@assets/strings";

const startApp = () => store.dispatch(appSlice.actions.appStart());

export const handleUpdateNow = async () => {
	try {
		const storeLink = Platform.select({
			android: ANDROID_PLAY_STORE_LINK,
			ios: IOS_APP_STORE_LINK,
		});

		if (!storeLink) return;

		await Linking.openURL(storeLink);
	} catch (err) {
		const storeName = Platform.select({
			android: strings.PLAY_STORE,
			ios: strings.APP_STORE,
		});

		Toast.showToast({
			message: strings.FAILED_TO_OPEN_STORE_URL(storeName ?? ""),
			type: ToastType.ERROR,
		});
	}
};

export const handleRemindLater = () => {
	storage.set(StorageKeys.REMIND_LATER_TIMESTAMP, Date.now());
	store.dispatch(appSlice.actions.setUpdateActive(false));
	startApp();
};
