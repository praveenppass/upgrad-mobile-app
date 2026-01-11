import {
	type CaseReducer,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

type AuthState = {
	loading: boolean;
	authError?: string;
	otpVerified: boolean;
	isAuthFail: boolean;
	isAuthSuccess: boolean | null;
	apiType: string | null;
};

const initialState: AuthState = {
	authError: "",
	loading: false,
	otpVerified: false,
	isAuthFail: false,
	isAuthSuccess: null,
	apiType: "",
};

type AuthReducer<Payload> = CaseReducer<AuthState, PayloadAction<Payload>>;

const login: AuthReducer<{
	username: string;
	loginType: string;
	type: string;
}> = (state, action) => {
	state.loading = true;
	state.isAuthFail = false;
	state.apiType = action.payload.type;
};

const verify: AuthReducer<{ username: string; otp: string; regId: string }> = (
	state,
) => {
	state.loading = true;
	state.isAuthFail = false;
	state.apiType = "verify";
	state.authError = "";
};

const logout: AuthReducer<void> = (state) => {
	state.loading = true;
	state.isAuthFail = false;
};

const onEndLoading: AuthReducer<void> = (state) => {
	state.loading = false;
};

const onStartLoading: AuthReducer<void> = (state) => {
	state.loading = true;
};

const onAuthError: AuthReducer<string> = (state, action) => {
	state.isAuthFail = true;
	state.authError = action.payload;
};

const sendEmailOTP: AuthReducer<void> = (state) => {
	state.loading = true;
	state.otpVerified = false;
};

const sendMobileOTP: AuthReducer<void> = (state) => {
	state.loading = true;
	state.otpVerified = false;
};

const otpVerified: AuthReducer<void> = (state) => {
	state.otpVerified = true;
};

const verifyEmailOTP: AuthReducer<{ otp: string }> = (state) => {
	state.loading = true;
	state.otpVerified = false;
};

const verifyMobileOTP: AuthReducer<{ otp: string }> = (state) => {
	state.loading = true;
	state.otpVerified = false;
};

const resetOtpVerify: AuthReducer<void> = (state) => {
	state.otpVerified = false;
};

const setIsAuthSuccess: AuthReducer<boolean | null> = (state, action) => {
	state.isAuthSuccess = action.payload;
};

const clearAuthState: AuthReducer<void> = (state) => {
	state.isAuthSuccess = null;
	state.isAuthFail = false;
	state.authError = "";
	state.otpVerified = false;
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login,
		verify,
		logout,
		onAuthError,
		onEndLoading,
		onStartLoading,
		setIsAuthSuccess,
		sendEmailOTP,
		verifyEmailOTP,
		otpVerified,
		sendMobileOTP,
		verifyMobileOTP,
		resetOtpVerify,
		clearAuthState,
	},
});

export { authSlice };
