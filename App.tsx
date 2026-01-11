import { ApolloProvider } from "@apollo/client";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";

import { ToastProvider } from "@components/Reusable/Toast";

import useSessionManager from "@hooks/startup/sessionManager/useSessionManager";
import useAppDeepLinks from "@hooks/startup/useAppDeepLinks";
import useAppUpdateHelper from "@hooks/startup/useAppUpdateHelper";
import useCodePushManager, {
	WithCodePush,
} from "@hooks/startup/useCodePushManager";
import useRudderStack from "@hooks/startup/useRudderStack";
import { useSyncUserTimezone } from "@hooks/startup/useSyncUserTimezone";
import useUpdateSafeAreaInsets from "@hooks/startup/useUpdateSafeAreaInsets";
import useInstana from "@hooks/useInstana";

import NavigationContainer from "@navigation/NavigationContainer";

import { initializeFlipper } from "@utils/flipper.util";
import initializeClarity from "@utils/useClarity";

import { client } from "@config/apollo";

import { store } from "@redux/store/store";

registerTranslation("en", enGB);
initializeFlipper();
initializeClarity();

// CodePush kill-switch - set to false to disable CodePush entirely
const CODE_PUSH_ENABLED = true;

// Core app component without CodePush logic
interface IAppCore {
	isAppReady: boolean;
}

const AppCore = ({ isAppReady }: IAppCore) => {
	return (
		<StoreProvider store={store}>
			<SafeAreaProvider>
				<GestureHandlerRootView style={styles.container}>
					<PaperProvider>
						<ApolloProvider client={client}>
							<PortalProvider>
								<ToastProvider>
									<BottomSheetModalProvider>
										<NavigationContainer>
											<AppProvider
												isAppReady={isAppReady}
											/>
										</NavigationContainer>
									</BottomSheetModalProvider>
								</ToastProvider>
							</PortalProvider>
						</ApolloProvider>
					</PaperProvider>
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</StoreProvider>
	);
};

const App = () => {
	const { isAppReady } = useCodePushManager({ enabled: CODE_PUSH_ENABLED });

	return <AppCore isAppReady={isAppReady} />;
};

interface IAppProvider {
	isAppReady: boolean;
}

const AppProvider = ({ isAppReady }: IAppProvider) => {
	useAppUpdateHelper({ isAppReady });
	useSyncUserTimezone();
	useUpdateSafeAreaInsets();
	useRudderStack();
	useAppDeepLinks();
	useInstana();
	useSessionManager();

	return <></>;
};

export default WithCodePush({ enabled: CODE_PUSH_ENABLED, Component: App });

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
