import { Platform } from "react-native";

import omsLoginQuery, {
	IOmsLoginQuery,
	IOmsLoginQueryVariables,
} from "@graphql/mutation/auth/omsLogin";

import { authHttpClient, otpHttpClient } from "@utils/httpClientList";

import { client } from "@config/apollo";
import { ENV } from "@config/env";
import { keycloak } from "@config/keycloack";
import { storage } from "@config/mmkvStorage";

import { IUserToken } from "@interface/user.interface";

import StorageKeys from "@constants/storage.constants";

type ILoginVar = { username: string; loginType: "email" | "number" };
type ILoginVerifyVar = { username: string; otp: string; regId: string };

type IRequestEmailOTPVar = { email: string; slug: string };
type IEmailOTPVerifyVar = { email: string; otp: string };

type IRequestMobileOTPVar = { phoneNumber: string; template: string };
type IMobileOTPVerifyVar = { phoneNumber: string; otp: string };

const loginRequest = async (body: ILoginVar) => {
	const endpoint = `/auth/v5/registration/${body.loginType === "email" ? "email" : "phone"}`;
	const payload =
		body.loginType === "email"
			? { email: body.username }
			: { phoneNumber: "+91" + body.username };

	const response = await authHttpClient.post(endpoint, payload);
	return response;
};

const getLearnToken = async (omsAuthToken: string) => {
	const { data } = await client.mutate<
		IOmsLoginQuery,
		IOmsLoginQueryVariables
	>({
		mutation: omsLoginQuery,
		variables: { data: { authToken: omsAuthToken } },
		fetchPolicy: "no-cache",
	});

	return data;
};

const verifyRequest = async (body: ILoginVerifyVar) => {
	const response = await authHttpClient.post(
		`/auth/v5/otp/validate`,
		{ otp: +body.otp },
		{ headers: { "X-Registration-Id": body.regId } },
	);

	const authToken = response.headers["auth-token"];
	storage.set(StorageKeys.OMS_AUTH_TOKEN, authToken);

	return getLearnToken(authToken);
};

const deleteAccountRequest = async () => {
	const endpoint = `${ENV.ugAuthServiceUrl}/user`;
	const response = await axios.delete(endpoint, {
		headers: {
			Authorization: `Bearer ${storage.getString(StorageKeys.OMS_AUTH_TOKEN)}`,
		},
	});
	return response;
};

//* Request Email OTP
const requestEmailOTP = (body: IRequestEmailOTPVar) => {
	try {
		return otpHttpClient
			.post(`email/generate`, body)
			.then((res) => res)
			.catch((err) => err);
	} catch (error) {
		return error;
	}
};

//* Verify Email OTP
const verifyEmailOTP = (body: IEmailOTPVerifyVar) => {
	try {
		return otpHttpClient
			.post(`email/verify`, body)
			.then((res) => res)
			.catch((err) => err);
	} catch (error) {
		return error;
	}
};

//* Request Mobile OTP
const requestMobileOTP = (body: IRequestMobileOTPVar) => {
	try {
		return otpHttpClient
			.post(`otp/generate`, body)
			.then((res) => res)
			.catch((err) => err);
	} catch (error) {
		return error;
	}
};

//* Verify Mobile OTP
const verifyMobileOTP = (body: IMobileOTPVerifyVar) => {
	try {
		return otpHttpClient
			.post(`otp/verify`, body)
			.then((res) => res)
			.catch((err) => err);
	} catch (error) {
		return error;
	}
};

const logoutRequest = ({ access_token, refresh_token }: IUserToken) => {
	try {
		const url = keycloak.createLogoutUrl().split("?")[0];
		const data = new URLSearchParams({
			refresh_token,
			client_id: ENV.keyCloackClientId as string,
		});

		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			...(access_token && { Authorization: `Bearer ${access_token}` }),
		};

		const requestOptions = {
			url,
			method: "post",
			headers: headers,
			withCredentials: true,
			data: Platform.OS === "android" ? data.toString() : data,
		};

		return authHttpClient(requestOptions)
			.then((response) => {
				if (response.status === 204) {
					return true;
				} else {
					return false;
				}
			})
			.catch(() => {
				return false;
			});
	} catch (error) {
		return false;
	}
};

export {
	loginRequest,
	verifyRequest,
	logoutRequest,
	requestEmailOTP,
	verifyEmailOTP,
	requestMobileOTP,
	verifyMobileOTP,
	deleteAccountRequest,
};
