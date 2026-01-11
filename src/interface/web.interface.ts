import { WebView } from "react-native-webview";

import { IOmsLoginQueryTokens } from "@graphql/mutation/auth/omsLogin";

import { WEB_EVENTS } from "@constants/web.constants";

export interface IWebParam {
	key: string;
	value: string;
}

export interface ISendEventToWeb {
	webViewRef: React.RefObject<WebView | null>;
	eventType: string;
	data?: Record<string, unknown>;
}

export interface WebEventData {
	eventName: string;
	path?: string;
	title?: string;
	url?: string;
	message?: string;
	authToken?: string;
}

export interface IHandleWebEvents {
	webViewRef: React.RefObject<WebView | null>;
	eventData: WebEventData;
	enableAuthNavigation?: boolean;
}

export interface IAddWebParamsToUrl {
	url: string;
	params?: IWebParam[];
}

export type WebEvent = (typeof WEB_EVENTS)[keyof typeof WEB_EVENTS];

export interface IHandleSharePage {
	message?: string;
	title?: string;
	url?: string;
}

export interface IHandleOpenPagePath {
	path?: string;
	title?: string;
}

export interface IHandleSendAuthToken {
	authToken?: string;
	enableAuthNavigation?: boolean;
	isDummyToken?: boolean;
}

export enum IUserType {
	LEARN_USER = "learn_user",
	UPGRAD_USER = "upgrad_user",
}

export interface IHandleLearnUserLogin {
	tokens: IOmsLoginQueryTokens;
	enableAuthNavigation: boolean;
}

export interface IHandleUserLogin {
	authToken: string;
	enableAuthNavigation: boolean;
}

export interface IHandleUgUserLogin {
	enableAuthNavigation: boolean;
}
