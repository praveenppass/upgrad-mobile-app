import config from "react-native-config";

import Endpoints from "@config/endpoints";

const prefix_env =
	Endpoints[config.ENV as keyof typeof Endpoints] ?? Endpoints.prod;

const ENV = {
	environment: config.ENV,
	endpoint: prefix_env.APP_URL,
	appBundleId: config.APP_BUNDLE_ID,
	keycloakRealm: config.KEYCLOAK_REALM,
	keyCloackClientId: prefix_env.KEYCLOAK_CLIENT_ID,
	assessmentServiceEndpoint: prefix_env.ASSESSMENT_SERVICE_URL,
	infinityServiceEndPoint: prefix_env.INFINITY_SERVICE_URL,
	sathiBotServiceUrl: prefix_env.SATHI_SERVICE_URL,
	productivityGPTUrl: prefix_env.PRODUCTIVITY_GPT_URL,
	productivityGPTApiUrl: prefix_env.PRODUCTIVITY_GPT_API_URL,
	// rudderStackKey: config.RUDDER_STACK_KEY,
	rudderStackAndroidKey: config.RUDDER_STACK_ANDROID_KEY,
	rudderStackIosKey: config.RUDDER_STACK_IOS_KEY,
	rudderStackDataPlanKey: config.RUDDER_STACK_DATA_PLAN_KEY,
	feedbackURL: config.FEEDBACK_URL,
	LatexRenderUrl: prefix_env.LATEX_RENDER_URL,
	keycloakURL: prefix_env.KEYCLOAK_URL,
	webAppUrl: prefix_env.WEB_APP_URL,
	ugAuthServiceUrl: prefix_env.UG_AUTH_SERVICE_URL,
	otpService: prefix_env.OTP_SERVICE_ENDPOINT,
	openReplayProjectKey: config.OPEN_REPLAY_PROJECT_KEY,
	brightcoveAccountId: config.BRIGHTCOVE_ACCOUNT_ID,
	brightcovePolicyKey: config.BRIGHTCOVE_POLICY_KEY,
	TRUECALLER_CLIENT_ID: config.TRUECALLER_CLIENT_ID,
	iosAppKey: config.iosAppKey,
	iosAppLink: config.iosAppLink,
	brightCoveEndpoint: config.BRIGHTCOVE_ENDPOINT,
	CODEPUSH_KEY_IOS: config.CODEPUSH_KEY_IOS,
	PREFIXES_URL: config.PREFIXES_URL,
	ugAuthUrl: prefix_env.UG_AUTH_URL,
	ugUserServiceUrl: prefix_env.UG_USER_SERVICE_URL,
	ugCourseServiceUrl: prefix_env.UG_COURSE_SERVICE_URL,
	studentAppPlayStoreUrl: prefix_env.STUDENT_APP_PLAY_STORE_URL,
	studentAppAppStoreUrl: prefix_env.STUDENT_APP_APP_STORE_URL,
	legacyStudentAppPlayStoreUrl: prefix_env.LEGACY_STUDENT_APP_PLAY_STORE_URL,
	legacyStudentAppAppStoreUrl: prefix_env.LEGACY_STUDENT_APP_APP_STORE_URL,
	instanaKeyAndroid: config.INSTANA_KEY_ANDROID,
	instanaKeyIos: config.INSTANA_KEY_IOS,

	ugUrl: prefix_env.UG_URL,
	cpsServiceUrl: prefix_env.CPS_SERVICE_URL,
	googlePlacesApiKey: config.GOOGLE_PLACES_API_KEY,
	clarityProjectId: config.CLARITY_PROJECT_ID,
	abroadDashboardUrl: prefix_env.ABROAD_DASHBOARD_URL,
	sessionTimeout: config.SESSION_TIMEOUT,
};
export { ENV };
