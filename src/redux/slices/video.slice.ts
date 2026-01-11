import {
	type CaseReducer,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

type VideoState = {
	videoProgress: number;
};

const initialState: VideoState = {
	videoProgress: 0,
};

type VideoReducer<Payload> = CaseReducer<VideoState, PayloadAction<Payload>>;

const updateVideoProgress: VideoReducer<{ videoProgress: number }> = (
	state,
	action,
) => {
	state.videoProgress = action.payload.videoProgress;
};

const videoSlice = createSlice({
	name: "video",
	initialState,
	reducers: {
		updateVideoProgress,
	},
});

export { videoSlice };
