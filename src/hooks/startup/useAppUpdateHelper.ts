import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useRef } from "react";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { useDispatch } from "react-redux";

import { IAppVersionsQuery } from "@graphql/query/getAppVersions";
import getAppVersionsQuery from "@graphql/query/getAppVersions";

import { appNavigationRef } from "@navigation/NavigationContainer";
import { ROOT_ROUTES } from "@navigation/routes";

import { UPGRAD_LEARN } from "@utils/constants";

import { infinityClient } from "@config/apollo";
import { storage } from "@config/mmkvStorage";

import { appSlice } from "@redux/slices/app.slice";

import { IAppUpdateState } from "@interface/appUpdate.interface";

import StorageKeys from "@constants/storage.constants";

const ONE_DAY = 24 * 60 * 60 * 1000;

interface IUseAppUpdateHelper {
	isAppReady: boolean;
}

const compareAppVersions = (currentVersion: string, latestVersion: string) => {
	/*
	 * This function compares two versions of the app and returns:
	 * 1 if latestVersion is greater than currentVersion
	 * -1 if latestVersion is less than currentVersion
	 * 0 if both versions are equal
	 */

	const parseVersion = (version: string) =>
		version.split(".").map((n) => parseInt(n, 10));

	const compareVersionPart = (current: number, latest: number) => {
		if (latest > current) return 1;

		return -1;
	};

	const [currentMajor, currentMinor, currentPatch] =
		parseVersion(currentVersion);
	const [latestMajor, latestMinor, latestPatch] = parseVersion(latestVersion);

	if (latestMajor !== currentMajor)
		return compareVersionPart(currentMajor, latestMajor);
	if (latestMinor !== currentMinor)
		return compareVersionPart(currentMinor, latestMinor);
	if (latestPatch !== currentPatch)
		return compareVersionPart(currentPatch, latestPatch);

	return 0;
};

const compareAppVersionCodes = (
	currentVersionCode: string,
	latestVersionCode: string,
) => {
	/*
	 * This function compares two version codes of the app and returns:
	 * 1 if latestVersionCode is greater than currentVersionCode
	 * -1 if latestVersionCode is less than currentVersionCode
	 * 0 if both version codes are equal
	 */

	const currentVersionCodeInt = parseInt(currentVersionCode, 10);
	const latestVersionCodeInt = parseInt(latestVersionCode, 10);

	if (latestVersionCodeInt > currentVersionCodeInt) return 1;
	if (latestVersionCodeInt < currentVersionCodeInt) return -1;
	return 0;
};

const isPlatformAndroid = Platform.OS === "android";

const useAppUpdateHelper = ({ isAppReady }: IUseAppUpdateHelper) => {
	const dispatch = useDispatch();
	const hasFetchedRef = useRef(false);

	const startApp = () => dispatch(appSlice.actions.appStart());

	useEffect(() => {
		if (isAppReady) startApp();
	}, [isAppReady]);

	const [getAppVersions] = useLazyQuery<IAppVersionsQuery>(
		getAppVersionsQuery,
		{
			client: infinityClient,
			variables: {
				filter: {
					platform: { eq: Platform.OS },
					app_type: { eq: UPGRAD_LEARN },
					status: { is: true },
				},
			},
			fetchPolicy: "no-cache",
		},
	);

	const fetchAppVersions = useCallback(async () => {
		const { data, error } = await getAppVersions();

		if (error || !data) return;

		let appUpdateState = IAppUpdateState.NO_UPDATE;

		const nodes = data?.appVersions?.nodes;

		if (!Array.isArray(nodes) || nodes.length === 0 || !nodes[0])
			return (appUpdateState = IAppUpdateState.NO_UPDATE);

		const versionInfo = nodes[0];

		const currentVersion = DeviceInfo.getVersion();
		const latestVersion = versionInfo.version;

		const versionComparison = compareAppVersions(
			currentVersion,
			latestVersion,
		);

		let isOutdated = versionComparison === 1;

		if (isPlatformAndroid) {
			const currentVersionCode = DeviceInfo.getBuildNumber();
			const latestVersionCode = versionInfo.code;

			const versionCodeComparison = compareAppVersionCodes(
				currentVersionCode,
				latestVersionCode,
			);

			isOutdated = isOutdated || versionCodeComparison === 1;
		}

		if (isOutdated) {
			const remindLaterTimestamp = storage.getNumber(
				StorageKeys.REMIND_LATER_TIMESTAMP,
			);

			const requiresUpdate =
				versionInfo.force_update ||
				!remindLaterTimestamp ||
				Date.now() - remindLaterTimestamp > ONE_DAY;

			if (requiresUpdate) {
				if (versionInfo.force_update)
					appUpdateState = IAppUpdateState.FORCE_UPDATE;
				else appUpdateState = IAppUpdateState.NORMAL_UPDATE;
			} else appUpdateState = IAppUpdateState.REMIND_LATER;
		} else appUpdateState = IAppUpdateState.NO_UPDATE;

		if (
			[
				IAppUpdateState.FORCE_UPDATE,
				IAppUpdateState.NORMAL_UPDATE,
			].includes(appUpdateState)
		) {
			dispatch(appSlice.actions.setUpdateActive(true));

			appNavigationRef.reset({
				index: 0,
				routes: [
					{
						name: ROOT_ROUTES.AppUpdateScreen,
						params: { appUpdateState },
					},
				],
			});
		}
	}, [getAppVersions]);

	useEffect(() => {
		if (!isAppReady || hasFetchedRef.current) return;

		hasFetchedRef.current = true;
		fetchAppVersions();
	}, [isAppReady]);
};

export default useAppUpdateHelper;
