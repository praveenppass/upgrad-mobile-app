import { combineReducers } from "redux";

import { appSlice } from "@redux/slices/app.slice";
import { authSlice } from "@redux/slices/auth.slice";
import { bookmarkSlice } from "@redux/slices/bookmark.slice";
import { calendarSlice } from "@redux/slices/calendar.slice";
import { doubtSlice } from "@redux/slices/doubt.slice";
import { librarySlice } from "@redux/slices/library.slice";
import { modalSlice } from "@redux/slices/modal.slice";
import { notesSlice } from "@redux/slices/notes.slice";
import personalDetailsSlice from "@redux/slices/personalDetails.slice";
import { sessionSlice } from "@redux/slices/session.slice";
import { snackSlice } from "@redux/slices/snack.slice";
import { studyPlanSlice } from "@redux/slices/studyplan.slice";
import { userSlice } from "@redux/slices/user.slice";
import { videoSlice } from "@redux/slices/video.slice";

export const rootReducer = combineReducers({
	personalDetails: personalDetailsSlice,
	app: appSlice.reducer,
	auth: authSlice.reducer,
	user: userSlice.reducer,
	modal: modalSlice.reducer,
	snack: snackSlice.reducer,
	library: librarySlice.reducer,
	calendar: calendarSlice.reducer,
	studyPlan: studyPlanSlice.reducer,
	notesSlice: notesSlice.reducer,
	bookmarkSlice: bookmarkSlice.reducer,
	doubtFormSlice: doubtSlice.reducer,
	video: videoSlice.reducer,
	session: sessionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
