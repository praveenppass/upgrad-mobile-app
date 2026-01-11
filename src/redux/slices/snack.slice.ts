import { ISnackBar, ISnackType } from "@interface/app.interface";
import {
	createSlice,
	type CaseReducer,
	type PayloadAction,
} from "@reduxjs/toolkit";

const initialData: ISnackBar = {
	open: false,
	message: "",
	type: ISnackType.info,
	isOnTop: false
};

type snackBarSliceReducer<Payload> = CaseReducer<
	ISnackBar,
	PayloadAction<Payload>
>;

const initialState: ISnackBar = initialData;

const showAlert: snackBarSliceReducer<Omit<ISnackBar, "open">> = (
	state,
	action,
) => {
	state.open = true;
	state.type = action.payload.type;
	state.message = action.payload.message;
	state.isOnTop = action?.payload?.isOnTop ?? false;  
};

const hideAlert: snackBarSliceReducer<void> = (state) => {
	state.open = false;
	state.message = "";
	isOnTop: false
};

const snackSlice = createSlice({
	name: "snack",
	initialState,
	reducers: {
		showAlert,
		hideAlert,
	},
});

export { snackSlice };
