import {
	AUTH_ROUTES,
	HOME_ROUTES,
	HOME_TAB_ROUTES,
	ROOT_ROUTES,
} from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { storage } from "@config/mmkvStorage";

import StorageKeys from "@constants/storage.constants";

const useWelcomeScreenController = () => {
	const navigation = useAppNavigation();

	const handleSkipLogin = () => {
		storage.set(StorageKeys.IS_GUEST, "true");

		navigation.replace(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.MainTabs,
			params: {
				screen: HOME_TAB_ROUTES.WebExploreCourses,
			},
		});
	};

	const handleLogin = () =>
		navigation.push(ROOT_ROUTES.AuthStack, {
			screen: AUTH_ROUTES.WebLogin,
		});

	return {
		handleSkipLogin,
		handleLogin,
	};
};

export default useWelcomeScreenController;
