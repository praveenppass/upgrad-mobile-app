import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
	name: "session",
	initialState: {},
	reducers: {
		createSession: () => {
			// This action will be handled by saga
		},
		endSession: () => {
			// This action will be handled by saga
		},
		resetSession: () => {
			// This action will be handled by saga
		},
	},
});

export { sessionSlice };
