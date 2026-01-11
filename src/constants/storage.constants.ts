const StorageKeys = {
	OMS_AUTH_TOKEN: "@oms_auth_token_v1",
	USER_TOKEN: "@user_token_v1",
	USER_TYPE: "@user_type",
	USER_INFO: "@user_info",
	SESSION_INFO: "@session_info",
	IS_GUEST: "@is_guest",
	IS_DUMMY_TOKEN: "@is_dummy_token",
	LEARNING_PATH_ID: "@learning_path_id",
	ASSESSMENT_SKIP_ENABLED: "@assessment_skip_enabled",
	SEARCH_HISTORY: "@search_history",
	REMIND_LATER_TIMESTAMP: "@remind_later_timestamp",
	PROFILE_BLOCKER_LEARNING_PATHS: "@profile_blocker_learning_paths",
	BIRTHDAY_MODAL_SHOWN: "@birthday_modal_shown",
} as const;

export default StorageKeys;
