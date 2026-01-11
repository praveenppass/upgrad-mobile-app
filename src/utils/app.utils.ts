import { Linking, Platform } from "react-native";

import { ENV } from "@config/env";

const studentAppDownloadUrl = Platform.select({
	android: ENV.studentAppPlayStoreUrl,
	ios: ENV.studentAppAppStoreUrl,
});

const legacyAppDownloadUrl = Platform.select({
	android: ENV.legacyStudentAppPlayStoreUrl,
	ios: ENV.legacyStudentAppAppStoreUrl,
});

export const handleDownloadStudentApp = () => {
	if (studentAppDownloadUrl) Linking.openURL(studentAppDownloadUrl);
};

export const handleDownloadLegacyApp = () => {
	if (legacyAppDownloadUrl) Linking.openURL(legacyAppDownloadUrl);
};
