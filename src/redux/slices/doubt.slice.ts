import { IDoubtTab } from "@interface/calendar.interface";
import {
	createSlice,
	type CaseReducer,
	type PayloadAction,
} from "@reduxjs/toolkit";

interface IDoubtState {
	selectedTab: string;
}

const initialState: IDoubtState = {
	selectedTab: IDoubtTab.allQuestions,
};

type AppReducer<Payload> = CaseReducer<IDoubtState, PayloadAction<Payload>>;

const setSelectedTab: AppReducer<IDoubtTab> = (state, action) => {
	const newState = {
		...state,
		selectedTab: action.payload,
	};
	return newState;
};

const doubtSlice = createSlice({
	name: "doubt",
	initialState,
	reducers: {
		setSelectedTab,
	},
});

export { doubtSlice };
