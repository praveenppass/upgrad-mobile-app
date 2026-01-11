import { StackActions } from "@react-navigation/native";
import { Share } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";

import { Toast, ToastType } from "@components/Reusable/Toast";

import omsLoginQuery, {
	IOmsLoginQuery,
	IOmsLoginQueryVariables,
} from "@graphql/mutation/auth/omsLogin";

import downloadDocument from "@services/downloadDocument";

import { navigator } from "@routes/rootNavigation";

import { client } from "@config/apollo";
import { ENV } from "@config/env";
import { storage } from "@config/mmkvStorage";

import { authSlice } from "@redux/slices/auth.slice";
import { requestUserPersonalDetails } from "@redux/slices/personalDetails.slice";
import { userSlice } from "@redux/slices/user.slice";
import { store } from "@redux/store/store";

import {
	IAddWebParamsToUrl,
	IHandleLearnUserLogin,
	IHandleOpenPagePath,
	IHandleSendAuthToken,
	IHandleSharePage,
	IHandleUgUserLogin,
	IHandleUserLogin,
	IHandleWebEvents,
	ISendEventToWeb,
	IUserType,
	IWebParam,
} from "@interface/web.interface";

import {
	PROFILE_SECTIONS,
	ProfileSectionType,
	SECTION_URLS,
} from "@constants/profile.constants";
import StorageKeys from "@constants/storage.constants";
import { DEVICE_WEB_PARAMS, WEB_EVENTS } from "@constants/web.constants";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

const { neutral } = colors;

/* INTERNAL UTILS */

/**
 * Returns common web parameters used across the app
 * @returns {IWebParam[]} Array of common web parameters
 */

const getDeviceWebParams = (): IWebParam[] => {
	const authToken = storage.getString(StorageKeys.OMS_AUTH_TOKEN);

	return [
		...DEVICE_WEB_PARAMS,
		...(authToken ? [{ key: "auth_token", value: authToken }] : []),
	];
};

/**
 * Adds standard web parameters to a URL
 * @param {IAddWebParamsToUrl} params - URL and optional additional parameters
 * @returns {string} URL with all parameters added
 */

export const addWebParamsToUrl = ({
	url,
	params = [],
}: IAddWebParamsToUrl): string => {
	const urlWithParams = new URL(url);

	[...getDeviceWebParams(), ...params].forEach(({ key, value }) =>
		urlWithParams.searchParams.append(key, value),
	);

	return urlWithParams.toString();
};

/**
 * Handles sharing a page with the provided message, title and URL
 * @param {IHandleSharePage} params - The share parameters
 * @param {string} params.message - The message to share
 * @param {string} params.title - The title of the share
 * @param {string} params.url - The URL to share
 */

const handleSharePage = ({ message, title, url }: IHandleSharePage) => {
	if (message) Share.share({ message, title, url });
};

/**
 * Navigates to the explore courses screen
 */

const handleOpenExploreCourses = () =>
	navigator.dispatch(
		StackActions.popTo("HomeStack", {
			screen: "MainTabs",
			params: {
				screen: "WebExploreCourses",
			},
		}),
	);

/**
 * Navigates to a specific page path
 * @param {IHandleOpenPagePath} params - The navigation parameters
 * @param {string} params.path - The path to navigate to
 * @param {string} params.title - The title of the page
 */

const handleOpenPagePath = ({ path, title }: IHandleOpenPagePath) =>
	navigator.dispatch(
		StackActions.push("WebPageViewScreen", {
			path,
			name: title,
			key: `WebPageViewScreen-${path?.replace("/", "-") || ""}`,
		}),
	);

/**
 * Opens a URL in the InAppBrowser with custom styling and configuration
 * @param {string} url - The URL to open
 */
export const handleOpenInAppBrowser = async (url: string) => {
	const isInAppBrowserAvailable = await InAppBrowser.isAvailable();

	if (!isInAppBrowserAvailable) return;

	await InAppBrowser.open(url, {
		dismissButtonStyle: "close",
		preferredControlTintColor: neutral.black,
		showTitle: true,
		hasBackButton: true,
	});
};

/**
 * Opens an external link in the device's browser
 * @param {string} [url] - The URL to open
 */
const handleOpenExternalLink = (url?: string) => {
	if (!url) return;
	const autoLoginUrl = createAutoLoginUrl(url, true);
	handleOpenInAppBrowser(autoLoginUrl);
};

/**
 * Opens an social link in the device's browser
 * @param {string} [url] - The URL to open
 */
const handleOpenSocialLink = (url?: string) => {
	if (!url) return;
	handleOpenInAppBrowser(url);
};

/**
 * Downloads a file from the provided URL
 * @param {string} [url] - The URL of the file to download
 */

const handleDownloadFile = (url?: string) => {
	if (!url) return;

	downloadDocument({
		fileUrl: url,
		successCallback: () =>
			Toast.showToast({
				message: strings.DOWNLOAD_SUCCESS,
				type: ToastType.SUCCESS,
			}),
		errorCallback: () =>
			Toast.showToast({
				message: strings.DOWNLOAD_FAILED,
				type: ToastType.ERROR,
			}),
	});
};

/**
 * Handles sending authentication token to the server and processes the response
 * @param {Object} params - The parameters object
 * @param {string} params.authToken - The authentication token to send
 * @param {boolean} params.enableAuthNavigation - Whether to enable navigation after authentication
 * @param {boolean} params.isDummyToken - Whether this is a dummy token from SEND_AUTH_DUMMY_TOKEN event
 * @returns {Promise<void>}
 */

const handleSendAuthToken = async ({
	authToken,
	enableAuthNavigation = false,
	isDummyToken = false,
}: IHandleSendAuthToken) => {
	if (!authToken) return;

	// Store auth token and set dummy token flag
	storage.set(StorageKeys.OMS_AUTH_TOKEN, authToken);
	storage.set(StorageKeys.IS_DUMMY_TOKEN, isDummyToken.toString());
	store.dispatch(userSlice.actions.setOmsAuthToken(authToken));
	store.dispatch(userSlice.actions.setIsDummyToken(isDummyToken));

	// Start loading only for regular tokens
	if (!isDummyToken) {
		store.dispatch(authSlice.actions.onStartLoading());
	}

	handleUserLogin({ authToken, enableAuthNavigation });
};

/**
 * Handles learn user login process with authentication tokens
 * @param {IHandleLearnUserLogin} params - The learn user login parameters
 * @param {IOmsLoginQueryTokens} params.tokens - The authentication tokens from OMS login
 * @param {boolean} params.enableAuthNavigation - Flag to enable/disable navigation after authentication
 * @returns {Promise<void>} Promise that resolves when learn user login handling is complete
 */
const handleLearnUserLogin = async ({
	tokens,
	enableAuthNavigation,
}: IHandleLearnUserLogin) => {
	storage.set(StorageKeys.USER_TYPE, IUserType.LEARN_USER);
	store.dispatch(userSlice.actions.setUserType(IUserType.LEARN_USER));
	store.dispatch(authSlice.actions.setIsAuthSuccess(true));
	store.dispatch(
		userSlice.actions.setToken({
			access_token: tokens.accessToken,
			refresh_token: tokens.refreshToken,
		}),
	);
	store.dispatch(
		userSlice.actions.getUser({
			isDisableNavigation: !enableAuthNavigation,
		}),
	);
	store.dispatch(requestUserPersonalDetails());
};

/**
 * Handles UG user login process
 * @param {IHandleUgUserLogin} params - The UG user login parameters
 * @param {boolean} params.enableAuthNavigation - Flag to enable/disable navigation after authentication
 * @returns {Promise<void>} Promise that resolves when UG user login handling is complete
 */

const handleUgUserLogin = ({
	enableAuthNavigation = false,
}: IHandleUgUserLogin) => {
	// Set user type and fetch UG user data
	storage.set(StorageKeys.USER_TYPE, IUserType.UPGRAD_USER);
	store.dispatch(userSlice.actions.setUserType(IUserType.UPGRAD_USER));
	store.dispatch(
		userSlice.actions.getUgUser({
			isDisableNavigation: !enableAuthNavigation,
		}),
	);
};

/**
 * Handles user login based on the provided auth token
 * @param {IHandleUserLogin} params - The login parameters containing auth token and navigation flag
 * @param {string} params.authToken - The authentication token from OMS login
 * @param {boolean} params.enableAuthNavigation - Flag to enable/disable navigation after authentication
 * @returns {Promise<void>} Promise that resolves when login handling is complete
 */

export const handleUserLogin = async ({
	authToken,
	enableAuthNavigation,
}: IHandleUserLogin) => {
	try {
		const { data } = await client.mutate<
			IOmsLoginQuery,
			IOmsLoginQueryVariables
		>({
			mutation: omsLoginQuery,
			variables: { data: { authToken } },
			fetchPolicy: "no-cache",
		});

		const tokens = data?.omsLogin;
		if (!tokens) return;

		if (
			!tokens ||
			!tokens.accessToken ||
			!tokens.refreshToken ||
			tokens.accessToken === "null" ||
			tokens.refreshToken === "null"
		)
			handleUgUserLogin({ enableAuthNavigation });
		else handleLearnUserLogin({ tokens, enableAuthNavigation });
	} catch (error) {
		// Fallback to UG user login on any error
		handleUgUserLogin({ enableAuthNavigation });
	}
};

/* EXTERNAL UTILS */

/**
 * Creates a web URL with standard parameters
 * @param {string} [path] - Optional path to append to the base URL
 * @returns {string} Complete URL with all parameters added
 */

export const getWebUrl = (path?: string): string => {
	const baseUrl = ENV.webAppUrl;

	if (!path) return addWebParamsToUrl({ url: baseUrl });

	const cleanedPath = path.startsWith("/") ? path.substring(1) : path;

	if (!cleanedPath.includes("?")) {
		return addWebParamsToUrl({ url: `${baseUrl}/${cleanedPath}` });
	}

	const [basePath, queryString] = cleanedPath.split("?");
	const params: IWebParam[] = queryString.split("&").map((param) => {
		const [key, value] = param.split("=");
		return { key, value };
	});

	const urlWithParams = addWebParamsToUrl({
		url: `${baseUrl}/${basePath}`,
		params,
	});

	return urlWithParams;
};

/**
 * Injects a message to the web view by dispatching a custom event
 * @param {ISendEventToWeb} params - Parameters for sending the message
 */

export const sendEventToWeb = ({
	webViewRef,
	eventType,
	data,
}: ISendEventToWeb): void => {
	if (!webViewRef?.current) return;

	const jsCode = `
    window.dispatchEvent(new CustomEvent('${eventType}', {
      data: ${JSON.stringify(data || {})}
    }));
    true; // required to prevent WebView from crashing
  `;

	webViewRef.current.injectJavaScript(jsCode);
};

/**
 * Handles web events coming from WebView
 * @param {IHandleWebEvents} params - WebView reference and event data
 * @returns {Promise<void>} Promise that resolves when the event is handled
 */

export const handleWebEvents = ({
	webViewRef,
	eventData,
	enableAuthNavigation,
}: IHandleWebEvents) => {
	if (!webViewRef?.current || !navigator) return;

	const { eventName, path, title, url, message, authToken } = eventData;
	switch (eventName) {
		case WEB_EVENTS.OPEN_PAGE_PATH:
			handleOpenPagePath({
				path,
				title,
			});
			break;

		case WEB_EVENTS.OPEN_EXPLORE_COURSES:
			handleOpenExploreCourses();
			break;

		case WEB_EVENTS.SHARE_PAGE:
			handleSharePage({
				message,
				title,
				url,
			});
			break;

		case WEB_EVENTS.OPEN_EXTERNAL_LINK:
			handleOpenExternalLink(url);
			break;

		case WEB_EVENTS.OPEN_EXTERNAL_SOCIAL_LINK:
			handleOpenSocialLink(url);
			break;

		case WEB_EVENTS.SEND_AUTH_TOKEN:
			handleSendAuthToken({
				authToken,
				enableAuthNavigation,
				isDummyToken: false,
			});
			break;

		case WEB_EVENTS.SEND_AUTH_DUMMY_TOKEN:
			handleSendAuthToken({
				authToken,
				enableAuthNavigation: false,
				isDummyToken: true,
			});
			break;

		case WEB_EVENTS.DOWNLOAD_FILE:
			handleDownloadFile(url);
			break;
	}
};

/**
 * Creates an auto-login URL with the provided redirect URL and oneTimeToken
 * @param {string} redirectUrl - The URL to redirect to after auto login
 * @returns {string} The complete auto-login URL with parameters
 */
export const createAutoLoginUrl = (
	redirectUrl: string,
	appendLogout = false,
): string => {
	const omsAuthToken = storage.getString(StorageKeys.OMS_AUTH_TOKEN);

	if (!omsAuthToken) {
		if (!appendLogout) return redirectUrl;

		const newRedirectUrl = new URL(redirectUrl);
		newRedirectUrl.searchParams.append("logout", "true");

		return newRedirectUrl.toString();
	}

	const finalUrl = new URL(`${ENV.ugUrl}/auto-login`);
	finalUrl.searchParams.append("redirectUrl", String(redirectUrl));
	finalUrl.searchParams.append("oneTimeToken", omsAuthToken);

	return finalUrl.toString();
};

/* PROFILE WEB UTILS */

/**
 * Special section URLs that override the default profile platform URL
 */
const SPECIAL_SECTION_URLS: Partial<Record<ProfileSectionType, string>> = {
	[PROFILE_SECTIONS.MY_APPLICATIONS]: SECTION_URLS.MY_APPLICATIONS,
};

/**
 * Gets the base URL for a profile section
 * @param {ProfileSectionType} section - The profile section
 * @returns {string} The base URL for the section
 */
const getBaseUrlForSection = (section: ProfileSectionType): string => {
	return SPECIAL_SECTION_URLS[section] || SECTION_URLS.PROFILE_PLATFORM;
};

/**
 * Gets the complete profile URL with all necessary parameters
 * @param {ProfileSectionType} section - The profile section
 * @returns {string} The complete profile URL with parameters
 */
export const getProfileUrl = (section: ProfileSectionType): string => {
	const fullUrl = getBaseUrlForSection(section);

	const additionalParams = [
		...(section !== PROFILE_SECTIONS.MY_APPLICATIONS
			? [{ key: "section", value: section }]
			: []),
		{ key: "platform", value: "mobile" },
		{ key: "app_source", value: "learn" },
		{ key: "x-tenant", value: "upgrad" },
		{ key: "role", value: "learner" },
		{ key: "mobile_app", value: "true" },
	];

	return addWebParamsToUrl({ url: fullUrl, params: additionalParams });
};

/**
 * Generates custom JavaScript for profile WebView
 * @param {ProfileSectionType} section - The profile section
 * @returns {string} Custom JavaScript code
 */
export const getProfileCustomJs = (section: ProfileSectionType): string => {
	return `
		window.addEventListener('load', function() {
		  const hasAuth = !!(window.omsAuthToken || window.accessToken);
		  if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(JSON.stringify({
			  eventName: 'profile_page_loaded',
			  section: '${section}',
			  hasAuth
			}));
		  }
		});
	  `;
};
