/**
 * Auth Routes
 * Routes for authentication and onboarding flow
 */
import { createRoutes } from "@navigation/routes/route.util";

const AUTH_ROUTES = createRoutes({
	WelcomeScreen: "WelcomeScreen",
	WebLogin: "WebLogin",
} as const);

// Type Definitions
export type IAuthRoutes = typeof AUTH_ROUTES;
export type IAuthRoute = IAuthRoutes[keyof IAuthRoutes];

export default AUTH_ROUTES;
