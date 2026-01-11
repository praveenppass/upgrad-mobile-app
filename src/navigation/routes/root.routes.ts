/**
 * Root Routes
 * Routes for the main application navigation flow
 */
import { createRoutes } from "@navigation/routes/route.util";

const ROOT_ROUTES = createRoutes({
	SplashScreen: "SplashScreen",
	AuthStack: "AuthStack",
	HomeStack: "HomeStack",
	AppUpdateScreen: "AppUpdateScreen",
	AppMaintenanceNoticeScreen: "AppMaintenanceNoticeScreen",
	PostEnrollScreen: "PostEnrollScreen",
	LegacyScreen: "LegacyScreen",
	WebViewModal: "WebViewModal",
	ImageViewScreen: "ImageViewScreen",
	WebPageViewScreen: "WebPageViewScreen",
	NetworkErrorScreen: "NetworkErrorScreen",
} as const);

// Type Definitions
export type IRootRoutes = typeof ROOT_ROUTES;
export type IRootRoute = IRootRoutes[keyof IRootRoutes];

export default ROOT_ROUTES;
