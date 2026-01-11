import { IAssetStatusEnum, type IAssetType } from "./asset.interface";

export interface IMilestoneType {
	userProgramContainers?: IUserProgramContainer[];
}

export interface ICourseMilestoneType {
	userCourseContainers?: IUserProgramContainer[];
}

export interface IUserProgramContainer {
	code?: string;
	level?: number;
	name?: string;
	label?: string;
	aliasName?: string;
	description?: null | string;
	duration?: number;
	totalAssessments?: number;
	isCurrent?: boolean;
	activity?: UserProgramContainerActivity | null;
	asset?: Asset;
	progress?: number;
	isOptional?: boolean;
	children?: IUserProgramContainer[];
	allmoduleData?: IUserProgramContainer[];
	resumeAsset?: unknown | null;
	selectedCourse?: unknown | null;
}

export interface IDrawerContainer {
	courseName?: string;
	selectedId?: string;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	resumeAsset?: unknown;
}

export interface UserProgramContainerActivity {
	status?: string;
	progress?: number;
	enableLock?: null;
	startsAt?: null;
	endsAt?: null;
	gradableAssetProgress?: number;
	availableFrom?: null;
	availableTill?: string | null;
	dueAt?: null;
	deadlineReferredFrom?: null;
	extensionRequests?: null;
	duration?: number;
	completedDuration?: number;
	totalCompletedSubmissions?: number;
	totalSubmissions?: number;
}

export interface Asset {
	id?: string;
	code?: string;
	name?: string;
	duration?: number;
	assetType?: AssetType;
	activity?: AssetActivity;
	index?: number;
}

export interface AssetActivity {
	status?: IAssetStatusEnum;
	timeSpent?: number;
	expiresAt?: string;
	isUpgraded?: boolean;
	startsAt?: string;
	endsAt?: string;
	isUnlockRequested?: boolean;
	enableLock?: boolean | null;
	isBookMarked?: boolean;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	extensionRequests?: ExtensionRequest[] | null;
	deadlineReferredFrom?: string;
	availableTill?: string;
}

export interface ExtensionRequest {
	requestedAt?: string | null;
}
export interface AssetType {
	type?: IAssetType;
	name?: string;
}

export interface IDrawerContainer {
	courseName?: string;
	selectedId?: string;
	level1?: string;
	level2?: string;
	level3?: string;
}
