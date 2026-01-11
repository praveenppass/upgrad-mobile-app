import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

import { ENV } from "@config/env";

/**
 * Web event types used for communication between native and web
 */
export const WEB_EVENTS = {
	OPEN_PAGE_PATH: "open_page_path",
	OPEN_EXPLORE_COURSES: "open_explore_courses",
	SHARE_PAGE: "share_page",
	OPEN_EXTERNAL_LINK: "open_external_link",
	OPEN_EXTERNAL_SOCIAL_LINK: "open_external_social_link",
	TOGGLE_MEGA_MENU: "toggle_mega_menu",
	SEND_AUTH_TOKEN: "send_auth_token",
	SEND_AUTH_DUMMY_TOKEN: "send_auth_dummy_token",
	DOWNLOAD_FILE: "download_file",
	WEB_VIEW_USER_LOGGED_OUT: "web_view_user_logged_out",
} as const;

/**
 * Device web parameters
 */
export const DEVICE_WEB_PARAMS = [
	{ key: "device_type", value: "mobile" },
	{ key: "platform_os", value: Platform.OS.toLowerCase() },
	{ key: "app_name", value: "learn" },
	{ key: "platform_version", value: DeviceInfo.getSystemVersion() },
	{ key: "agent_version", value: DeviceInfo.getVersion() },
	{ key: "platform_agent", value: DeviceInfo.getBrand() },
] as const;

export const WEB_UG_COURSES_PARAMS = {
	platform: "web-learn-lite",
	pageNo: "1",
	pageSize: "1",
	enrolmentStatus: "ALL",
} as const;

export const WEB_UG_COURSES_ENDPOINT = `${ENV.ugCourseServiceUrl}/apis/v3/enrollments/`;

export const WEB_UG_USER_ENDPOINT = `/apis/v2/users/`;
