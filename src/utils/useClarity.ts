import * as Clarity from "@microsoft/react-native-clarity";

import { ENV } from "@config/env";

export const initializeClarity = () => {
	if (__DEV__) return;

	Clarity.initialize(ENV.clarityProjectId as string, {
		logLevel: Clarity.LogLevel.Verbose,
	});
};

export default initializeClarity;
