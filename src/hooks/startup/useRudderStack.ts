import crashlytics from "@react-native-firebase/crashlytics";
import rudderClient from "@rudderstack/rudder-sdk-react-native";
import { useEffect } from "react";
import { Platform } from "react-native";

import { ENV } from "@config/env";

const rudderStackKey = Platform.select({
	android: ENV.rudderStackAndroidKey,
	ios: ENV.rudderStackIosKey,
});

const rudderStackConfig = {
	trackAppLifecycleEvents: true,
	dataPlaneUrl: ENV.rudderStackDataPlanKey,
};

const rudderInitialize = async () => {
	if (!rudderStackKey) return;

	await rudderClient.setup(rudderStackKey, rudderStackConfig);
};

const useRudderStack = () => {
	useEffect(() => {
		try {
			rudderInitialize();
		} catch (error) {
			crashlytics().recordError(error as Error);
		}
	}, []);
};

export default useRudderStack;
