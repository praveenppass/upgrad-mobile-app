import codePush from "@code-push-next/react-native-code-push";
import { useEffect, useRef, useState } from "react";
import { Alert, AppState, AppStateStatus, Platform } from "react-native";

import { ENV } from "@config/env";

import { strings } from "@assets/strings";

// Global declaration for testing
declare global {
	let checkForCodePushUpdates: () => void;
}

interface IUseCodePushManagerProps {
	onAppReady?: () => void;
	enabled?: boolean; // kills-switch
}

interface ICodePushManagerReturn {
	isAppReady: boolean;
}

// CodePush configuration options
const codePushOptions = {
	checkFrequency: codePush.CheckFrequency.ON_APP_START,
	installMode: codePush.InstallMode.ON_NEXT_RESTART,
	mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
	minimumBackgroundDuration: 60 * 30,
};

const useCodePushManager = ({
	onAppReady,
	enabled = true,
}: IUseCodePushManagerProps): ICodePushManagerReturn => {
	const [isAppReady, setIsAppReady] = useState(false);
	const appState = useRef(AppState.currentState);

	// Function to handle app readiness
	const handleAppReady = () => {
		setIsAppReady(true);
		onAppReady?.();
	};

	// CodePush sync logic (previously in useCodePushStandalone)
	useEffect(() => {
		if (!enabled || __DEV__) {
			handleAppReady();
			return;
		}

		// ✅ Notify CodePush that app has started successfully (only in stage)
		if (ENV.environment === "stage") {
			codePush.notifyAppReady();
		}

		const checkForUpdates = () => {
			codePush.sync(
				{
					updateDialog: true,
					...(Platform.OS === "ios" && {
						deploymentKey: ENV.CODEPUSH_KEY_IOS,
					}),
					installMode: codePush.InstallMode.ON_NEXT_RESTART,
					mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
					minimumBackgroundDuration: 60 * 30,
				},
				(status) => {
					switch (status) {
						case codePush.SyncStatus.UP_TO_DATE:
							break;
						case codePush.SyncStatus.UPDATE_INSTALLED:
							if (ENV.environment === "stage") {
								Alert.alert(
									strings.ITS_TIME_TO_UPDATE,
									strings.GET_THE_LATEST,
									[
										{
											text: strings.RESTART_NOW,
											onPress: () =>
												codePush.restartApp(),
										},
										{
											text: strings.LATER,
											style: "cancel",
										},
									],
									{ cancelable: false },
								);
							}
							break;
						case codePush.SyncStatus.CHECKING_FOR_UPDATE:
							break;

						case codePush.SyncStatus.DOWNLOADING_PACKAGE:
							break;

						case codePush.SyncStatus.INSTALLING_UPDATE:
							break;

						case codePush.SyncStatus.UNKNOWN_ERROR:
							break;

						default:
							console.log("🔄 CodePush status:", status);
					}
				},
			);
		};

		// Make checkForUpdates available globally for testing
		checkForCodePushUpdates = checkForUpdates;

		handleAppReady();

		// Initial check for updates
		checkForUpdates();

		// 🔄 Recheck on resume
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === "active"
			) {
				checkForUpdates();
			}
			appState.current = nextAppState;
		};

		const subscription = AppState.addEventListener(
			"change",
			handleAppStateChange,
		);

		return () => subscription.remove();
	}, [enabled, onAppReady]);

	return { isAppReady };
};

interface IWithCodePush {
	Component: () => React.ReactNode;
	enabled?: boolean;
}

export const WithCodePush = ({ Component, enabled }: IWithCodePush) => {
	if (__DEV__ || !enabled) return Component;

	return codePush(codePushOptions)(Component);
};

export default useCodePushManager;
