import {
	type CaseReducer,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

import { IAutofillProfileResponse } from "@graphql/mutation/myProfile/personalDetails/autofillFromLinkedIn";

import { ISessionKeys } from "@interface/app.interface";
import { type IUserInfo, type IUserToken } from "@interface/user.interface";
import { IUserType } from "@interface/web.interface";

type userState = {
	user: IUserInfo;
	token: IUserToken;
	userType: IUserType | null;
	omsAuthToken: string | null;
	uploadImageLoader: boolean;
	sessionDetails: ISessionKeys | null;
	isDummyToken: boolean;
	parsedProfileData: IAutofillProfileResponse | null;
};

const initialState: userState = {
	user: Object(null),
	token: Object(null),
	sessionDetails: null,
	uploadImageLoader: false,
	userType: null,
	omsAuthToken: null,
	isDummyToken: false,

	parsedProfileData: null,
};

type userReducer<Payload> = CaseReducer<userState, PayloadAction<Payload>>;

const getUser: userReducer<{ isDisableNavigation?: boolean }> = () => {};

const getUgUser: userReducer<{ isDisableNavigation?: boolean }> = () => {};

const setUser: userReducer<IUserInfo> = (state, action) => {
	state.user = action.payload;
};

const getToken: userReducer<void> = () => {};

const setToken: userReducer<IUserToken> = (state, action) => {
	state.token = action.payload;
};

const clearUser: userReducer<void> = (state) => {
	state.user = Object(null);
	state.token = Object(null);
	state.omsAuthToken = null;
	state.userType = null;
	state.isDummyToken = false;
};

const setSession: userReducer<ISessionKeys> = (state, action) => {
	state.sessionDetails = action.payload;
};

const setUploadImageLoader: userReducer<boolean> = (state, action) => {
	state.uploadImageLoader = action.payload;
};

const setUserType: userReducer<IUserType> = (state, action) => {
	state.userType = action.payload;
};

const setOmsAuthToken: userReducer<string> = (state, action) => {
	state.omsAuthToken = action.payload;
};

const setIsDummyToken: userReducer<boolean> = (state, action) => {
	state.isDummyToken = action.payload;
};

const setParsedProfileData: userReducer<IAutofillProfileResponse | null> = (
	state,
	action,
) => {
	state.parsedProfileData = action.payload;
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		getUser,
		setUser,
		getToken,
		setToken,
		clearUser,
		setSession,
		setUploadImageLoader,
		setUserType,
		setOmsAuthToken,
		setIsDummyToken,
		getUgUser,
		setParsedProfileData,
	},
});

export { userSlice };
