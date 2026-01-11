import { Category, ISelectedLibrary } from "@interface/courseLibrary";
import {
	createSlice,
	type CaseReducer,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { PaceHolderCategory } from "@utils/constants";

interface LibraryState {
	selectedCategory: Category;
	selectedLibrary: ISelectedLibrary;
}

type LibrarySliceReducer<Payload> = CaseReducer<
	LibraryState,
	PayloadAction<Payload>
>;

const initialState: LibraryState = {
	selectedCategory: PaceHolderCategory,
	selectedLibrary: PaceHolderCategory,
};

const selectCategory: LibrarySliceReducer<Category> = (state, action) => {
	const newState = {
		...state,
		selectedCategory: action.payload,
	};
	return newState;
};

const selectLibrary: LibrarySliceReducer<ISelectedLibrary> = (state, action) => {
	const newState = {
		...state,
		selectedLibrary: action.payload,
	};
	return newState;
};

const librarySlice = createSlice({
	name: "library",
	initialState,
	reducers: {
		selectCategory,
		selectLibrary
	},
});

export { librarySlice };
