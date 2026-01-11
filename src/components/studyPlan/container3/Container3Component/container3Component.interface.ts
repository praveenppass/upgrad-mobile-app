import { IUserCourseContainer3Child } from "@graphql/query/studyPlan/container3/getContainer3CourseQuery";

import { LearningPathType } from "@interface/app.interface";
import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

export interface IContainer3Component {
	learningPathType: LearningPathType;
	learningPathId: string;
	learningPathName: string;
	learningPathCode: string;
	courseCode: string;
	trackGroupCode?: string;
	trackCode?: string;
	electiveCode?: string;
	electiveGroupCode?: string;
	workshopId: string;
	workshopCode: string;
	userProgramId?: string;
}

export interface IContainer3Data {
	code: string;
	name: string;
	label: string;
	progress: number;
	timeLeft: string | number;
	children: IModuleCardListItem[];
	totalGradableAssets: number;
	totalCompletedGradableAssets: number;
	dueAt: string;
	isExtended: boolean;
	isOptional: boolean;
	isLocked: boolean;
	status: string;
}

export interface IModuleCardData {
	code: string;
	type?: string;
	name: string;
	progress: number;
	totalGradableAssets?: number;
	totalCompletedGradableAssets?: number;
	timeLeft: string | number;
	isOptional?: boolean;
	isExtended?: boolean;
	dueAt?: string;
	children?: IUserCourseContainer3Child[];
}

export interface IModuleCardListItem {
	type: IAssetType;
	status: IAssetStatusEnum;
	isLocked: boolean;
	progress: number;
	name: string;
	label: string;
	isOptional?: boolean;
	code: string;
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	elective: string;
	electiveGroup: string;
	track: string;
	trackGroup: string;
	assetCode: string;
}
