import { IBrowserMetadata } from "@utils/deviceMetaData/deviceMetaData.interface";

export interface ISessionData {
	sessionId: string;
	startTime: number;
	lastActivityTime: number;
	userId?: string;
}

export interface IUpdateSession {
	isLearnUser: boolean;
	isLoggedIn: boolean;
}

export interface ISendUserSessionAnalyticsData {
	deviceInfo: IBrowserMetadata;
	type: ISessionType;
}

export enum ISessionType {
	START = "sessionStart",
	END = "sessionEnd",
}
