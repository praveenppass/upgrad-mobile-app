import { type ICourseVariantEnum } from "./app.interface";

interface ICourseListResult {
	result: ICourse[];
	totalCount: number;
}

interface ICourse {
	id: string;
	status: string;
	progress: number;
	progressStatus: string;
	startedAt: string;
	expiresAt: string;
	accessType: string;
	accessDays: number;
	course: ICourseContent;
	program: ICourseContent;
	programDeliveryType: string;
	totalLevel1Containers: number;
	totalLearningDuration: number;
	trialInfo: {
		enableTriggerNotification: boolean;
	};
	courseDeliveryType: {
		id: string;
		name: string;
	};
	deliveryType: {
		id: string;
		type: string;
		name: string;
	};
	variant: ICourseVariantEnum;
}

interface ICourseContent {
	id: string;
	name: string;
	image: string;
	courseLevels: {
		name: string;
	}[];
}

interface IModuleDrawerContent {
	selectedId: string;
	level1: string;
	level2?: string;
	level3?: string;
	level4?: string;
}

export { type ICourse, type ICourseListResult, type IModuleDrawerContent };
