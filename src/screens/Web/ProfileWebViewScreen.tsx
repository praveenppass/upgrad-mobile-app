import React, { memo, RefObject, useCallback, useMemo, useRef } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";

import Loading from "@components/Reusable/Loading";
import Webview from "@components/Reusable/Webview";

import WithWebHeader from "@hoc/withWebHeader";

import useGetUserType from "@hooks/useGetUserType";

import {
	getProfileCustomJs,
	getProfileUrl,
	handleWebEvents,
} from "@utils/web.utils";

import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

import { ProfileSectionType, SECTION_URLS } from "@constants/profile.constants";

interface IProfileWebViewScreen {
	webViewRef: RefObject<WebView | null>;
	section: ProfileSectionType;
}

const BodyComponent = ({ webViewRef, section }: IProfileWebViewScreen) => {
	const profileUrl = useMemo(() => {
		try {
			return getProfileUrl(section);
		} catch {
			return `${SECTION_URLS.PROFILE_PLATFORM}?section=${section}`;
		}
	}, [section]);

	const onMessage = useCallback(
		(event: WebViewMessageEvent) => {
			const data = JSON.parse(event.nativeEvent.data);
			handleWebEvents({ webViewRef, eventData: data });
		},
		[webViewRef],
	);

	const customJs = useMemo(() => getProfileCustomJs(section), [section]);

	if (!profileUrl) return <Loading />;
	return (
		<Webview
			webViewRef={webViewRef}
			url={profileUrl}
			onMessage={onMessage}
			customJs={customJs}
		/>
	);
};
const MemoizedBodyComponent = memo(BodyComponent);

const ProfileWebViewScreen = ({
	route,
}: {
	route: RootHomeStackRouteProps<"ProfileWebView">;
}) => {
	const { section, title } = route.params;
	const webViewRef = useRef<WebView | null>(null);
	const { isLoggedIn } = useGetUserType();

	const ProfileBodyComponent = useMemo(() => {
		const memoizedBodyComponent = () => (
			<MemoizedBodyComponent webViewRef={webViewRef} section={section} />
		);

		return memoizedBodyComponent;
	}, [section, webViewRef]);

	return (
		<WithWebHeader
			BodyComponent={ProfileBodyComponent}
			isGuest={!isLoggedIn}
			showCourses={false}
			removeBottomInset
			title={title}
			showBack
		/>
	);
};

export default memo(ProfileWebViewScreen);
