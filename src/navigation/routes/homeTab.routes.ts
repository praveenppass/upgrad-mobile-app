/**
 * Home Tab Navigator Routes
 * Routes for the main tab navigation within the home stack
 */
import { createRoutes } from "@navigation/routes/route.util";

const HOME_TAB_ROUTES = createRoutes({
	MyPrograms: "MyPrograms",
	AcademicPlanner: "AcademicPlanner",
	WebExploreCourses: "WebExploreCourses",
} as const);

// Type Definitions
export type IHomeTabRoutes = typeof HOME_TAB_ROUTES;
export type IHomeTabRoute = IHomeTabRoutes[keyof IHomeTabRoutes];

export default HOME_TAB_ROUTES;
