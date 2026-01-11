export const OPEN_REPLAY_EVENTS = {
	APP_STARTED: "app_started",
	APP_ACTIVE: "app_active",
	APP_BACKGROUND: "app_background",
	USER_IDENTIFIED: "user_identified",
	ERROR_LOGGED: "error_logged",
	GLOBAL_ERROR: "global_error",
} as const;

export const OPEN_REPLAY_METADATA_KEYS = {
	USER_EMAIL: "user_email",
	USER_ID: "user_id",
	USER_TYPE: "user_type",
	ENVIRONMENT: "environment",
} as const;

export const OPEN_REPLAY_MESSAGES = {
	TRACKING_STARTED: "OpenReplay started tracking",
	TRACKING_STOPPED: "OpenReplay stopped tracking",
} as const;

export const OPEN_REPLAY_URL = "https://api.openreplay.com/ingest";
