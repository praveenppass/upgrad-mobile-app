/* eslint-disable func-style */
import { call, select, takeEvery } from "redux-saga/effects";

import {
	createSession,
	endSession,
} from "@hooks/startup/sessionManager/sessionManager.utils";

import { RootState } from "@redux/store/root.reducer";

function* onCreateSession() {
	try {
		const userId: string = yield select(
			(state: RootState) => state.user.user.id,
		);

		yield call(createSession, userId);
	} catch (error) {
		// Error creating session
	}
}

function* onEndSession() {
	try {
		yield call(endSession);
	} catch (error) {
		// Error ending session
	}
}

function* resetSession() {
	yield call(onEndSession);
	yield call(onCreateSession);
}

export function* sessionSaga() {
	yield takeEvery("session/createSession", onCreateSession);
	yield takeEvery("session/endSession", onEndSession);
	yield takeEvery("session/resetSession", resetSession);
}
