/* eslint-disable func-style */
import { ApolloError } from "@apollo/client";
import crashlytics from "@react-native-firebase/crashlytics";
import { StackActions } from "@react-navigation/native";
import { type PayloadAction } from "@reduxjs/toolkit";
import rudderClient from "@rudderstack/rudder-sdk-react-native";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import getUserCoursesCountQuery, {
	IGetUserCoursesCount,
} from "@graphql/query/common/getUserCoursesCountQuery";
import { getUserDetails } from "@graphql/query/getUserDetails";

import { getUserProfile, IUserProfileResponse } from "@services/cpsService";

import { navigator } from "@routes/rootNavigation";

import { httpClient } from "@utils/httpClientList";
import { getProfilePictureUrl } from "@utils/profilePicture.utils";

import { client } from "@config/apollo";
import { storage } from "@config/mmkvStorage";

import { authSlice } from "@redux/slices/auth.slice";
import { setUserBasicDetails } from "@redux/slices/personalDetails.slice";
import { snackSlice } from "@redux/slices/snack.slice";
import { userSlice } from "@redux/slices/user.slice";

import { ISnackType, type QueryResult } from "@interface/app.interface";
import { IUserInfo, type IUserToken } from "@interface/user.interface";

import StorageKeys from "@constants/storage.constants";
import {
	WEB_UG_COURSES_ENDPOINT,
	WEB_UG_COURSES_PARAMS,
} from "@constants/web.constants";

import { strings } from "@assets/strings";

const onSaveLocal = async (type: string, data: string) => {
	storage.set(type, data);
};

interface ISetUserElements {
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	userId: string | null;
}

const setUserElements = async ({
	email,
	firstName,
	lastName,
	userId,
}: ISetUserElements) => {
	if (!userId) return;

	await Promise.all([
		crashlytics().setUserId(userId.toString()),
		crashlytics().setAttributes({
			email: email as string,
			username: `${firstName ?? ""} ${lastName ?? ""}`,
		}),
		rudderClient.identify(
			userId.toString(),
			{
				email: email as string,
				username: `${firstName ?? ""} ${lastName ?? ""}`,
			},
			Object(null),
		),
	]);
};

function* saveUserInfo(action: PayloadAction<IUserInfo>) {
	try {
		yield onSaveLocal(
			StorageKeys.USER_INFO,
			JSON.stringify(action.payload),
		);
	} catch (error) {
		//
	}
}

function* saveUserToken(action: PayloadAction<IUserToken>) {
	try {
		yield onSaveLocal(
			StorageKeys.USER_TOKEN,
			JSON.stringify(action.payload),
		);
	} catch (error) {
		//
	}
}

function* onStoreUser(
	user: IUserInfo,
	isNavDisabled: boolean | undefined,
	totalCourses: number,
) {
	yield put(userSlice.actions.setUser(user));
	yield put(authSlice.actions.onEndLoading());
	if (!isNavDisabled) {
		navigator.dispatch(
			StackActions.replace("HomeStack", {
				screen: "MainTabs",
				params: {
					screen:
						totalCourses > 0 ? "MyPrograms" : "WebExploreCourses",
				},
			}),
		);
	}
}

interface IOnStoreMeDetails {
	userId: string | null;
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	image: string | null;
	totalCourses: number;
	totalUgCourses: number;
	lastLogin: string | null;
	dateOfBirth: string | null;
}
function* onStoreMeDetails({
	email,
	firstName,
	image,
	lastName,
	totalCourses,
	totalUgCourses,
	userId,
	lastLogin,
	dateOfBirth,
}: IOnStoreMeDetails) {
	yield put(
		setUserBasicDetails({
			firstName: firstName ?? "",
			lastName: lastName ?? "",
			email: email ?? "",
			profilePicture: getProfilePictureUrl(image),
			hasLearnCourses: totalCourses ? totalCourses > 0 : false,
			hasUgCourses: totalUgCourses ? totalUgCourses > 0 : false,
			loaded: true,
			lastLogin: lastLogin ?? "",
			dateOfBirth: dateOfBirth ?? "",
		}),
	);
	yield setUserElements({
		email,
		firstName,
		lastName,
		userId,
	});
}

function* onGetUserCoursesCount() {
	const queryRes: QueryResult<{ data: IGetUserCoursesCount }> = yield call(
		client.query,
		{
			query: getUserCoursesCountQuery,
			fetchPolicy: "no-cache",
		},
	);

	return queryRes.data;
}

function* onGetUserProfile() {
	const userProfile: IUserProfileResponse = yield call(getUserProfile);
	return userProfile;
}

export function* onGetUgCourseCount() {
	try {
		const baseUrl = new URL(WEB_UG_COURSES_ENDPOINT);

		Object.entries(WEB_UG_COURSES_PARAMS).forEach(([key, value]) =>
			baseUrl.searchParams.append(key, value),
		);

		const authToken = storage.getString(StorageKeys.OMS_AUTH_TOKEN);
		if (!authToken) return 0;

		const response: AxiosResponse<[]> = yield call(
			httpClient.get,
			baseUrl.toString(),
			{
				headers: { "auth-token": authToken },
				timeout: 30_000,
				skipDefaultAuthToken: true,
			},
		);

		return response.data.length || 0;
	} catch (error) {
		return 0;
	}
}

function* onGetUserDetails(id: string) {
	const queryRes: QueryResult<{ user: IUserInfo }> = yield call(
		client.query,
		{
			query: getUserDetails,
			fetchPolicy: "network-only",
			variables: {
				where: {
					id,
				},
			},
		},
	);
	return queryRes;
}

function* onShowError(message?: string) {
	yield put(authSlice.actions.onEndLoading());
	yield put(
		snackSlice.actions.showAlert({
			type: ISnackType.error,
			message: message ?? "Network Request Failed",
		}),
	);
}

function* getUserFunc(
	action: PayloadAction<{ isDisableNavigation?: boolean }>,
) {
	const isNavDisabled = action.payload.isDisableNavigation;

	try {
		const userCoursesCountResponse: IGetUserCoursesCount = yield call(
			onGetUserCoursesCount,
		);

		const userProfile: IUserProfileResponse = yield call(onGetUserProfile);

		const {
			totalCourses: userCoursesCount,
			id: userId,
			lastLogin,
		} = userCoursesCountResponse.me;

		const { firstName, lastName, email, image, dateOfBirth } = userProfile;

		if (userCoursesCount && userProfile) {
			const totalUgCourses: number = yield onGetUgCourseCount();
			yield onStoreMeDetails({
				firstName,
				lastName,
				email,
				image,
				totalCourses: userCoursesCount || 0,
				totalUgCourses,
				userId,
				dateOfBirth,
				lastLogin: lastLogin?.createdAt ?? null,
			});
			const userResponse: QueryResult<{ user: IUserInfo }> =
				yield onGetUserDetails(userId ?? "");
			if (userResponse?.data?.user) {
				const totalCourses = userCoursesCount || 0;

				yield onStoreUser(
					userResponse?.data?.user,
					isNavDisabled,
					totalCourses,
				);
			} else {
				yield onShowError();
			}
		} else {
			yield onShowError();
			yield put(authSlice.actions.onEndLoading());
			if (!isNavDisabled) {
				navigator.dispatch(StackActions.replace("AuthStack"));
			}
		}
	} catch (error) {
		const isNewUser = (error as ApolloError)?.message === strings.NO_EMAIL;
		const message = isNewUser
			? strings.USER_NOT_FOUND
			: (error as ApolloError)?.message;
		if (isNewUser) {
			yield put(authSlice.actions.logout());
		}
		yield onShowError(message);
	}
}

export function* getUgUserFunc({
	payload: { isDisableNavigation },
}: PayloadAction<{ isDisableNavigation?: boolean }>) {
	try {
		const userProfile: IUserProfileResponse = yield call(onGetUserProfile);

		const { firstName, lastName, email, image, userId, dateOfBirth } =
			userProfile;

		if (userId) {
			const totalUgCourses: number = yield onGetUgCourseCount();

			yield onStoreMeDetails({
				firstName: firstName,
				lastName: lastName,
				email: email,
				image: getProfilePictureUrl(image),
				totalCourses: 0,
				totalUgCourses: totalUgCourses,
				userId: userId?.toString() ?? "",
				lastLogin: null,
				dateOfBirth,
			});

			yield onStoreUser(
				{
					firstName: firstName ?? "",
					lastName: lastName ?? "",
					email: email ?? "",
					image: getProfilePictureUrl(image),
					userProfileResume: {
						resumes: [],
						videoResume: {
							fileName: "",
							filePath: "",
							uploadedAt: "",
						},
					},
					profileSectionCompletion: {
						about: false,
						skills: false,
						settings: false,
						education: false,
						careerProfile: false,
						areaOfInterest: false,
						workExperience: false,
						personalDetails: false,
						programRequireAddProfileInfo: false,
					},
					id: userId.toString(),
				},
				isDisableNavigation,
				totalUgCourses,
			);
		} else {
			yield onShowError();
			yield put(authSlice.actions.onEndLoading());
			if (!isDisableNavigation) {
				navigator.dispatch(StackActions.replace("AuthStack"));
			}
		}
	} catch (error) {
		const isNewUser = (error as ApolloError)?.message === strings.NO_EMAIL;
		const message = isNewUser
			? strings.USER_NOT_FOUND
			: (error as ApolloError)?.message;
		if (isNewUser) {
			yield put(authSlice.actions.logout());
		}
		yield onShowError(message);
	}
}

export function* userSaga() {
	yield takeEvery("user/getUser", getUserFunc);
	yield takeEvery("user/setUser", saveUserInfo);
	yield takeEvery("user/setToken", saveUserToken);
	yield takeEvery("user/getUgUser", getUgUserFunc);
}
