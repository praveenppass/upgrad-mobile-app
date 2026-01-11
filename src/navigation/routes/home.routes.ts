/**
 * Home Navigator Routes
 * Routes for screens within the authenticated home navigation flow
 */
import { createRoutes } from "@navigation/routes/route.util";

const HOME_ROUTES = createRoutes({
	// Main Navigation
	MainTabs: "MainTabs",

	// Asset & Content
	PlayVideoLandscape: "PlayVideoLandscape",
	CourseDetailsScreen: "CourseDetailsScreen",
	ViewResourcesScreen: "ViewResourcesScreen",

	// Quiz & Assessment
	AssessmentQuizScreen: "AssessmentQuizScreen",
	RecallQuizScreen: "RecallQuizScreen",

	// Profile Management
	MyProfileWorkExperience: "MyProfileWorkExperience",
	MyProfilePersonalDetails: "MyProfilePersonalDetails",
	ProfileMethods: "ProfileMethods",
	ManualProfileFlow: "ManualProfileFlow",
	ManualProfileFieldsModal: "ManualProfileFieldsModal",
	MyProfileEducationDetails: "MyProfileEducationDetails",
	MyProfileContactDetails: "MyProfileContactDetails",
	MyProfileTimezone: "MyProfileTimezone",
	MyProfileAspirations: "MyProfileAspirations",
	MyProfileScreen: "MyProfileScreen",
	MyAccount: "MyAccount",
	ProfileWebView: "ProfileWebView",

	// Profile View Screens
	WorkExperienceViewScreen: "WorkExperienceViewScreen",
	EducationViewScreen: "EducationViewScreen",
	AspirationsViewScreen: "AspirationsViewScreen",
	CertificateViewScreen: "CertificateViewScreen",

	// Support & Help
	HelpSupport: "HelpSupport",
	TicketView: "TicketView",
	TicketTab: "TicketTab",
	TicketDetails: "TicketDetails",
	RaiseATicketView: "RaiseATicketView",

	// Search & Exploration
	SearchCourses: "SearchCourses",

	Container1Screen: "Container1Screen",
	Container2Screen: "Container2Screen",
	Container3Screen: "Container3Screen",
	Container6Screen: "Container6Screen",

	// Lecture Details
	LectureDetailsScreen: "LectureDetailsScreen",
} as const);

// Type Definitions
export type IHomeRoutes = typeof HOME_ROUTES;
export type IHomeRoute = IHomeRoutes[keyof IHomeRoutes];

export default HOME_ROUTES;
