import { NotesForUserProgram } from "@interface/milestone.notes.list.interface";
import {
	createSlice,
	type CaseReducer,
	type PayloadAction,
} from "@reduxjs/toolkit";

interface MileStoneNotesState {
	selectedMileStone?: NotesForUserProgram;
}

type MileStoneNotesSliceReducer<Payload> = CaseReducer<
	MileStoneNotesState,
	PayloadAction<Payload>
>;

const initialState: MileStoneNotesState = {
	selectedMileStone: undefined,
};

const selectNotesMileStone: MileStoneNotesSliceReducer<
	NotesForUserProgram | undefined
> = (state, action) => {
	const newState = {
		...state,
		selectedMileStone: action.payload,
	};
	return newState;
};

const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		selectNotesMileStone,
	},
});

export { notesSlice };
