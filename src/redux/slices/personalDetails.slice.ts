import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITimezone {
	name: string;
	offset: string;
}

export interface IBasicDetails {
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string | null;
	hasLearnCourses: boolean;
	hasUgCourses: boolean;
	dateOfBirth: string;
	lastLogin: string;
	loaded: boolean;
}

interface AppState {
	basicDetails: IBasicDetails;
	timezone: ITimezone;
}

const defaultTimezone = {
	name: "Asia/Kolkata",
	offset: "+05:30",
};

const initialState: AppState = {
	basicDetails: {
		firstName: "",
		lastName: "",
		email: "",
		profilePicture: "",
		hasLearnCourses: false,
		hasUgCourses: false,
		dateOfBirth: "",
		lastLogin: "",
		loaded: false,
	},
	timezone: defaultTimezone,
};

const setTimezoneReducer = (
	state: AppState,
	action: PayloadAction<ITimezone>,
) => {
	return {
		...state,
		timezone: action.payload,
	};
};

const setUserBasicDetailsReducer = (
	state: AppState,
	action: PayloadAction<IBasicDetails>,
) => {
	return {
		...state,
		basicDetails: action.payload,
	};
};

const clearPersonalDetailsReducer = (state: AppState) => {
	return {
		...state,
		...initialState,
	};
};

const updateLastLoginUserDetailsReducer = (
	state: AppState,
	action: PayloadAction<string>,
) => {
	return {
		...state,
		basicDetails: { ...state.basicDetails, lastLogin: action.payload },
	};
};

const requestUserPersonalDetailsReducer = (state: AppState) => state;

const personalDetailsSlice = createSlice({
	name: "personalDetails",
	initialState,
	reducers: {
		setTimezone: setTimezoneReducer,
		clearPersonalDetails: clearPersonalDetailsReducer,
		setUserBasicDetails: setUserBasicDetailsReducer,
		requestUserPersonalDetails: requestUserPersonalDetailsReducer,
		updateLastLoginUserDetails: updateLastLoginUserDetailsReducer,
	},
});

export default personalDetailsSlice.reducer;

export const {
	setTimezone,
	clearPersonalDetails,
	setUserBasicDetails,
	requestUserPersonalDetails,
	updateLastLoginUserDetails,
} = personalDetailsSlice.actions;
