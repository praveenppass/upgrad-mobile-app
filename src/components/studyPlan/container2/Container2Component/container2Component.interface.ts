import { IUserMilestoneCertificate } from "@graphql/query/studyPlan/container2/getProgramListDataQuery";

import { LearningPathType } from "@interface/app.interface";

export interface ICourseItem {
	courseCode: string;
	label: string;
	name: string;
	totalCompletedGradableAssets?: number;
	totalGradableAssets?: number;
	timeLeft: string;
	progress: number;
	isOptional?: boolean;
	isTrack?: boolean;
	isTrackGroup?: boolean;
	isElective?: boolean;
	isElectiveGroup?: boolean;
	trackGroupCode?: string;
	electiveGroupCode?: string;
	trackCode?: string;
	electiveCode?: string;
	trackSelectionFrom?: string;
	trackAvailableTill?: string;
	electiveSelectionFrom?: string;
	electiveAvailableTill?: string;
	isLocked: boolean;
	currentCourseState?: {
		asset: string;
		level1: string;
		level2: string;
		level3: string;
		level4: string;
	};
	certificate?: IUserMilestoneCertificate | null;
}

export interface IContainer2Component {
	learningPathType: LearningPathType;
	learningPathName: string;
	learningPathId: string;
	workshopId: string;
	workshopCode: string;
	userProgramId?: string;
	learningPathCode: string;
}

export interface ICalculateGPTAccessTimeLeft {
	registeredAt: string;
}

export interface ISelectionModalData {
	description: string;
	title: string;
}

export interface ISelectionAvailabilityParams {
	isTrackGroup: boolean;
	isElectiveGroup: boolean;
	trackSelectionFrom?: string;
	trackAvailableTill?: string;
	electiveSelectionFrom?: string;
	electiveAvailableTill?: string;
}

export interface IProductivityGPTData {
	limit_reached: boolean;
	enrollment_date: string;
	expiry_days: number;
	message: string;
	is_expired: boolean;
}

export interface IProductivityGPTResponse {
	data: {
		output: IProductivityGPTData;
	};
}

export interface IFetchProductivityGptAccessData {
	learningPathId: string;
	userId?: string;
}
