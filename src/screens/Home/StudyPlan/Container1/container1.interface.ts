export interface IGetDurationText {
	duration: number;
	progress: number;
}

export interface IGetStatusIcon {
	startedAt: string;
}

export interface IProgramDetails {
	id: string;
	name: string;
	progress: number;
	duration: number;
	progressText: string;
	durationText: string;
	startedAt: string;
	isLocked: boolean;
	workshopId: string;
	workshopCode: string;
	userProgramId: string;
	code: string;
}
