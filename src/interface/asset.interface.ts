//* Asset Status
enum IAssetStatusEnum {
	completed = "completed",
	started = "started",
	notStarted = "not-started",
	locked = "locked",
	sequentialLock = "sequentialLock",
	inProgress = "in-progress",
	resumeAsset = "resume-asset",
}

//* ASSET_TYPE
enum IAssetType {
	VIDEO = "video",
	RECALL_QUIZ = "recall-quiz",
	FLASH_CARD = "flash-card",
	SCROM = "scrom",
	SCORM = "scorm",
	PDF = "pdf",
	HTML_ZIP = "html-zip",
	CODE_ZIP = "code-zip",
	ASSESSMENT = "assessment",
	READING_MATERIAL = "reading material",
	ONLINE_EDITOR = "online-editor",
	ASSIGNMENT = "assignment",
	PROJECT = "project",
	SUPER_ASSET = "super-asset",
	HAND_ON = "hands-on",
	PPT = "ppt",
	TEXT = "text",
	CLASS_OPINION = "class-opinion",
}

enum IStatus {
	COMPLETED = "completed",
	IN_PROGRESS = "in-progress",

	// TODO: Add other asset statuses
}

enum AssetLevelStatus {
	NEXT_UP = "Next Up",
	CONTINUE = "Continue",
}

enum IVideoEvents {
	play = "play",
	paused = "pause",
	seeked = "seeked",
}

enum IDueDateExtension {
	DUE_DATE_EXTENSION = "DUE_DATE_EXTENSION",
}

export interface IUpdateAssetVariables {
	data?: {
		status?: string;
		timeSpent?: number;
	};
	where?: {
		asset?: string;
		userProgram?: string;
		superAssetCode?: string;
		userCourse?: string;
		attempt?: {
			url?: string;
		};
	};
}

export interface IUpdateAssetForUserProgramData {
	updateAssetForUserProgram?: UpdateAssetForUserProgram;
}

interface UpdateAssetForUserProgram {
	status?: string;
	timeSpent?: number;
}

enum IVideoType {
	vimeo = "Vimeo",
	brightcove = "Brightcove",
}

interface IVimeoVideoProps {
	vimoeId?: string;
	assetId?: string;
	brightcoveId?: string;
	url?: string;
	completed?: string;
	isSuperAsset?: boolean;
	superAssetCode?: string;
	disableAutoPlay?: boolean;
	reloadAssetScreen?: () => void;
	events_params?: Record<string, unknown>;
	onHeaderShowFunc?: (show?: boolean) => void;
	onChangeState?: (b: boolean) => void;
	seekTime?: number | null;
}

export {
	IVideoType,
	IAssetType,
	IVideoEvents,
	IAssetStatusEnum,
	IDueDateExtension,
	AssetLevelStatus,
	type IVimeoVideoProps,
	IStatus,
};
