/* eslint-disable no-console */
import OpenReplay from "@openreplay/react-native";
import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import useAppState from "@hooks/useAppState";

import { ENV } from "@config/env";

import { RootState } from "@redux/store/root.reducer";

import {
	OPEN_REPLAY_EVENTS,
	OPEN_REPLAY_MESSAGES,
	OPEN_REPLAY_METADATA_KEYS,
	OPEN_REPLAY_URL,
} from "@constants/openReplay.constants";

interface IOpenReplayProvider {
	children: React.ReactNode;
}

const OpenReplayProvider = ({ children }: IOpenReplayProvider) => {
	const { id, email } = useSelector((state: RootState) => state.user.user);

	useAppState({
		handleForeground: () => {
			OpenReplay.tracker.startSession(
				ENV.openReplayProjectKey as string,
				{},
				OPEN_REPLAY_URL,
			);
			OpenReplay.tracker.event(
				OPEN_REPLAY_EVENTS.APP_ACTIVE,
				OPEN_REPLAY_MESSAGES.TRACKING_STARTED,
			);
		},
		handleBackground: () => {
			OpenReplay.tracker.event(
				OPEN_REPLAY_EVENTS.APP_BACKGROUND,
				OPEN_REPLAY_MESSAGES.TRACKING_STOPPED,
			);
			// Optional: OpenReplay.tracker.stop();
		},
	});

	useEffect(() => {
		// Initialize OpenReplay at app startup
		OpenReplay.tracker.startSession(
			ENV.openReplayProjectKey as string,
			{},
			OPEN_REPLAY_URL,
		);

		// Enable network monitoring
		OpenReplay.patchNetwork(global, () => false, {
			capturePayload: true,
			captureInIframes: true,
			ignoreHeaders: ["authorization", "cookie"],
		});

		// Track app startup
		OpenReplay.tracker.event(
			OPEN_REPLAY_EVENTS.APP_STARTED,
			`Platform: ${Platform.OS}`,
		);
	}, []);

	// Set up user identification and error tracking when user info changes
	useEffect(() => {
		if (!id || !email) return;

		OpenReplay.tracker.setUserID(email);
		OpenReplay.tracker.setMetadata(
			OPEN_REPLAY_METADATA_KEYS.USER_EMAIL,
			email,
		);
		OpenReplay.tracker.setMetadata(OPEN_REPLAY_METADATA_KEYS.USER_ID, id);
		OpenReplay.tracker.setMetadata(
			OPEN_REPLAY_METADATA_KEYS.USER_TYPE,
			"mobile_app",
		);
		OpenReplay.tracker.setMetadata(
			OPEN_REPLAY_METADATA_KEYS.ENVIRONMENT,
			"development",
		);

		// Track user identification
		OpenReplay.tracker.event(
			OPEN_REPLAY_EVENTS.USER_IDENTIFIED,
			`User ID: ${email}`,
		);

		// Set up error tracking
		const originalConsoleError = console.error;
		console.error = (...args) => {
			OpenReplay.tracker.event(
				OPEN_REPLAY_EVENTS.ERROR_LOGGED,
				args.join(" "),
			);
			originalConsoleError.apply(console, args);
		};

		// Add global error handler
		if (typeof ErrorUtils !== "undefined") {
			const originalHandler = ErrorUtils.getGlobalHandler();
			ErrorUtils.setGlobalHandler((error, isFatal) => {
				OpenReplay.tracker.event(
					OPEN_REPLAY_EVENTS.GLOBAL_ERROR,
					`${error.message} - Fatal: ${isFatal}`,
				);
				originalHandler(error, isFatal);
			});
		}

		return () => {
			console.error = originalConsoleError;
		};
	}, [id, email]);

	return (
		<OpenReplay.ORTouchTrackingView style={styles.container}>
			{children}
		</OpenReplay.ORTouchTrackingView>
	);
};

export default OpenReplayProvider;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
