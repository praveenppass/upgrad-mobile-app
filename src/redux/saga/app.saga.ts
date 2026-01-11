/* eslint-disable func-style */
import crashlytics from "@react-native-firebase/crashlytics";
import { StackActions } from "@react-navigation/native";
import rudderClient from "@rudderstack/rudder-sdk-react-native";
import moment from "moment";
import { put, select, takeEvery } from "redux-saga/effects";

import { navigator } from "@routes/rootNavigation";

import { storage } from "@config/mmkvStorage";

import { syncLastAccessTime } from "@redux/saga/personalDetails.saga";
import { getUgUserFunc } from "@redux/saga/user.saga";
import { userSlice } from "@redux/slices/user.slice";
import { RootState } from "@redux/store/root.reducer";

import { IUserType } from "@interface/web.interface";

import StorageKeys from "@constants/storage.constants";

const onGetLocalData = (key: string) => storage.getString(key);

const SPLASH_SCREEN_TIMEOUT = 1500;

const delaySplashScreen = (startTime: moment.Moment) => {
	const currentTime = moment();
	const diff = currentTime.diff(startTime, "milliseconds", true);

	if (diff < SPLASH_SCREEN_TIMEOUT)
		return new Promise((resolve) =>
			setTimeout(resolve, SPLASH_SCREEN_TIMEOUT - diff),
		);
};

const MAINTENANCE_SCHEDULE = {
	startDate: "2025-03-11",
	endDate: "2025-03-12",
	startHour: 22,
	endHour: 4,
};

/**
 * @description This is a flag to show the legacy screen
 * @type {boolean}
 */
const SHOW_LEGACY_SCREEN = false;

const isMaintenancePeriod = () => {
	const { endDate, endHour, startHour, startDate } = MAINTENANCE_SCHEDULE;
	const startDateTime = new Date(
		`${startDate}T${String(startHour).padStart(2, "0")}:00:00`,
	);
	const endDateTime = new Date(
		`${endDate}T${String(endHour).padStart(2, "0")}:00:00`,
	);
	const currentDateTime = new Date();
	if (currentDateTime >= startDateTime && currentDateTime < endDateTime) {
		return true;
	} else {
		return false;
	}
};

const updateActiveSelector = (state: RootState) => state.app.updateActive;

function* onAppStart() {
	try {
		const startTime = moment();
		const userToken: string = yield onGetLocalData(StorageKeys.USER_TOKEN);
		const userDetails: string = yield onGetLocalData(StorageKeys.USER_INFO);

		const omsAuthToken: string = yield onGetLocalData(
			StorageKeys.OMS_AUTH_TOKEN,
		);
		const userType: string = yield onGetLocalData(StorageKeys.USER_TYPE);
		const isDummyToken: string = yield onGetLocalData(
			StorageKeys.IS_DUMMY_TOKEN,
		);

		if (userToken) {
			yield put(userSlice.actions.setToken(JSON.parse(userToken)));
		}

		if (userDetails) {
			yield put(userSlice.actions.setUser(JSON.parse(userDetails)));
		}

		if (userType) {
			yield put(userSlice.actions.setUserType(userType as IUserType));
		}

		if (omsAuthToken) {
			yield put(userSlice.actions.setOmsAuthToken(omsAuthToken));
		}

		if (isDummyToken) {
			yield put(
				userSlice.actions.setIsDummyToken(isDummyToken === "true"),
			);
		}

		if (userToken) {
			yield syncLastAccessTime();
			const userData = JSON.parse(userDetails);
			yield* identifyuser(userData);

			yield delaySplashScreen(startTime);

			const isUpdateActive: boolean = yield select(updateActiveSelector);

			if (isUpdateActive) return;

			if (isMaintenancePeriod()) {
				navigator.dispatch(
					StackActions.replace("AppMaintenanceNoticeScreen"),
				);
			} else if (SHOW_LEGACY_SCREEN) {
				navigator.dispatch(StackActions.replace("LegacyScreen"));
			} else {
				const { hasLearnCourses, hasUgCourses } = yield select(
					(state: RootState) => state.personalDetails.basicDetails,
				);

				navigator.dispatch(
					StackActions.replace("HomeStack", {
						screen: "MainTabs",
						params: {
							screen:
								hasLearnCourses || hasUgCourses
									? "MyPrograms"
									: "WebExploreCourses",
						},
					}),
				);
			}
		} else if (omsAuthToken) {
			yield* getUgUserFunc({
				payload: { isDisableNavigation: true },
				type: "user/getUgUser",
			});

			yield delaySplashScreen(startTime);

			const isUpdateActive: boolean = yield select(updateActiveSelector);

			if (isUpdateActive) return;

			if (isMaintenancePeriod()) {
				navigator.dispatch(
					StackActions.replace("AppMaintenanceNoticeScreen"),
				);
			} else if (SHOW_LEGACY_SCREEN) {
				navigator.dispatch(StackActions.replace("LegacyScreen"));
			} else {
				const { hasUgCourses } = yield select(
					(state: RootState) => state.personalDetails.basicDetails,
				);
				navigator.dispatch(
					StackActions.replace("HomeStack", {
						screen: "MainTabs",
						params: {
							screen: hasUgCourses
								? "MyPrograms"
								: "WebExploreCourses",
						},
					}),
				);
			}
		} else {
			yield delaySplashScreen(startTime);

			const isUpdateActive: boolean = yield select(updateActiveSelector);

			if (isUpdateActive) return;

			if (isMaintenancePeriod()) {
				navigator.dispatch(
					StackActions.replace("AppMaintenanceNoticeScreen"),
				);
			} else if (SHOW_LEGACY_SCREEN) {
				navigator.dispatch(StackActions.replace("LegacyScreen"));
			} else {
				// Check if user is in guest mode from MMKV storage
				const is_skipped =
					storage.getString(StorageKeys.IS_GUEST) === "true";
				if (is_skipped) {
					navigator.dispatch(StackActions.replace("HomeStack"));
				} else {
					navigator.dispatch(StackActions.replace("AuthStack"));
				}
			}
		}
	} catch (error) {
		navigator.dispatch(StackActions.replace("AuthStack"));
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* identifyuser(userData: any) {
	rudderClient.identify(
		userData.id as string,
		{
			email: userData.email,
			username: `${userData.firstName ?? ""} ${userData.lastName ?? ""}`,
		},
		Object(null),
	);
	yield Promise.all([
		crashlytics().setUserId(userData.id),
		crashlytics().setAttributes({
			email: userData.email,
			username: `${userData.firstName ?? ""} ${userData.lastName ?? ""}`,
		}),
	]);
}

export function* appSaga() {
	yield takeEvery("app/appStart", onAppStart);
}
