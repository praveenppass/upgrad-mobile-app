export interface IModuleType {
	aliasName: string | null;
	code: string;
	level?: number;
	name: string;
	label?: string;
	description?: string;
	duration?: number;
	totalAssessments?: number;
	isCurrent?: boolean;
	isOptional?: boolean;
	activity?: Activity;
	asset?: IAssetType; // Matches Asset structure
	notes?: Note[] | null;
	assetItem?: IAssetItem[]; // Array of asset items
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	totalBookmarks?: string | number;
}

export interface Activity {
	isFromDeferral: string;
	status: string;
	progress: number;
	enableLock: boolean;
	startsAt: string;
	endsAt: string;
	duration: number;
	completedDuration: number;
	// __typename: string;
}

export interface IAssetType {
	id?: string;
	code: string;
	name: string;
	duration?: number;
	assetType: AssetType;
	activity?: Activity2;
	level1?: string; // Optional to align with Asset2
	level2?: string; // Optional to align with Asset2
	level3?: string; // Optional to align with Asset2
	level4?: string; // Optional to align with Asset2
}

export interface AssetType {
	type: string;
	name: string;
}

export interface Activity2 {
	status: string;
	isBookMarked: boolean;
	timeSpent: number;
	expiresAt: string;
	isUpgraded: boolean;
	startsAt: string;
	endsAt: string;
	isUnlockRequested: any;
	enableLock: boolean;
	level1?: string; // Optional for compatibility
	level2?: string;
	level3?: string;
	level4?: string;
	extensionRequests: string;
	deadlineReferredFrom: string;
	availableTill: string;
}

export interface IAssetItem {
	code: string;
	label: string;
	name: string;
	aliasName?: string | null;
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	totalBookmarks?: string;
	asset?: Asset2; // Matches Asset2 structure
	notes?: Note[] | null;
}

export interface Note {
	id: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	level: string;
}

export interface Asset2 {
	level1?: string;
	level2?: string;
	level3?: string;
	level4?: string;
	code: string;
	name: string;
	assetType?: AssetType2;
}

export interface AssetType2 {
	type: string;
	name: string;
}
