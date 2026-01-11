import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

const requestAndroidDownloadPermission = async () => {
	const openSettings = () => {
		if (Platform.OS === "android") {
			Linking.openSettings();
		} else {
			Alert.alert(
				"Permission Required",
				"Please enable the permission in Settings.",
				[
					{
						text: "Open Settings",
						onPress: () => Linking.openSettings(),
					},
				],
				{ cancelable: false },
			);
		}
	};

	if (Platform.OS === "android" && Platform.Version < 33) {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
		);

		if (granted !== PermissionsAndroid.RESULTS.GRANTED) openSettings();
	}
};

export default requestAndroidDownloadPermission;
