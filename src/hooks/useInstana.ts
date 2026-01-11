import Instana from "@instana/react-native-agent";
import { useEffect } from "react";
import { Platform } from "react-native";

import { ENV } from "@config/env";

const INSTANA_REPORTING_URL = "https://eum-green-saas.instana.io/mobile";

const instanaKey = Platform.select({
	ios: ENV.instanaKeyIos,
	android: ENV.instanaKeyAndroid,
});

const useInstana = () => {
	useEffect(() => {
		Instana.setup(instanaKey, INSTANA_REPORTING_URL, {});
		Instana.setIgnoreURLsByRegex(["http://localhost:8081.*"]);
	}, []);
};

export default useInstana;
