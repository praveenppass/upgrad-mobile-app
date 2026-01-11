import {
	type CaseReducer,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { getTimeZone } from "react-native-localize";

import {
	ICalendarTab,
	ICalendarVIewType,
	IEventCardProps,
} from "@interface/calendar.interface";

const timezone = getTimeZone();

interface ICalendarState {
	isLoading: boolean;
	selectedTab: string;
	isReschedule: boolean;
	cancelLoading: boolean;
	calendarTimeZone: string;
	refreshSessionTabs: boolean;
	filterOption: string[] | null;
	eventSelected: IEventCardProps;
	selectedView: ICalendarVIewType;
	rescheduleItemId: string | null;
}

const initialState: ICalendarState = {
	isLoading: false,
	filterOption: null,
	isReschedule: false,
	cancelLoading: false,
	rescheduleItemId: null,
	refreshSessionTabs: false,
	selectedTab: ICalendarTab.all,
	selectedView: ICalendarVIewType.calendar,
	calendarTimeZone: timezone,
	eventSelected: {
		item: Object(null),
		hideCalendar: false,
	},
};

type AppReducer<Payload> = CaseReducer<ICalendarState, PayloadAction<Payload>>;

const setSelectedTab: AppReducer<ICalendarTab> = (state, action) => {
	const newState = {
		...state,
		selectedTab: action.payload,
	};
	return newState;
};

const onUpdateCancelLoader: AppReducer<boolean> = (state, action) => {
	const newState = {
		...state,
		cancelLoading: action.payload,
	};
	return newState;
};

const selectFilterOption: AppReducer<string[]> = (state, action) => {
	const newState = {
		...state,
		filterOption: action.payload,
	};
	return newState;
};

const chooseTimeZone: AppReducer<string> = (state, action) => {
	return { ...state, calendarTimeZone: timezone };
};

const onReschedule: AppReducer<boolean> = (state, action) => {
	return {
		...state,
		isReschedule: action.payload,
	};
};

const onChooseEvent: AppReducer<IEventCardProps> = (state, action) => {
	return { ...state, eventSelected: action.payload, isReschedule: false };
};

const onChangeView: AppReducer<ICalendarVIewType> = (state, action) => {
	return { ...state, selectedView: action.payload };
};

const refreshSessionTabs: AppReducer<boolean> = (state, action) => {
	return { ...state, refreshSessionTabs: action.payload };
};

const onClearSessionData: AppReducer<void> = (state) => {
	return {
		...state,
		rescheduleItemId: null,
		isReschedule: false,
		eventSelected: {
			item: Object(null),
			hideCalendar: false,
		},
	};
};

const setRescheduleItemId: AppReducer<string | null> = (state, action) => {
	return {
		...state,
		rescheduleItemId: action.payload,
	};
};

const onChangeLoading: AppReducer<void> = (state) => {
	return {
		...state,
		isLoading: !state.isLoading,
	};
};

const onClearCalendarState: AppReducer<void> = (state) => {
	return {
		...state,
		filterOption: null,
		isReschedule: false,
		rescheduleItemId: null,
		selectedTab: ICalendarTab.all,
		selectedView: ICalendarVIewType.calendar,
		calendarTimeZone: timezone,
		eventSelected: {
			item: Object(null),
			hideCalendar: false,
		},
	};
};

const calendarSlice = createSlice({
	name: "calendar",
	initialState,
	reducers: {
		onReschedule,
		onChangeView,
		onChooseEvent,
		setSelectedTab,
		chooseTimeZone,
		onChangeLoading,
		onClearSessionData,
		selectFilterOption,
		refreshSessionTabs,
		setRescheduleItemId,
		onClearCalendarState,
		onUpdateCancelLoader,
	},
});

export { calendarSlice };
