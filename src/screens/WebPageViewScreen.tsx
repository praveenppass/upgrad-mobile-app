import { useIsFocused } from "@react-navigation/native";
import React, {
	memo,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";

import Webview from "@components/Reusable/Webview";

import WithWebHeader from "@hoc/withWebHeader";

import useGetUserType from "@hooks/useGetUserType";

import { ROOT_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

import { getWebUrl, handleWebEvents, sendEventToWeb } from "@utils/web.utils";

import { WEB_EVENTS } from "@constants/web.constants";

import { strings } from "@assets/strings";

interface IWebPageViewScreen {
	path: string;
	name: string;
	webViewRef: RefObject<WebView | null>;
}

const BodyComponent = ({ path, webViewRef }: IWebPageViewScreen) => {
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
			url={getWebUrl(path)}
			onMessage={onMessage}
			webViewRef={webViewRef}
		/>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const WebPageViewScreen = () => {
	const route = useAppRoute<typeof ROOT_ROUTES.WebPageViewScreen>();
	const webViewRef = useRef<WebView | null>(null);

	const toggleMegaMenu = () =>
		sendEventToWeb({
			webViewRef,
			eventType: WEB_EVENTS.TOGGLE_MEGA_MENU,
		});
	const { isLoggedIn } = useGetUserType();

	const [params, setParams] = useState(route.params);

	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) setParams(route.params);
	}, [isFocused]);

	const title = params.name || strings.UPGRAD;
	const ProgramBodyComponent = useMemo(() => {
		const memoizedBodyComponent = () => (
			<MemoizedBodyComponent
				path={params.path}
				name={title}
				webViewRef={webViewRef}
			/>
		);

		return memoizedBodyComponent;
	}, [params.path, title, webViewRef]);
	return (
		<WithWebHeader
			BodyComponent={ProgramBodyComponent}
			isGuest={!isLoggedIn}
			title={title}
			showBack
			showCourses={isLoggedIn}
			toggleMegaMenu={toggleMegaMenu}
		/>
	);
};

export default memo(WebPageViewScreen);
