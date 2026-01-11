import React, { memo, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useSelector } from "react-redux";

import Loading from "@components/Reusable/Loading";
import Webview from "@components/Reusable/Webview";

import WithWebHeader from "@hoc/withWebHeader";

import { addWebParamsToUrl, handleWebEvents } from "@utils/web.utils";

import { ENV } from "@config/env";

import { RootState } from "@redux/store/root.reducer";

import { colors } from "@assets/colors";

const { neutral } = colors;

const CUSTOM_JS = `
  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overscrollBehavior = 'none';
  // document.body.style.padding = '0 1rem';
`;

const BodyComponent = () => {
	const webViewRef = useRef<WebView | null>(null);

	const { loading } = useSelector((state: RootState) => state.auth);

	const url = addWebParamsToUrl({
		url: `${ENV.ugAuthUrl}`,
	});

	const onMessage = useCallback(
		(event: WebViewMessageEvent) =>
			handleWebEvents({
				webViewRef,
				eventData: JSON.parse(event.nativeEvent.data),
				enableAuthNavigation: true,
			}),
		[],
	);

	if (loading)
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);

	return (
		<View style={styles.container}>
			<Webview
				webViewRef={webViewRef}
				url={url}
				onMessage={onMessage}
				customJs={CUSTOM_JS}
			/>
		</View>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const WebLoginScreen = () => (
	<WithWebHeader
		BodyComponent={MemoizedBodyComponent}
		isGuest
		showBack
		centerLogo
	/>
);

export default memo(WebLoginScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loadingContainer: {
		alignItems: "center",
		backgroundColor: neutral.white,
		flex: 1,
		justifyContent: "center",
	},
});
