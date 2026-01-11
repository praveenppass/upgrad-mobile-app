import { Asset } from "./milestonetype.interface";

export interface IOutComeDriven {
	data?: IOutComeDrivenData;
}

export interface IOutComeDrivenData {
	userCourseContainers?: UserCourseContainer[];
}

export interface UserCourseContainer {
	code?: string;
	level?: number;
	name?: string | null;
	label?: string | null;
	description?: string | null;
	totalAssets?: number;
	totalAssessments?: number;
	totalProjects?: number;
	totalAssignments?: number;
	totalHandsOns?: number;
	duration?: number;
	isCurrent?: boolean;
	activity?: UserCourseContainerActivity | null;
	asset?: Asset;
	children?: UserCourseContainer[] | null;
	isOptional?: boolean;
}

export interface UserCourseContainerActivity {
	progress?: number;
	enableLock?: boolean | null;
	deadlineReferredFrom?: string;
	dueAt?: string;
	extensionRequests?: unknown;
}
