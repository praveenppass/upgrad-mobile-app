import {
	type CaseReducer,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

import { IMeData } from "@interface/meDetails";
import { type INotification } from "@interface/notification.interface";

export interface ILocationInfo {
	country?: string;
	city?: string;
	regionName?: string;
}

interface INotify {
	count: number;
	data: INotification[];
}

interface AppState {
	userDetails?: IMeData;
	notification: INotify;
	isNetworkBack: boolean;
	ipInfo: ILocationInfo | null;
	updateActive: boolean;
}

const initialState: AppState = {
	ipInfo: null,
	isNetworkBack: false,
	userDetails: undefined,
	notification: {
		count: 0,
		data: [],
	},
	updateActive: false,
};

type AppReducer<Payload> = CaseReducer<AppState, PayloadAction<Payload>>;

const appStart: AppReducer<void> = () => {
	//
};

const locationDetails: AppReducer<ILocationInfo | null> = (state, action) => {
	const newState = {
		...state,
		ipInfo: action.payload,
	};
	return newState;
};

const setNotification: AppReducer<INotify> = (state, action) => {
	const newState = {
		...state,
		notification: action.payload,
	};
	return newState;
};

const clearAppSlice: AppReducer<void> = (state) => {
	const newState = {
		...state,
		userDetails: undefined,
		notification: {
			count: 0,
			data: [],
		},
	};
	return newState;
};

const changeNetworkStatus: AppReducer<void> = (state) => {
	const newState = {
		...state,
		isNetworkBack: !state.isNetworkBack,
	};
	return newState;
};

const setUpdateActive: AppReducer<boolean> = (state, action) => {
	const newState = {
		...state,
		updateActive: action.payload,
	};
	return newState;
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		appStart,
		clearAppSlice,
		locationDetails,
		setNotification,
		changeNetworkStatus,
		setUpdateActive,
	},
});

export { appSlice };
