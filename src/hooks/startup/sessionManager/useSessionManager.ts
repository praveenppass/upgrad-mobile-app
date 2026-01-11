import NetInfo from "@react-native-community/netinfo";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
	getSession,
	updateSession,
} from "@hooks/startup/sessionManager/sessionManager.utils";
import useAppState from "@hooks/useAppState";
import useGetUserType from "@hooks/useGetUserType";

import { ENV } from "@config/env";

import { sessionSlice } from "@redux/slices/session.slice";

const sessionTimeout = +(ENV.sessionTimeout ?? 0);

const useSessionManager = () => {
	const { isLearnUser, isLoggedIn } = useGetUserType();
	const dispatch = useDispatch();

	const createSession = useCallback(
		() => dispatch(sessionSlice.actions.createSession()),
		[dispatch],
	);

	const updateSessionCallback = useCallback(
		() => updateSession({ isLearnUser, isLoggedIn }),
		[isLearnUser, isLoggedIn],
	);

	const handleSessionTimeout = useCallback(
		(time: number) => {
			if (time > sessionTimeout)
				return dispatch(sessionSlice.actions.resetSession());

			updateSessionCallback();
		},
		[dispatch, updateSessionCallback],
	);

	const handleActivity = useCallback(() => {
		if (!isLearnUser || !isLoggedIn) return;
		const session = getSession();

		if (!session) {
			createSession();
			return;
		}

		// Check if we need to end the current session and start a new one
		const now = Date.now();

		// Check if app was in background for 30+ minutes
		const timeSinceLastActivity = now - session.lastActivityTime;
		handleSessionTimeout(timeSinceLastActivity);
	}, [
		getSession,
		createSession,
		handleSessionTimeout,
		isLearnUser,
		isLoggedIn,
	]);

	const handleNetworkChange = (isConnected: boolean) => {
		const session = getSession();

		if (!session) return;

		if (!isConnected)
			// Network was lost - save the disconnection time
			updateSessionCallback();
		else {
			// Network is restored
			const now = Date.now();
			const timeSinceNetworkLoss = now - session.lastActivityTime;

			handleSessionTimeout(timeSinceNetworkLoss);
		}
	};

	// Handle app coming to foreground
	useAppState({
		handleForeground: handleActivity,
		handleBackground: updateSessionCallback,
	});

	useEffect(() => {
		// Initialize session on mount
		if (!isLearnUser || !isLoggedIn) return;

		// Check if session should be continued or ended
		handleActivity();

		// Subscribe to network status changes
		const unsubscribeNetInfo = NetInfo.addEventListener(({ isConnected }) =>
			handleNetworkChange(isConnected ?? true),
		);

		// Cleanup
		return unsubscribeNetInfo;
	}, [isLearnUser, isLoggedIn]);
};

export default useSessionManager;
