import { ENV } from "@config/env";

/**
 * Profile Section Constants
 *
 * These constants define the valid section parameters for profile navigation.
 * They ensure type safety and consistency across the application.
 */
export enum PROFILE_SECTIONS {
	// Infinity WebView sections
	PERSONAL_DETAILS = "PersonalDetails",
	EDUCATIONAL_DETAILS = "EducationalDetails",
	PROFESSIONAL_EXPERIENCE = "ProfessionalExperience",
	ASPIRATIONS_AND_PREFERENCE = "AspirationsAndPreference",
	MY_APPLICATIONS = "MyApplications",
	MY_CERTIFICATES = "MyCertificates",
	APPLIED_JOBS = "AppliedJobs",
}

/**
 * Navigation Route Names
 */
export enum PROFILE_ROUTES {
	PROFILE_WEB_VIEW = "ProfileWebView",
	MY_PROFILE_TIMEZONE = "MyProfileTimezone",
	HELP_SUPPORT = "HelpSupport",
}

/**
 * Profile Action Types
 */
export enum PROFILE_ACTION_TYPES {
	NAVIGATE_WEBVIEW = "navigate_webview",
	NAVIGATE_SCREEN = "navigate_screen",
	OPEN_IN_APP_BROWSER = "open_in_app_browser",
	TOGGLE_DROPDOWN = "toggle_dropdown",
	LOGOUT = "logout",
	DELETE_ACCOUNT = "delete_account",
}

/**
 * Type definitions
 */
export type ProfileSectionType = PROFILE_SECTIONS;
export type ProfileRouteType = PROFILE_ROUTES;
export type ProfileActionType = PROFILE_ACTION_TYPES;

/**
 * Helper function to check if a string is a valid profile section
 */
export const isValidProfileSection = (
	section: string,
): section is ProfileSectionType => {
	return Object.values(PROFILE_SECTIONS).includes(
		section as ProfileSectionType,
	);
};

/**
 * Profile URL slugs
 */
export const PROFILE_URL_SLUGS = {
	PROFILE: "profile",
	APPLICATIONS: "applications?locale=in",
} as const;

/**
 * Utility function to build profile URLs using base URL and slugs
 */
export const buildProfileUrl = (slug: string): string => {
	return `${ENV.webAppUrl}/${slug}`;
};

export const SECTION_URLS = {
	ABROAD_DASHBOARD: ENV.abroadDashboardUrl,
	PROFILE_PLATFORM: buildProfileUrl(PROFILE_URL_SLUGS.PROFILE),
	MY_APPLICATIONS: buildProfileUrl(PROFILE_URL_SLUGS.APPLICATIONS),
} as const;
