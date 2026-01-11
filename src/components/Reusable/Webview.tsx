import React, { useCallback, useMemo, useState } from "react";
import { Linking, Platform, StyleSheet, View } from "react-native";
import RNWebView, { WebView, WebViewMessageEvent } from "react-native-webview";
import { useSelector } from "react-redux";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { ENV } from "@config/env";

import { RootState } from "@redux/store/root.reducer";

import { IEnv } from "@interface/app.interface";

import {
	isAppsUri,
	isGoogleDocsUri,
	isSocialUri,
} from "@constants/regex.constants";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

const { neutral } = colors;

interface ILoadingComponent {
	LoaderComponent?: React.FC;
}

interface IWebviewBase extends ILoadingComponent {
	onWebviewLoad?: () => void;
	onMessage?: (event: WebViewMessageEvent) => void;
	webViewRef?: React.RefObject<WebView | null>;
	customJs?: string;
}
type IWebview =
	| (IWebviewBase & { url: string; htmlContent?: undefined })
	| (IWebviewBase & { htmlContent: string; url?: undefined });

const isDebugBuild = ENV.environment === IEnv.stage || !!__DEV__;

const LoadingComponent = ({ LoaderComponent }: ILoadingComponent) => {
	return (
		<View style={styles.container} pointerEvents="box-none">
			{LoaderComponent ? (
				<LoaderComponent />
			) : (
				<View style={styles.innerContainer}>
					<Loading />
				</View>
			)}
		</View>
	);
};

const Webview = ({
	url,
	onWebviewLoad,
	onMessage,
	webViewRef,
	LoaderComponent,
	customJs = "",
	htmlContent,
}: IWebview) => {
	const [isError, setIsError] = useState(false);

	const { access_token, refresh_token } = useSelector(
		(state: RootState) => state.user?.token,
	);

	const injectedJs = `
		if (!window.messageToSend) {
			const messageToSend = {
				accessToken: "${access_token}",
				refreshToken: "${refresh_token}", 
				isMobile: true
			};
			localStorage.setItem("ltiToken", JSON.stringify(messageToSend));

      }
      
      // Inject viewport meta
      (function() {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        if (!document.head.querySelector('meta[name="viewport"]')) {
          document.head.appendChild(meta);
        }
      })();
      
      // Ensure scroll is enabled
      document.body.style.cssText = document.documentElement.style.cssText = 'overflow-y:scroll;touch-action:auto;';
      
      ${customJs}
	`;

	const source = useMemo(() => {
		if (url) return { uri: url };
		if (htmlContent) return { html: htmlContent };
	}, [url, htmlContent]);

	const handleLoadingComponent = useCallback(
		() => <LoadingComponent LoaderComponent={LoaderComponent} />,
		[LoaderComponent],
	);

	return (
		<View style={styles.parentContainer}>
			<RNWebView
				ref={webViewRef}
				originWhitelist={["*"]}
				decelerationRate={Platform.OS === "ios" ? "normal" : undefined}
				source={source}
				mixedContentMode="always"
				incognito
				cacheEnabled={false}
				cacheMode={"LOAD_NO_CACHE"}
				onError={() => setIsError(true)}
				onHttpError={(e) =>
					e.nativeEvent.statusCode > 500 && setIsError(true)
				}
				onShouldStartLoadWithRequest={({
					url: reqUrl,
					navigationType,
				}) => {
					if (
						reqUrl.match(isAppsUri) ||
						reqUrl.match(isGoogleDocsUri) ||
						navigationType === "click" ||
						reqUrl.match(isSocialUri)
					) {
						Linking.openURL(reqUrl);
						return false;
					} else return true;
				}}
				onLoadEnd={() => {
					onWebviewLoad?.();
				}}
				allowsInlineMediaPlayback
				javaScriptCanOpenWindowsAutomatically
				injectedJavaScript={injectedJs}
				onMessage={onMessage}
				startInLoadingState
				javaScriptEnabled
				renderLoading={handleLoadingComponent}
				webviewDebuggingEnabled={isDebugBuild}
			/>

			{isError ? (
				<View
					style={[styles.container, styles.innerContainer]}
					pointerEvents="box-none"
				>
					<RNText
						style={styles.description}
						title={strings.ERROR_LOADING_PAGE}
					/>
				</View>
			) : (
				<></>
			)}
		</View>
	);
};

export default Webview;

const styles = StyleSheet.create({
	container: {
		backgroundColor: neutral.white,
		bottom: 0,
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
	},
	description: {
		marginBottom: verticalScale(24),
		textAlign: "center",
	},
	innerContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	parentContainer: { flex: 1 },
	webContainer: { flexGrow: 1 },
});
