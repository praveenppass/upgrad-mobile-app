import sendUserSessionAnalytics, {
	ISendUserSessionAnalyticsMutation,
	ISendUserSessionAnalyticsMutationVariables,
} from "@graphql/mutation/sessionManager/sendUserSessionAnalytics";

import {
	ISendUserSessionAnalyticsData,
	ISessionData,
	ISessionType,
	IUpdateSession,
} from "@hooks/startup/sessionManager/sessionManager.interface";

import { getDeviceMetadata } from "@utils/deviceMetaData/deviceMetadata";
import { IBrowserMetadata } from "@utils/deviceMetaData/deviceMetaData.interface";
import { generateSessionCode } from "@utils/functions";

import { client } from "@config/apollo";
import { storage } from "@config/mmkvStorage";

import StorageKeys from "@constants/storage.constants";

const SESSION_ID_KEY = StorageKeys.SESSION_INFO;

export const updateSession = ({ isLearnUser, isLoggedIn }: IUpdateSession) => {
	if (!isLearnUser || !isLoggedIn) return;
	const lastActivityTime = Date.now();
	const sessionData = storage.getString(SESSION_ID_KEY);
	if (!sessionData) return;

	const session: ISessionData = JSON.parse(sessionData);

	const updatedSession = {
		...session,
		lastActivityTime,
	};

	storage.set(SESSION_ID_KEY, JSON.stringify(updatedSession));
};

export const getSession = (): ISessionData | null => {
	const sessionData = storage.getString(SESSION_ID_KEY);
	if (!sessionData) return null;
	return JSON.parse(sessionData);
};

const sendSessionAnalytics = async (data: ISendUserSessionAnalyticsData) =>
	client.mutate<
		ISendUserSessionAnalyticsMutation,
		ISendUserSessionAnalyticsMutationVariables
	>({
		mutation: sendUserSessionAnalytics,
		variables: {
			data,
		},
		fetchPolicy: "no-cache",
	});

export const createSession = async (userId: string) => {
	const sessionId = generateSessionCode();
	const now = Date.now();

	const sessionData: ISessionData = {
		sessionId,
		startTime: now,
		lastActivityTime: now,
		userId,
	};

	storage.set(SESSION_ID_KEY, JSON.stringify(sessionData));

	const deviceInfo: IBrowserMetadata = await getDeviceMetadata();

	sendSessionAnalytics({
		deviceInfo,
		type: ISessionType.START,
	});
};

export const endSession = async () => {
	const sessionData = storage.getString(SESSION_ID_KEY);

	if (!sessionData) return;

	storage.delete(SESSION_ID_KEY);

	const deviceInfo: IBrowserMetadata = await getDeviceMetadata();

	sendSessionAnalytics({
		deviceInfo,
		type: ISessionType.END,
	});
};
