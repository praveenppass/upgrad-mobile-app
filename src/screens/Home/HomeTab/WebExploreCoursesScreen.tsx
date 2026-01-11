import { useRoute } from "@react-navigation/native";
import React, {
	memo,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";

import Webview from "@components/Reusable/Webview";
import WebExploreSkeleton from "@components/web/ExploreSkeleton";

import WithWebHeader from "@hoc/withWebHeader";

import useGetUserType from "@hooks/useGetUserType";

import { getWebUrl, handleWebEvents, sendEventToWeb } from "@utils/web.utils";

import { WEB_EVENTS } from "@constants/web.constants";

interface IWebExploreCourses {
	webViewRef: RefObject<WebView | null>;
}

const BodyComponent = ({ webViewRef }: IWebExploreCourses) => {
	const onMessage = useCallback(
		(event: WebViewMessageEvent) =>
			handleWebEvents({
				webViewRef,
				eventData: JSON.parse(event.nativeEvent.data),
			}),
		[webViewRef],
	);

	return (
		<Webview
			LoaderComponent={WebExploreSkeleton}
			webViewRef={webViewRef}
			url={getWebUrl()}
			onMessage={onMessage}
		/>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const WebExploreCourses = () => {
	const webViewRef = useRef<WebView | null>(null);
	const route = useRoute();

	const { isLoggedIn } = useGetUserType();

	const toggleMegaMenu = () =>
		sendEventToWeb({
			webViewRef,
			eventType: WEB_EVENTS.TOGGLE_MEGA_MENU,
		});

	useEffect(() => {
		const params = route.params as { webLogout?: boolean };
		if (params?.webLogout && webViewRef.current) {
			sendEventToWeb({
				webViewRef,
				eventType: WEB_EVENTS.WEB_VIEW_USER_LOGGED_OUT,
			});

			webViewRef.current.reload();
		}
	}, [route.params]);

	const ExploreBodyComponent = useMemo(() => {
		const memoizedBodyComponent = () => (
			<MemoizedBodyComponent webViewRef={webViewRef} />
		);

		return memoizedBodyComponent;
	}, [webViewRef]);

	return (
		<WithWebHeader
			BodyComponent={ExploreBodyComponent}
			isGuest={!isLoggedIn}
			showCourses={isLoggedIn}
			toggleMegaMenu={toggleMegaMenu}
			showRightSection
			removeBottomInset
		/>
	);
};

export default memo(WebExploreCourses);
