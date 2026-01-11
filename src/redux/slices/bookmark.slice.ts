import { BookmarkForUserProgram } from "@interface/bookmark.interface";
import {
	createSlice,
	type CaseReducer,
	type PayloadAction,
} from "@reduxjs/toolkit";

interface MileStoneBookmarkState {
	selectedBookmarkMilestone?: BookmarkForUserProgram;
}

type MileStoneBookmarkSliceReducer<Payload> = CaseReducer<
	MileStoneBookmarkState,
	PayloadAction<Payload>
>;

const initialState: MileStoneBookmarkState = {
	selectedBookmarkMilestone: undefined,
};

const selectBookmarkSlice: MileStoneBookmarkSliceReducer<
	BookmarkForUserProgram | undefined
> = (state, action) => {
	const newState = {
		...state,
		selectedBookmarkMilestone: action.payload,
	};
	return newState;
};

const bookmarkSlice = createSlice({
	name: "bookmarks",
	initialState,
	reducers: {
		selectBookmarkSlice,
	},
});

export { bookmarkSlice };
