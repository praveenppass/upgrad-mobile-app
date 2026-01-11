import { useEffect } from "react";
import { Linking } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";

import { ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

const useAppDeepLinks = () => {
	const navigation = useAppNavigation();

	useEffect(() => {
		Linking.getInitialURL().then((url) => {
			if (url) {
				navigation.reset({
					index: 0,
					routes: [{ name: ROOT_ROUTES.PostEnrollScreen }],
				});
				InAppBrowser.close();
			}
		});

		// Handles when app is already open
		const sub = Linking.addEventListener("url", ({ url }) => {
			if (url) {
				navigation.reset({
					index: 0,
					routes: [{ name: ROOT_ROUTES.PostEnrollScreen }],
				});
				InAppBrowser.close();
			}
		});

		return () => sub.remove();
	}, []);
};

export default useAppDeepLinks;
