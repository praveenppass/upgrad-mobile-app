import React, { memo, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";

import { verticalScale } from "@utils/functions";

import { ENV } from "@config/env";

import { RootState } from "@redux/store/root.reducer";

import template from "../../../screens/Tabs/Courses/Assets/Vimeo/template";

interface IRNVimeoPlayer {
	videoId: string;
}

const RNVimeoPlayer = ({ videoId }: IRNVimeoPlayer) => {
	const {
		token: { access_token },
	} = useSelector((state: RootState) => state.user);

	const webViewRef = useRef<WebView | null>(null);

	const disableAutoPlay = true;

	const PLAYER_URL = useMemo(
		() =>
			`https://player.vimeo.com/video/${videoId}?title=0&byline=0&autoplay=${disableAutoPlay ? 0 : 1}`,
		[videoId, disableAutoPlay],
	);

	const headers = useMemo(
		() => ({
			Authorization: `Bearer ${access_token}`,
			referer: "https://lxp.upgrad.com/",
		}),
		[access_token],
	);

	const webViewSource = useMemo(
		() => ({
			headers,
			body: "",
			method: "GET",
			uri: PLAYER_URL,
		}),
		[headers, PLAYER_URL],
	);

	const injectedJavaScript = useMemo(
		() => template(PLAYER_URL, false),
		[PLAYER_URL],
	);

	return (
		<View style={styles.videoContainer}>
			<WebView
				ref={webViewRef}
				source={webViewSource}
				bounces={false}
				javaScriptEnabled
				scrollEnabled={false}
				allowsFullscreenVideo
				originWhitelist={["*"]}
				mixedContentMode="always"
				automaticallyAdjustContentInsets
				injectedJavaScript={injectedJavaScript}
				mediaPlaybackRequiresUserAction={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	videoContainer: {
		height: verticalScale(200),
		overflow: "hidden",
	},
});

export default memo(RNVimeoPlayer);
