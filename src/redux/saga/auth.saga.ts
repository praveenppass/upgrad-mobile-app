/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable func-style */
import { StackActions } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";

import { IOmsLoginQuery } from "@graphql/mutation/auth/omsLogin";

import {
	loginRequest,
	requestEmailOTP,
	requestMobileOTP,
	verifyEmailOTP,
	verifyMobileOTP,
	verifyRequest,
} from "@services/auth";

import { endSession } from "@hooks/startup/sessionManager/sessionManager.utils";

import { navigator } from "@routes/rootNavigation";

import { keycloak } from "@config/keycloack";
import { storage } from "@config/mmkvStorage";

import { syncLastAccessTime } from "@redux/saga/personalDetails.saga";
import { appSlice } from "@redux/slices/app.slice";
import { authSlice } from "@redux/slices/auth.slice";
import { calendarSlice } from "@redux/slices/calendar.slice";
import { clearPersonalDetails } from "@redux/slices/personalDetails.slice";
import { sessionSlice } from "@redux/slices/session.slice";
import { snackSlice } from "@redux/slices/snack.slice";
import { studyPlanSlice } from "@redux/slices/studyplan.slice";
import { userSlice } from "@redux/slices/user.slice";
import { RootState } from "@redux/store/root.reducer";

import { IAuthApiRes, ISnackType } from "@interface/app.interface";
import { IUserToken } from "@interface/user.interface";

import { C } from "@assets/constants";
import { strings } from "@assets/strings";
import { AUTH_ROUTES, HOME_ROUTES, HOME_TAB_ROUTES, ROOT_ROUTES } from "@navigation/routes";

const {
	strings: { LOGIN_FAILED, LOG_OUT_FAILED, INCORRECT_OTP_MESSAGE },
} = C;

const onClearLocalData = () => {
	storage.clearAll();
	keycloak.clearToken();
};

enum IAuthErrorType {
	OTP_GENERATION_FAILED = "OTP generation failed",
	PHONE_NOT_FOUND = "PHONE_NOT_FOUND",
	EMAIL_NOT_REGISTERED = "Email not registered, please try again",
	INCORRECT_OTP = "OTP invalid, please try again",
}

enum IAuthRegistrationType {
	NEW_USER = "NEW",
	EXISTING_USER = "EXISTING_USER",
}

function* onError(message?: string) {
	const ERR_MESSAGE =
		message === IAuthErrorType.OTP_GENERATION_FAILED
			? LOGIN_FAILED
			: message === IAuthErrorType.PHONE_NOT_FOUND
				? strings.PHONE_NUMBER_NOT_REGISTERED
				: message === IAuthErrorType.EMAIL_NOT_REGISTERED
					? strings.EMAIL_NOT_REGISTERED
					: message === IAuthErrorType.INCORRECT_OTP
						? strings.INCORRECT_OTP
						: (message ?? LOGIN_FAILED);
	yield put(authSlice.actions.onEndLoading());
	yield put(authSlice.actions.onAuthError(ERR_MESSAGE));
}

function* loginFunc({
	payload,
}: PayloadAction<{ username: string; loginType: "email" | "number" }>) {
	try {
		const { data }: AxiosResponse<IAuthApiRes> = yield call(
			loginRequest,
			payload,
		);

		if (data?.registrationStatus === IAuthRegistrationType.NEW_USER) {
			if (payload.loginType === "number")
				yield onError(IAuthErrorType.PHONE_NOT_FOUND);
			else yield onError(IAuthErrorType.EMAIL_NOT_REGISTERED);

			return;
		}

		yield onError("");

		// @ts-ignore
		navigator.navigate("OtpView", {
			credential: payload.username,
			loginType: payload.loginType,
			regId: data?.registrationId,
		});
	} catch (error) {
		const { response } = error as AxiosError<{
			message: string;
		}>;

		yield onError(response?.data.message);
	}
}

function* verifyFunc({
	payload,
}: PayloadAction<{ username: string; otp: string; regId: string }>) {
	try {
		const data: IOmsLoginQuery = yield call(verifyRequest, payload);

		const tokens = data?.omsLogin;

		if (tokens.accessToken === "null") {
			yield onError(strings.MUST_BE_ENROLLED_IN_COURSE);

			return;
		}

		yield put(authSlice.actions.setIsAuthSuccess(true));
		yield put(
			userSlice.actions.setToken({
				access_token: tokens?.accessToken,
				refresh_token: tokens?.refreshToken,
			}),
		);

		yield call(syncLastAccessTime);
		yield put(userSlice.actions.getUser({}));
	} catch (error) {
		const { response } = error as AxiosError<{
			errorList: { errorMessage: string }[];
		}>;

		yield onError(response?.data?.errorList?.[0]?.errorMessage);
	}
}

//* Send Email OTP
function* sendEmailOTPFunc() {
	const email: IUserToken = yield select(
		(state: RootState) => state.user.user.email,
	);
	const payload = { email, slug: "KNLGHT" };
	try {
		const response: AxiosResponse<unknown> = yield call(
			requestEmailOTP,
			payload,
		);
		if (response?.status === 200) {
			yield onError("");
			yield put(authSlice.actions.onEndLoading());
		} else {
			yield onError(
				response?.response?.data?.message ?? INCORRECT_OTP_MESSAGE,
			);
		}
	} catch (error) {
		yield onError();
	}
}

//* Verify Email
function* verifyEmailFunc({ payload }: PayloadAction<{ otp: string }>) {
	const email: IUserToken = yield select(
		(state: RootState) => state.user.user.email,
	);
	const postData = {
		email: email,
		otp: Number(payload.otp),
	};
	try {
		const response: AxiosResponse = yield call(verifyEmailOTP, postData);
		if (response?.status === 200) {
			yield onError("");
			yield put(authSlice.actions.onEndLoading());
			yield put(authSlice.actions.otpVerified());
		} else {
			yield onError(
				// @ts-ignore ignoring response type issue
				response?.response?.data?.message ?? INCORRECT_OTP_MESSAGE,
			);
		}
	} catch (error) {
		yield onError();
	}
}

//* Send Mobile OTP
function* sendMobileOTPFunc() {
	const phone: IUserToken = yield select(
		(state: RootState) => state.user.user.phone,
	);
	const payload = { phoneNumber: phone, template: "KNLGHT" };
	try {
		const response: AxiosResponse<unknown> = yield call(
			requestMobileOTP,
			payload,
		);
		if (response?.status === 200) {
			yield onError("");
			yield put(authSlice.actions.onEndLoading());
		} else {
			yield onError(
				response?.response?.data?.message ?? INCORRECT_OTP_MESSAGE,
			);
		}
	} catch (error) {
		yield onError();
	}
}

//* Verify Email
function* verifyMobileOTPFunc({ payload }: PayloadAction<{ otp: string }>) {
	const phone: IUserToken = yield select(
		(state: RootState) => state.user.user.phone,
	);
	const postData = {
		phoneNumber: phone,
		otp: payload.otp,
	};
	try {
		const response: AxiosResponse = yield call(verifyMobileOTP, postData);
		if (response?.status === 200) {
			yield onError("");
			yield put(authSlice.actions.onEndLoading());
			yield put(authSlice.actions.otpVerified());
		} else {
			yield onError(
				// @ts-ignore ignoring response type issue
				response?.response?.data?.message ?? INCORRECT_OTP_MESSAGE,
			);
		}
	} catch (error) {
		yield onError();
	}
}
function* logoutFunc() {
	try {
		// const tokens: IUserToken = yield select(
		// 	(state: RootState) => state.user.token,
		// );
		// yield call(logoutRequest, tokens);
		yield call(endSession);
		yield onClearLocalData();
		yield put(userSlice.actions.clearUser());
		yield put(authSlice.actions.onEndLoading());
		yield put(appSlice.actions.clearAppSlice());
		yield put(studyPlanSlice.actions.restStudyState());
		yield put(calendarSlice.actions.onClearCalendarState());
		yield put(clearPersonalDetails());
		navigator.reset({
			index: 1,
			routes: [
				{
					name: ROOT_ROUTES.HomeStack,
					params: {
						screen: HOME_ROUTES.MainTabs,
						params: {
							screen: HOME_TAB_ROUTES.WebExploreCourses,
							params: { webLogout: true },
						},
					},
				},
				{
					name: ROOT_ROUTES.AuthStack,
					params: {
						screen: AUTH_ROUTES.WebLogin,
					},
				},
			],
		});
	} catch (error) {
		yield put(
			snackSlice.actions.showAlert({
				type: ISnackType.error,
				message: LOG_OUT_FAILED,
			}),
		);
	}
}

export function* authSaga() {
	yield takeEvery("auth/login", loginFunc);
	yield takeEvery("auth/logout", logoutFunc);
	yield takeEvery("auth/verify", verifyFunc);
	yield takeEvery("auth/sendEmailOTP", sendEmailOTPFunc);
	yield takeEvery("auth/verifyEmailOTP", verifyEmailFunc);
	yield takeEvery("auth/sendMobileOTP", sendMobileOTPFunc);
	yield takeEvery("auth/verifyMobileOTP", verifyMobileOTPFunc);
}
